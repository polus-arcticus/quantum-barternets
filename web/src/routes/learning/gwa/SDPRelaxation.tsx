import React, { useState } from 'react';
import { InlineMath } from 'react-katex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const SDPRelaxation = () => {
	const [showExplanation, setShowExplanation] = useState(false);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Semidefinite Relaxation</CardTitle>
						<button 
							onClick={() => setShowExplanation(!showExplanation)}
							className="p-2 rounded-full hover:bg-background-secondary"
						>
							<HelpCircle className="w-5 h-5 text-content-secondary" />
						</button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="bg-background-secondary p-4 rounded-lg">
							<p className="font-medium mb-2">Original MaxCut Problem:</p>
							<InlineMath>{"\\text{max} \\frac{1}{2}\\sum_{(i,j) \\in E}(1-x_ix_j)"}</InlineMath>
							<p className="mt-2">Subject to:</p>
							<InlineMath>{"x_i \\in \\{-1,1\\} \\quad \\forall i \\in V"}</InlineMath>
						</div>

						<div className="bg-background-secondary p-4 rounded-lg">
							<p className="font-medium mb-2">SDP Relaxation:</p>
							<InlineMath>{"\\text{max} \\frac{1}{2}\\sum_{(i,j) \\in E}(1-v_i \\cdot v_j)"}</InlineMath>
							<p className="mt-2">Subject to:</p>
							<InlineMath>{"v_i \\in S^{n-1} \\quad \\forall i \\in V"}</InlineMath>
						</div>

						{showExplanation && (
							<div className="bg-background-tertiary p-4 rounded-lg space-y-2">
								<p className="font-medium">Key Transformations:</p>
								<ol className="list-decimal ml-4 space-y-2">
									<li>Replace scalar variables {"{x_i}"} with unit vectors {"{v_i}"}</li>
									<li>Inner product {"{v_i · v_j}"} replaces product {"{x_ix_j}"}</li>
									<li>Unit sphere constraint {"{S^{n-1}}"} replaces binary constraint</li>
								</ol>
								<p className="mt-4">This relaxation:</p>
								<ul className="list-disc ml-4 space-y-2">
									<li>Makes the problem convex</li>
									<li>Can be solved in polynomial time</li>
									<li>Provides an upper bound on optimal cut value</li>
									<li>Guarantees ≈ 0.878 approximation ratio</li>
								</ul>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Matrix Formulation</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="bg-background-secondary p-4 rounded-lg">
							<p className="font-medium mb-2">Gram Matrix Form:</p>
							<InlineMath>{"\\text{min } X \\cdot A"}</InlineMath>
							<p className="mt-2">Subject to:</p>
							<InlineMath>{"X \\succeq 0"}</InlineMath>
							<br />
							<InlineMath>{"X_{ii} = 1 \\quad \\forall i \\in V"}</InlineMath>
						</div>

						<p className="text-content-secondary">
							Where X is the Gram matrix of vectors {"{v_i}"}, A is the adjacency matrix,
							and {" X ≽ 0 "} means X is positive semidefinite.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
