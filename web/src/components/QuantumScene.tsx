import { useControls, folder } from 'leva';

import { StateArrow, BlochSphere } from './GraphUtils/GraphUtils';




export const QuantumScene = () => {
  const values = useControls({
    'State Vector': folder({
      xRe: { value: 1, min: -5, max: 5, step: 0.1, label: "Re(x)" },
      xIm: { value: 0, min: -5, max: 5, step: 0.1, label: "Im(x)" },
      yRe: { value: 0, min: -5, max: 5, step: 0.1, label: "Re(y)" },
      yIm: { value: 0, min: -5, max: 5, step: 0.1, label: "Im(y)" },
      zRe: { value: 0, min: -5, max: 5, step: 0.1, label: "Re(z)" },
      zIm: { value: 0, min: -5, max: 5, step: 0.1, label: "Im(z)" }
    }, { 
      collapsed: false,
      width: 400
    }),
    'Bloch Sphere': folder({
      theta: { value: 0, min: 0, max: Math.PI, step: 0.1, label: "θ" },
      phi: { value: 0, min: 0, max: 2 * Math.PI, step: 0.1, label: "φ" }
    })
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <hemisphereLight intensity={0.5} />
      
      <color attach="background" args={['#ffffff']} />
      
      {/* Original vector visualization */}
      <group position={[-2, 0, 0]}>
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />
        <StateArrow 
          end={[values.xRe, values.yRe, values.zRe]} 
          color="#2B6CB0" 
          isConjugate={false} 
        />
        <StateArrow 
          end={[values.xRe, values.yRe, values.zRe]} 
          color="#2F855A" 
          isConjugate={true} 
        />
      </group>
      
      {/* Bloch sphere visualization */}
      <group position={[2, 0, 0]}>
        <BlochSphere theta={values.theta} phi={values.phi} />
      </group>
    </>
  );
};
