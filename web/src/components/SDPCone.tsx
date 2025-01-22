import React from 'react';
import { create, all } from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scene } from '@/components/Scene';
import { ArrowRight } from 'lucide-react';
import { StateArrow, StateLabel } from '@/components/GraphUtils/GraphUtils';

const math = create(all);

interface SDPConeProps {
  eigenvalues?: number[];
  eigenVectors?: Array<{ vector: { toArray: () => number[], format: () => string } }>;
  isPositiveSemidefinite?: boolean | null;
}

const SDPCone: React.FC<SDPConeProps> = ({ 
  eigenvalues = [], 
  eigenVectors = [],
  isPositiveSemidefinite = null 
}) => {
  // Generate points for the cone
  const generateConePoints = () => {
    const points = [];
    const height = 2;
    const radius = 1;
    const segments = 32;
    
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push([x, height, z]);
      points.push([0, 0, 0]);
      points.push([x * 1.2, height, z * 1.2]);
    }
    return points;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-quantum-operator">Understanding the SDP Cone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The semidefinite cone represents all positive semidefinite matrices of a given size. For 2×2 matrices, we can visualize this in 3D space by mapping:</p>
          
          <div className="bg-background-secondary p-4 rounded-lg space-y-2">
            <p className="font-mono">⎡ x   y ⎤</p>
            <p className="font-mono">⎣ y   z ⎦</p>
            <ArrowRight className="my-2" />
            <p>Point (x, y, z) in 3D space</p>
          </div>

          {isPositiveSemidefinite !== null && (
            <div className={`p-4 rounded-lg ${
              isPositiveSemidefinite 
                ? 'bg-quantum-ket/20' 
                : 'bg-red-100'
            }`}>
              <p className="font-medium">Current Matrix Status:</p>
              <p>
                {isPositiveSemidefinite 
                  ? 'Inside the SDP cone (all eigenvalues ≥ 0)' 
                  : 'Outside the SDP cone (has negative eigenvalues)'}
              </p>
              {eigenvalues.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Eigenvalues:</p>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {eigenvalues.map((λ, i) => (
                      <div key={i} className="bg-background-primary p-2 rounded">
                        λ{i+1} = {λ.toFixed(4)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="font-medium">Key Properties:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Convexity: Any line segment between two points in the cone lies entirely within the cone</li>
            <li>Self-duality: The cone is its own dual, making optimization efficient</li>
            <li>Applications: Quantum state estimation, portfolio optimization, control theory</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="h-96">
          <Scene>
            <group rotation={[0.5, 0.5, 0]}>
              <gridHelper args={[10, 10]} />
              <lineSegments>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={generateConePoints().length}
                    array={new Float32Array(generateConePoints().flat())}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#2B6CB0" opacity={0.5} transparent />
              </lineSegments>
              
              {/* Visualize eigenvectors if available */}
              {eigenVectors.map((vector, i) => (
                <group key={i}>
                  <StateArrow 
                    end={vector.vector.toArray()} 
                    color={eigenvalues[i] >= 0 ? "#2F855A" : "#DC2626"}
                    isConjugate={false}
                  />
                  <StateLabel 
                    position={vector.vector.toArray()} 
                    label={`v${i+1}`}
                  />
                </group>
              ))}
            </group>
          </Scene>
        </CardContent>
      </Card>
    </div>
  );
};

export default SDPCone;
