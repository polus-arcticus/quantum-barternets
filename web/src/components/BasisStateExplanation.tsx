import { BlockMath } from 'react-katex';

const BasisStateExplanation = () => {
	return (
		<div className="bg-background-secondary rounded-lg p-4 shadow space-y-4">
			<h2 className="text-lg font-semibold">Basis States and Vector Representations</h2>

			{/* Standard Basis States */}
			<div>
				<h3 className="text-md font-medium mb-2">Computational Basis States</h3>
				<BlockMath>{`|0\\rangle = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}`}</BlockMath>
				<BlockMath>{`|1\\rangle = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix}`}</BlockMath>
				<BlockMath>{`|2\\rangle = \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix}`}</BlockMath>
			</div>

			{/* General State */}
			<div>
				<h3 className="text-md font-medium mb-2">General State as Superposition</h3>
				<BlockMath>{`|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle + \\gamma|2\\rangle = \\begin{bmatrix} \\alpha \\\\ \\beta \\\\ \\gamma \\end{bmatrix}`}</BlockMath>
				<p className="text-sm text-gray-600 mt-2">
					where |α|² + |β|² + |γ|² = 1 for normalization
				</p>
			</div>

			{/* Common States */}
			<div>
				<h3 className="text-md font-medium mb-2">Common States Examples</h3>
				<BlockMath>{`|+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle) = \\frac{1}{\\sqrt{2}}\\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}`}</BlockMath>
				<BlockMath>{`|-\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle) = \\frac{1}{\\sqrt{2}}\\begin{bmatrix} 1 \\\\ -1 \\\\ 0 \\end{bmatrix}`}</BlockMath>
			</div>

			{/* Explanation */}
			<div className="prose max-w-none">
				<p className="text-sm text-gray-600">
					In a 3-dimensional quantum system (qutrit), any state |ψ⟩ can be written as a superposition
					of three basis states |0⟩, |1⟩, and |2⟩. The complex coefficients α, β, and γ represent
					the amplitude of finding the system in each respective basis state upon measurement.
				</p>
				<p className="text-sm text-gray-600 mt-2">
					This is different from a two-qubit system (|00⟩, |01⟩, |10⟩, |11⟩) which lives in a 
					4-dimensional Hilbert space. Our 3-vector representation describes a qutrit - a single
					quantum system with three possible states.
				</p>
			</div>
		</div>
	);
};

export default BasisStateExplanation;
