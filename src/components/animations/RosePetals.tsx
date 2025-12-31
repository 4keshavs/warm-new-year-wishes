import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

interface RosePetalsProps {
  intensity?: number;
}

const RosePetals = ({ intensity = 1 }: RosePetalsProps) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const count = Math.floor(20 * intensity);
    const newPetals: Petal[] = [];
    
    for (let i = 0; i < count; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 10,
        rotation: Math.random() * 360,
      });
    }
    
    setPetals(newPetals);
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-50px',
            width: petal.size,
            height: petal.size * 1.2,
            animation: `fall ${petal.duration}s linear infinite, sway ${petal.duration / 2}s ease-in-out infinite`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          <svg
            viewBox="0 0 24 30"
            fill="none"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          >
            <path
              d="M12 0C12 0 4 8 4 16C4 22 8 28 12 30C16 28 20 22 20 16C20 8 12 0 12 0Z"
              fill={`hsl(${350 + Math.random() * 20} 70% ${55 + Math.random() * 15}%)`}
              opacity="0.85"
            />
            <path
              d="M12 2C12 2 7 9 7 15C7 20 9 25 12 27"
              stroke="hsl(350 60% 45%)"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default RosePetals;
