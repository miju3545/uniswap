import React, { FC, ReactNode, createContext, useCallback, useMemo, useContext } from 'react';
import tokenList from '../../config/token-list';
import { manageHistory, updateHistory } from '../../lib/updateHistory';

type Token = {
  id: string;
  symbol: string;
};

export type State = {
  from: Token;
  into: Token;
  history: string[];
};

export type ReturnState = State & {
  setFrom: (symbol: string) => void;
  setInto: (symbol: string) => void;
};

const initialState: State = {
  from: {
    id: tokenList['ETH'].id,
    symbol: 'ETH',
  },
  into: {
    id: tokenList['USDT'].id,
    symbol: 'USDT',
  },
  history: manageHistory(['ETH', 'USDT']),
};

export type Action =
  | {
      type: 'SET_FROM';
      symbol: string;
    }
  | {
      type: 'SET_INTO';
      symbol: string;
    };

export const TokenContext = createContext<ReturnState | null>(null);

TokenContext.displayName = 'TokenContext';

const stayUnique = (values: string[]): string[] => Array.from(new Set(values));

function tokenReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FROM': {
      const history = stayUnique([...state.history, action.symbol]);
      updateHistory(history);

      return {
        ...state,
        from: { ...state.from, symbol: action.symbol, id: tokenList[action.symbol].id },
        history,
      };
    }
    case 'SET_INTO': {
      const history = stayUnique([...state.history, action.symbol]);
      updateHistory(history);

      return {
        ...state,
        into: { ...state.into, symbol: action.symbol, id: tokenList[action.symbol].id },
        history,
      };
    }

    default: {
      return { ...state };
    }
  }
}

export const SwapTokenProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(tokenReducer, initialState);

  const setFrom = useCallback((symbol: string) => dispatch({ type: 'SET_FROM', symbol }), [dispatch]);
  const setInto = useCallback((symbol: string) => dispatch({ type: 'SET_INTO', symbol }), [dispatch]);

  const value: ReturnState = useMemo(
    () => ({
      ...state,
      setFrom,
      setInto,
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
