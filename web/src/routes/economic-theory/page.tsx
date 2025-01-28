import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-content-primary">{title}</h2>
    <div className="prose prose-lg text-content-secondary max-w-4xl">
      {children}
    </div>
  </section>
);

const TheoremBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="my-8 p-6 bg-background-secondary rounded-lg border-l-4 border-quantum-bra">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export const EconomicsPage = () => {
  const { pathname } = useLocation();
  const isIndex = pathname === '/economic-theory';
  return isIndex ? (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">
          Economic Theory: The Computational Foundations of Market Efficiency
        </h1>
        
        <p className="text-content-secondary text-xl mb-12 max-w-3xl">
          Explore how computational complexity theory reveals fundamental limits to market 
          efficiency and why barter networks might offer a path to stronger-form efficiency.
        </p>

        <Section title="The P = NP Connection">
          <p>
            Traditional economic theory often assumes markets naturally tend toward efficiency. 
            However, Maymin's groundbreaking work demonstrates that true market efficiency is 
            computationally equivalent to solving P = NP, one of computer science's greatest 
            unsolved problems. This means that markets can only be truly efficient if all 
            computationally difficult problems can be solved efficiently.
          </p>

          <TheoremBox title="Maymin's Theorem (2011)">
            <p>
              Markets are efficient if and only if P = NP. In other words, the ability to quickly 
              compute optimal trading strategies from historical price data (market efficiency) is 
              equivalent to solving any problem whose solution can be verified quickly 
              (P = NP).
            </p>
          </TheoremBox>
        </Section>

        <Section title="Exchange Systems and Chemical Equilibrium">
          <p>
            The connection between computational complexity and market efficiency becomes clearer 
            when we examine exchange systems through the lens of chemical equilibrium. Just as chemical 
            reactions reach a balance between forward and reverse processes, economic exchanges seek 
            equilibrium between different valuations.
          </p>
          
          <TheoremBox title="Exchange System Complexity">
            <p>
              The computational complexity of verifying market efficiency differs fundamentally between 
              single and double coincidence systems. This difference emerges from their underlying 
              mathematical structure and the degree of orthogonality between exchanges.
            </p>
          </TheoremBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="p-6 bg-background-secondary rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Single Coincidence (S)</h4>
              <p className="mb-4">
                In system S, only one party desires what the other has. This creates a unidirectional 
                exchange ratio:
              </p>
              <BlockMath>{`\\frac{X}{Y} = r`}</BlockMath>
              <p className="mt-4">
                This system requires future transactions to compensate for accepting unwanted goods, 
                creating complex dependencies across the network.
              </p>
            </div>

            <div className="p-6 bg-background-secondary rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Double Coincidence (D)</h4>
              <p className="mb-4">
                System D represents mutual desire for exchange, creating two simultaneous ratios:
              </p>
              <BlockMath>{`\\begin{align}
\\frac{X}{Y} &= r_1 \\text{ (A's valuation)} \\\\
\\frac{Y}{X} &= \\frac{1}{r_2} \\text{ (B's valuation)}
\\end{align}`}</BlockMath>
              <p className="mt-4">
                For trade to occur, these ratios must align: <InlineMath>{`r_1 = r_2`}</InlineMath>, similar 
                to how forward and reverse reaction rates equilibrate in chemistry.
              </p>
            </div>
          </div>

          <div className="my-8 p-6 bg-background-secondary rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Verification Complexity Analysis</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Single Coincidence (Price) Systems</h4>
                <p>
                  In a price-based system with n goods, verifying efficiency requires checking:
                </p>
                <BlockMath>{`\\text{For each good i:} \\sum_{j=1}^n \\text{Price}_i \\cdot \\text{Flow}_{ij} \\text{ is optimal}`}</BlockMath>
                <p>
                  This requires O(n²) comparisons, as each good's price relationships with all other 
                  goods must be checked independently. More importantly, these checks are not 
                  orthogonal - a price change in one good affects all its relationships simultaneously.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Double Coincidence (Barter) Systems</h4>
                <p>
                  In a barter system, each exchange contains its own complete equilibrium:
                </p>
                <BlockMath>{`\\text{For each exchange E:} \\frac{\\text{Good}_i}{\\text{Good}_j}|_A = \\frac{\\text{Good}_j}{\\text{Good}_i}|_B`}</BlockMath>
                <p>
                  Like chemical equilibrium, each exchange is locally self-contained. Verification requires 
                  only O(m) checks where m is the number of actual exchanges, not n² potential relationships. 
                  Furthermore, these checks are orthogonal - each exchange's equilibrium can be verified 
                  independently.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">The Chemical Equilibrium Analogy</h4>
                <p>
                  This difference mirrors how chemical equilibria are verified. Checking global concentration 
                  balances (analogous to price systems) is more complex than verifying individual reaction 
                  equilibria (analogous to barter exchanges). Each barter exchange, like a chemical reaction, 
                  contains its own "forward/reverse" balance that can be verified independently.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6">
            This orthogonality in barter systems leads to a fundamental computational advantage: while 
            price-based efficiency requires checking a dense n × n matrix of relationships, barter 
            efficiency can be verified through m independent local checks. This suggests that barter 
            networks might achieve a form of strong efficiency even when global price efficiency remains 
            computationally intractable.
          </p>
        </Section>

        <Section title="Information Density and Network Effects">
          <p>
            The higher information density in barter networks arises from the simultaneous capture 
            of two independent valuations within each transaction. This creates a richer information 
            structure that might support stronger forms of market efficiency, even when global 
            efficiency (P = NP) is unattainable.
          </p>
          
          <p className="mt-4">
            Maymin's work suggests that as the amount of price history increases, either through time 
            or higher frequency data, markets should become less efficient due to the exponential growth 
            in possible trading strategies to evaluate. However, barter networks' higher information 
            density might provide a partial solution by encoding more valuation information in each 
            transaction.
          </p>
        </Section>

        <Section title="Practical Implications">
          <p>
            Given that P ≠ NP is widely believed to be true, we must accept that perfect market 
            efficiency is likely impossible. However, this insight points us toward practical solutions:
          </p>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-background-secondary rounded-lg">
              <h4 className="font-semibold mb-2">1. Focus on Local Efficiency</h4>
              <p>
                Rather than seeking global efficiency, optimize for local market segments where 
                computational complexity remains manageable.
              </p>
            </div>

            <div className="p-4 bg-background-secondary rounded-lg">
              <h4 className="font-semibold mb-2">2. Leverage Barter Networks</h4>
              <p>
                Utilize the higher information density of barter exchanges to achieve stronger 
                local efficiency even when global efficiency is unattainable.
              </p>
            </div>

            <div className="p-4 bg-background-secondary rounded-lg">
              <h4 className="font-semibold mb-2">3. Adaptive Market Design</h4>
              <p>
                Design market mechanisms that acknowledge computational limits while maximizing 
                efficiency within those constraints.
              </p>
            </div>
          </div>
        </Section>

        <div className="mt-12 p-6 bg-background-secondary rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Explore Further</h3>
          <p className="text-content-secondary mb-4">
            Dive deeper into these concepts through our detailed analyses and practical applications.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/economic-theory/why-barter" 
              className="inline-flex items-center px-4 py-2 bg-quantum-bra text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Why Barter Matters
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};

export default EconomicsPage;
