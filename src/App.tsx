import '@assets/main.css';

import React from 'react';
import { useRoutes } from 'react-router';
import { routes } from './routes';
import { getClient } from './lib/queryClient';
import { QueryClientProvider } from 'react-query';

const App = () => {
  const element = useRoutes(routes);
  const client = getClient();

  return <QueryClientProvider client={client}>{element}</QueryClientProvider>;
};

export default App;
