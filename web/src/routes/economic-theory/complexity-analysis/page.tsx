import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { VerificationComplexityPage } from './VerificationComplexity';
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-content-primary">{title}</h2>
    <div className="prose prose-lg text-content-secondary max-w-4xl">
      {children}
    </div>
  </section>
);

const AnalysisStep = ({ 
  title, 
  children, 
  stepNumber 
}: { 
  title: string; 
  children: React.ReactNode;
  stepNumber: number;
}) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-quantum-bra text-white flex items-center justify-center font-bold text-xl">
        {stepNumber}
      </div>
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
    <div className="ml-16">
      {children}
    </div>
  </div>
);

const ComparisonBox = ({ 
  title, 
  price, 
  barter 
}: { 
  title: string;
  price: React.ReactNode;
  barter: React.ReactNode;
}) => (
  <div className="my-8 p-6 bg-background-secondary rounded-lg">
    <h4 className="text-xl font-semibold mb-4">{title}</h4>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 bg-white bg-opacity-50 rounded">
        <h5 className="font-semibold mb-2">Price-Based Market</h5>
        {price}
      </div>
      <div className="p-4 bg-white bg-opacity-50 rounded">
        <h5 className="font-semibold mb-2">Barter-Based Market</h5>
        {barter}
      </div>
    </div>
  </div>
);

