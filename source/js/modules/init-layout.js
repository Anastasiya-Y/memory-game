
import {createNode} from '../utils.js';

const createHeader = () => {
  const headerNode = createNode('header', '', ['game__header', 'header']);

  const newGameBtnNode = createNode('button', 'new game', ['game__button', 'button', 'js-new-game'], [{type: 'button'}]);
  const leaderboardNode = createNode('button', 'leaderboard', ['game__button', 'button', 'js-leaderboard'], [{type: 'button'}]);

  headerNode.append(newGameBtnNode, leaderboardNode);

  return headerNode;
};

const createMainLayout = () => {
  const mainNode = createNode('main', '', ['game__main']);

  const gridNode = createNode('div', '', ['game__cards-list']);

  mainNode.append(gridNode);

  return mainNode;
};

const createCounterNode = (text, specialClass) => {
  const counterWrapperNode = createNode('div', '', ['counter']);

  const infoNode = createNode('span', text, ['counter__info']);
  const countNode = createNode('span', '0', ['counter__number', `${specialClass}`]);

  counterWrapperNode.append(infoNode, countNode);

  return counterWrapperNode;
};

const createFooter = () => {
  const footerNode = createNode('footer', '', ['footer']);

  const movesNode = createCounterNode('moves:', 'js-moves-counter');
  const pairsNode = createCounterNode('pairs:', 'js-pairs-counter');

  footerNode.append(movesNode, pairsNode);

  return footerNode;
};

const initLayout = () => {
  const wrapperNode = createNode('div', '', ['game']);

  const headerNode = createHeader();
  const mainNode = createMainLayout();
  const footerNode = createFooter();

  wrapperNode.append(headerNode, mainNode, footerNode);

  document.body.append(wrapperNode);
};

export {initLayout};
