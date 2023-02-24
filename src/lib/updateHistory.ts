const KEY = 'token_history';

export const updateHistory = (history: string[]) => {
  localStorage.setItem(KEY, JSON.stringify(history));
};

export const getHistory = (() => {
  let history = localStorage.getItem(KEY);

  return (defaultHistory: string[]) => {
    if (!history) updateHistory(defaultHistory);
    return JSON.parse(history ?? '[]');
  };
})();
