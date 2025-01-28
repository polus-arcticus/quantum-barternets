import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<section className="mb-16">
		<h2 className="text-3xl font-bold mb-6 text-content-primary">{title}</h2>
		<div className="prose prose-lg text-content-secondary max-w-4xl">
			{children}
		</div>
	</section>
);

const ExampleBox = ({ 
	title, 
	findingContent,
	verifyingContent,
	complexity
}: { 
	title: string;
	findingContent: React.ReactNode;
	verifyingContent: React.ReactNode;
	complexity: {
		finding: string;
		verifying: string;
	};
}) => (
	<div className="my-8 p-6 bg-background-secondary rounded-lg">
		<h4 className="text-xl font-semibold mb-4">{title}</h4>
		<div className="grid md:grid-cols-2 gap-6">
			<div className="p-4 bg-white bg-opacity-50 rounded">
				<h5 className="font-semibold mb-2">Finding Solution</h5>
				<div className="mb-4">{findingContent}</div>
				<div className="mt-2 p-2 bg-background-secondary rounded">
					Time Complexity: <InlineMath>{complexity.finding}</InlineMath>
				</div>
			</div>
			<div className="p-4 bg-white bg-opacity-50 rounded">
				<h5 className="font-semibold mb-2">Verifying Solution</h5>
				<div className="mb-4">{verifyingContent}</div>
				<div className="mt-2 p-2 bg-background-secondary rounded">
					Time Complexity: <InlineMath>{complexity.verifying}</InlineMath>
				</div>
			</div>
		</div>
	</div>
);

export const VerificationComplexityPage = () => {
	return (
		<div className="min-h-screen bg-background-primary text-content-primary">
			<div className="container mx-auto px-4 py-12">
				<h1 className="text-5xl font-bold mb-8">
					Verification vs Solution Finding
				</h1>

				<p className="text-content-secondary text-xl mb-12 max-w-3xl">
					Understanding the computational asymmetry between finding optimal market solutions 
					and verifying their efficiency.
				</p>

				<Section title="The Fundamental Asymmetry">
					<div className="p-6 bg-background-secondary rounded-lg mb-8">
						<h3 className="text-xl font-semibold mb-4">Key Insight</h3>
						<p>
							In computational complexity theory, many problems exhibit a fundamental asymmetry: 
							finding a solution can be exponentially harder than verifying one. This 
							distinction is captured by the relationship between complexity classes P and NP.
						</p>
						<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-4 bg-white bg-opacity-50 rounded">
								<h4 className="font-semibold mb-2">Class P</h4>
								<p>Problems where both finding and verifying solutions can be done efficiently 
									(in polynomial time)</p>
							</div>
							<div className="p-4 bg-white bg-opacity-50 rounded">
								<h4 className="font-semibold mb-2">Class NP</h4>
								<p>Problems where verifying a solution is efficient, but finding one might 
									require exponential time</p>
							</div>
						</div>
					</div>
				</Section>

				<Section title="Market Examples">
					<ExampleBox
						title="Arbitrage Detection"
						findingContent={
							<div>
								<p>Must explore all possible combinations of trades to find profitable arbitrage opportunities:</p>
								<BlockMath>{`\\text{Search Space} = \\sum_{k=1}^n \\binom{n}{k} k!`}</BlockMath>
								<p className="mt-2">For n assets, need to check all possible trading sequences</p>
							</div>
						}
						verifyingContent={
							<div>
								<p>Given a specific sequence of trades, just need to:</p>
								<ol className="list-decimal ml-4">
									<li>Calculate net position after each trade</li>
									<li>Verify final position shows profit</li>
								</ol>
							</div>
						}
						complexity={{
							finding: "O(n!)",
							verifying: "O(k)"
						}}
					/>

					<ExampleBox
						title="Market Clearing Prices"
						findingContent={
							<div>
								<p>Need to find prices where supply equals demand for all goods simultaneously:</p>
								<BlockMath>{`\\forall i: \\sum_{j=1}^n S_i(p) = \\sum_{j=1}^n D_i(p)`}</BlockMath>
								<p className="mt-2">Requires solving system of n nonlinear equations</p>
							</div>
						}
						verifyingContent={
							<div>
								<p>Given a set of prices, simply:</p>
								<ol className="list-decimal ml-4">
									<li>Calculate supply and demand at those prices</li>
									<li>Check if they match for each good</li>
								</ol>
							</div>
						}
						complexity={{
							finding: "O(2^n)",
							verifying: "O(n)"
						}}
					/>

					<ExampleBox
						title="Optimal Trade Allocation"
						findingContent={
							<div>
								<p>Must consider all possible ways to match buyers and sellers:</p>
								<BlockMath>{`\\max_{x_{ij}} \\sum_{i=1}^n \\sum_{j=1}^m U_{ij}x_{ij}`}</BlockMath>
								<p className="mt-2">Combinatorial optimization over all possible matchings</p>
							</div>
						}
						verifyingContent={
							<div>
								<p>For a given matching:</p>
								<ol className="list-decimal ml-4">
									<li>Sum utility across all matches</li>
									<li>Verify no alternative pairing improves total utility</li>
								</ol>
							</div>
						}
						complexity={{
							finding: "O(n^m)",
							verifying: "O(nm)"
						}}
					/>
				</Section>

				<Section title="Implications for Market Design">
					<div className="space-y-6">
						<div className="p-4 bg-background-secondary rounded-lg">
							<h4 className="font-semibold mb-2">1. Incremental Updates</h4>
							<p>
								Markets might maintain efficiency better than they achieve it initially. 
								This suggests focusing on mechanisms for smooth price adjustments rather 
								than trying to find perfect prices from scratch.
							</p>
						</div>

						<div className="p-4 bg-background-secondary rounded-lg">
							<h4 className="font-semibold mb-2">2. Local vs Global Optimization</h4>
							<p>
								Given the complexity of finding globally optimal solutions, market 
								mechanisms might better focus on maintaining local efficiency through 
								incremental improvements that can be easily verified.
							</p>
						</div>

						<div className="p-4 bg-background-secondary rounded-lg">
							<h4 className="font-semibold mb-2">3. Verification-Centric Design</h4>
							<p>
								Market mechanisms could be designed around easily verifiable properties, 
								leveraging the computational advantage of verification over solution finding.
							</p>
						</div>
					</div>
				</Section>

				<div className="mt-8 p-6 bg-background-secondary rounded-lg">
					<h3 className="text-2xl font-semibold mb-4">Key Takeaway</h3>
					<p className="text-lg">
						The asymmetry between finding and verifying solutions suggests that market 
						efficiency might be better approached as an incremental, verification-driven 
						process rather than attempting to compute globally optimal solutions directly.
					</p>
				</div>
			</div>
		</div>
	);
};

export default VerificationComplexityPage;
