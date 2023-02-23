import React, { FC, ReactNode, createContext, useCallback, useMemo, useContext } from 'react';
import tokenList from '../../config/token-list.json';

type Token = {
  id: string;
  name: string;
};
export type State = {
  fromToken: Token;
  intoToken: Token;
};

export type ReturnState = State & {
  setFromToken: (token: Token) => void;
  setIntoToken: (token: Token) => void;
};

const initialState: State = {
  fromToken: {
    id: tokenList['ETH'].id,
    name: 'ETH',
  },
  intoToken: {
    id: tokenList['USDT'].id,
    name: 'USDT',
  },
};

export type Action =
  | {
      type: 'SET_FROM_TOKEN';
      token: Token;
    }
  | {
      type: 'SET_INTO_TOKEN';
      token: Token;
    };

export const TokenContext = createContext<ReturnState | null>(null);

TokenContext.displayName = 'UIContext';

function tokenReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FROM_TOKEN': {
      return {
        ...state,
        fromToken: { ...state.fromToken, ...action.token },
      };
    }
    case 'SET_INTO_TOKEN': {
      return {
        ...state,
        intoToken: { ...state.fromToken, ...action.token },
      };
    }
  }
}

export const TokenProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(tokenReducer, initialState);

  const setFromToken = useCallback((token: Token) => dispatch({ type: 'SET_FROM_TOKEN', token }), [dispatch]);
  const setIntoToken = useCallback((token: Token) => dispatch({ type: 'SET_INTO_TOKEN', token }), [dispatch]);

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
