import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Atom, Network, Binary, BookOpen } from 'lucide-react';

export const LearningPage = () => {
  const { pathname } = useLocation();
  const isIndex = pathname === '/learning';

  return isIndex ? (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Quantum Computing &amp; Optimization
        </h1>
        
        <p className="text-content-secondary text-xl mb-12 text-center max-w-3xl mx-auto">
          Explore the fascinating intersection of quantum mechanics, semidefinite programming, 
          and combinatorial optimization through interactive visualizations and examples.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <Atom size={48} className="text-quantum-bra" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center">Quantum Basics</h2>
            <p className="text-content-secondary mb-6">
              Start your quantum journey here. Learn about quantum states, superposition,
              and measurement through interactive visualizations.
            </p>
            <Link 
              to="/learning/basics" 
              className="block text-center bg-quantum-bra text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Begin Learning
            </Link>
          </div>

          <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <Binary size={48} className="text-quantum-operator" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center">SDP</h2>
            <p className="text-content-secondary mb-6">
              Discover how semidefinite programming connects quantum mechanics
              with practical optimization problems.
            </p>
            <Link 
              to="/learning/sdp" 
              className="block text-center bg-quantum-operator text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Explore SDP
            </Link>
          </div>

          <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <Network size={48} className="text-quantum-ket" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center">MaxCut</h2>
            <p className="text-content-secondary mb-6">
              See how quantum approaches can help solve the classical MaxCut
              problem with better approximation guarantees.
            </p>
            <Link 
              to="/learning/maxcut" 
              className="block text-center bg-quantum-ket text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Study MaxCut
            </Link>
          </div>

          <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <BookOpen size={48} className="text-quantum-bra" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center">GW Algorithm</h2>
            <p className="text-content-secondary mb-6">
              Understand the groundbreaking Goemans-Williamson algorithm and its
              impact on approximation algorithms.
            </p>
            <Link 
              to="/learning/gwa" 
              className="block text-center bg-quantum-bra text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Learn GW
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};
