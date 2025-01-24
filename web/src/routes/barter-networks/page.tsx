import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const BarterNetworksPage = () => {
  const { pathname } = useLocation();
  const isIndex = pathname === '/barter-networks';

  return isIndex ? (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">
          Barter Networks
        </h1>
        <p className="text-content-secondary text-xl mb-12 max-w-3xl">
          Explore the dynamics of barter networks and their optimization through network analysis.
        </p>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};
