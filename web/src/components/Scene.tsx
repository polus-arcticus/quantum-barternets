import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { Suspense, ReactNode } from 'react';

export const Scene = ({children}: {children: ReactNode}) => {
  const { showPerf } = useControls('Debug', {
    showPerf: { value: false }
  });

  return (
    <Canvas>
      <Suspense fallback={null}>
        {showPerf && <Perf position="top-left" />}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <hemisphereLight intensity={0.5} />
        <color attach="background" args={['#ffffff']} />
        {children}
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};
