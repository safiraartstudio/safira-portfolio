// ===== TRADUÇÃO PT/EN =====
// Dicionário central: cada chave tem o texto em pt e em en. Os
// elementos que devem trocar de texto têm um atributo data-i18n
// com essa chave (e, quando precisam traduzir um atributo em vez
// do texto visível, data-i18n-attr="aria-label" ou "aria-label,title").
const I18N = {
  'idx.title': { pt: 'SafiraWolfFox — Portfólio', en: 'SafiraWolfFox — Portfolio' },
  'theme.label': { pt: 'Alternar tema claro/escuro', en: 'Toggle light/dark theme' },
  'music.toggle': { pt: 'Trilha sonora', en: 'Soundtrack' },
  'music.play': { pt: 'Pausar/tocar música', en: 'Play/pause music' },
  'idx.subtitle': { pt: 'Veja meu trabalho nas minhas redes', en: 'Check out my work on my socials' },
  'idx.board': { pt: 'Quadro de comissões', en: 'Commission board' },
  'idx.card1.title': { pt: 'Comissões e preços', en: 'Commissions & Prices' },
  'idx.card1.desc': { pt: 'Tipos, valores e como encomendar', en: 'Types, prices and how to order' },
  'idx.card2.title': { pt: 'Termos de Uso (TOS)', en: 'Terms of Service (TOS)' },
  'idx.card2.desc': { pt: 'Regras para comissões/uso da arte', en: 'Rules for commissions/art usage' },
  'idx.footer': { pt: '© 2026 SafiraWolfFox — todos os direitos reservados', en: '© 2026 SafiraWolfFox — All rights reserved' },

  'nav.back': { pt: '← Voltar', en: '← Back' },
  'nav.top': { pt: 'Voltar ao topo', en: 'Back to top' },
  'nav.close': { pt: 'Fechar', en: 'Close' },

  'status.open': { pt: 'Comissões Abertas', en: 'Commissions Open' },
  'status.closed': { pt: 'Comissões Fechadas', en: 'Commissions Closed' },
  'egg.4': { pt: 'O que foi?', en: 'What?' },
  'egg.5': { pt: 'Quer comissionar?', en: 'Want to commission me?' },
  'egg.6': { pt: 'Brincadeirinha Haha!', en: 'Just kidding, haha!' },

  'com.title': { pt: 'Comissões e Preços — Safira Wolf Fox', en: 'Commissions & Prices — Safira Wolf Fox' },
  'com.h1': { pt: 'Comissões e Preços', en: 'Commissions & Prices' },

  'cat.chibi.title': { pt: '✦ Chibi', en: '✦ Chibi' },
  'cat.chibi.desc': { pt: '[Farei seu personagem em uma estetica reduzida e mais fofo , tentando manter aspectos gerais, porem de forma mais simplificada!]', en: "[I'll draw your character in a smaller, cuter style, keeping the general look but simplified!]" },
  'cat.chibi.price': { pt: 'A partir de R$ 50,00', en: 'Starting at $25' },

  'cat.icone.title': { pt: '✦ Icone/Busto', en: '✦ Icon/Bust' },
  'cat.icone.desc': { pt: '[Icone ou até abaixo da margem do busto com sombreado detalhado]', en: '[Icon or down to below the bust line, with detailed shading]' },
  'cat.icone.price': { pt: 'A partir de R$ 60,00', en: 'Starting at $30' },

  'cat.halfbody.title': { pt: '✦ Halfbody', en: '✦ Halfbody' },
  'cat.halfbody.desc': { pt: '[Meio corpo , até a cintura com sombreado detalhado!]', en: '[Half body, down to the waist, with detailed shading!]' },
  'cat.halfbody.price': { pt: 'A partir de R$ 80,00', en: 'Starting at $40' },

  'cat.fullbody.title': { pt: '✦ Fullbody', en: '✦ Fullbody' },
  'cat.fullbody.desc': { pt: '[Corpo todo e extras com sombreado detalhado!]', en: '[Full body plus extras, with detailed shading!]' },
  'cat.fullbody.price': { pt: 'A partir de R$ 100,00', en: 'Starting at $60' },

  'cat.referencia.title': { pt: '✦ Referência', en: '✦ Reference Sheet' },
  'cat.referencia.desc1': { pt: 'Esse estilo contém arte com linhas limpas e cor base, sem sombra/luz.', en: 'This style has clean line art with flat base colors, no shading or lighting.' },
  'cat.referencia.desc2': { pt: 'Inclui um fundo em gradiente. Um fundo simples ou com padrões pode ser adicionado por um valor extra.', en: 'Includes a gradient background. A simple or patterned background can be added for an extra fee.' },
  'cat.referencia.tier1.name': { pt: 'Simples', en: 'Simple' },
  'cat.referencia.tier1.price': { pt: 'R$ 80,00', en: '$40' },
  'cat.referencia.tier2.name': { pt: 'Padrão', en: 'Standard' },
  'cat.referencia.tier2.price': { pt: 'R$ 110,00', en: '$70' },

  'cat.quadrinhos.title': { pt: '✦ Quadrinhos', en: '✦ Comic Panels' },
  'cat.quadrinhos.desc': { pt: '[Uma página pode conter até 6 quadros, o valor varia dependendo da complexidade e quantidade de personagens e cenario!]', en: '[A page can have up to 6 panels; price varies depending on complexity and the number of characters/backgrounds!]' },
  'cat.quadrinhos.price': { pt: 'A partir de R$ 200,00', en: 'Starting at $120' },

  'cat.doodles.title': { pt: '✦ Pacote de Doodles', en: '✦ Doodle Pack' },
  'cat.doodles.desc': { pt: '[1 Fullbody + 1 halfbody +1 chibi]', en: '[1 Fullbody + 1 Halfbody + 1 Chibi]' },
  'cat.doodles.price': { pt: 'A partir de R$ 70,00', en: 'Starting at $50' },

  "cat.ych.title": { pt: "✦ YCH's em Rotação", en: "✦ Rotating YCH's" },
  'cat.ych.desc': { pt: '[Episódio da Praia de 1 a 4 Personagens]', en: '[Beach Episode, 1 to 4 characters]' },
  'cat.ych.price': { pt: 'A partir de R$ 25,00 até R$ 80,00', en: 'Starting at $5 up to $16' },

  'com.order.heading': { pt: '✦ Como encomendar', en: '✦ How to order' },
  'com.order.pay.title': { pt: 'Pagamento via Pix', en: 'Payment via PayPal' },
  'com.order.pay.desc': { pt: 'Chave enviada após confirmar seu pedido', en: 'Details sent once your order is confirmed' },
  'com.order.tg.title': { pt: 'Fale comigo no Telegram', en: 'Message me on Telegram' },
  'com.order.tg.desc': { pt: 'Clique para me mandar uma DM', en: 'Click to send me a DM' },

  'tos.title': { pt: 'Termos de Serviço — Safira Wolf Fox', en: 'Terms of Service — Safira Wolf Fox' },
  'tos.h1': { pt: 'Termos de Serviço', en: 'Terms of Service' },
  'tos.intro': { pt: 'Ao solicitar meus serviços de qualquer forma, você confirma que leu, compreendeu e concordou com os termos abaixo.', en: 'By requesting my services in any way, you confirm that you have read, understood and agreed to the terms below.' },

  'tos.h.precos': { pt: '✦ Preços', en: '✦ Prices' },
  'tos.precos.1': { pt: 'Os preços das comissões são apenas para uso pessoal, a menos que tenha sido previamente acordado de outra forma.', en: 'Commission prices are for personal use only, unless otherwise agreed in advance.' },
  'tos.precos.2': { pt: 'Os preços base são apenas uma referência; podem sofrer alterações devido a detalhes do personagem, fundo complexo, etc.', en: 'Base prices are just a reference; they may change depending on character details, complex backgrounds, etc.' },

  'tos.h.direitos': { pt: '✦ Direitos e uso da arte', en: '✦ Rights & art usage' },
  'tos.direitos.1': { pt: 'Reservo-me o direito sobre todas as minhas obras de arte. O trabalho será utilizado como amostra de comissão e será publicado online, a menos que tenha sido previamente acordado de outra forma.', en: 'I retain the rights to all of my artwork. The piece will be used as a commission sample and posted online, unless otherwise agreed in advance.' },
  'tos.direitos.2': { pt: 'Por favor, não utilize nenhuma das minhas obras como referência para IA nem para NFTs.', en: 'Please do not use any of my artwork as AI training reference or for NFTs.' },

  'tos.h.prazo': { pt: '✦ Prazo', en: '✦ Turnaround time' },
  'tos.prazo.1': { pt: 'Para garantir a melhor qualidade, levarei de 3 semanas a 2 meses para concluir sua comissão, dependendo da complexidade.', en: "To ensure the best quality, I'll take anywhere from 3 weeks to 2 months to finish your commission, depending on complexity." },
  'tos.prazo.2': { pt: 'Por favor, avise se houver um prazo a cumprir.', en: 'Please let me know in advance if you have a deadline to meet.' },

  'tos.h.antes': { pt: '✦ Antes de encomendar', en: '✦ Before ordering' },
  'tos.antes.1': { pt: 'Dê uma olhada nos meus trabalhos pra ver o que faço de melhor. Também posso recusar sua comissão se for muito difícil pra mim realizá-la.', en: "Take a look at my previous work to see what I do best. I may also decline a commission if it's too difficult for me to complete." },
  'tos.antes.2': { pt: 'Não desenho pessoas.', en: "I don't draw humans." },
  'tos.antes.3': { pt: 'Indique qual personagem você quer que eu desenhe e envie referências coloridas o mais detalhadas possível. Não aceito comissão apenas com texto.', en: "Please specify which character you want me to draw and send colored references, as detailed as possible. I don't accept commissions based on a text description alone." },

  'tos.h.processo': { pt: '✦ Durante o processo', en: '✦ During the process' },
  'tos.processo.1': { pt: 'Enviarei esboços pra você dar uma olhada antes.', en: "I'll send you sketches to review before continuing." },
  'tos.processo.2': { pt: 'Não altere personagens ou ideias após o término do processo de lineart.', en: "Please don't change characters or ideas after the lineart stage is finished." },

  'tos.h.pagamento': { pt: '✦ Pagamento e reembolso', en: '✦ Payment & refunds' },
  'tos.pagamento.1': { pt: 'Não ofereço reembolso para comissões concluídas ou depois de eu ter começado a trabalhar. Reembolsos totais só serão concedidos se eu ainda não tiver começado ou se não puder concluir a obra devido a circunstâncias pessoais.', en: "I don't offer refunds for completed commissions, or after I've already started working. Full refunds are only given if I haven't started yet, or if I'm unable to finish the piece due to personal circumstances." },
  'tos.pagamento.2': { pt: 'Não aceito criptomoedas como forma de pagamento.', en: "I don't accept cryptocurrency as a payment method." },
  'tos.pagamento.3': { pt: 'Clientes internacionais podem pagar via PayPal, com valores convertidos para dólar.', en: 'International clients can pay via PayPal, with prices converted to US dollars.' },
};

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-br';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const entry = I18N[el.getAttribute('data-i18n')];
    if (!entry) return;
    const text = entry[lang] || entry.pt;
    const attrList = el.getAttribute('data-i18n-attr');
    if (attrList) {
      attrList.split(',').forEach((attr) => el.setAttribute(attr.trim(), text));
    } else {
      el.textContent = text;
    }
  });

  // O texto do status (aberto/fechado) depende de qual classe está
  // ativa no badge — não dá pra usar uma chave fixa, porque você
  // pode trocar status-open/status-closed a qualquer momento.
  const statusLabel = document.getElementById('statusLabel');
  const statusBadge = document.getElementById('statusBadge');
  if (statusLabel && statusBadge) {
    const key = statusBadge.classList.contains('status-open') ? 'status.open' : 'status.closed';
    statusLabel.textContent = I18N[key][lang];
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  try { localStorage.setItem('siteLang', lang); } catch (err) { /* ignora */ }
}

