const canvas = document.getElementById('fluidCanvas');
const loading = document.getElementById('fluidLoading');
const hint = document.getElementById('fluidHint');

// Em vez de deixar o spinner girando pra sempre quando algo falha,
// troca o texto da tela de carregamento por uma mensagem de erro.
function showError(message, detail) {
  const spinner = loading.querySelector('.fluid-spinner');
  const text = loading.querySelector('span');
  if (spinner) spinner.style.display = 'none';
  text.textContent = message;

  if (detail) {
    const small = document.createElement('small');
    small.style.cssText = 'display:block;margin-top:6px;opacity:0.7;font-size:0.75rem;max-width:80vw;text-align:center;';
    small.textContent = detail;
    text.appendChild(small);
  }

  const back = document.createElement('a');
  back.href = 'index.html';
  back.textContent = '← Voltar ao site';
  back.style.cssText = 'color:#c77dff;font-size:0.85rem;margin-top:8px;';
  loading.appendChild(back);
}

// Dependendo de como o CDN (esm.run) empacota o pacote, o objeto da
// biblioteca pode chegar direto, dentro de ".default", ou até dentro
// de ".default.default". Procura em todos os lugares possíveis.
function resolveFluidLib(mod) {
  const candidates = [mod, mod && mod.default, mod && mod.default && mod.default.default];
  return candidates.find((c) => c && typeof c.simulation === 'function') || null;
}

// Todas as opções da biblioteca (versão 0.6.1). Os valores que não
// estavam aqui antes foram preenchidos com o padrão da própria
// biblioteca, então o visual inicial continua o mesmo de antes.
const initialConfig = {
  INITIAL: true,
  SPLAT_AMOUNT: 5,
  HOVER: false,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.98,
  VELOCITY_DISSIPATION: 0.99,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 30,
  SPLAT_RADIUS: 0.35,
  SPLAT_FORCE: 6000,
  SPLAT_KEY: 'Space',
  SHADING: true,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  COLOR_PALETTE: [],
  BACK_COLOR: '#0c0410',
  TRANSPARENT: false,
  BRIGHTNESS: 0.5,
  BLOOM: true,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.8,
  BLOOM_THRESHOLD: 0.6,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 1.0,
};

// Paleta personalizada: 5 cores que o usuário pode escolher.
const defaultPalette = { usar: false, c1: '#c77dff', c2: '#ff7eb6', c3: '#7ee8fa', c4: '#ffd166', c5: '#06d6a0' };

