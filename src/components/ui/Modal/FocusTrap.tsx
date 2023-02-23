import React, { FC, ReactNode, RefObject, useRef, useEffect } from 'react';
import { tabbable } from 'tabbable';

type Props = {
  children: ReactNode;
  focusFirst?: boolean;
};

const FocusTrap: FC<Props> = ({ children, focusFirst }) => {
  const root: RefObject<any> = useRef();
  const anchor: RefObject<any> = useRef(document.activeElement);

  const returnFocus = () => {
    if (anchor.current) {
      anchor.current.focus();
    }
  };

  const trapFocus = () => {
    if (root.current) {
      root.current.focus();

      if (focusFirst) {
        selectFirstFocusableEl();
      }
    }
  };

  const selectFirstFocusableEl = () => {
    const els = tabbable(root.current);
    if (els.length) els[0].focus();
  };

  // useEffect(() => {
  //   trapFocus();

  //   return returnFocus;
  // }, []);

  return React.createElement(
    'div',
    {
      ref: root,
      className: '',
      tabIndex: -1,
    },
    children
  );
};

export default FocusTrap;
