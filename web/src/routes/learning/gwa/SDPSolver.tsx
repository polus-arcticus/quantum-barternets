// src/routes/gwa/SDPSolver.tsx
import { useEffect, useState } from 'react';
import * as math from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GraphState } from './page';

interface Props {
	graph: GraphState;
	onSolved: (solution: number[][]) => void;
}

export const SDPSolver = ({ graph, onSolved }: Props) => {
	const [iteration, setIteration] = useState(0);
	const [objective, setObjective] = useState(0);

	useEffect(() => {
		const solve = async () => {
			const n = graph.vertices;

			// Create adjacency matrix
			const A = math.zeros(n, n) as math.Matrix;
			graph.edges.forEach(({ from, to, weight }) => {
				A.set([from, to], weight);
				A.set([to, from], weight);
			});

			// Initialize random vectors on unit sphere
			let X = math.zeros(n, n) as math.Matrix;
			const vectors = Array(n).fill(0).map(() => {
				const v = Array(n).fill(0).map(() => Math.random() * 2 - 1);
				const norm = Math.sqrt(v.reduce((acc, x) => acc + x * x, 0));
				return v.map(x => x / norm);
			});

			// Update Gram matrix
			for (let i = 0; i < n; i++) {
				for (let j = 0; j < n; j++) {
					const dot = vectors[i].reduce((acc, x, k) => acc + x * vectors[j][k], 0);
					X.set([i, j], dot);
				}
			}

			// Gradient descent
			const learningRate = 0.01;
			const maxIterations = 1000;

			for (let iter = 0; iter < maxIterations; iter++) {
				// Project onto PSD cone
				const { values, eigenVectors: evectors } = math.eigs(X);
				const D = math.diag(values.map(v => Math.max(0, v)));
				X = math.multiply(math.multiply(evectors, D), math.transpose(evectors));

				// Project onto unit diagonal constraints
				for (let i = 0; i < n; i++) {
					X.set([i, i], 1);
				}

				// Update objective
				const obj = math.multiply(A, X).get([0, 0]);
				setObjective(obj);
				setIteration(iter);

				if (iter % 100 === 0) {
					// Extract solution vectors through Cholesky decomposition
					const L = math.cholesky(X);
					const solution = Array(n).fill(0).map((_, i) => 
																								Array(n).fill(0).map((_, j) => L.get([i, j]))
																							 );
																							 onSolved(solution);
				}
			}
		};

		solve();
	}, [graph, onSolved]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>SDP Progress</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<p>Iteration: {iteration}</p>
					<p>Objective: {objective.toFixed(4)}</p>
				</div>
			</CardContent>
		</Card>
	);
};
