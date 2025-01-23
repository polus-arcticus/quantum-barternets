import React from 'react';
import { InlineMath } from 'react-katex';
import HamiltonianCalculator from './HamiltonianCalculator';
import {
  MainGraphDiagram,
  TwoGraphDiagram,
  ThreeGraphDiagram,
} from './GraphDiagrams';
export const ThreeVertexExample =() => {
  return (
    <section className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Example: Three-Vertex MaxCut
      </h2>
      
      {/* Main graph diagram */}
      <MainGraphDiagram />
      {/* Hamiltonian */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <p className="text-gray-600 mb-2">
          Hamiltonian for three vertices with weights w₁₂, w₁₃, and w₂₃:
        </p>
        <div className="text-gray-900">
          <InlineMath>{"H = w_{12}Z_1Z_2 + w_{13}Z_1Z_3 + w_{23}Z_2Z_3"}</InlineMath>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <HamiltonianCalculator />
      </div>

      {/* State visualizations */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold text-gray-900">All States and Their Cuts</h3>
        
        {/* Eigenvalue +3 states */}
        <ThreeGraphDiagram />
        {/* Eigenvalue +1 states */}
        {/* Eigenvalue -1 states */}
        <TwoGraphDiagram />

        

        {/* Key observations */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900 mb-2">Key Observations:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Eigenvalue +3 corresponds to states with no cuts (all vertices same color)</li>
            <li>Both eigenvalues +1 and -1 correspond to states with two cuts, but with different color patterns</li>
            <li>In a triangle graph, it's impossible to achieve exactly one cut due to the graph structure</li>
            <li>The optimal MaxCut solutions (two cuts) occur when one vertex differs from its neighbors</li>
            <li>There are 6 possible maximum cut solutions (3 choices for the different vertex × 2 color choices)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
