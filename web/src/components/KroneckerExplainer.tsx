import React from 'react';
import * as math from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MatrixDisplay = ({ matrix, label = '' }) => {
  const matrixArray = math.typeOf(matrix) === 'Matrix' ? 
    matrix.toArray() : matrix;

  return (
    <div className="inline-block">
      {label && <div className="mb-2 font-mono">{label}</div>}
      <div className="flex items-stretch font-mono text-sm">
        <div className="flex flex-col justify-between mr-2 select-none">
          {matrixArray.map((_, i) => (
            <div key={`left-${i}`} className="leading-8">
              {i === 0 ? '⎡' : i === matrixArray.length - 1 ? '⎣' : '⎢'}
            </div>
          ))}
        </div>
        
        <table className="border-separate border-spacing-x-4 border-spacing-y-0">
          <tbody>
            {matrixArray.map((row, i) => (
              <tr key={`row-${i}`}>
                {row.map((val, j) => (
                  <td key={`cell-${i}-${j}`} className="text-right whitespace-pre">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col justify-between ml-2 select-none">
          {matrixArray.map((_, i) => (
            <div key={`right-${i}`} className="leading-8">
              {i === 0 ? '⎤' : i === matrixArray.length - 1 ? '⎦' : '⎥'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const KroneckerExplainer = () => {
  // Define our basic matrices
  const Z = [[1, 0], [0, -1]];
  const I = [[1, 0], [0, 1]];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Understanding Kronecker Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Starting Matrices</h3>
            <div className="flex flex-wrap gap-8 items-center">
              <div>
                <p className="mb-2">Pauli Z Matrix:</p>
                <MatrixDisplay matrix={Z} />
              </div>
              <div>
                <p className="mb-2">Identity Matrix:</p>
                <MatrixDisplay matrix={I} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Simple Kronecker Product Example</h3>
            <p className="mb-4">Let's look at Z⊗Z (2x2 ⊗ 2x2 → 4x4):</p>
            <div className="bg-background-secondary p-4 rounded-lg">
              <MatrixDisplay 
                matrix={[
                  [1 * 1,  1 * 0,  0 * 1,  0 * 0],
                  [1 * 0,  1 * -1, 0 * 0,  0 * -1],
                  [0 * 1,  0 * 0,  -1 * 1, -1 * 0],
                  [0 * 0,  0 * -1, -1 * 0, -1 * -1]
                ]} 
              />
            </div>
            <p className="mt-4 text-sm">Each element in Z multiplies an entire scaled copy of Z</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Computing Z₁Z₂ = Z⊗Z⊗I</h3>
            <p className="mb-4">For three qubits, we first compute Z⊗Z (4x4) then tensor with I (2x2) → 8x8</p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-background-secondary p-4 rounded-lg">
                <p className="mb-2">Final Z₁Z₂ matrix (showing first quadrant):</p>
                <MatrixDisplay 
                  matrix={[
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, -1, 0],
                    [0, 0, 0, -1]
                  ]} 
                />
              </div>
            </div>
          </div>

          <div className="bg-background-secondary p-4 rounded-lg">
            <h4 className="font-medium mb-2">Key Points:</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li>Tensor product is the mathematical operation from quantum mechanics</li>
              <li>Kronecker product is the matrix implementation of the tensor product</li>
              <li>For matrices, A⊗B means each element of A multiplies all of B</li>
              <li>Final matrix size is (m×n)×(p×q) = (mp×nq)</li>
              <li>This explains why our 2×2 matrices combine to give 8×8 (2×2×2 = 8)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KroneckerExplainer;
