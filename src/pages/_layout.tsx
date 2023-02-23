import React from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as CommonLayout } from '@components/common';

export default function Layout() {
  return (
    <div>
      <Suspense fallback="loading...">
        <CommonLayout>
          <Outlet />
        </CommonLayout>
      </Suspense>
    </div>
  );
}
