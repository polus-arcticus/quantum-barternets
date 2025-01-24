// src/routes/maxcut/page.tsx
import { useState } from 'react';
import { InlineMath } from 'react-katex';
import { ExampleWrapper } from './ExampleWrapper';
export const MaxCutPage = () => {
  const [vertices, setVertices] = useState(4);
  const [edges] = useState([
    { from: 0, to: 1, weight: 1 },
    { from: 1, to: 2, weight: 1 },
    { from: 2, to: 3, weight: 1 },
    { from: 3, to: 0, weight: 1 }
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-content-primary mb-6">
          Max-Cut Problem Visualization
        </h1>
        
        <section className="bg-background-secondary rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-content-primary mb-4">
            Problem Description
          </h2>
          <p className="text-content-secondary mb-4">
            The Max-Cut problem involves partitioning vertices of a graph into two sets such that the sum of weights of edges crossing between the sets is maximized. In quantum computing, this problem can be mapped to finding the ground state of an Ising Hamiltonian:
          </p>
          <div className="bg-background-tertiary p-4 rounded-lg overflow-x-auto mb-4">
            <span className="text-content-primary">
              <InlineMath>{"H = \\sum_{(i,j) \\in E} w_{ij}Z_iZ_j \\quad \\text{where } E \\text{ is the set of edges}"}</InlineMath>
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 bg-background-tertiary text-content-primary font-semibold border-b border-background-tertiary">Variable</th>
                  <th className="text-left p-2 bg-background-tertiary text-content-primary font-semibold border-b border-background-tertiary">Description</th>
                </tr>
              </thead>
              <tbody className="text-content-secondary">
                <tr>
                  <td className="p-2 border-b border-background-tertiary">
                    <span className="text-content-primary font-math">H</span>
                  </td>
                  <td className="p-2 border-b border-background-tertiary">
                    The Ising Hamiltonian representing the Max-Cut problem
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-background-tertiary">
                    <span className="text-content-primary font-math">E</span>
                  </td>
                  <td className="p-2 border-b border-background-tertiary">
                    Set of edges in the graph. Each element (i,j) ∈ E represents a single edge connecting vertices i and j
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-background-tertiary">
                    <span className="text-content-primary font-math">w<sub>ij</sub></span>
                  </td>
                  <td className="p-2 border-b border-background-tertiary">
                    Weight of the edge connecting vertices i and j
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-background-tertiary">
                    <span className="text-content-primary font-math">Z<sub>i</sub></span>
                  </td>
                  <td className="p-2 border-b border-background-tertiary">
                    Pauli Z operator acting on qubit i, representing which partition the vertex belongs to
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ExampleWrapper />

        <section className="bg-background-secondary rounded-lg p-6">
          <h2 className="text-xl font-semibold text-content-primary mb-4">
            Graph Configuration
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-content-secondary mb-2">
                Number of Vertices
              </label>
              <input
                type="number"
                min="2"
                max="8"
                value={vertices}
                onChange={(e) => setVertices(Math.min(8, Math.max(2, parseInt(e.target.value) || 2)))}
                className="px-3 py-2 border border-background-tertiary rounded-lg bg-background-primary text-content-primary"
              />
            </div>
            
            <div>
              <h3 className="text-content-secondary mb-2">Current Edges</h3>
              <div className="grid gap-2">
                {edges.map((edge, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-content-secondary">
                    <span>{edge.from} →</span>
                    <span>{edge.to}</span>
                    <span className="text-quantum-operator">
                      (weight: {edge.weight})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
