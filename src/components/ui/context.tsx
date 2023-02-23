import React, { FC, ReactNode, createContext, useCallback, useMemo, useContext } from 'react';

export type State = {
  displayModal: boolean;
  modalView: string;
};

export type ReturnState = State & {
  openModal: () => void;
  closeModal: () => void;
  setModalView: (modalView: MODAL_VIEWS) => void;
};

const initialState: State = {
  displayModal: false,
  modalView: 'SELECT_TOKEN_VIEW',
};

export type Action =
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    };

export type MODAL_VIEWS = 'SELECT_TOKEN_VIEW';

export const UIContext = createContext<ReturnState | null>(null);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }
  }
}

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openModal = useCallback(() => dispatch({ type: 'OPEN_MODAL' }), [dispatch]);
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), [dispatch]);

  const setModalView = useCallback((view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }), [dispatch]);

  const value: ReturnState = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
    }),
    [state]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error(`useUI는 UIProvider에서만 사용할 수 있음!`);
  }
  return context;
};
