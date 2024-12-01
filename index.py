from dotenv import load_dotenv
import os
import dimod
import dwave.system
import networkx as nx
from dwave.system import DWaveSampler, EmbeddingComposite
import matplotlib.pyplot as plt

def load_config():
    """Load configuration from .env file"""
    load_dotenv()
    
    dwave_token = os.getenv('DWAVE_TOKEN')
    if not dwave_token:
        raise ValueError("DWAVE_TOKEN not found in .env file")
        
    return {
        'token': dwave_token,
        'endpoint': os.getenv('DWAVE_ENDPOINT', 'https://cloud.dwavesys.com/sapi'),
        'solver': os.getenv('DWAVE_SOLVER', 'Advantage_system4.1')
    }

class TradeNetworkSolver:
    def __init__(self, config):
        self.G = nx.Graph()
        self.sampler = EmbeddingComposite(
            DWaveSampler(
                token=config['token'],
                endpoint=config['endpoint'],
                solver=config['solver']
            )
        )
        
    def add_trade_desire(self, owner_has, owner_wants):
        """Add an edge representing someone wants to trade what they have for something else"""
        self.G.add_edge(owner_has, owner_wants, weight=1)
        
    def build_qubo(self):
        """
        Build QUBO formulation of max-cut for trade network
        Q_{i,i} = degree(i) - sum_{j in neighbors(i)} Q_{i,j}
        Q_{i,j} = 1 if edge exists between i,j
        """
        Q = {(i, i): 0 for i in self.G.nodes}
        
        for i in self.G.nodes:
            Q[(i, i)] = -sum(self.G[i][j]['weight'] for j in self.G.neighbors(i))
            
            for j in self.G.neighbors(i):
                if i < j:
                    Q[(i, j)] = 2 * self.G[i][j]['weight']
                    
        return Q
    
    def solve(self, num_reads=1000):
        """Solve the QUBO using D-Wave's quantum annealer"""
        Q = self.build_qubo()
        
        response = self.sampler.sample_qubo(Q, num_reads=num_reads)
        
        best_solution = response.first.sample
        best_energy = response.first.energy
        
        return best_solution, best_energy
    
    def visualize_solution(self, solution):
        """Visualize the trade network with the solution"""
        pos = nx.spring_layout(self.G)
        
        plt.figure(figsize=(10, 10))
        
        # Draw nodes colored by their group
        nx.draw_networkx_nodes(self.G, pos, 
                             node_color=[solution.get(node, 0) for node in self.G.nodes],
                             node_size=500,
                             cmap=plt.cm.RdYlBu)
        
        # Draw edges
        nx.draw_networkx_edges(self.G, pos)
        
        # Add labels
        nx.draw_networkx_labels(self.G, pos)
        
        plt.title("Trade Network Solution\nRed and Blue indicate different trading groups")
        plt.axis('off')
        plt.savefig('trade_network_solution.png')
        plt.close()

def main():
    try:
        # Load configuration
        config = load_config()
        
        # Initialize solver
        solver = TradeNetworkSolver(config)
        
        # Add example trades
        example_trades = [
            ("Alice_Bike", "Bob_Laptop"),
            ("Bob_Laptop", "Charlie_Guitar"),
            ("Charlie_Guitar", "David_Camera"),
            ("David_Camera", "Alice_Bike")
        ]
        
        for has, wants in example_trades:
            solver.add_trade_desire(has, wants)
        
        # Solve the trade network
        solution, energy = solver.solve()
        
        # Print results
        print("\nSolution found:")
        print("--------------")
        for node, group in solution.items():
            print(f"{node}: {'Trade' if group == 1 else 'Keep'}")
        print(f"\nSolution energy: {energy}")
        
        # Visualize the solution
        solver.visualize_solution(solution)
        print("\nVisualization saved as 'trade_network_solution.png'")
        
    except ValueError as e:
        print(f"Configuration error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