document.addEventListener('DOMContentLoaded', () => {
  let lang = 'pt';
  try { lang = localStorage.getItem('siteLang') || 'pt'; } catch (err) { /* ignora */ }
  applyLang(lang);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
});

// ===== EASTER EGG: BOTÃO FUJÃO NO STATUS "FECHADAS" =====
// Só ativa se o badge estiver com a classe status-closed. Clique
// 4x: "O que foi?" / 5x: "Quer comissionar?" / 6x: "Brincadeirinha
// Haha!" e o botão passa a desviar do cursor pelo resto da visita.
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.getElementById('statusBadge');
  const label = document.getElementById('statusLabel');
  if (!badge || !label || !badge.classList.contains('status-closed')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const currentLang = () => document.documentElement.getAttribute('data-lang') || 'pt';
  const originalText = () => I18N['status.closed'][currentLang()];
  const messages = {
    4: () => I18N['egg.4'][currentLang()],
    5: () => I18N['egg.5'][currentLang()],
    6: () => I18N['egg.6'][currentLang()],
  };
  let clicks = 0;
  let labelTimer = null;
  let dodging = false;

  // Troca o texto do próprio badge (com uma piscadinha rápida) em
  // vez de abrir uma bolha de fala à parte. No 6º clique, o texto
  // fica em "Brincadeirinha Haha!" e não volta mais ao original.
  function rewriteLabel(text, revert) {
    label.style.opacity = '0';
    clearTimeout(labelTimer);
    labelTimer = setTimeout(() => {
      label.textContent = text;
      label.style.opacity = '1';
      if (revert) {
        labelTimer = setTimeout(() => {
          label.style.opacity = '0';
          setTimeout(() => {
            label.textContent = originalText();
            label.style.opacity = '1';
          }, 150);
        }, 2000);
      }
    }, 150);
  }

  function startDodging() {
    if (dodging || reduceMotion) return; // respeita "reduzir movimento"
    dodging = true;
    const rect = badge.getBoundingClientRect();
    badge.classList.add('dodging');
    badge.style.left = `${rect.left}px`;
    badge.style.top = `${rect.top}px`;

    document.addEventListener('mousemove', (e) => {
      const r = badge.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.hypot(dx, dy);
      const triggerDistance = 130;

      if (dist < triggerDistance) {
        const jump = 160;
        const margin = 16;
        const maxLeft = window.innerWidth - r.width - margin;
        const maxTop = window.innerHeight - r.height - margin;

        // Pequena aleatoriedade no ângulo pra não ficar sempre
        // quicando exatamente na mesma direção (evita ping-pong
        // previsível entre duas paredes).
        const jitter = (Math.random() - 0.5) * 0.6;
        let vx = Math.cos(Math.atan2(dy, dx) + jitter);
        let vy = Math.sin(Math.atan2(dy, dx) + jitter);

        // Se o pulo for bater numa borda, inverte a direção desse
        // eixo — ele "quica" pra longe da parede em vez de ficar
        // prensado nela, o que tornaria fácil de encurralar.
        if (r.left + vx * jump < margin || r.left + vx * jump > maxLeft) vx = -vx;
        if (r.top + vy * jump < margin || r.top + vy * jump > maxTop) vy = -vy;

        let newLeft = r.left + vx * jump;
        let newTop = r.top + vy * jump;
        newLeft = Math.min(Math.max(margin, newLeft), maxLeft);
        newTop = Math.min(Math.max(margin, newTop), maxTop);

        badge.style.left = `${newLeft}px`;
        badge.style.top = `${newTop}px`;
      }
    });
  }

  badge.addEventListener('click', () => {
    clicks += 1;

    if (clicks < 6) {
      if (messages[clicks]) rewriteLabel(messages[clicks](), true);
      return;
    }

    if (clicks === 6) {
      rewriteLabel(messages[6](), false);
      startDodging();
      return;
    }

    // Se a pessoa ainda assim conseguir clicar de novo (pegou o
    // botão fujão), prega a peça de verdade.
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noopener');
  });
});

