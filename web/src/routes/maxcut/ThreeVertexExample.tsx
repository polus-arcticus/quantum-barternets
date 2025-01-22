import React from 'react';
import { InlineMath } from 'react-katex';

export const ThreeVertexExample =() => {
  return (
    <section className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Example: Three-Vertex MaxCut
      </h2>
      
      {/* Main graph diagram */}
      <svg viewBox="0 0 200 200" className="w-48 h-48 mb-4">
        {/* Graph vertices arranged in equilateral triangle */}
        <circle cx="100" cy="60" r="20" fill="white" stroke="#2B6CB0" strokeWidth="2"/>
        <circle cx="60" cy="140" r="20" fill="white" stroke="#2B6CB0" strokeWidth="2"/>
        <circle cx="140" cy="140" r="20" fill="white" stroke="#2B6CB0" strokeWidth="2"/>
        
        {/* Vertex labels */}
        <text x="100" y="65" textAnchor="middle" className="text-gray-900" fontSize="16">1</text>
        <text x="60" y="145" textAnchor="middle" className="text-gray-900" fontSize="16">2</text>
        <text x="140" y="145" textAnchor="middle" className="text-gray-900" fontSize="16">3</text>
        
        {/* Edges */}
        <line x1="85" y1="75" x2="70" y2="122" stroke="#2F855A" strokeWidth="2"/>
        <line x1="115" y1="75" x2="130" y2="122" stroke="#2F855A" strokeWidth="2"/>
        <line x1="80" y1="140" x2="120" y2="140" stroke="#2F855A" strokeWidth="2"/>
        
        {/* Edge weight labels */}
        <text x="70" y="100" textAnchor="middle" fill="#B83280" fontSize="14">w₁₂</text>
        <text x="130" y="100" textAnchor="middle" fill="#B83280" fontSize="14">w₁₃</text>
        <text x="100" y="155" textAnchor="middle" fill="#B83280" fontSize="14">w₂₃</text>
      </svg>

      {/* Hamiltonian */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <p className="text-gray-600 mb-2">
          Hamiltonian for three vertices with weights w₁₂, w₁₃, and w₂₃:
        </p>
        <div className="text-gray-900">
          <InlineMath>{"H = w_{12}Z_1Z_2 + w_{13}Z_1Z_3 + w_{23}Z_2Z_3"}</InlineMath>
        </div>
      </div>

      {/* Matrix representation */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <p className="text-gray-900 mb-2">Matrix with w₁₂ = w₁₃ = w₂₃ = 1:</p>
        <div className="overflow-x-auto">
          <span className="text-gray-900">
          <InlineMath>{"H = \\begin{pmatrix} 3 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & -1 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & -1 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 & 0 & 3 \\end{pmatrix}"}</InlineMath>
          </span>
        </div>
        <p className="text-gray-600 mt-2">Basis states:</p>
        <div className="text-sm">
          <span className="text-gray-900">
            <InlineMath>{"|000\\rangle, |001\\rangle, |010\\rangle, |011\\rangle, |100\\rangle, |101\\rangle, |110\\rangle, |111\\rangle"}</InlineMath>
          </span>
        </div>
      </div>

      {/* State visualizations */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold text-gray-900">All States and Their Cuts</h3>
        
        {/* Eigenvalue +3 states */}
        <div className="space-y-2">
          <p className="font-medium text-gray-900">Eigenvalue +3 (No cuts):</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { state: '000' },
              { state: '111' }
            ].map(({state}) => (
              <div key={state} className="text-center">
                <svg viewBox="0 0 120 120" className="w-28 h-28 mb-2">
                  <circle cx="60" cy="30" r="15" 
                    fill={state[0] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[0] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <circle cx="30" cy="90" r="15" 
                    fill={state[1] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[1] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <circle cx="90" cy="90" r="15" 
                    fill={state[2] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[2] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <line x1="48" y1="41" x2="36" y2="77" stroke="#2F855A" strokeWidth="2"/>
                  <line x1="72" y1="41" x2="84" y2="77" stroke="#2F855A" strokeWidth="2"/>
                  <line x1="45" y1="90" x2="75" y2="90" stroke="#2F855A" strokeWidth="2"/>
                  <text x="60" y="35" textAnchor="middle" fill="white" fontSize="12">{state[0]}</text>
                  <text x="30" y="95" textAnchor="middle" fill="white" fontSize="12">{state[1]}</text>
                  <text x="90" y="95" textAnchor="middle" fill="white" fontSize="12">{state[2]}</text>
                </svg>
                <p className="text-sm font-mono">|{state}⟩</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eigenvalue +1 states */}
        <div className="space-y-2">
          <p className="font-medium text-gray-900">Eigenvalue +1 (Two cuts):</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { state: '001' },
              { state: '010' },
              { state: '100' }
            ].map(({state}) => (
              <div key={state} className="text-center">
                <svg viewBox="0 0 120 120" className="w-28 h-28 mb-2">
                  <circle cx="60" cy="30" r="15" 
                    fill={state[0] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[0] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <circle cx="30" cy="90" r="15" 
                    fill={state[1] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[1] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <circle cx="90" cy="90" r="15" 
                    fill={state[2] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[2] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <line x1="48" y1="41" x2="36" y2="77" 
                    stroke={state[0] !== state[1] ? "#DC2626" : "#2F855A"} 
                    strokeWidth="2"
                    strokeDasharray={state[0] !== state[1] ? "4" : "0"}/>
                  <line x1="72" y1="41" x2="84" y2="77" 
                    stroke={state[0] !== state[2] ? "#DC2626" : "#2F855A"} 
                    strokeWidth="2"
                    strokeDasharray={state[0] !== state[2] ? "4" : "0"}/>
                  <line x1="45" y1="90" x2="75" y2="90" 
                    stroke={state[1] !== state[2] ? "#DC2626" : "#2F855A"} 
                    strokeWidth="2"
                    strokeDasharray={state[1] !== state[2] ? "4" : "0"}/>
                  <text x="60" y="35" textAnchor="middle" fill="white" fontSize="12">{state[0]}</text>
                  <text x="30" y="95" textAnchor="middle" fill="white" fontSize="12">{state[1]}</text>
                  <text x="90" y="95" textAnchor="middle" fill="white" fontSize="12">{state[2]}</text>
                </svg>
                <p className="text-sm font-mono">|{state}⟩</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eigenvalue -1 states */}
        <div className="space-y-2">
          <p className="font-medium text-gray-900">Eigenvalue -1 (Two cuts):</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { state: '110' },
              { state: '101' },
              { state: '011' }
            ].map(({state}) => (
              <div key={state} className="text-center">
                <svg viewBox="0 0 120 120" className="w-28 h-28 mb-2">
                  <circle cx="60" cy="30" r="15" 
                    fill={state[0] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[0] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <circle cx="30" cy="90" r="15" 
                    fill={state[1] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[1] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <circle cx="90" cy="90" r="15" 
                    fill={state[2] === '0' ? "#2B6CB0" : "#B83280"} 
                    stroke={state[2] === '0' ? "#2B6CB0" : "#B83280"} 
                    strokeWidth="2"/>
                  <line x1="48" y1="41" x2="36" y2="77" 
                    stroke={state[0] !== state[1] ? "#DC2626" : "#2F855A"} 
                    strokeWidth="2"
                    strokeDasharray={state[0] !== state[1] ? "4" : "0"}/>
                  <line x1="72" y1="41" x2="84" y2="77" 
                    stroke={state[0] !== state[2] ? "#DC2626" : "#2F855A"} 
                    strokeWidth="2"
                    strokeDasharray={state[0] !== state[2] ? "4" : "0"}/>
                  <line x1="45" y1="90" x2="75" y2="90" 
                    stroke={state[1] !== state[2] ? "#DC2626" : "#2F855A"} 
                    strokeWidth="2"
                    strokeDasharray={state[1] !== state[2] ? "4" : "0"}/>
                  <text x="60" y="35" textAnchor="middle" fill="white" fontSize="12">{state[0]}</text>
                  <text x="30" y="95" textAnchor="middle" fill="white" fontSize="12">{state[1]}</text>
                  <text x="90" y="95" textAnchor="middle" fill="white" fontSize="12">{state[2]}</text>
                </svg>
                <p className="text-sm font-mono">|{state}⟩</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key observations */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900 mb-2">Key Observations:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Eigenvalue +3 corresponds to states with no cuts (all vertices same color)</li>
            <li>Both eigenvalues +1 and -1 correspond to states with two cuts, but with different color patterns</li>
            <li>In a triangle graph, it's impossible to achieve exactly one cut due to the graph structure</li>
            <li>The optimal MaxCut solutions (two cuts) occur when one vertex differs from its neighbors</li>
            <li>There are 6 possible maximum cut solutions (3 choices for the different vertex × 2 color choices)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
