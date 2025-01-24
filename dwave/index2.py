import dimod
import neal
from collections import defaultdict

class QuantumBarterSolver:
    def __init__(self, chains):
        self.chains = chains
        self.people_in_chain = self._index_chains_by_people()
        self.items_in_chain = self._index_chains_by_items()
        
    def _index_chains_by_people(self):
        """Create index of which chains involve which people"""
        people_chains = defaultdict(set)
        for i, chain in enumerate(self.chains):
            for person, _ in chain:
                people_chains[person].add(i)
        return people_chains
    
    def _index_chains_by_items(self):
        """Create index of which chains involve which items"""
        items_chains = defaultdict(set)
        for i, chain in enumerate(self.chains):
            for _, item in chain:
                items_chains[item].add(i)
        return items_chains
        
    def build_qubo(self, chain_weight=1.0, conflict_weight=2.0):
        """
        Build QUBO formulation of the chain selection problem.
        
        Variables:
        - One binary variable per chain (1 = execute, 0 = don't execute)
        
        Terms:
        - Linear terms (chain_weight * chain_length) encourage selecting longer chains
        - Quadratic terms (-conflict_weight) penalize selecting conflicting chains
        """
        Q = defaultdict(float)
        
        # Add linear terms to maximize chain lengths
        for i, chain in enumerate(self.chains):
            Q[(i, i)] = -chain_weight * len(chain)
            
        # Add quadratic terms to penalize conflicts
        
        # People conflicts
        for person, chain_indices in self.people_in_chain.items():
            for i in chain_indices:
                for j in chain_indices:
                    if i < j:  # Only add each pair once
                        Q[(i, j)] += conflict_weight
                        
        # Item conflicts
        for item, chain_indices in self.items_in_chain.items():
            for i in chain_indices:
                for j in chain_indices:
                    if i < j:  # Only add each pair once
                        Q[(i, j)] += conflict_weight
                        
        return Q
    
    def solve(self, num_reads=1000):
        """
        Solve the QUBO using simulated annealing.
        In practice, this would be solved using D-Wave's quantum annealer.
        """
        # Build QUBO
        Q = self.build_qubo()
        
        # Create sampler (using simulated annealing for demonstration)
        sampler = neal.SimulatedAnnealingSampler()
        
        # Sample from the QUBO
        response = sampler.sample_qubo(Q, num_reads=num_reads)
        
        # Get best solution
        best_sample = response.first.sample
        
        # Extract selected chains
        selected_chains = []
        total_trades = 0
        for i, selected in best_sample.items():
            if selected == 1:
                selected_chains.append(self.chains[i])
                total_trades += len(self.chains[i])
                
        return selected_chains, total_trades
    
    def to_ising(self):
        """
        Convert QUBO to Ising formulation.
        Returns (h, J) where:
        - h: linear terms (local fields)
        - J: quadratic terms (coupling strengths)
        """
        Q = self.build_qubo()
        return dimod.qubo_to_ising(Q)

def print_solution(selected_chains):
    """Pretty print the solution"""
    print(f"\nSelected {len(selected_chains)} chains for execution:")
    total_trades = 0
    
    for i, chain in enumerate(selected_chains, 1):
        print(f"\nChain {i} (length {len(chain)}):")
        for j, (person, item) in enumerate(chain):
            next_person = chain[(j + 1) % len(chain)][0]
            print(f"  {person} gives {item} to {next_person}")
        total_trades += len(chain)
    
    print(f"\nTotal trades to be executed: {total_trades}")

# Example usage
def example():
    # Create some example chains
    chains = [
        # Chain 1: Alice -> Bob -> Charlie -> Alice
        [("Alice", "bike"), ("Bob", "laptop"), ("Charlie", "guitar")],
        
        # Chain 2: David -> Eve -> David
        [("David", "camera"), ("Eve", "phone")],
        
        # Chain 3: Alice -> Eve -> Charlie -> Alice (conflicts with Chain 1)
        [("Alice", "bike"), ("Eve", "phone"), ("Charlie", "guitar")],
    ]
    
    # Create and solve
    solver = QuantumBarterSolver(chains)
    
    # Get Ising formulation
    h, J = solver.to_ising()
    print("\nIsing formulation:")
    print("h (local fields):", h)
    print("J (couplings):", dict(J))
    
    # Solve using simulated annealing
    selected_chains, total_trades = solver.solve()
    
    # Print solution
    print_solution(selected_chains)

if __name__ == "__main__":
    example()
