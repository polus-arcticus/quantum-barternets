import { useControls, folder } from 'leva';
import { BlockMath } from 'react-katex';
import { create, all } from 'mathjs';
import { ExpectationValue } from './ExpectationValue';
import MultiQubitState from './MultiQubitState';
import BasisStateExplanation from './BasisStateExplanation';
import TensorProduct from './TensorProduct';
import KroneckerExplainer from '@/components/KroneckerExplainer';

const math = create(all);

// Helper for formatting complex numbers in LaTeX
const formatComplex = (re: number, im: number) => {
    if (im === 0) return re.toFixed(2);
    if (re === 0) return `${im.toFixed(2)}i`;
    return `${re.toFixed(2)}${im >= 0 ? '+' : ''}${im.toFixed(2)}i`;
};

export const MathDisplay = () => {
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

    // Create complex numbers
    const x = math.complex(values.xRe, values.xIm);
    const y = math.complex(values.yRe, values.yIm);
    const z = math.complex(values.zRe, values.zIm);

    // Calculate inner product ⟨φ|φ⟩
    const innerProduct = math.add(
        math.multiply(math.conj(x), x),
        math.multiply(math.conj(y), y),
        math.multiply(math.conj(z), z)
    );

    // Calculate norm for normalization
    const norm = math.sqrt(math.abs(innerProduct));

    return (
        <>
            <div className="bg-background-secondary rounded-lg p-4 shadow">
                <h2 className="text-lg font-semibold mb-2">Ket |φ⟩</h2>
                <BlockMath>{`|\\phi\\rangle = \\begin{bmatrix} 
                    ${formatComplex(values.xRe, values.xIm)} \\\\ 
                    ${formatComplex(values.yRe, values.yIm)} \\\\ 
                    ${formatComplex(values.zRe, values.zIm)}
                \\end{bmatrix}`}</BlockMath>
            </div>

            <div className="bg-background-secondary rounded-lg p-4 shadow">
                <h2 className="text-lg font-semibold mb-2">Bra ⟨φ|</h2>
                <BlockMath>{`\\langle\\phi| = \\begin{bmatrix} 
                    ${formatComplex(values.xRe, -values.xIm)} & 
                    ${formatComplex(values.yRe, -values.yIm)} & 
                    ${formatComplex(values.zRe, -values.zIm)}
                \\end{bmatrix}`}</BlockMath>
            </div>

            <div className="bg-background-secondary rounded-lg p-4 shadow">
                <h2 className="text-lg font-semibold mb-2">Inner Product ⟨φ|φ⟩</h2>
                <BlockMath>{`\\langle\\phi|\\phi\\rangle = ${innerProduct.toString()}`}</BlockMath>
            </div>

            <div className="bg-background-secondary rounded-lg p-4 shadow">
                <h2 className="text-lg font-semibold mb-2">Normalized State</h2>
                <BlockMath>{`\\frac{1}{\\sqrt{${math.abs(innerProduct)}}}|\\phi\\rangle = \\begin{bmatrix} 
                    ${formatComplex(values.xRe/norm, values.xIm/norm)} \\\\ 
                    ${formatComplex(values.yRe/norm, values.yIm/norm)} \\\\ 
                    ${formatComplex(values.zRe/norm, values.zIm/norm)}
                \\end{bmatrix}`}</BlockMath>
            </div>

            <ExpectationValue />
            <MultiQubitState />
            <BasisStateExplanation />
            <TensorProduct />
            <KroneckerExplainer />
        </>
    );
};
