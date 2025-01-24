import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { GraphState } from './page';

interface Props {
	graph: GraphState;
	vectors?: number[][];
	cut?: number[];
	onGraphChange: (graph: GraphState) => void;
}

export const GraphVisualizer = ({ graph, vectors, cut, onGraphChange }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw graph
		const radius = Math.min(canvas.width, canvas.height) * 0.4;
		const center = { x: canvas.width / 2, y: canvas.height / 2 };

		// Draw vertices
		const vertexPositions = Array(graph.vertices).fill(0).map((_, i) => {
			const angle = (i * 2 * Math.PI) / graph.vertices;
			return {
				x: center.x + radius * Math.cos(angle),
				y: center.y + radius * Math.sin(angle)
			};
		});

		// Draw edges
		graph.edges.forEach(edge => {
			const start = vertexPositions[edge.from];
			const end = vertexPositions[edge.to];

			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
			ctx.strokeStyle = cut && cut[edge.from] !== cut[edge.to] 
				? '#DC2626' // Cut edge
				: '#2F855A'; // Uncut edge
				ctx.stroke();
		});

		// Draw vertices
		vertexPositions.forEach((pos, i) => {
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
			ctx.fillStyle = cut ? (cut[i] > 0 ? '#2B6CB0' : '#B83280') : '#2B6CB0';
			ctx.fill();
		});
	}, [graph, vectors, cut]);

	return (
		<Card>
			<CardContent>
				<canvas
					ref={canvasRef}
					width={600}
					height={400}
					className="w-full h-96 border border-background-tertiary rounded-lg"
				/>
			</CardContent>
		</Card>
	);
};
