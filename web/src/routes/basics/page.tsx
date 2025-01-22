import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { QuantumScene } from '../../components/QuantumScene';
import { MathDisplay } from '../../components/MathDisplay';
import { Suspense } from 'react';

export const BasicsPage = () => {
	const { showPerf } = useControls('Debug', {
		showPerf: { value: false }
	});

	return (
		<div className="min-h-screen bg-background-primary text-content-primary">
			<div className="container mx-auto p-4">
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="lg:w-1/3 space-y-4">
						<h1 className="text-3xl font-bold text-quantum-bra">
							Quantum State Visualizer
						</h1>
						<MathDisplay />
					</div>

					<div className="lg:w-2/3 h-128 bg-background-tertiary rounded-lg shadow-lg overflow-hidden">
						<Canvas>
							<Suspense fallback={null}>
								{showPerf && <Perf position="top-left" />}
								<QuantumScene />
								<OrbitControls />
							</Suspense>
						</Canvas>
					</div>
				</div>
			</div>
		</div>
	);
};
