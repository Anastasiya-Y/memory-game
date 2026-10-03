import {resetCounters, increaseMovesCount, increasePairsCount, getCounterCount} from './init-counters.js';

const MATCHED_CLASS = 'matched';
const FLIPPED_CLASS = 'flipped';
const MAX_PAIRS_COUNT = 8;
const SHOW_CARD_INTERVAL = 1500;
let movesCounterNode = null;
let pairsCounterNode = null;
let firstCardNode = null;
let firstCardName = null;
let clicksAreBlocked = false;
let flipTimeoutId = null;

const resetCountersLayout = () => {
  movesCounterNode.textContent = '0';
  pairsCounterNode.textContent = '0';
};

const updateCounterLayout = (counterName) => {
  const isPairsNode = counterName === 'pairs';
  const counterNode = isPairsNode ? pairsCounterNode : movesCounterNode;
  const text = getCounterCount()[counterName];

  counterNode.textContent = isPairsNode ? `${text}/${MAX_PAIRS_COUNT}` : text;
};

const resetGameState = () => {
  firstCardNode = null;
  firstCardName = null;
  clicksAreBlocked = false;

  if (flipTimeoutId) {
    clearTimeout(flipTimeoutId);
    flipTimeoutId = null;
  }
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
    increasePairsCount();
    updateCounterLayout('pairs');
  } else {
    flipTimeoutId = setTimeout(() => {
      handleFlipCards([firstCardNode, cardNode]);
      resetGameState();
    }, SHOW_CARD_INTERVAL);
  }

  increaseMovesCount();
  updateCounterLayout('moves');
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

const resetLayout = (cardsListNode, cardNodes) => {
  resetCountersLayout();

  handleFlipCards();
  shuffleCards(cardNodes);

  cardsListNode.append(...cardNodes);
};

const startGame = (cardsListNode, cardNodes) => {
  resetGameState();
  resetCounters();
  resetLayout(cardsListNode, cardNodes);
};

const initGame = (root) => {
  const cardsListNode = root.querySelector('.js-cards-list');
  const cardNodes = cardsListNode && [...cardsListNode.querySelectorAll('.card')];
  const newGameBtnNode = root.querySelector('.js-new-game');
  movesCounterNode = root.querySelector('.js-moves-counter');
  pairsCounterNode = root.querySelector('.js-pairs-counter');

  if (!cardsListNode || !cardNodes.length || !movesCounterNode || !pairsCounterNode || !newGameBtnNode) {
    return;
  }

  cardsListNode.addEventListener('click', handleCardsListNodeClick);
  newGameBtnNode.addEventListener('click', () => startGame(cardsListNode, cardNodes));

  startGame(cardsListNode, cardNodes);
};

export {initGame};
