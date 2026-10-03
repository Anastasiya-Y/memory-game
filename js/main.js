/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./source/js/utils.js
const isEscapeKey = (evt) => evt.key === 'Escape';

const createNode = (tag, text, classNames = [], attributes = {}) => {
  const node = document.createElement(tag);

  if (text !== null) {
    node.textContent = text;
  }

  classNames.forEach((className) => {
    node.classList.add(className);
  });

  for (const [name, value] of Object.entries(attributes)) {
    if (value !== null) {
      node.setAttribute(name, value);
    }
  }

  return node;
};



;// ./source/js/data/cards.js
const cards = ['cranberry.jpg', 'espresso.jpg', 'ginger.jpg', 'honey-raf.jpg', 'ice-cappuccino.jpg', 'irish-coffee.jpg', 'latte.jpg', 'sea-buckthorn.jpg'];



;// ./source/js/modules/init-modal.js
const closeModal = () => {
  const activeModalNode = document.querySelector('.modal.is-open');

  if (activeModalNode) {
    activeModalNode.classList.remove('is-open');
  }
};

const createWinModalNode = (callback, modalContentNode, modalBtnsWrapperNode) => {
  const modalTitle = callback('span', 'Congratulations!', ['modal__title']);
  const modalText = callback('p', 'You found all the pairs in 0 moves!', ['modal__text']);
  const modalNewGameBtnNode = callback('button', 'New game', ['modal__button']);

  modalNewGameBtnNode.addEventListener('click', () => {
    const newGameBtnNode = document.querySelector('.js-new-game');

    if (newGameBtnNode) {
      newGameBtnNode.click();
      closeModal();
    }
  });

  modalContentNode.append(modalTitle, modalText);
  modalBtnsWrapperNode.append(modalNewGameBtnNode);
};

const createLeaderboardModal = (callback, modalContentNode) => {
  const modalTitle = callback('span', 'Leaderboard', ['modal__title']);

  const tableNode = callback('table', '', ['leaderboard']);
  const theadNode = callback('thead', '', ['leaderboard__head']);
  const headRowNode = callback('tr', '', ['leaderboard__row']);

  const thPlaceNode = callback('th', 'Place', ['leaderboard__cell', 'leaderboard__cell--head']);
  const thMovesNode = callback('th', 'Moves', ['leaderboard__cell', 'leaderboard__cell--head']);
  const thDateNode = callback('th', 'Date', ['leaderboard__cell', 'leaderboard__cell--head']);

  headRowNode.append(thPlaceNode, thMovesNode, thDateNode);
  theadNode.append(headRowNode);

  const tbodyNode = callback('tbody', '', ['leaderboard__body', 'js-leaderboard-body']);

  tableNode.append(theadNode, tbodyNode);

  modalContentNode.append(modalTitle, tableNode);
};

const createModalNode = (callback, flag) => {
  const modalNode = callback('div', '', ['modal', `modal__${flag}`]);
  const modalWrapperNode = callback('div', '', ['modal__wrapper']);
  const modalContentNode = callback('div', '', ['modal__content']);
  const modalBtnsWrapperNode = callback('div', '', ['modal__buttons']);
  const modalCloseNode = callback('button', 'Close', ['modal__close']);

  if (flag === 'win') {
    createWinModalNode(callback, modalContentNode, modalBtnsWrapperNode);
  } else if (flag === 'leaderboard') {
    createLeaderboardModal(callback, modalContentNode);
  }

  modalBtnsWrapperNode.append(modalCloseNode);
  modalContentNode.append(modalBtnsWrapperNode);
  modalWrapperNode.append(modalContentNode);
  modalNode.append(modalWrapperNode);

  return modalNode;
};



;// ./source/js/modules/init-layout.js





const MODAL_SELECTOR = '.modal';
const CLOSE_BTN_SELECTOR = '.modal__close';
const WRAPPER_SELECTOR = '.modal__wrapper';
const CONTENT_SELECTOR = '.modal__content';

const createHeader = () => {
  const headerNode = createNode('header', '', ['game__header', 'header']);

  const newGameBtnNode = createNode('button', 'new game', ['game__button', 'button', 'js-new-game'], {'type': 'button'});
  const leaderboardNode = createNode('button', 'leaderboard', ['game__button', 'button', 'js-leaderboard'], {'type': 'button'});

  headerNode.append(newGameBtnNode, leaderboardNode);

  return headerNode;
};

const handleImgName = (str) => str.split('.')[0].replace(/-/g, ' ');

