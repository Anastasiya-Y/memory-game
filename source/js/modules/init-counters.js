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

export {resetCounters, increaseMovesCount, increasePairsCount, getCounterCount};
