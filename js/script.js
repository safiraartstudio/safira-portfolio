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