// ===== BLOQUEIO CASUAL DE CÓPIA DE IMAGEM =====
// Impede o menu de botão direito ("salvar imagem como") e o
// arrastar de qualquer <img> da página. Junto com o CSS que tira a
// seleção de texto, isso cobre os jeitos mais comuns de copiar
// conteúdo casualmente — mas não é proteção real (print de tela,
// ferramentas de desenvolvedor etc. sempre contornam isso).
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

// ===== LIBERA A ANIMAÇÃO DE ENTRADA (fade-item) DEPOIS QUE ACABA =====
// Uma animação com "forwards" prende a propriedade transform no
// valor final pra sempre — o que impede outros efeitos (tipo o
// hover 3D da galeria) de mudar o transform depois. Assim que cada
// fade-item termina de animar, trocamos pra uma classe estática
// (fade-done) que solta o transform de volta pro controle normal.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-item').forEach((el) => {
    el.addEventListener('animationend', () => el.classList.add('fade-done'), { once: true });
  });
});

// ===== PLAYER DE ÁUDIO (trilha sonora opcional) =====
// 100% opt-in: nada toca sozinho. O botão de nota expande/recolhe
// o painel com a barra de progresso; o play/pause de dentro do
// painel controla a música sem fechar o painel. Recolher o painel
// (clicando de novo no botão de nota) só esconde a barra — não
// pausa a música, ela continua tocando se já estiver tocando.
document.addEventListener('DOMContentLoaded', () => {
  const musicToggle = document.getElementById('musicToggle');
  const musicPanel = document.getElementById('musicPanel');
  const musicPlay = document.getElementById('musicPlay');
  const progress = document.getElementById('musicProgress');
  const progressFill = document.getElementById('musicProgressFill');
  const audio = document.getElementById('bgAudio');
  if (!musicToggle || !audio) return;

  const STORAGE_KEY = 'sw_musicState';

  // Salva tempo atual, se está tocando, e se o painel está aberto —
  // assim a próxima página consegue continuar de onde parou.
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        time: audio.currentTime || 0,
        playing: !audio.paused,
        expanded: musicPanel.classList.contains('expanded'),
      }));
    } catch (err) { /* localStorage pode falhar em modo privado — ignora */ }
  }

  let hasError = false;
  audio.addEventListener('error', () => {
    hasError = true;
    musicToggle.title = 'Coloque o arquivo em audio/trilha.mp3';
    musicToggle.style.opacity = '0.5';
  });

  musicToggle.addEventListener('click', () => {
    if (hasError) return;
    const expanded = musicPanel.classList.toggle('expanded');
    if (expanded && audio.paused) {
      audio.play().catch(() => {});
    }
    saveState();
  });

  musicPlay.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });

  audio.addEventListener('play', () => { musicPlay.classList.add('is-playing'); saveState(); });
  audio.addEventListener('pause', () => { musicPlay.classList.remove('is-playing'); saveState(); });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    progressFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  });

  progress.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progress.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * audio.duration;
    saveState();
  });

  // Salva periodicamente enquanto toca, e também ao sair da página
  // (troca de página, fechar aba) — cobre o caso de o navegador não
  // disparar 'pause' a tempo antes de navegar.
  setInterval(saveState, 3000);
  window.addEventListener('pagehide', saveState);

  // ===== RETOMA DE ONDE PAROU =====
  // Lê o estado salvo pela página anterior e continua a música daqui.
  let saved = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (err) { /* ignora se não der pra ler */ }

  if (saved) {
    if (saved.expanded) musicPanel.classList.add('expanded');

    const applyTime = () => {
      if (saved.time) audio.currentTime = saved.time;
    };
    if (audio.readyState >= 1) applyTime();
    else audio.addEventListener('loadedmetadata', applyTime, { once: true });

    if (saved.playing) {
      audio.play().catch(() => {
        // Navegadores bloqueiam autoplay sem gesto do usuário nessa
        // página nova — deixa o painel aberto, pausado, pronto pra
        // retomar com 1 clique.
        musicPanel.classList.add('expanded');
      });
    }
  }
});

