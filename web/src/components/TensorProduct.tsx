import { useControls, folder } from 'leva';
// Add explanation about tensor products
const TensorProductInfo = () => (
  <div className="mt-4 text-content-secondary">
    <p className="mb-2">
      The tensor product (denoted by ⊗) is a fundamental operation in quantum mechanics 
      that describes how quantum systems combine. For two 2×2 matrices A and B, 
      the result is a 4×4 matrix where each element of A is multiplied by the entire matrix B.
    </p>
    <p>
      This operation is crucial for describing multi-qubit states and quantum gates 
      acting on multiple qubits simultaneously.
    </p>
  </div>
);
import { BlockMath } from 'react-katex';
import { create, all } from 'mathjs';

const math = create(all);

const formatMatrix = (matrix) => {
  return matrix.map(row => 
    row.map(val => typeof val === 'number' ? val.toFixed(2) : val)
  );
};

export const TensorProduct = () => {
  const values = useControls({
    'Matrix A': folder({
      a11: { value: 1, min: -5, max: 5, step: 0.1 },
      a12: { value: 0, min: -5, max: 5, step: 0.1 },
      a21: { value: 0, min: -5, max: 5, step: 0.1 },
      a22: { value: 1, min: -5, max: 5, step: 0.1 },
    }),
    'Matrix B': folder({
      b11: { value: 1, min: -5, max: 5, step: 0.1 },
      b12: { value: 0, min: -5, max: 5, step: 0.1 },
      b21: { value: 0, min: -5, max: 5, step: 0.1 },
      b22: { value: 1, min: -5, max: 5, step: 0.1 },
    })
  });

  // Create matrices
  const matrixA = [
    [values.a11, values.a12],
    [values.a21, values.a22]
  ];

  const matrixB = [
    [values.b11, values.b12],
    [values.b21, values.b22]
  ];

  // Calculate tensor product
  const tensorProduct = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const row1 = [];
      const row2 = [];
      for (let k = 0; k < 2; k++) {
        for (let l = 0; l < 2; l++) {
          const value = matrixA[i][k] * matrixB[j][l];
          if (j === 0) row1.push(value);
          else row2.push(value);
        }
      }
      if (j === 0) tensorProduct.push(row1);
      else tensorProduct.push(row2);
    }
  }

  return (
    <div className="bg-background-secondary rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Tensor Product A ⊗ B</h2>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-around">
          <div>
            <h3 className="text-md font-medium mb-2">Matrix A</h3>
            <BlockMath>{`A = \\begin{bmatrix} 
              ${formatMatrix(matrixA)[0][0]} & ${formatMatrix(matrixA)[0][1]} \\\\
              ${formatMatrix(matrixA)[1][0]} & ${formatMatrix(matrixA)[1][1]}
            \\end{bmatrix}`}</BlockMath>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Matrix B</h3>
            <BlockMath>{`B = \\begin{bmatrix}
              ${formatMatrix(matrixB)[0][0]} & ${formatMatrix(matrixB)[0][1]} \\\\
              ${formatMatrix(matrixB)[1][0]} & ${formatMatrix(matrixB)[1][1]}
            \\end{bmatrix}`}</BlockMath>
          </div>
        </div>
        <div>
          <h3 className="text-md font-medium mb-2">Result A ⊗ B</h3>
          <BlockMath>{`A \\otimes B = \\begin{bmatrix}
            ${formatMatrix(tensorProduct)[0][0]} & ${formatMatrix(tensorProduct)[0][1]} & ${formatMatrix(tensorProduct)[0][2]} & ${formatMatrix(tensorProduct)[0][3]} \\\\
            ${formatMatrix(tensorProduct)[1][0]} & ${formatMatrix(tensorProduct)[1][1]} & ${formatMatrix(tensorProduct)[1][2]} & ${formatMatrix(tensorProduct)[1][3]} \\\\
            ${formatMatrix(tensorProduct)[2][0]} & ${formatMatrix(tensorProduct)[2][1]} & ${formatMatrix(tensorProduct)[2][2]} & ${formatMatrix(tensorProduct)[2][3]} \\\\
            ${formatMatrix(tensorProduct)[3][0]} & ${formatMatrix(tensorProduct)[3][1]} & ${formatMatrix(tensorProduct)[3][2]} & ${formatMatrix(tensorProduct)[3][3]}
          \\end{bmatrix}`}</BlockMath>
        </div>
      </div>
    </div>
  );
};

export default TensorProduct;
