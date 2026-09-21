// ===== EASTER EGG: BOTÃO FUJÃO NO STATUS "FECHADAS" =====
// Só ativa se o badge estiver com a classe status-closed. Clique
// 4x: "O que foi?" / 5x: "Quer comissionar?" / 6x: "Brincadeirinha
// Haha!" e o botão passa a desviar do cursor pelo resto da visita.
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.getElementById('statusBadge');
  const label = document.getElementById('statusLabel');
  if (!badge || !label || !badge.classList.contains('status-closed')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalText = label.textContent;
  const messages = { 4: 'O que foi?', 5: 'Quer comissionar?', 6: 'Brincadeirinha Haha!' };
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
            label.textContent = originalText;
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
      if (messages[clicks]) rewriteLabel(messages[clicks], true);
      return;
    }

    if (clicks === 6) {
      rewriteLabel(messages[6], false);
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
