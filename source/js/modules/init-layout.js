
import {isEscapeKey, createNode} from '../utils.js';
import {cards} from '../data/cards.js';
import {createModalNode, closeModal} from './init-modal.js';

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

export {initLayout};
