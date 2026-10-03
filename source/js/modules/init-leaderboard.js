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

export {getResults, addResult};
