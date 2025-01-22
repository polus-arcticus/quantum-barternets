import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-content-secondary hover:text-content-primary ${
        isActive 
          ? 'bg-background-secondary text-quantum-bra' 
          : 'hover:bg-background-tertiary'
      }`}
    >
      {children}
    </Link>
  );
};

export const Nav = () => (
  <nav className="sticky top-0 z-50 w-full bg-background-primary/80 backdrop-blur-sm border-b border-background-tertiary">
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-content-primary hover:text-quantum-bra transition-colors duration-200">
          Quantum Viz
        </Link>
        <div className="flex gap-3">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/basics">Basics</NavLink>
          <NavLink to="/sdp">SDP</NavLink>
          <NavLink to="/maxcut">Max-Cut</NavLink>
        </div>
      </div>
    </div>
  </nav>
);
