const MATCHED_CLASS = 'matched';
const FLIPPED_CLASS = 'flipped';
const SHOW_CARD_INTERVAL = 1500;
let firstCardNode = null;
let firstCardName = null;
let clicksAreBlocked = false;
let flipTimeoutId = null;

const resetGameState = () => {
  firstCardNode = null;
  firstCardName = null;
  clicksAreBlocked = false;
  clearTimeout(flipTimeoutId);
};

const handleCurrentCard = (cardNode) => {
  const currentCardName = cardNode.dataset.card;

  cardNode.classList.add(FLIPPED_CLASS);

  if (!firstCardNode) {
    firstCardNode = cardNode;
    firstCardName = currentCardName;
    return;
  }

  const isMatched = currentCardName === firstCardName;

  clicksAreBlocked = true;

  if (isMatched) {
    cardNode.classList.add(MATCHED_CLASS);
    firstCardNode.classList.add(MATCHED_CLASS);
    resetGameState();
  } else {
    flipTimeoutId = setTimeout(() => {
      handleFlipCards([firstCardNode, cardNode]);
      resetGameState();
    }, SHOW_CARD_INTERVAL);
  }
};

const handleCardsListNodeClick = (evt) => {
  if (clicksAreBlocked) {
    return;
  }

  const cardNode = evt.target.closest('.card');

  if (!cardNode || cardNode.classList.contains(FLIPPED_CLASS) || cardNode.classList.contains(MATCHED_CLASS)) {
    return;
  }

  handleCurrentCard(cardNode);
};

const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

const flipCards = (cardNodes, resetAll = false) => {
  cardNodes.forEach((card) => {
    card.classList.remove(FLIPPED_CLASS);

    if (resetAll) {
      card.classList.remove(MATCHED_CLASS);
    }
  });
};

const handleFlipCards = (cardNodes) => {
  if (!cardNodes) {
    const allCardNodes = document.querySelectorAll('.card');
    flipCards(allCardNodes, true);
    return;
  }

  flipCards(cardNodes);
};

const startGame = (cardsListNode, cardNodes) => {
  resetGameState();

  handleFlipCards();
  shuffleCards(cardNodes);

  cardsListNode.append(...cardNodes);
};

const initGame = (root) => {
  const cardsListNode = root.querySelector('.js-cards-list');
  const cardNodes = cardsListNode && [...cardsListNode.querySelectorAll('.card')];

  if (!cardsListNode || !cardNodes.length) {
    return;
  }

  cardsListNode.addEventListener('click', handleCardsListNodeClick);

  startGame(cardsListNode, cardNodes);
};

export {initGame};
