export interface QuantumState {
  x: number;
  y: number;
  z: number;
}

export interface OperatorMatrix {
  X: number[][];
  Y: number[][];
  Z: number[][];
}

export type OperatorType = 'X' | 'Y' | 'Z';
