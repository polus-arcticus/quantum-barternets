import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { create, all } from 'mathjs';

const math = create(all);

const MultiQubitState = () => {
  // For a 2-qubit system, we need 4 complex amplitudes
  const [amplitudes, setAmplitudes] = useState({
    '00': math.complex(1, 0),  // |00⟩
    '01': math.complex(0, 0),  // |01⟩
    '10': math.complex(0, 0),  // |10⟩
    '11': math.complex(0, 0)   // |11⟩
  });

  // Helper function to format basis states
  const formatBasisState = (state) => {
    const amp = amplitudes[state];
    const magnitude = math.abs(amp);
    const phase = math.arg(amp);
    return magnitude > 0.01 ? `(${magnitude.toFixed(2)}e^{${phase.toFixed(2)}i})|${state}\\rangle` : '';
  };

  return (
    <div className="bg-background-secondary rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Multi-Qubit State Representation</h2>
      
      {/* Quantum state in bra-ket notation */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">State in Bra-Ket Notation</h3>
        <BlockMath>{`
          |\\psi\\rangle = ${formatBasisState('00')} + ${formatBasisState('01')} + ${formatBasisState('10')} + ${formatBasisState('11')}
        `}</BlockMath>
      </div>

      {/* Explanation section */}
      <div className="prose max-w-none">
        <h3 className="text-md font-medium mb-2">Understanding Multi-Qubit States</h3>
        <p className="text-sm text-gray-600">
          In quantum computing, states like |01⟩ represent multi-qubit systems:
        </p>
        <ul className="list-disc ml-5 text-sm text-gray-600">
          <li>|0⟩ represents the ground state of a single qubit</li>
          <li>|1⟩ represents the excited state of a single qubit</li>
          <li>|01⟩ means the first qubit is in state |0⟩ and the second in |1⟩</li>
          <li>The general two-qubit state is a superposition: α|00⟩ + β|01⟩ + γ|10⟩ + δ|11⟩</li>
        </ul>
      </div>

      {/* Common states examples */}
      <div className="mt-4">
        <h3 className="text-md font-medium mb-2">Common Two-Qubit States</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-2 rounded">
            <p className="font-mono text-sm">Bell State (Φ⁺):</p>
            <BlockMath>{`\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)`}</BlockMath>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="font-mono text-sm">Bell State (Ψ⁻):</p>
            <BlockMath>{`\\frac{1}{\\sqrt{2}}(|01\\rangle - |10\\rangle)`}</BlockMath>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiQubitState;
