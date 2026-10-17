/*
  ===== ADORNOS E DATAS DAS ESTAÇÕES =====
  Esse arquivo é o único que você precisa editar pra:
    1) mudar as DATAS do Halloween e do Natal no site
    2) adicionar enfeites (PNG) em cima de botões, do personagem, etc.


  ---------- 1) DATAS DAS ESTAÇÕES ----------
  Formato "MM-DD" (mês-dia). Valem pro banner de festa do topo, pra
  cor das partículas e pra qualquer adorno que use  season: '...'
  Pode virar o ano (ex: Natal de 11-01 até 01-05).
  Atenção: se as duas estações se sobrepuserem, o Halloween ganha.
*/
window.SITE_SEASONS = {
  halloween: { start: '10-20', end: '10-31' },
  christmas: { start: '11-01', end: '01-05' },
};

/*
  ---------- 2) ADORNOS ----------
  COMO ADICIONAR UM ADORNO NOVO:
  1. Coloque o arquivo PNG (fundo transparente) dentro de
     img/decorations/ — pode dar qualquer nome.
  2. Copie um dos blocos { ... } abaixo, cole na lista, e ajuste:
       - image:    caminho do arquivo que você colocou
       - target:   qual elemento recebe o adorno (veja a lista abaixo)
       - position: "top-right", "top-left", "bottom-right",
                   "bottom-left"  → enfeite no canto do alvo
                   "behind"       → centralizado ATRÁS do alvo (ex:
                                    guirlanda em volta do personagem)
       - size:     nos cantos: largura em pixels.
                   em "behind": largura em % da largura do alvo
                   (150 = uma vez e meia o tamanho do alvo)
       - season:   (opcional) 'christmas' ou 'halloween' — o adorno só
                   aparece nas datas dessa estação (lá em cima)
       - start / end: (opcional) período próprio, "MM-DD". Só use se
                   não usar "season". Sem datas = sempre ativo.

  ALVOS PRONTOS (o que colocar em "target"):
    '.hero-img-stage'     → o personagem da home (e da página 404)
    '#linkCardComissoes'  → botão "Comissões e preços" (home)
    '#linkCardTos'        → botão "Termos de Uso (TOS)" (home)
    '#statusBadge'        → o badge de comissões abertas/fechadas
    '.music-toggle'       → o botãozinho de nota musical
    '.theme-toggle'       → o botão de sol/lua (tema)
  Pode usar qualquer seletor CSS válido (ex: '.gallery-item' decora
  TODAS as imagens da galeria de uma vez).
*/
window.SITE_DECORATIONS = [

  // Guirlanda de Natal atrás do personagem — aparece só nas datas do
  // Natal (lá em cima). Pra desligar, apague ou comente o bloco.
  {
    id: 'natal-guirlanda',
    image: 'img/decorations/guirlanda-natal.png',
    target: '.hero-img-stage',
    position: 'behind',
    size: 190,
    season: 'christmas',
  },

  // Exemplo funcionando — pode apagar quando quiser.
  {
    id: 'exemplo-estrela',
    image: 'img/decorations/exemplo-estrela.png',
    target: '#linkCardComissoes',
    position: 'top-right',
    size: 40,
    // sem datas = fica sempre ativo
  },

  // Exemplo de adorno SAZONAL num canto — troque a imagem e
  // descomente pra usar.
  // {
  //   id: 'halloween-abobora',
  //   image: 'img/decorations/abobora.png',
  //   target: '#linkCardTos',
  //   position: 'top-left',
  //   size: 44,
  //   season: 'halloween',
  // },

];
