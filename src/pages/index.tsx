import React, { FC } from 'react';
import OverView from '@components/token/TokenOverView';
import { TokenProvider } from '@components/token/context';

const Index: FC = () => {
  return (
    <TokenProvider>
      <OverView />
    </TokenProvider>
  );
};

export default Index;
