import { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
	vectors?: number[][];
	onCutFound: (partition: number[]) => void;
}

export const RandomHyperplane = ({ vectors, onCutFound }: Props) => {
	const generateCut = useCallback(() => {
		if (!vectors) return;

		// Generate random unit vector (hyperplane normal)
		const n = vectors[0].length;
		const normal = Array(n).fill(0).map(() => Math.random() * 2 - 1);
		const norm = Math.sqrt(normal.reduce((acc, x) => acc + x * x, 0));
		const normalizedNormal = normal.map(x => x / norm);

		// Partition vertices based on dot product sign
		const partition = vectors.map(v => {
			const dot = v.reduce((acc, x, i) => acc + x * normalizedNormal[i], 0);
			return dot > 0 ? 1 : -1;
		});

		onCutFound(partition);
	}, [vectors, onCutFound]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Random Hyperplane Cut</CardTitle>
			</CardHeader>
			<CardContent>
				<button
					onClick={generateCut}
					disabled={!vectors}
					className="px-4 py-2 bg-quantum-bra text-white rounded-lg disabled:opacity-50"
				>
					Generate New Cut
				</button>
			</CardContent>
		</Card>
	);
};
