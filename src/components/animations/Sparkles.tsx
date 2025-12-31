import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface SparklesProps {
  intensity?: number;
}

const Sparkles = ({ intensity = 1 }: SparklesProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const count = Math.floor(50 * intensity);
    const newSparkles: Sparkle[] = [];
    
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    
    setSparkles(newSparkles);
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            background: `radial-gradient(circle, hsl(42 85% 70%) 0%, transparent 70%)`,
            animation: `fall ${sparkle.duration + 5}s linear infinite`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: `0 0 ${sparkle.size * 2}px hsl(42 85% 60% / 0.6)`,
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
