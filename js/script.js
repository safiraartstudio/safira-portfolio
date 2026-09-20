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
