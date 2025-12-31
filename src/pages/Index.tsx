import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sparkles from "@/components/animations/Sparkles";
import GlowingParticles from "@/components/animations/GlowingParticles";
import RosePetals from "@/components/animations/RosePetals";
import FlipCard from "@/components/FlipCard";
import { cards } from "@/data/cards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight, ChevronLeft, Sparkles as SparklesIcon } from "lucide-react";

type Stage = "welcome" | "password" | "cards" | "thankyou";

const Index = () => {
  const [stage, setStage] = useState<Stage>("welcome");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate intensity based on current card (for progressive warmth)
  const warmthIntensity = stage === "cards" 
    ? 0.5 + (currentCard / 10) * 1.5 
    : stage === "thankyou" 
      ? 2 
      : 1;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "shreya") {
      setIsTransitioning(true);
      setTimeout(() => {
        setStage("cards");
        setIsTransitioning(false);
      }, 500);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setStage("thankyou");
        setIsTransitioning(false);
      }, 500);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated backgrounds */}
      <GlowingParticles intensity={warmthIntensity} warmth={stage === "cards" ? currentCard : stage === "thankyou" ? 10 : 5} />
      <Sparkles intensity={warmthIntensity * 0.8} />
      {(stage === "cards" && currentCard > 5) || stage === "thankyou" ? (
        <RosePetals intensity={warmthIntensity * 0.5} />
      ) : null}

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {stage === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <Heart className="w-16 h-16 md:w-20 md:h-20 mx-auto text-warm-rose animate-pulse-soft" fill="currentColor" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 text-shadow-glow"
              >
                Happy New Year
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-body text-xl md:text-2xl text-muted-foreground mb-4"
              >
                Something special awaits you...
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="font-body text-lg text-warm-gold/70 mb-12 italic"
              >
                A journey of 11 heartfelt messages
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Button
                  onClick={() => setStage("password")}
                  className="bg-gradient-to-r from-warm-amber to-warm-orange hover:from-warm-orange hover:to-warm-coral text-primary-foreground font-display text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Begin the Journey
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Password Screen */}
          {stage === "password" && (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-md w-full"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-8"
              >
                <SparklesIcon className="w-14 h-14 mx-auto text-warm-gold animate-glow" />
              </motion.div>
              
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Enter the Magic Word
              </h2>
              
              <p className="font-body text-lg text-muted-foreground mb-8">
                Hint: It's someone very special 💕
              </p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type the name..."
                    className={`text-center text-xl py-6 bg-secondary/50 border-warm-gold/30 focus:border-warm-gold focus:ring-warm-gold/30 transition-all ${
                      passwordError ? "border-destructive animate-shake" : ""
                    }`}
                  />
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-2 font-body"
                    >
                      That's not quite right... Try again 💫
                    </motion.p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-warm-gold to-warm-amber hover:from-warm-amber hover:to-warm-orange text-primary-foreground font-display text-lg py-6 rounded-xl shadow-lg"
                >
                  Unlock Messages
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </motion.div>
          )}

          {/* Cards Screen */}
          {stage === "cards" && (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl mx-auto"
            >
              {/* Progress indicator */}
              <div className="flex justify-center mb-6 gap-2">
                {cards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCard
                        ? "bg-warm-gold w-6"
                        : index < currentCard
                        ? "bg-warm-gold/60"
                        : "bg-warm-gold/20"
                    }`}
                  />
                ))}
              </div>

              {/* Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, x: 100, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: 15 }}
                  transition={{ duration: 0.4 }}
                >
                  <FlipCard
                    cardNumber={cards[currentCard].id}
                    title={cards[currentCard].title}
                    message={cards[currentCard].message}
                    warmthLevel={currentCard + 1}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  onClick={prevCard}
                  disabled={currentCard === 0}
                  variant="outline"
                  className="border-warm-gold/30 text-warm-gold hover:bg-warm-gold/10 disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </Button>
                
                <span className="font-body text-muted-foreground">
                  {currentCard + 1} of {cards.length}
                </span>
                
                <Button
                  onClick={nextCard}
                  className="bg-gradient-to-r from-warm-gold to-warm-amber hover:from-warm-amber hover:to-warm-orange text-primary-foreground"
                >
                  {currentCard === cards.length - 1 ? "Finish" : "Next"}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Thank You Screen */}
          {stage === "thankyou" && (
            <motion.div
              key="thankyou"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                className="mb-8 relative"
              >
                <Heart 
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto text-warm-rose animate-pulse-soft" 
                  fill="currentColor" 
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-40 h-40 md:w-48 md:h-48 border border-warm-gold/20 rounded-full" />
                </motion.div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-display text-4xl md:text-6xl text-foreground mb-6 text-shadow-glow"
              >
                Thank You
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="font-body text-xl md:text-2xl text-warm-gold mb-4"
              >
                For being till here 💕
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="font-body text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                Every word was written with you in mind.<br />
                Here's to a beautiful 2025 together.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="font-display text-3xl md:text-4xl text-warm-coral"
              >
                Happy New Year, Shreya 🥂
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12"
              >
                <Button
                  onClick={() => {
                    setStage("welcome");
                    setCurrentCard(0);
                    setPassword("");
                  }}
                  variant="outline"
                  className="border-warm-gold/30 text-warm-gold hover:bg-warm-gold/10"
                >
                  Start Over
                  <Heart className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