export const ComplexityAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">
          Computational Complexity of Market Efficiency
        </h1>
        
        <p className="text-content-secondary text-xl mb-12 max-w-3xl">
          A step-by-step analysis comparing the computational complexity of verifying 
          efficiency in price-based versus barter-based markets.
        </p>

        <Section title="Problem Setup">
          <p>
            Consider a market with n goods and m potential trades. We'll analyze how the 
            computational complexity of verifying market efficiency scales with these parameters 
            in both price-based and barter-based systems.
          </p>

          <ComparisonBox
            title="Market Structure"
            price={
              <div>
                <p>Each good i has a price <InlineMath>p_i</InlineMath></p>
                <p>Total of <InlineMath>n</InlineMath> prices to determine</p>
                <BlockMath>{`\\text{Efficiency requires: } \\forall i,j: \\frac{p_i}{p_j} = \\text{MRS}_{ij}`}</BlockMath>
              </div>
            }
            barter={
              <div>
                <p>Each trade k involves direct exchange ratio <InlineMath>r_k</InlineMath></p>
                <p>Total of <InlineMath>m</InlineMath> exchange ratios</p>
                <BlockMath>{`\\text{Efficiency requires: } \\forall k: r_k = \\text{MRS}_k`}</BlockMath>
              </div>
            }
          />
        </Section>

        <Section title="Efficiency Verification Process">
          <AnalysisStep stepNumber={1} title="State Space Definition">
            <p>
              First, we need to understand how many variables and constraints we're dealing 
              with in each system.
            </p>
            
            <ComparisonBox
              title="State Space Dimensions"
							price={
                <div>
                  <ul className="list-disc ml-4 space-y-2">
                    <li><InlineMath>n</InlineMath> prices to determine</li>
                    <li><InlineMath>{`\\binom{n}{2}`}</InlineMath> price ratios to verify</li>
                    <li>Dense matrix of relationships</li>
                  </ul>
                  <div className="mt-4 p-4 bg-white bg-opacity-75 rounded">
                    <p className="font-semibold mb-2">Example with n = 4 goods:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Goods: A, B, C, D</li>
                      <li>Prices: <InlineMath>p_A, p_B, p_C, p_D</InlineMath></li>
                      <li><InlineMath>{`\\binom{4}{2} = 6`}</InlineMath> ratios to verify:</li>
                    </ul>
                    <div className="mt-2 ml-6">
                      <BlockMath>{`\\begin{matrix} 
                        p_A/p_B, & p_A/p_C, & p_A/p_D \\\\
                        & p_B/p_C, & p_B/p_D \\\\
                        & & p_C/p_D
                      \\end{matrix}`}</BlockMath>
                    </div>
                  </div>
                </div>
              }
              barter={
                <div>
                  <ul className="list-disc ml-4 space-y-2">
                    <li><InlineMath>m</InlineMath> exchange ratios</li>
                    <li>Each ratio is independent</li>
                    <li>Sparse matrix of relationships</li>
                  </ul>
                  <div className="mt-4 p-4 bg-white bg-opacity-75 rounded">
                    <p className="font-semibold mb-2">Example with 4 goods and m = 3 trades:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Trades:</li>
                      <ul className="list-circle ml-6 space-y-1">
                        <li>A ↔ B at ratio <InlineMath>r_1</InlineMath></li>
                        <li>B ↔ C at ratio <InlineMath>r_2</InlineMath></li>
                        <li>A ↔ D at ratio <InlineMath>r_3</InlineMath></li>
                      </ul>
                      <li className="mt-2">Only 3 ratios to verify vs 6 in price system</li>
                    </ul>
                  </div>
                </div>
              }
            />
          </AnalysisStep>

          <AnalysisStep stepNumber={2} title="Constraint Analysis">
            <p>
              Next, we examine the constraints that must be satisfied for efficiency.
            </p>

            <ComparisonBox
              title="Efficiency Constraints"
              price={
                <div>
                  <p>For each pair of goods (i,j):</p>
                  <BlockMath>{`\\frac{p_i}{p_j} = \\text{MRS}_{ij}`}</BlockMath>
                  <p>These constraints are interdependent:</p>
                  <BlockMath>{`\\frac{p_i}{p_j} \\cdot \\frac{p_j}{p_k} = \\frac{p_i}{p_k}`}</BlockMath>
                </div>
              }
              barter={
                <div>
                  <p>For each trade k between goods i and j:</p>
                  <BlockMath>{`r_k = \\text{MRS}_{ij}^k`}</BlockMath>
                  <p>Each constraint is independent</p>
                </div>
              }
            />
          </AnalysisStep>

          <AnalysisStep stepNumber={3} title="Verification Algorithm">
            <p>
              Now we can analyze the algorithmic complexity of verifying efficiency in each system.
            </p>

            <ComparisonBox
              title="Verification Steps"
              price={
                <div>
                  <p>Algorithm:</p>
                  <ol className="list-decimal ml-4 space-y-2">
                    <li>For each pair of goods (i,j):</li>
                    <li>Compute price ratio <InlineMath>p_i/p_j</InlineMath></li>
                    <li>Verify against MRS</li>
                    <li>Check transitivity constraints</li>
                  </ol>
                  <p className="mt-4">
                    Complexity: <InlineMath>O(n^2)</InlineMath>
                  </p>
                </div>
              }
              barter={
                <div>
                  <p>Algorithm:</p>
                  <ol className="list-decimal ml-4 space-y-2">
                    <li>For each trade k:</li>
                    <li>Verify exchange ratio against MRS</li>
                  </ol>
                  <p className="mt-4">
                    Complexity: <InlineMath>O(m)</InlineMath> where typically <InlineMath>{`m \\lt n^2`}</InlineMath>
                  </p>
                </div>
              }
            />
          </AnalysisStep>

          <AnalysisStep stepNumber={4} title="Scaling Analysis">
            <p>
              Finally, we can examine how these systems scale as the market grows.
            </p>

            <div className="my-8 p-6 bg-background-secondary rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Scaling Properties</h4>
              
              <div className="space-y-6">
                <div>
                  <h5 className="font-semibold mb-2">Price-Based System</h5>
                  <ul className="list-disc ml-4 space-y-2">
                    <li>Verification cost grows quadratically with number of goods</li>
                    <li>Adding a new good requires checking n new price ratios</li>
                    <li>Must maintain global consistency</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Barter-Based System</h5>
                  <ul className="list-disc ml-4 space-y-2">
                    <li>Verification cost grows linearly with number of trades</li>
                    <li>Adding a new trade only requires checking that trade</li>
                    <li>Local consistency is sufficient</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnalysisStep>
        </Section>

        <Section title="Conclusions">
          <div className="p-6 bg-background-secondary rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
            <p>
              The barter system's key advantage comes from its local, independent nature. While 
              price-based systems require maintaining a globally consistent set of n² price ratios, 
              barter systems only need to verify m independent trades. This leads to fundamentally 
              different scaling properties:
            </p>
            <ul className="list-disc ml-8 mt-4 space-y-2">
              <li>Price-based: <InlineMath>O(n^2)</InlineMath> verification complexity</li>
              <li>Barter-based: <InlineMath>O(m)</InlineMath> verification complexity</li>
            </ul>
            <p className="mt-4">
              This suggests that barter networks might achieve practical efficiency even in cases 
              where price-based markets become computationally intractable.
            </p>
          </div>
        </Section>
      </div>
      <VerificationComplexityPage />
    </div>
  );
};

export default ComplexityAnalysisPage;
