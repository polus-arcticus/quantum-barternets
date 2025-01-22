import { useState } from 'react';
import { create, all } from 'mathjs';
import { MatrixInput } from '@/components/MatrixInput';

import { Scene } from '@/components/Scene';
import { StateArrow, StateLabel } from '@/components/GraphUtils/GraphUtils';
const math = create(all);

export const SDPPage = () => {
  const [matrixSize, setMatrixSize] = useState(2);
  const [isPositiveSemidefinite, setIsPositiveSemidefinite] = useState<boolean | null>(null);
  const [eigenvalues, setEigenvalues] = useState<number[]>([]);
  const [eigenVectors, setEigenVectors] = useState<number[][]>([]);
  const [vectors, setVectors] = useState<number[][]>([]);
  const [charPoly, setCharPoly] = useState<string>('');

  const checkPSD = (matrix: number[][]) => {
    try {
      console.log('matrix', matrix)
      setVectors(matrix);
      // Ensure matrix is symmetric
      const symmetric = matrix.map((row, i) =>  {
        return  row.map((val, j) => j >= i ? val : matrix[j][i])
      })
      const M = math.matrix(symmetric);
      const eigs = math.eigs(M);
      console.log('eigs', eigs)
      console.log(Array.from(eigs.values as math.Complex[]))
      const realEigs =  Array.from(eigs.values).map((e) => {
        return e.value
      }).sort((a, b) => b - a)

      setEigenvalues(realEigs);
      console.log('eigenVectors', eigs.eigenvectors)
      setEigenVectors(eigs.eigenvectors);
      setIsPositiveSemidefinite(realEigs.every(λ => λ >= -1e-10));
    } catch (error) {
      console.error('Error computing eigenvalues:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-quantum-operator mb-6">
          Positive Semidefinite Matrix Checker
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-content-secondary mb-4">
                Matrix Input
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-content-secondary">Matrix Size:</label>
                  <select 
                    value={matrixSize}
                    onChange={(e) => setMatrixSize(Number(e.target.value))}
                    className="p-2 rounded bg-background-primary"
                  >
                    {[2, 3, 4].map(size => (
                      <option key={size} value={size}>{size}x{size}</option>
                    ))}
                  </select>
                </div>
                <MatrixInput size={matrixSize} onMatrixChange={checkPSD} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Scene>
              <group position={[0, 0, 0]}>
                <gridHelper args={[10, 10]} />
                <axesHelper args={[5]} />
                { vectors.map((vector, i) => {
                  return (
                    <StateArrow 
                      end={vector} 
                      color="#2B6CB0" 
                      isConjugate={false} 
                      key={i}
                    />
                  )
                })
                }
                { eigenVectors.map((vector, i) => {
                  console.log('vector.vector.toArray()', vector.vector.toArray())
                  return (
                    <StateArrow 
                      end={vector.vector.toArray()} 
                      color="#ffc300" 
                      isConjugate={false} 
                      key={i}
                    />
                  )
                })
                }
              </group>
            </Scene>
          </div>
          <div className="space-y-4">
            <div className="bg-background-secondary rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-content-secondary mb-4">
                Result
              </h2>
              {isPositiveSemidefinite !== null && eigenvalues.length > 0 && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    isPositiveSemidefinite 
                      ? 'bg-quantum-ket/20 text-quantum-ket' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isPositiveSemidefinite 
                      ? 'Matrix is Positive Semidefinite' 
                      : 'Matrix is NOT Positive Semidefinite'}
                  </div>
                  <div className="bg-background-tertiary rounded-lg p-4">
                    <h3 className="text-lg font-medium text-content-secondary mb-2">
                      Calculations
                    </h3>
                    <div className="space-y-2">
                      <div className="bg-background-primary rounded p-3">
                        <p className="font-mono">det(A - λI) = 0</p>
                        <p className="font-mono mt-2">where A is the input matrix and λ represents eigenvalues</p>
                      </div>
                      <div className="bg-background-primary rounded p-3">
                        <h4 className="font-medium mb-2">Characteristic Equation:</h4>
                        <p className="font-mono">{charPoly || 'det(A - λI) = 0'}</p>
                      </div>
                      <div className="bg-background-primary rounded p-3">
                        <h4 className="font-medium mb-2">Eigenvalues:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {eigenvalues && eigenvalues.length > 0 && eigenvalues.map((λ, i) => (
                            <div key={i} className="p-2 bg-background-secondary rounded">
                              λ{i+1} = {λ?.toFixed(4) ?? 'N/A'}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-background-primary rounded p-3">
                        <h4 className="font-medium mb-2">Eigenvectors:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {eigenVectors && eigenVectors.length > 0 && eigenVectors.map((lamda, i) => {
                            console.log('lamda.vector', lamda.vector)
                            return (
                              <div key={i} className="p-2 bg-background-secondary rounded">
                                {lamda.vector.format()}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};
