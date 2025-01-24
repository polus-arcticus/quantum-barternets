export const MainGraphDiagram = () => {
  return (
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
  )
}

export const ThreeGraphDiagram = () => {
  return (
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

  )
}


export const TwoGraphDiagram = () => {
  return (<>
    <div className="space-y-2">
      <p className="font-medium text-gray-900">Eigenvalue -1 (Two cuts):</p>
      <div className="flex flex-wrap gap-8 justify-center">
        {[
          { state: '001' },
          { state: '010' },
          { state: '100' },
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
  </>)
}
