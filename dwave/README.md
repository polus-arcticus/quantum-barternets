# Quantum Barter Network

A quantum computing approach to optimizing multi-party barter trades using D-Wave's quantum annealer.

## Overview

The Quantum Barter Network solves the complex problem of finding optimal trading matches in a barter system where multiple parties each have items they want to trade for other items. By formulating this as a quantum optimization problem (specifically, a max-cut problem), we can find efficient trade configurations that maximize successful exchanges.

## How It Works

The system models trades as a graph problem where:
- Nodes represent items owned by participants
- Edges represent desired trades between items
- A maximum cut separates items into "trade" and "keep" groups
- Cut edges represent actual trades that should occur

The problem is solved using D-Wave's quantum annealer by:
1. Converting the trade network to a QUBO (Quadratic Unconstrained Binary Optimization) formulation
2. Using quantum annealing to find the optimal solution
3. Interpreting the results to determine which trades should occur

## Prerequisites

- Python 3.7+
- A D-Wave account and API token
- Required Python packages:
  - dwave-ocean-sdk
  - networkx
  - matplotlib
  - python-dotenv

## Installation

1. Create a virtual environment:
```bash
python3 -m venv dwave-trade-env
source dwave-trade-env/bin/activate  # On Windows: .\dwave-trade-env\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with your D-Wave credentials:
```
DWAVE_TOKEN=your-api-token-here
DWAVE_ENDPOINT=https://cloud.dwavesys.com/sapi
DWAVE_SOLVER=Advantage_system4.1
```

## Usage

Run the main program:
```bash
python index.py
```

The program will:
1. Load your trade network
2. Solve for optimal trades using D-Wave's quantum annealer
3. Display results and generate a visualization

## Example

```python
# Create a trade network
solver = TradeNetworkSolver(config)

# Add desired trades
solver.add_trade_desire("Alice_Bike", "Bob_Laptop")
solver.add_trade_desire("Bob_Laptop", "Charlie_Guitar")
solver.add_trade_desire("Charlie_Guitar", "Alice_Bike")

# Find optimal trades
solution, energy = solver.solve()
```

## Technical Details

### QUBO Formulation

The trade matching is formulated as a max-cut problem with:
- Binary variables representing whether items are in the "trade" or "keep" group
- Objective function maximizing successful trades
- Constraints ensuring trade consistency

### Quantum Annealing

The D-Wave quantum annealer finds the ground state of the QUBO, which represents the optimal trading configuration by:
1. Preparing qubits in a quantum superposition
2. Gradually evolving the system
3. Measuring the final state to get the solution

## Visualization

The program generates a visualization showing:
- Items as nodes
- Desired trades as edges
- Color coding for trade/keep groups
- The output is saved as 'trade_network_solution.png'

## Limitations

- Limited by the number of available qubits on the D-Wave machine
- Solution quality depends on the quantum annealing parameters
- Larger trade networks may require problem decomposition

## Future Improvements

- Add trade preferences and item values
- Implement multi-hop trade chains
- Add trust scores between traders
- Include time constraints for trades
- Support partial trades

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- D-Wave Systems for their quantum computing platform
- The NetworkX team for their graph theory tools