// ===== BOTÃO DE MODO CLARO/ESCURO =====
// A leitura do tema salvo já acontece antes, num script inline no
// <head> de cada página (evita o "flash" da cor errada). Aqui só
// cuidamos do clique no botão pra trocar e salvar a preferência.
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
});

// ===== TRANSIÇÃO (FADE) ENTRE PÁGINAS =====
// Ao carregar, o body fica visível com um fade suave. Ao clicar num
// link interno (mesma origem, sem target="_blank", sem "#"), a
// página atual esmaece antes de navegar pra próxima.
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-fade');
  requestAnimationFrame(() => document.body.classList.add('page-in'));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    const isInternal =
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      link.target !== '_blank';

    if (!isInternal) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (reduceMotion) {
        window.location.href = href;
        return;
      }
      document.body.classList.remove('page-in');
      document.body.classList.add('page-out');
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });
});

// ===== CORREÇÃO DO BOTÃO VOLTAR NO CELULAR (bfcache) =====
// Ao voltar pela seta do navegador, o celular costuma restaurar a
// página exatamente como ela ficou "congelada" ao sair — nesse
// caso, com a classe "page-out" (invisível), porque o clique de
// saída já tinha rodado antes de você navegar. Como isso é uma
// restauração de cache, o DOMContentLoaded acima não dispara de
// novo pra corrigir. O evento "pageshow" dispara nos dois casos
// (carregamento normal E restauração), com event.persisted=true só
// na restauração — é aí que garantimos que o body volte a aparecer.
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.remove('page-out');
    document.body.classList.add('page-in');

    // Mesmo motivo do fade: a página restaurada do cache pode não
    // refletir o idioma mais atual salvo no localStorage (ex: se
    // foi trocado em outra aba, ou o "instantâneo" congelado ficou
    // desatualizado por algum motivo). Reaplica pra garantir.
    let lang = 'pt';
    try { lang = localStorage.getItem('siteLang') || 'pt'; } catch (err) { /* ignora */ }
    applyLang(lang);
  }
});

