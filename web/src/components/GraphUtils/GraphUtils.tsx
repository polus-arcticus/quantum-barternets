
import { Vector3, Quaternion, DoubleSide } from 'three';
import { Html } from '@react-three/drei';

import { create, all } from 'mathjs';
const math = create(all);

export const StateArrow = ({ end = [1, 0, 0], color = '#4299E1', isConjugate = false }) => {
  // Convert input array to Vector3
  const endVector = new Vector3(...end);
  const length = endVector.length();
  
  // Skip rendering if vector has no length
  if (length === 0) return null;
  
  // Create direction vector from origin to end point
  const direction = endVector.clone().normalize();
  
  // Calculate quaternion rotation from default cylinder orientation (y-axis)
  // to desired direction
  const defaultUp = new Vector3(0, 1, 0);
  const quaternion = new Quaternion();
  quaternion.setFromUnitVectors(defaultUp, direction);
  
  // Use different styles for ket vs bra vectors
  const arrowRadius = isConjugate ? 0.05 : 0.03;
  const headRadius = isConjugate ? 0.1 : 0.08;
  const opacity = isConjugate ? 0.6 : 1;
  
  return (
    <group>
      <group quaternion={quaternion}>
        {/* Arrow shaft */}
        <mesh position={[0, length/2, 0]}>
          <cylinderGeometry args={[arrowRadius, arrowRadius, length, 16]} />
          <meshStandardMaterial color={color} transparent opacity={opacity} />
        </mesh>
        
        {/* Arrow head */}
        <mesh position={[0, length, 0]}>
          <coneGeometry args={[headRadius, 0.2, 16]} />
          <meshStandardMaterial color={color} transparent opacity={opacity} />
        </mesh>
      </group>
    </group>
  );
};

export const StateLabel = ({ position, label, color = "black" }) => (
  <Html position={position}>
    <div style={{ 
      color: color,
      fontFamily: 'math',
      fontSize: '14px',
      userSelect: 'none'
    }}>
      {label}
    </div>
  </Html>
);


export const BlochSphere = ({ theta = 0, phi = 0 }) => {
  // Convert spherical coordinates to Cartesian for the state vector
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);

  return (
    <group>
      {/* Sphere surface */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial 
          color="#f0f0f0" 
          transparent={true} 
          opacity={0.3} 
          side={DoubleSide}
        />
      </mesh>
      
      {/* Equator circle */}
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color="#666666" />
      </mesh>
      
      {/* Axes */}
      <group>
        {/* Z-axis */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 2.4]} />
          <meshBasicMaterial color="#0000ff" />
        </mesh>
        <StateLabel position={[0, 1.4, 0]} label="|0⟩" color="#0000ff" />
        <StateLabel position={[0, -1.4, 0]} label="|1⟩" color="#0000ff" />

        {/* X-axis */}
        <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.01, 0.01, 2.4]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
        <StateLabel position={[1.4, 0, 0]} label="|+⟩" color="#ff0000" />
        <StateLabel position={[-1.4, 0, 0]} label="|-⟩" color="#ff0000" />

        {/* Y-axis */}
        <mesh position={[0, 0, 1.2]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 2.4]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
        <StateLabel position={[0, 0, 1.4]} label="|i⟩" color="#00ff00" />
        <StateLabel position={[0, 0, -1.4]} label="|-i⟩" color="#00ff00" />
      </group>

      {/* State vector */}
      <StateArrow end={[x, y, z]} color="#ff0000" />
    </group>
  );
};
