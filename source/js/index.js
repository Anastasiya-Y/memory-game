import '../sass/style.scss';
import {initLayout} from './modules/init-layout';
import {initGame} from './modules/init-game';

document.addEventListener('DOMContentLoaded', () => {
  const root = initLayout();
  initGame(root);
});
