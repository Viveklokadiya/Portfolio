'use client'

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  animationDelay: string;
}

export default function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < 9; i++) {
      particleArray.push({
        id: i,
        left: `${10 + i * 10}%`,
        animationDelay: `${i * 2}s`
      });
    }
    setParticles(particleArray);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle animate-particle"
          style={{
            left: particle.left,
            animationDelay: particle.animationDelay
          }}
        />
      ))}
    </div>
  );
}
