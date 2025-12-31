import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  cardNumber: number;
  title: string;
  message: string;
  warmthLevel: number; // 1-11 for progressive warmth
}

const FlipCard = ({ cardNumber, title, message, warmthLevel }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Calculate gradient based on warmth level (1-11)
  const getWarmthGradient = () => {
    const baseHue = 35 + (warmthLevel - 1) * 3; // 35 (amber) to 65 (orange)
    const accentHue = warmthLevel > 7 ? 350 : baseHue + 10; // Add rose tones later
    
    return {
      front: `linear-gradient(145deg, hsl(${baseHue} 40% 15%) 0%, hsl(${baseHue - 5} 35% 10%) 100%)`,
      back: `linear-gradient(145deg, hsl(${baseHue} 35% 12%) 0%, hsl(${accentHue} 30% 8%) 100%)`,
      border: `hsl(${baseHue} 60% 40%)`,
      glow: `hsl(${baseHue} 80% 50% / 0.3)`,
    };
  };

  const colors = getWarmthGradient();

  return (
    <div 
      className="card-flip w-full max-w-lg mx-auto cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={cn(
          "card-flip-inner relative w-full min-h-[450px] md:min-h-[500px]",
          isFlipped && "flipped"
        )}
      >
        {/* Front of card */}
        <div 
          className="card-front absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center"
          style={{
            background: colors.front,
            border: `1px solid ${colors.border}`,
            boxShadow: `0 20px 60px -20px ${colors.glow}, inset 0 1px 0 hsl(var(--warm-gold) / 0.1)`,
          }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-warm-gold/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-warm-gold/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-warm-gold/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-warm-gold/40 rounded-br-lg" />

          {/* Card number */}
          <div className="text-warm-gold/80 font-display text-lg mb-4 tracking-widest">
            CARD
          </div>
          <div 
            className="font-display text-8xl md:text-9xl text-warm-gold text-shadow-glow animate-glow"
          >
            {cardNumber}
          </div>
          <div className="text-warm-gold/60 font-body text-xl mt-6 italic">
            {title}
          </div>
          
          {/* Tap instruction */}
          <div className="absolute bottom-8 text-warm-gold/40 text-sm font-body animate-pulse-soft">
            Tap to reveal
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="card-back absolute inset-0 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center overflow-y-auto"
          style={{
            background: colors.back,
            border: `1px solid ${colors.border}`,
            boxShadow: `0 20px 60px -20px ${colors.glow}, inset 0 1px 0 hsl(var(--warm-gold) / 0.1)`,
          }}
        >
          {/* Small card number */}
          <div className="absolute top-4 right-4 text-warm-gold/40 font-display text-sm">
            {cardNumber}/11
          </div>

          {/* Message content */}
          <div className="text-center px-2">
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/95 whitespace-pre-line">
              {message}
            </p>
          </div>

          {/* Tap instruction */}
          <div className="absolute bottom-4 text-warm-gold/40 text-xs font-body">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
