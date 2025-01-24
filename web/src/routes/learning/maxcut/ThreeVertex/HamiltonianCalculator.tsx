import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MatrixDisplay from '@/components/MatrixDisplay';

const HamiltonianCalculator = () => {
  const [matrices, setMatrices] = useState({
    Z1Z2: null,
    Z1Z3: null,
    Z2Z3: null,
    H: null,
    eigenvalues: null
  });

  useEffect(() => {
    // Define basic matrices
    const Z = math.matrix([[1, 0], [0, -1]]);
    const I = math.matrix([[1, 0], [0, 1]]);

    // Helper function for tensor product of multiple matrices
    const multiTensor = (matrices) => {
      return matrices.reduce((acc, curr) => math.kron(acc, curr));
    };

    // Calculate individual terms
    const Z1Z2 = multiTensor([Z, Z, I]);
    const Z1Z3 = multiTensor([Z, I, Z]);
    const Z2Z3 = multiTensor([I, Z, Z]);

    // Calculate full Hamiltonian
    const H = math.add(math.add(Z1Z2, Z1Z3), Z2Z3);

    // Calculate eigenvalues
    const eigenvalues = math.eigs(H).values;

    setMatrices({
      Z1Z2,
      Z1Z3,
      Z2Z3,
      H,
      eigenvalues
    });
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Three-Vertex MaxCut Hamiltonian Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold mb-4">Step 1: Individual Terms</h3>
              <div className="space-y-6">
                <div className="bg-background-secondary p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Z₁Z₂ = Z⊗Z⊗I</h4>
                  <MatrixDisplay matrix={matrices.Z1Z2} />
                </div>
                
                <div className="bg-background-secondary p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Z₁Z₃ = Z⊗I⊗Z</h4>
                  <MatrixDisplay matrix={matrices.Z1Z3} />
                </div>
                
                <div className="bg-background-secondary p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Z₂Z₃ = I⊗Z⊗Z</h4>
                  <MatrixDisplay matrix={matrices.Z2Z3} />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-4">Step 2: Full Hamiltonian</h3>
              <div className="bg-background-secondary p-4 rounded-lg">
                <h4 className="font-medium mb-2">H = Z₁Z₂ + Z₁Z₃ + Z₂Z₃</h4>
                <MatrixDisplay matrix={matrices.H} />
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-4">Step 3: Eigenvalues</h3>
              <div className="bg-background-secondary p-4 rounded-lg">
                <p className="mb-2">λ = {matrices.eigenvalues ? 
                  math.format(matrices.eigenvalues.toArray().sort(), { precision: 2 }) :
                  'Calculating...'}</p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HamiltonianCalculator;
