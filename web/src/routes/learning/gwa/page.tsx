// src/routes/gwa/page.tsx
import { useState, useCallback } from 'react';
import { InlineMath } from 'react-katex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as math from 'mathjs';
import { SDPSolver } from './SDPSolver';
import { RandomHyperplane } from './RandomHyperplane';
import { GraphVisualizer } from './GraphVisualizer';
import { SDPRelaxation } from './SDPRelaxation';	
export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface GraphState {
  vertices: number;
  edges: Edge[];
}

export const GWAPage = () => {
  const [graph, setGraph] = useState<GraphState>({
    vertices: 4,
    edges: [
      { from: 0, to: 1, weight: 1 },
      { from: 1, to: 2, weight: 1 },
      { from: 2, to: 3, weight: 1 },
      { from: 3, to: 0, weight: 1 }
    ]
  });

  const [sdpSolution, setSdpSolution] = useState<number[][]>();
  const [cut, setCut] = useState<number[]>();

  const handleSDPSolved = useCallback((solution: number[][]) => {
    setSdpSolution(solution);
  }, []);

  const handleCutFound = useCallback((partition: number[]) => {
    setCut(partition);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-content-primary">
          Goemans-Williamson Algorithm
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Algorithm Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-content-secondary">
              <li>
                1. Convert MaxCut to SDP:
                <div className="bg-background-secondary p-4 rounded-lg mt-2">
                  <InlineMath>{`\\max \\frac{1}{2}\\sum_{(i,j) \\in E} w_{ij}(1-v_i \\cdot v_j)`}</InlineMath>
                  <br />
                  <InlineMath>{`\\text{s.t. } v_i \\in S^{n-1} \\text{ for all } i`}</InlineMath>
                </div>
              </li>
              <li>
                2. Solve SDP relaxation to obtain vectors {'{v₁,...,vₙ}'} on unit sphere
              </li>
              <li>
                3. Generate random hyperplane through origin to partition vertices
              </li>
              <li>
                4. Output cut with approximation ratio ≥ 0.878
              </li>
            </ol>
          </CardContent>
        </Card>

        <SDPRelaxation
          graph={graph}
          onSolved={handleSDPSolved}
        />

        <GraphVisualizer 
          graph={graph}
          vectors={sdpSolution}
          cut={cut}
          onGraphChange={setGraph}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SDPSolver 
            graph={graph}
            onSolved={handleSDPSolved}
          />
          
          <RandomHyperplane
            vectors={sdpSolution}
            onCutFound={handleCutFound}
          />
        </div>
      </div>
    </main>
  );
};
