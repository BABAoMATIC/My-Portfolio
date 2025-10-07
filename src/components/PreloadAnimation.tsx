import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloadAnimationProps {}

const PreloadAnimation: React.FC<PreloadAnimationProps> = () => {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Typing effect simulation
    const text = "Nishit Bhardwaj";
    let currentText = "";
    let index = 0;

    const typeText = () => {
      if (index < text.length) {
        currentText += text[index];
        if (textRef.current) {
          textRef.current.textContent = currentText;
        }
        index++;
        setTimeout(typeText, 150);
      } else {
        setShowProgress(true);
        startProgressAnimation();
      }
    };

    setTimeout(typeText, 500);
  }, []);

  const startProgressAnimation = () => {
    // Simple progress animation using setInterval
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 40);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-bg via-dark-bg to-neon-purple/20"
    >
      <div className="text-center">
        {/* Main Title */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold gradient-text mb-8 font-urbanist"
        >
          Nishit Bhardwaj
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 font-inter"
        >
          Full Stack Developer | Data Scientist
        </motion.div>

        {/* Progress Bar */}
        {showProgress && (
          <motion.div
            ref={progressRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-80 mx-auto"
          >
            <div className="bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-lg text-gray-300 font-inter">
              {progress}%
            </div>
          </motion.div>
        )}

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center space-x-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-neon-purple rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PreloadAnimation;
