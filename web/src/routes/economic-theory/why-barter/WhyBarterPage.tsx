import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const WhyBarterPage = () => {
  const { pathname } = useLocation();
  const isIndex = pathname === '/economic-theory/why-barter';

  return isIndex ? (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">
          Why Study Barter?
        </h1>
        <div className="prose prose-lg max-w-4xl">
          <p className="text-content-secondary text-xl mb-6">
            Barter systems represent fundamental economic interactions that help us understand
            core concepts in economic theory, from preference relations to market efficiency.
          </p>
          <p className="text-content-secondary text-xl mb-6">
            By studying barter networks, we can develop insights into:
          </p>
          <ul className="list-disc pl-6 mb-6 text-content-secondary">
            <li className="mb-2">The emergence of monetary systems</li>
            <li className="mb-2">Network effects in economic systems</li>
            <li className="mb-2">Preference aggregation and social choice</li>
            <li className="mb-2">Market formation and efficiency</li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};