// Lightbox da galeria de comissões: clique numa imagem pra abrir
// em tela cheia, feche clicando no X ou fora da imagem.
// Não faz nada em páginas que não têm galeria (como a inicial).
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return; // página sem galeria/lightbox — não faz nada

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery-item img').forEach((img) => {
    // ignora os placeholders (imagens ainda não adicionadas)
    if (img.classList.contains('img-missing')) return;
    img.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
  });

  closeBtn.addEventListener('click', closeLightbox);

  // fecha ao clicar fora da imagem (no fundo escuro)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // fecha com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
});

// ===== SKELETON LOADING =====
// Tira o "brilho passando" (classe is-loading) assim que a imagem
// termina de carregar — ou falha, nesse caso ela vira o placeholder
// de sempre (img-missing) em vez de ficar brilhando pra sempre.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-item').forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;

    const markLoaded = () => {
      img.classList.add('loaded');
      item.classList.remove('is-loading');
    };

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', () => item.classList.remove('is-loading'));
    }
  });
});

// ===== HOVER 3D NA GALERIA =====
// A caixa da imagem se inclina seguindo a posição do mouse.
// Desativado se a pessoa tiver "reduzir movimento" ativado no sistema.
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 12;
      const rotateX = (0.5 - py) * 12;
      item.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
});

