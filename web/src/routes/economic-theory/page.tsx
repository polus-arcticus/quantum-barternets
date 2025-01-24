import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const EconomicsPage = () => {
  const { pathname } = useLocation();
  const isIndex = pathname === '/economic-theory';

  return isIndex ? (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">
          Economic Theory
        </h1>
        <p className="text-content-secondary text-xl mb-12 max-w-3xl">
          Explore the foundations of economic theory through mathematical modeling and optimization.
        </p>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};
