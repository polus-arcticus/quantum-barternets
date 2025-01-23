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
				<h1 className="text-3xl font-bold text-quantum-bra mb-6">
					Quantum State Visualizer
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					{/* Quantum Scene - Centered in the grid */}
					<div className="lg:col-span-8 lg:col-start-3 h-96 lg:h-128 bg-background-tertiary rounded-lg shadow-lg overflow-hidden mb-6">
						<Canvas>
							<Suspense fallback={null}>
								{showPerf && <Perf position="top-left" />}
								<QuantumScene />
								<OrbitControls />
							</Suspense>
						</Canvas>
					</div>

					{/* Math Display - Wrapping sections */}
					<div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<MathDisplay />
					</div>
				</div>
			</div>
		</div>
	);
};
