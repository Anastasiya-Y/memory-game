import {createNode} from '../utils.js';
import {resetCounters, increaseMovesCount, increasePairsCount, getCounterCount} from './init-counters.js';
import {addResult, getResults} from './init-leaderboard.js';

const MATCHED_CLASS = 'matched';
const FLIPPED_CLASS = 'flipped';
const MODAL_OPEN_CLASS = 'is-open';
const MAX_PAIRS_COUNT = 8;
const SHOW_CARD_INTERVAL = 1500;
const EMPTY_RESULTS_TEXT = 'No results found';
const LEADERBOARD_COLUMNS_COUNT = 3;

let movesCounterNode = null;
let pairsCounterNode = null;
let leaderboardModalNode = null;
let leaderboardBodyNode = null;
let leaderboardBtnNode = null;
let winModalNode = null;
let winTextNode = null;
let firstCardNode = null;
let firstCardName = null;
let clicksAreBlocked = false;
let flipTimeoutId = null;
let isGameFinished = false;

const resetCountersLayout = () => {
  movesCounterNode.textContent = '0';
  pairsCounterNode.textContent = `0/${MAX_PAIRS_COUNT}`;
};

const updateCounterLayout = (counterName) => {
  const isPairsNode = counterName === 'pairs';
  const counterNode = isPairsNode ? pairsCounterNode : movesCounterNode;
  const text = getCounterCount()[counterName];

  counterNode.textContent = isPairsNode ? `${text}/${MAX_PAIRS_COUNT}` : text;
};

const createLeaderboardRow = (place, moves, date) => {
  const rowNode = createNode('tr', '', ['leaderboard__row']);

  const placeNode = createNode('td', place, ['leaderboard__cell']);
  const movesNode = createNode('td', moves, ['leaderboard__cell']);
  const dateNode = createNode('td', date, ['leaderboard__cell']);

  rowNode.append(placeNode, movesNode, dateNode);

  return rowNode;
};

const createLeaderboardEmptyRow = () => {
  const rowNode = createNode('tr');
  const cellNode = createNode('td', EMPTY_RESULTS_TEXT, ['leaderboard__cell', 'leaderboard__empty'], {'colspan': LEADERBOARD_COLUMNS_COUNT});

  rowNode.append(cellNode);

  return rowNode;
};

const renderLeaderboardRows = () => {
  if (!leaderboardBodyNode) {
    return;
  }

  leaderboardBodyNode.replaceChildren();

  const results = getResults();

  if (!results.length) {
    leaderboardBodyNode.append(createLeaderboardEmptyRow());
    return;
  }

  results.forEach((result, index) => {
    const rowNode = createLeaderboardRow(index + 1, result.moves, result.date);
    leaderboardBodyNode.append(rowNode);
  });
};

const openLeaderboardModal = () => {
  if (!leaderboardModalNode) {
    return;
  }

  renderLeaderboardRows();
  leaderboardModalNode.classList.add(MODAL_OPEN_CLASS);
};

const showWinModal = (moves) => {
  if (!winModalNode || !winTextNode) {
    return;
  }

  winTextNode.textContent = `You found all the pairs in ${moves} moves!`;
  winModalNode.classList.add(MODAL_OPEN_CLASS);
};

const handleWin = () => {
  isGameFinished = true;
  const {moves} = getCounterCount();

  addResult(moves);
  showWinModal(moves);
};

const checkWin = () => {
  const allCardNodes = [...document.querySelectorAll('.card')];
  const isWin = allCardNodes.every((card) => card.classList.contains(MATCHED_CLASS));

  if (isWin) {
    handleWin();
  }
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

  if (isMatched) {
    checkWin();
  }
};

const handleCardsListNodeClick = (evt) => {
  if (clicksAreBlocked || isGameFinished) {
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
  isGameFinished = false;
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
  winModalNode = root.querySelector('.modal__win');
  winTextNode = winModalNode && winModalNode.querySelector('.modal__text');
  leaderboardModalNode = root.querySelector('.modal__leaderboard');
  leaderboardBodyNode = leaderboardModalNode && leaderboardModalNode.querySelector('.js-leaderboard-body');
  leaderboardBtnNode = root.querySelector('.js-leaderboard');

  if (!cardsListNode || !cardNodes.length || !movesCounterNode || !pairsCounterNode || !newGameBtnNode || !leaderboardBtnNode) {
    return;
  }

  cardsListNode.addEventListener('click', handleCardsListNodeClick);
  newGameBtnNode.addEventListener('click', () => startGame(cardsListNode, cardNodes));
  leaderboardBtnNode.addEventListener('click', openLeaderboardModal);

  startGame(cardsListNode, cardNodes);
};

export {initGame};
