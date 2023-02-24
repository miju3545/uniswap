import React, { FC, ReactNode, createContext, useCallback, useMemo, useContext, useEffect, useState } from 'react';
import tokenList from '../../config/token-list';
import { getHistory, updateHistory } from '../../lib/updateHistory';

type Token = {
  id: string;
  symbol: string;
};

export type State = {
  fromToken: Token;
  intoToken: Token;
  history: string[];
};

export type ReturnState = State & {
  setFromToken: (symbol: string) => void;
  setIntoToken: (symbol: string) => void;
};

const initialState: State = {
  fromToken: {
    id: tokenList['ETH'].id,
    symbol: 'ETH',
  },
  intoToken: {
    id: tokenList['USDT'].id,
    symbol: 'USDT',
  },
  history: getHistory(['ETH', 'USDT']),
};

export type Action =
  | {
      type: 'SET_FROM_TOKEN';
      symbol: string;
    }
  | {
      type: 'SET_INTO_TOKEN';
      symbol: string;
    };

export const TokenContext = createContext<ReturnState | null>(null);

TokenContext.displayName = 'TokenContext';

function tokenReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FROM_TOKEN': {
      const history = Array.from(new Set([...state.history, action.symbol]));
      updateHistory(history);

      return {
        ...state,
        fromToken: { ...state.fromToken, symbol: action.symbol, id: tokenList[action.symbol].id },
        history,
      };
    }
    case 'SET_INTO_TOKEN': {
      const history = Array.from(new Set([...state.history, action.symbol]));
      updateHistory(history);

      return {
        ...state,
        intoToken: { ...state.fromToken, symbol: action.symbol, id: tokenList[action.symbol].id },
        history,
      };
    }

    default: {
      return { ...state };
    }
  }
}

export const TokenProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(tokenReducer, initialState);

  const setFromToken = useCallback((symbol: string) => dispatch({ type: 'SET_FROM_TOKEN', symbol }), [dispatch]);
  const setIntoToken = useCallback((symbol: string) => dispatch({ type: 'SET_INTO_TOKEN', symbol }), [dispatch]);

  const value: ReturnState = useMemo(
    () => ({
      ...state,
      setFromToken,
      setIntoToken,
    }),
    [state]
  );

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error(`useToken는 TokenProvider에서만 사용할 수 있음!`);
  }
  return context;
};
