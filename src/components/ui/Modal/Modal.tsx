import React, { CSSProperties, FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';

import FocusTrap from './FocusTrap';
import s from './Modal.module.css';

type Props = {
  className?: string;
  children?: ReactNode;
  onClose: () => void;
};

const Modal: FC<Props> = ({ className, onClose, children }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, []);

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      window.addEventListener('keydown', handleKey);
      disableBodyScroll(modal, { reserveScrollBarGap: true });

      return () => {
        clearAllBodyScrollLocks();
        window.addEventListener('keydown', handleKey);
      };
    }
  }, [handleKey]);

  return (
    <div className={s.root} onClick={() => onClose()}>
      <div className={s.modal} ref={ref} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onClose()} aria-label="Close panel" className={s.close}>
          x
        </button>
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
  );
};

export default Modal;
