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
        const angle = Math.atan2(dy, dx);
        const jump = 160;
        const margin = 16;
        let newLeft = r.left + Math.cos(angle) * jump;
        let newTop = r.top + Math.sin(angle) * jump;
        newLeft = Math.min(Math.max(margin, newLeft), window.innerWidth - r.width - margin);
        newTop = Math.min(Math.max(margin, newTop), window.innerHeight - r.height - margin);
        badge.style.left = `${newLeft}px`;
        badge.style.top = `${newTop}px`;
      }
    });
  }

  badge.addEventListener('click', () => {
    clicks += 1;
    if (messages[clicks]) rewriteLabel(messages[clicks], clicks !== 6);
    if (clicks === 6) startDodging();
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

  heroImg.addEventListener('click', (e) => {
    const rect = hero.getBoundingClientRect();
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '💗';
    heart.style.left = `${e.clientX - rect.left}px`;
    heart.style.top = `${e.clientY - rect.top}px`;
    heart.style.setProperty('--drift', `${Math.random() * 50 - 25}px`);
    hero.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  });
});

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
