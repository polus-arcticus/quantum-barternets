import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background-primary text-content-primary">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Quantum Visualizer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background-secondary p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Quantum State Explorer</h2>
            <p className="mb-4">Visualize and manipulate quantum states in an interactive 3D environment.</p>
            <Link to="/quantum" className="inline-block bg-quantum-bra text-white px-6 py-2 rounded hover:bg-opacity-90">
              Launch Explorer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

