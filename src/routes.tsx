import React from 'react';
import GlobalLayout from './pages/_layout';

import Index from './pages';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [{ path: '/', element: <Index />, index: true }],
  },
];

export const pages = [{ route: '/' }];
