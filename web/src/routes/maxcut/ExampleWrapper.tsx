// src/routes/maxcut/ExampleWrapper.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TwoVertexExample } from './TwoVertexExample';
import { ThreeVertexExample } from './ThreeVertexExample';

export const ExampleWrapper = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const examples = [
    { component: <TwoVertexExample />, title: "Two Vertex Example" },
    { component: <ThreeVertexExample />, title: "Three Vertex Example" }
  ];

  const goToNext = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
  };

  const goToPrev = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <div className="relative">
      {examples[currentExample].component}
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPrev}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-background-tertiary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          {examples[(currentExample - 1 + examples.length) % examples.length].title}
        </button>
        
        <div className="flex gap-2">
          {examples.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentExample(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentExample 
                  ? 'bg-quantum-bra' 
                  : 'bg-background-tertiary hover:bg-content-tertiary'
              }`}
              aria-label={`Go to example ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-background-tertiary transition-colors"
        >
          {examples[(currentExample + 1) % examples.length].title}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
