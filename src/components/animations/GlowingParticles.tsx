import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: number;
  delay: number;
}

interface GlowingParticlesProps {
  intensity?: number;
  warmth?: number; // 0-10, affects color warmth
}

const GlowingParticles = ({ intensity = 1, warmth = 5 }: GlowingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = Math.floor(30 * intensity);
    const newParticles: Particle[] = [];
    
    // Hue ranges from amber (35) to rose (350) based on warmth
    const baseHue = 35 + (warmth / 10) * 30; // 35-65 range (amber to orange)
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 40,
        hue: baseHue + (Math.random() - 0.5) * 20,
        delay: Math.random() * 8,
      });
    }
    
    setParticles(newParticles);
  }, [intensity, warmth]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(${particle.hue} 80% 50% / 0.15) 0%, transparent 70%)`,
            animation: `drift 15s ease-in-out infinite, pulse-glow 4s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default GlowingParticles;
