import React from 'react';
import GlobalLayout from './pages/_layout';

import Swap from './pages/swap';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [{ path: '/', element: <Swap />, index: true }],
  },
];

export const pages = [{ route: '/' }];
