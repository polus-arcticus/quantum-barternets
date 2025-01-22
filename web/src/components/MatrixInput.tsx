import { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

interface MatrixInputProps {
  size: number;
  onMatrixChange: (matrix: number[][]) => void;
}

export const MatrixInput = ({ size, onMatrixChange }: MatrixInputProps) => {
  const [matrix, setMatrix] = useState<number[][]>(
    Array(size).fill(0).map(() => Array(size).fill(0))
  );
	console.log('matrix', matrix)

  const handleChange = (i: number, j: number, value: string) => {
    const newMatrix = matrix.map(row => [...row]);
    const num = parseFloat(value);
    newMatrix[i][j] = isNaN(num) ? 0 : num;
    // Make matrix symmetric
    if (i !== j) {
      newMatrix[j][i] = newMatrix[i][j];
    }
    setMatrix(newMatrix);
    onMatrixChange(newMatrix);
  };

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
      {matrix.map((row, i) =>
        row.map((val, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            value={val}
            onChange={(e) => handleChange(i, j, e.target.value)}
            className="w-full p-2 border rounded bg-background-primary text-content-primary text-center"
          />
        ))
      )}
    </div>
  );
};

