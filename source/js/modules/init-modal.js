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

export {createModalNode, closeModal};
