import React, { FC, ReactNode } from 'react';
import s from './Layout.module.css';
import Modal from '@components/ui/Modal';
import { UIProvider, useUI } from '../../ui/context';
import SelectTokenView from '../../token/SelectTokenView/SelectTokenView';
import { TokenProvider } from '@components/token/context';

const ModalView: React.FC<{ modalView: string; closeModal: () => void }> = ({ modalView, closeModal }) => {
  return <Modal onClose={closeModal}>{modalView === 'SELECT_TOKEN_VIEW' && <SelectTokenView />}</Modal>;
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? <ModalView modalView={modalView} closeModal={closeModal} /> : null;
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UIProvider>
      <TokenProvider>
        <div className={s.root}>
          <main className={s.main}>{children}</main>
          <ModalUI />
        </div>
      </TokenProvider>
    </UIProvider>
  );
};

export default Layout;