// ===== EASTER EGG: CORAÇÕES AO CLICAR NO PERSONAGEM =====
// Só existe na página inicial (.hero-img). Cada clique solta um
// coraçãozinho que sobe e desaparece — decorativo, sem função real.
document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.querySelector('.hero-img');
  const hero = document.querySelector('.hero');
  if (!heroImg || !hero) return;

  const DISINTEGRATE_AT = 12; // cliques até o "estalo"
  let clickCount = 0;
  let gone = false;

  heroImg.addEventListener('click', (e) => {
    if (gone) return;

    const rect = hero.getBoundingClientRect();
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '💗';
    heart.style.left = `${e.clientX - rect.left}px`;
    heart.style.top = `${e.clientY - rect.top}px`;
    heart.style.setProperty('--drift', `${Math.random() * 50 - 25}px`);
    hero.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());

    clickCount += 1;
    if (clickCount >= DISINTEGRATE_AT) {
      gone = true;
      disintegrate(heroImg, hero);
    }
  });
});

// Fatia a imagem numa grade de pedacinhos (cada um mostrando só o
// seu recorte da própria imagem via background-position) e anima
// cada um voando pra longe e sumindo, tipo poeira ao vento — dá o
// efeito do estalo sem precisar de canvas nem de outro arquivo.
function disintegrate(img, hero) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const w = img.offsetWidth;
  const h = img.offsetHeight;

  if (reduceMotion || !w || !h) {
    img.style.transition = 'opacity 0.6s ease';
    img.style.opacity = '0';
    return;
  }

  const cols = 20;
  const rows = 20;
  const cellW = w / cols;
  const cellH = h / rows;

  const container = document.createElement('div');
  container.className = 'dust-container';
  container.style.left = `${img.offsetLeft}px`;
  container.style.top = `${img.offsetTop}px`;
  container.style.width = `${w}px`;
  container.style.height = `${h}px`;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('span');
      cell.className = 'dust-cell';
      cell.style.left = `${col * cellW}px`;
      cell.style.top = `${row * cellH}px`;
      cell.style.width = `${cellW}px`;
      cell.style.height = `${cellH}px`;
      cell.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
      cell.style.backgroundSize = `${w}px ${h}px`;
      cell.style.backgroundPosition = `-${col * cellW}px -${row * cellH}px`;

      const dx = 30 + Math.random() * 150;       // deriva pra direita
      const dy = -(30 + Math.random() * 170);    // deriva pra cima
      const rot = Math.random() * 120 - 60;
      // colunas mais à esquerda somem primeiro, criando o efeito de
      // "varredura" — igual ao estalo, que começa de um lado
      const sweepDelay = (col / cols) * 0.5 + Math.random() * 0.25;

      cell.style.setProperty('--dx', `${dx}px`);
      cell.style.setProperty('--dy', `${dy}px`);
      cell.style.setProperty('--rot', `${rot}deg`);
      cell.style.animationDelay = `${sweepDelay}s`;

      container.appendChild(cell);
    }
  }

  hero.appendChild(container);
  img.style.opacity = '0'; // a poeira já cobre o mesmo espaço da imagem original

  setTimeout(() => container.remove(), 2200);
}

// ===== BOTÃO VOLTAR AO TOPO =====
// Aparece depois de rolar um pouco a página (só existe nas páginas
// que têm o botão no HTML — Comissões e TOS, que são mais longas).
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toggleVisible = () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', toggleVisible, { passive: true });
  toggleVisible();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});
