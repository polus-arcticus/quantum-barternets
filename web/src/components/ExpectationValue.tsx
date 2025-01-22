import { useState } from 'react';
import { useControls, folder } from 'leva';
import { BlockMath } from 'react-katex';
import { create, all } from 'mathjs';

const math = create(all);

// Helper for formatting complex numbers in LaTeX
const formatComplex = (num) => {
  if (typeof num !== 'object') {
    return num.toFixed(2);
  }
  const re = num.re;
  const im = num.im;
  if (Math.abs(im) < 1e-10) return re.toFixed(2);
  if (Math.abs(re) < 1e-10) return `${im.toFixed(2)}i`;
  return `${re.toFixed(2)}${im >= 0 ? '+' : ''}${im.toFixed(2)}i`;
};

export const ExpectationValue = () => {
  const [selectedFunction, setSelectedFunction] = useState('x');
  
  const values = useControls({
    'State Vector': folder({
      xRe: { value: 1, min: -5, max: 5, step: 0.1, label: "Re(x)" },
      xIm: { value: 0, min: -5, max: 5, step: 0.1, label: "Im(x)" },
      yRe: { value: 0, min: -5, max: 5, step: 0.1, label: "Re(y)" },
      yIm: { value: 0, min: -5, max: 5, step: 0.1, label: "Im(y)" },
      zRe: { value: 0, min: -5, max: 5, step: 0.1, label: "Re(z)" },
      zIm: { value: 0, min: -5, max: 5, step: 0.1, label: "Im(z)" }
    })
  });

  // Create complex numbers for state vector
  const x = math.complex(values.xRe, values.xIm);
  const y = math.complex(values.yRe, values.yIm);
  const z = math.complex(values.zRe, values.zIm);
  
  // Calculate norm for normalization
  const innerProduct = math.add(
    math.multiply(math.conj(x), x),
    math.multiply(math.conj(y), y),
    math.multiply(math.conj(z), z)
  );
  const norm = math.sqrt(math.abs(innerProduct));

  // Normalize state vector components
  const xNorm = math.divide(x, norm);
  const yNorm = math.divide(y, norm);
  const zNorm = math.divide(z, norm);

  // Function to calculate matrix elements based on selected operator
  const calculateExpectationValue = () => {
    let result;
    switch (selectedFunction) {
      case 'x':
        result = math.add(
          math.multiply(math.conj(xNorm), xNorm),
          math.multiply(math.conj(yNorm), yNorm),
          math.multiply(math.conj(zNorm), zNorm)
        );
        break;
      case 'x^2':
        result = math.add(
          math.multiply(math.conj(xNorm), math.multiply(xNorm, xNorm)),
          math.multiply(math.conj(yNorm), math.multiply(yNorm, yNorm)),
          math.multiply(math.conj(zNorm), math.multiply(zNorm, zNorm))
        );
        break;
      case 'x*y':
        result = math.add(
          math.multiply(math.conj(xNorm), math.multiply(xNorm, yNorm)),
          math.multiply(math.conj(yNorm), math.multiply(yNorm, zNorm)),
          math.multiply(math.conj(zNorm), math.multiply(zNorm, xNorm))
        );
        break;
      default:
        result = math.complex(0, 0);
    }
    return result;
  };

  const expectationValue = calculateExpectationValue();

  return (
    <div className="bg-background-secondary rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Expectation Value</h2>
      <div className="mb-4">
        <select 
          value={selectedFunction}
          onChange={(e) => setSelectedFunction(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        >
          <option value="x">f(x,y,z) = x</option>
          <option value="x^2">f(x,y,z) = x²</option>
          <option value="x*y">f(x,y,z) = xy</option>
        </select>
      </div>
      <BlockMath>{`\\langle\\phi|f(x,y,z)|\\phi\\rangle = ${formatComplex(expectationValue)}`}</BlockMath>
    </div>
  );
};