const createCard = (item) => {
  const cardValue = handleImgName(item);

  const cardNode = createNode('div', '', ['game__card', 'card'], {'data-card': cardValue});

  const cardContentNode = createNode('div', '', ['card__content']);

  const cardFrontNode = createNode('div', '', ['card__front']);
  const cardBackNode = createNode('div', '', ['card__back']);

  const imgNode = createNode('img', '', ['card__img'], {'src': `img/${item}`, 'alt': cardValue});
  cardBackNode.append(imgNode);

  cardContentNode.append(cardFrontNode, cardBackNode);
  cardNode.append(cardContentNode);

  return cardNode;
};

const createCounterNode = (text, specialClass) => {
  const isPairsNode = text.includes('pairs');
  const counterWrapperNode = createNode('div', '', ['counter']);

  const infoNode = createNode('span', text, ['counter__info']);
  const countNode = createNode('span', isPairsNode ? '0/8' : '0', ['counter__number', `${specialClass}`]);

  counterWrapperNode.append(infoNode, countNode);

  return counterWrapperNode;
};

const createMainLayout = () => {
  const mainNode = createNode('main', '', ['game__main']);
  const titleNode = createNode('h1', 'Memory game', ['game__title']);

  const gridNode = createNode('div', '', ['game__cards-list', 'cards-list', 'js-cards-list']);

  cards.forEach((item) => {
    const cardNode = createCard(item);
    const clone = cardNode.cloneNode(true);

    gridNode.append(cardNode, clone);
  });

  const countersNode = createNode('div', '', ['game__counters', 'counters']);
  const movesNode = createCounterNode('moves:', 'js-moves-counter');
  const pairsNode = createCounterNode('pairs:', 'js-pairs-counter');

  countersNode.append(movesNode, pairsNode);

  mainNode.append(titleNode, gridNode, countersNode);

  return mainNode;
};

const createFooter = () => {
  const footerNode = createNode('footer', '', ['footer']);

  const linkNode = createNode('a', 'GitHub', ['footer__link'], {'href': 'https://github.com/Anastasiya-Y/', 'target': '_blank', 'title': 'Github link'});
  const yearNode = createNode('span', '2026', ['footer__info']);

  footerNode.append(linkNode, yearNode);

  return footerNode;
};

const handleEscape = (evt) => {
  const isEscapeKeyBtn = !isEscapeKey(evt);

  if (isEscapeKeyBtn) {
    return;
  }

  closeModal();
};

const handleModalClick = (evt) => {
  const modalNode = evt.target.closest(MODAL_SELECTOR);

  if (!modalNode) {
    return;
  }

  const isCloseBtn = evt.target.closest(CLOSE_BTN_SELECTOR);
  const isWrapper = evt.target.closest(WRAPPER_SELECTOR);
  const isContent = evt.target.closest(CONTENT_SELECTOR);

  if (isCloseBtn || (isWrapper && !isContent)) {
    closeModal();
  }
};

const addBodyEventListeners = () => {
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleModalClick);
};

const initLayout = () => {
  const containerNode = createNode('div', '', ['container']);
  const wrapperNode = createNode('div', '', ['game']);

  const headerNode = createHeader();
  const mainNode = createMainLayout();
  const footerNode = createFooter();

  wrapperNode.append(headerNode, mainNode, footerNode);

  const modalWinNode = createModalNode(createNode, 'win');
  const modalLeaderBoardNode = createModalNode(createNode, 'leaderboard');

  containerNode.append(wrapperNode, modalWinNode, modalLeaderBoardNode);
  document.body.append(containerNode);

  addBodyEventListeners();

  return containerNode;
};



;// ./source/js/modules/init-counters.js
const COUNT_STEP = 1;

let moves = 0;
let pairs = 0;

const resetCounters = () => {
  moves = 0;
  pairs = 0;
};

const increaseMovesCount = () => {
  return (moves += COUNT_STEP);
};

const increasePairsCount = () => {
  return (pairs += COUNT_STEP);
};

const getCounterCount = () => {
  return {moves, pairs};
};



;// ./source/js/modules/init-leaderboard.js
const STORAGE_KEY = 'memory-game-results';
const MAX_RESULTS_QUANTITY = 10;

const getResults = () => {
  const storageArr = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return storageArr || [];
};

const saveResults = (results) => localStorage.setItem(STORAGE_KEY, JSON.stringify(results));

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const sortResults = (results) => {
  const sortedResults = [...results];
  sortedResults.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }

    return a.timestamp - b.timestamp;
  });

  return sortedResults;
};

const addResult = (moves) => {
  const result = {moves, timestamp: Date.now(), date: formatDate(new Date()),
  };

  const all = [...getResults(), result];
  const top = sortResults(all).slice(0, MAX_RESULTS_QUANTITY);

  saveResults(top);

  return top;
};



;// ./source/js/modules/init-game.js




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



;// ./source/js/index.js




document.addEventListener('DOMContentLoaded', () => {
  const root = initLayout();
  initGame(root);
});

/******/ })()
;
//# sourceMappingURL=main.js.map