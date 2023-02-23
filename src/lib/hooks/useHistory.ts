import { useEffect, useState } from 'react';

const KEY = 'token_history';

export const useTokenHistory = (): {
  history: string[];
  saveHistory: (tokenName: string) => void;
  clearHistory: () => void;
} => {
  const [history, setHistory] = useState<string[]>([]);

  const saveHistory = (tokenName: string) => {
    localStorage.setItem(KEY, JSON.stringify(history) + tokenName);
  };

  const clearHistory = () => {
    localStorage.removeItem(KEY);
  };

  useEffect(() => {
    const data = localStorage.getItem(KEY);

    if (data) {
      setHistory(JSON.parse(data));
    } else {
      setHistory([]);
    }
  });

  return { history, saveHistory, clearHistory };
};
