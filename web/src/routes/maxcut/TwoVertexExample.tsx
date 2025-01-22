import { InlineMath } from 'react-katex';

export const TwoVertexExample = () => {

  return (
        <section className="bg-background-secondary rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-content-primary mb-4">
            Example: Two-Vertex Case
          </h2>
          
          <svg viewBox="0 0 200 100" className="w-48 h-24 mb-4">
            {/* Graph vertices */}
            <circle cx="60" cy="50" r="20" fill="white" stroke="#2B6CB0" strokeWidth="2"/>
            <circle cx="140" cy="50" r="20" fill="white" stroke="#2B6CB0" strokeWidth="2"/>
            
            {/* Vertex labels */}
            <text x="60" y="55" textAnchor="middle" className="text-content-primary" fontSize="16">1</text>
            <text x="140" y="55" textAnchor="middle" className="text-content-primary" fontSize="16">2</text>
            
            {/* Edge */}
            <line x1="80" y1="50" x2="120" y2="50" stroke="#2F855A" strokeWidth="2"/>
            
            {/* Edge weight label */}
            <text x="100" y="40" textAnchor="middle" fill="#B83280" fontSize="14">w</text>
          </svg>

          <p className="text-content-secondary mb-4">
            For the simplest case of two vertices connected by an edge with weight w, we have:
          </p>
          <div className="bg-background-tertiary p-4 rounded-lg overflow-x-auto mb-4">
            <span className="text-content-primary">
              <InlineMath>{"H = wZ_1Z_2 = w \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & -1 & 0 & 0 \\\\ 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}"}</InlineMath>
            </span>
          </div>
          <div className="space-y-2 text-content-secondary">
            <p>Why tensor product and not matrix multiplication?</p>
            <div className="bg-background-tertiary p-4 rounded-lg overflow-x-auto mb-4">
              <div className="space-y-4">
                <div>
                  <p className="text-content-primary mb-2">Matrix multiplication (incorrect for this case):</p>
                  <span className="text-content-primary">
                    <InlineMath>{"Z_1Z_2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}"}</InlineMath>
                  </span>
                </div>
                <div>
                  <p className="text-content-primary mb-2">Tensor product (correct approach):</p>
                  <span className="text-content-primary">
                    <InlineMath>{"Z_1 \\otimes Z_2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} \\otimes \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & -1 & 0 & 0 \\\\ 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}"}</InlineMath>
                  </span>
                </div>
              </div>
            </div>

            <p className="font-semibold text-content-primary mt-6 mb-2">Breaking Down State-Eigenvalue Relations</p>
            
            <div className="bg-background-tertiary p-4 rounded-lg mb-6 overflow-x-auto">
              <div className="space-y-6">
                <div>
                  <p className="text-content-primary mb-2">The basis states in vector form:</p>
                  <span className="text-content-primary">
                    <InlineMath>{"|00\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\quad |01\\rangle = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\quad |10\\rangle = \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\quad |11\\rangle = \\begin{pmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 1 \\end{pmatrix}"}</InlineMath>
                  </span>
                </div>

                <div>
                  <p className="text-content-primary mb-2">Action of H on |00⟩:</p>
                  <span className="text-content-primary">
                    <InlineMath>{"H|00\\rangle = w\\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & -1 & 0 & 0 \\\\ 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix} = w\\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix} = w|00\\rangle"}</InlineMath>
                  </span>
                </div>

                <div>
                  <p className="text-content-primary mb-2">Action of H on |01⟩:</p>
                  <span className="text-content-primary">
                    <InlineMath>{"H|01\\rangle = w\\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & -1 & 0 & 0 \\\\ 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix} = w\\begin{pmatrix} 0 \\\\ -1 \\\\ 0 \\\\ 0 \\end{pmatrix} = -w|01\\rangle"}</InlineMath>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-content-secondary">Key observations:</p>
              <ul className="list-disc pl-6 space-y-2 text-content-secondary">
                <li>Each basis state |xy⟩ is an eigenvector of H</li>
                <li>The eigenvalue is +w when both qubits are in the same state (|00⟩ or |11⟩)</li>
                <li>The eigenvalue is -w when qubits are in different states (|01⟩ or |10⟩)</li>
                <li>Physically, eigenvalue -w indicates a cut through the edge (vertices in different partitions)</li>
                <li>For maximizing the cut, we want to minimize energy, so we look for the -w eigenvalues</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="bg-background-tertiary p-4 rounded-lg">
                <p className="text-content-primary mb-2">Basis States:</p>
                <ul className="space-y-2">
                  <li>|00⟩ → eigenvalue +1 (same partition)</li>
                  <li>|01⟩ → eigenvalue -1 (different partitions)</li>
                  <li>|10⟩ → eigenvalue -1 (different partitions)</li>
                  <li>|11⟩ → eigenvalue +1 (same partition)</li>
                </ul>
              </div>
              
              <div className="bg-background-tertiary p-4 rounded-lg">
                <p className="text-content-primary mb-2">Cut Interpretation:</p>
                <ul className="space-y-2">
                  <li>|0⟩ represents "left partition"</li>
                  <li>|1⟩ represents "right partition"</li>
                  <li>Negative eigenvalues (-1) indicate cut edges</li>
                  <li>The ground state will maximize cut edges</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 justify-center my-6">
              {/* No cut - both vertices left */}
              <div className="text-center">
                <svg viewBox="0 0 100 80" className="w-24 h-20 mb-2">
                  <circle cx="30" cy="40" r="15" fill="#2B6CB0" stroke="#2B6CB0" strokeWidth="2"/>
                  <circle cx="70" cy="40" r="15" fill="#2B6CB0" stroke="#2B6CB0" strokeWidth="2"/>
                  <line x1="45" y1="40" x2="55" y2="40" stroke="#2F855A" strokeWidth="2"/>
                  <text x="30" y="44" textAnchor="middle" fill="white" fontSize="12">0</text>
                  <text x="70" y="44" textAnchor="middle" fill="white" fontSize="12">0</text>
                </svg>
                <p className="text-sm">|00⟩ (No cut)</p>
              </div>

              {/* Cut - vertex 1 left, vertex 2 right */}
              <div className="text-center">
                <svg viewBox="0 0 100 80" className="w-24 h-20 mb-2">
                  <circle cx="30" cy="40" r="15" fill="#2B6CB0" stroke="#2B6CB0" strokeWidth="2"/>
                  <circle cx="70" cy="40" r="15" fill="#B83280" stroke="#B83280" strokeWidth="2"/>
                  <line x1="45" y1="40" x2="55" y2="40" stroke="#2F855A" strokeWidth="2" strokeDasharray="4"/>
                  <text x="30" y="44" textAnchor="middle" fill="white" fontSize="12">0</text>
                  <text x="70" y="44" textAnchor="middle" fill="white" fontSize="12">1</text>
                </svg>
                <p className="text-sm">|01⟩ (Cut = w)</p>
              </div>

              {/* Cut - vertex 1 right, vertex 2 left */}
              <div className="text-center">
                <svg viewBox="0 0 100 80" className="w-24 h-20 mb-2">
                  <circle cx="30" cy="40" r="15" fill="#B83280" stroke="#B83280" strokeWidth="2"/>
                  <circle cx="70" cy="40" r="15" fill="#2B6CB0" stroke="#2B6CB0" strokeWidth="2"/>
                  <line x1="45" y1="40" x2="55" y2="40" stroke="#2F855A" strokeWidth="2" strokeDasharray="4"/>
                  <text x="30" y="44" textAnchor="middle" fill="white" fontSize="12">1</text>
                  <text x="70" y="44" textAnchor="middle" fill="white" fontSize="12">0</text>
                </svg>
                <p className="text-sm">|10⟩ (Cut = w)</p>
              </div>

              {/* No cut - both vertices right */}
              <div className="text-center">
                <svg viewBox="0 0 100 80" className="w-24 h-20 mb-2">
                  <circle cx="30" cy="40" r="15" fill="#B83280" stroke="#B83280" strokeWidth="2"/>
                  <circle cx="70" cy="40" r="15" fill="#B83280" stroke="#B83280" strokeWidth="2"/>
                  <line x1="45" y1="40" x2="55" y2="40" stroke="#2F855A" strokeWidth="2"/>
                  <text x="30" y="44" textAnchor="middle" fill="white" fontSize="12">1</text>
                  <text x="70" y="44" textAnchor="middle" fill="white" fontSize="12">1</text>
                </svg>
                <p className="text-sm">|11⟩ (No cut)</p>
              </div>
            </div>

            <ul className="list-disc pl-6 space-y-2">
              <li>Matrix multiplication (Z₁Z₂) would operate on the same qubit space, giving a 2×2 matrix</li>
              <li>The tensor product (Z₁⊗Z₂) creates a larger space that represents both qubits together, giving a 4×4 matrix</li>
              <li>We need the tensor product because each Z operator acts on a different qubit in the two-qubit system</li>
              <li>The resulting 4×4 matrix represents all possible states of the two-qubit system: |00⟩, |01⟩, |10⟩, |11⟩</li>
              <li>For finding the maximum cut, we want to minimize the energy (find the ground state)</li>
              <li>The two optimal solutions |01⟩ and |10⟩ correspond to the two ways to cut the graph with maximum weight</li>
            </ul>
          </div>
        </section>
  )

}
