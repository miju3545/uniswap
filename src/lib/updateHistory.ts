const KEY = 'token_history';

export const updateHistory = (history: string[]) => {
  localStorage.setItem(KEY, JSON.stringify(history));
};

const getHistory = (): string | null => {
  return localStorage.getItem(KEY);
};

export const manageHistory = (defaultHistory: string[]) => {
  if (!getHistory()) updateHistory(defaultHistory);

  return JSON.parse(getHistory() ?? '[]');
};
