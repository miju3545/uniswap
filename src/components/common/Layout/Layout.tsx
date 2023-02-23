import React, { FC, ReactNode } from 'react';
import s from './Layout.module.css';
import Header from '../Header';
import Modal from '@components/ui/Modal';
import { UIProvider, useUI } from '../../ui/context';
import SettingsView from '../../main/SettingsView';
import SelectTokenView from '../../main/SelectTokenView';

const ModalView: React.FC<{ modalView: string; closeModal: () => void }> = ({ modalView, closeModal }) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'SETTINGS_VIEW' && <SettingsView />}
      {modalView === 'SELECT_TOKEN' && <SelectTokenView />}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? <ModalView modalView={modalView} closeModal={closeModal} /> : null;
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UIProvider>
      <div className={s.root}>
        <Header />
        <main className={s.main}>{children}</main>
        <footer>풋터</footer>
        <ModalUI />
      </div>
    </UIProvider>
  );
};

export default Layout;