async function setupPanel(lib) {
  let TweakpaneModule;
  try {
    TweakpaneModule = await import('https://unpkg.com/tweakpane@4.0.1/dist/tweakpane.js');
  } catch (err) {
    console.warn('Tweakpane não carregou — o fluido segue funcionando sem o painel.', err);
    return;
  }

  const update = (partial) => {
    if (typeof lib.config === 'function') lib.config(partial);
  };

  // "params" espelha a configuração; cada controle mexe numa chave
  // com o mesmo nome da opção da biblioteca.
  const params = { ...initialConfig };
  const palette = { ...defaultPalette };

  const pane = new TweakpaneModule.Pane({
    container: document.getElementById('fluidPanel'),
    title: 'Controles do fluido',
    expanded: window.innerWidth > 700, // no celular começa fechado
  });

  function bind(folder, key, options) {
    return folder
      .addBinding(params, key, options)
      .on('change', (ev) => update({ [key]: ev.value }));
  }

  // ----- Pincel -----
  const brush = pane.addFolder({ title: 'Pincel', expanded: true });
  bind(brush, 'SPLAT_RADIUS', { label: 'Tamanho', min: 0.01, max: 1, step: 0.01 });
  bind(brush, 'SPLAT_FORCE', { label: 'Força', min: 500, max: 15000, step: 100 });
  bind(brush, 'SPLAT_AMOUNT', { label: 'Qtd. respingos', min: 1, max: 20, step: 1 });
  bind(brush, 'HOVER', { label: 'Só passar o mouse' });
  bind(brush, 'SPLAT_KEY', { label: 'Tecla de respingo', options: { 'Espaço': 'Space', 'Desativada': '' } });

  // ----- Movimento -----
  const motion = pane.addFolder({ title: 'Movimento', expanded: true });
  bind(motion, 'CURL', { label: 'Redemoinhos', min: 0, max: 100, step: 1 });
  bind(motion, 'PRESSURE', { label: 'Pressão', min: 0, max: 1, step: 0.01 });
  bind(motion, 'PRESSURE_ITERATIONS', { label: 'Passos de pressão', min: 1, max: 50, step: 1 });
  bind(motion, 'DENSITY_DISSIPATION', { label: 'Fade da cor', min: 0, max: 4, step: 0.01 });
  bind(motion, 'VELOCITY_DISSIPATION', { label: 'Fade do movimento', min: 0, max: 4, step: 0.01 });

  // ----- Cores -----
  const colors = pane.addFolder({ title: 'Cores', expanded: false });
  bind(colors, 'COLORFUL', { label: 'Cores variando' });
  bind(colors, 'COLOR_UPDATE_SPEED', { label: 'Veloc. das cores', min: 1, max: 50, step: 1 });
  bind(colors, 'BRIGHTNESS', { label: 'Brilho das cores', min: 0.1, max: 2, step: 0.05 });
  bind(colors, 'BACK_COLOR', { label: 'Cor de fundo', view: 'color' });
  bind(colors, 'TRANSPARENT', { label: 'Fundo transparente' });

  const applyPalette = () => {
    update({ COLOR_PALETTE: palette.usar ? [palette.c1, palette.c2, palette.c3, palette.c4, palette.c5] : [] });
  };
  colors.addBinding(palette, 'usar', { label: 'Usar paleta' }).on('change', applyPalette);
  ['c1', 'c2', 'c3', 'c4', 'c5'].forEach((key, i) => {
    colors.addBinding(palette, key, { label: `Cor ${i + 1}`, view: 'color' }).on('change', applyPalette);
  });

  // ----- Visual -----
  const look = pane.addFolder({ title: 'Visual', expanded: false });
  bind(look, 'SHADING', { label: 'Sombreamento' });

  // ----- Brilho neon (bloom) -----
  const bloom = pane.addFolder({ title: 'Brilho neon', expanded: false });
  bind(bloom, 'BLOOM', { label: 'Ativar' });
  bind(bloom, 'BLOOM_INTENSITY', { label: 'Intensidade', min: 0.1, max: 2, step: 0.05 });
  bind(bloom, 'BLOOM_THRESHOLD', { label: 'Limiar', min: 0, max: 1, step: 0.01 });
  bind(bloom, 'BLOOM_SOFT_KNEE', { label: 'Suavização', min: 0, max: 1, step: 0.01 });
  bind(bloom, 'BLOOM_ITERATIONS', { label: 'Iterações', min: 1, max: 8, step: 1 });
  bind(bloom, 'BLOOM_RESOLUTION', { label: 'Resolução', options: { 64: 64, 128: 128, 256: 256, 512: 512 } });

  // ----- Raios de sol -----
  const rays = pane.addFolder({ title: 'Raios de sol', expanded: false });
  bind(rays, 'SUNRAYS', { label: 'Ativar' });
  bind(rays, 'SUNRAYS_WEIGHT', { label: 'Intensidade', min: 0.1, max: 2, step: 0.05 });
  bind(rays, 'SUNRAYS_RESOLUTION', { label: 'Resolução', options: { 64: 64, 128: 128, 196: 196, 256: 256 } });

  // ----- Qualidade (resoluções: mais alto = mais bonito e mais pesado) -----
  const quality = pane.addFolder({ title: 'Qualidade', expanded: false });
  bind(quality, 'SIM_RESOLUTION', { label: 'Simulação', options: { 32: 32, 64: 64, 128: 128, 256: 256 } });
  bind(quality, 'DYE_RESOLUTION', { label: 'Cor', options: { 256: 256, 512: 512, 1024: 1024 } });
  bind(quality, 'CAPTURE_RESOLUTION', { label: 'Print', options: { 256: 256, 512: 512, 1024: 1024, 2048: 2048 } });

  // ----- Ações -----
  const actions = pane.addFolder({ title: 'Ações', expanded: true });

  actions.addButton({ title: '✨ Novos respingos' }).on('click', () => {
    if (typeof lib.splats === 'function') lib.splats();
  });

  let paused = false;
  const pauseButton = actions.addButton({ title: '⏸ Pausar' });
  pauseButton.on('click', () => {
    if (typeof lib.pause !== 'function') return;
    paused = !paused;
    lib.pause(true); // true = dá pra continuar desenhando enquanto pausado
    pauseButton.title = paused ? '▶ Retomar' : '⏸ Pausar';
  });

  actions.addButton({ title: '📷 Tirar print' }).on('click', () => {
    if (typeof lib.screenshot === 'function') lib.screenshot();
  });

  actions.addButton({ title: '↺ Restaurar padrões' }).on('click', () => {
    Object.assign(params, initialConfig);
    Object.assign(palette, defaultPalette);
    update({ ...initialConfig });
    pane.refresh();
  });
}

async function start() {
  let mod;
  try {
    // versão fixada em 0.6.1: é a última com a API que usamos aqui
    // (simulation / config / splats). O @latest virou uma classe
    // com outra API e quebrava o site.
    mod = await import('https://esm.run/webgl-fluid-enhanced@0.6.1');
  } catch (err) {
    console.error(err);
    showError('Não foi possível baixar a biblioteca de fluido.', 'Verifique a conexão e recarregue a página.');
    return;
  }

  const lib = resolveFluidLib(mod);
  if (!lib) {
    const keys = Object.keys(mod).join(', ') || '(vazio)';
    const defKeys = mod.default ? Object.keys(mod.default).join(', ') || '(vazio)' : '(sem default)';
    console.error('Formato inesperado da biblioteca:', mod);
    showError('A biblioteca carregou, mas num formato inesperado.', `exports: ${keys} | default: ${defKeys}`);
    return;
  }

  try {
    lib.simulation(canvas, initialConfig);
  } catch (err) {
    console.error(err);
    showError('Não foi possível iniciar a simulação.', 'O WebGL pode estar desativado neste navegador.');
    return;
  }

  loading.classList.add('hidden');
  hint.classList.add('visible');
  setupPanel(lib);
}

start();
