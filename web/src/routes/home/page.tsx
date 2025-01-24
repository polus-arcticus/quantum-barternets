import React from 'react';
import { Link } from 'react-router-dom';
import { Network, Brain, ActivitySquare } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Economic Theory & Optimization
        </h1>
        
        <p className="text-content-secondary text-xl mb-12 text-center max-w-3xl mx-auto">
          Explore the intersection of economic theory, quantum computing, and network optimization
          through interactive visualizations and examples.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <Brain size={48} className="text-quantum-bra" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center">Economic Theory</h2>
            <p className="text-content-secondary mb-6">
              Understand the mathematical foundations of economic decision-making through choice theory,
              preference relations, and utility theory.
            </p>
            <Link 
              to="/economic-theory" 
              className="block text-center bg-quantum-bra text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Study Theory
            </Link>
          </div>

          <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <ActivitySquare size={48} className="text-quantum-operator" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center">Quantum Computing</h2>
            <p className="text-content-secondary mb-6">
              Discover how quantum algorithms and optimization techniques can solve complex
              economic and computational problems.
            </p>
            <Link 
              to="/learning" 
              className="block text-center bg-quantum-operator text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Learn Quantum
            </Link>
          </div>

          <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <Network size={48} className="text-quantum-ket" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center">Barter Networks</h2>
            <p className="text-content-secondary mb-6">
              Explore algorithms for analyzing and optimizing barter networks through
              cycle detection and network analysis.
            </p>
            <Link 
              to="/barter-networks" 
              className="block text-center bg-quantum-ket text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Analyze Networks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
