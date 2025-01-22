import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { HomePage } from './routes/home/page';
import { QuantumPage } from './routes/quantum/page';
import 'katex/dist/katex.min.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quantum" element={<QuantumPage />} />
      </Routes>
    </BrowserRouter>
  );
};
