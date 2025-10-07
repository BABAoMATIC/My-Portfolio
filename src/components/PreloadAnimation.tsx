import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloadAnimationProps {}

const PreloadAnimation: React.FC<PreloadAnimationProps> = () => {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [preloadStatus, setPreloadStatus] = useState('');
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const preloadedVideos = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    // Video files to preload
    const videoFiles = [
      '/videos/hero2.webm',  // Start with hero2
      '/videos/hero4.mp4',
      '/videos/hero5.webm',
      '/videos/hero6.mp4',
      '/videos/hero7.webm',
      '/videos/hero8.webm',
      '/videos/hero9.webm',
      '/videos/hero10.webm',
      '/videos/hero11.webm'    // Removed problematic hero1.mp4
    ];

    // Aggressive video preloading optimized for Vercel deployment
    const preloadAllVideos = () => {
      setPreloadStatus('Loading portfolio videos...');
      let loadedCount = 0;
      let totalSize = 0;
      
      videoFiles.forEach((videoSrc, index) => {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.load();
        
        preloadedVideos.current.push(video);
        
        video.addEventListener('canplaythrough', () => {
          loadedCount++;
          const percentage = ((loadedCount/videoFiles.length)*100).toFixed(0);
          setPreloadStatus(`Preloaded ${loadedCount}/${videoFiles.length} videos (${percentage}%)`);
          console.log(`✅ Preloaded video ${index + 1}: ${videoSrc}`);
          
          // Track total buffered size
          if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            totalSize += bufferedEnd;
            console.log(`📊 Total buffered: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
          }
          
          // Update progress bar based on video loading
          if (loadedCount === videoFiles.length) {
            setPreloadStatus('All videos loaded! Starting portfolio...');
          }
        });
        
        video.addEventListener('progress', () => {
          if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const duration = video.duration;
            const bufferedPercent = (bufferedEnd / duration) * 100;
            console.log(`📈 Video ${index + 1} buffered: ${bufferedPercent.toFixed(1)}%`);
          }
        });
        
        video.addEventListener('error', (e) => {
          console.warn(`⚠️ Failed to preload video ${index + 1}: ${videoSrc}`, e);
          // Continue with other videos even if one fails
        });
        
        video.addEventListener('loadstart', () => {
          console.log(`🔄 Starting preload for video ${index + 1}: ${videoSrc}`);
        });
      });
    };

    // Start video preloading immediately
    preloadAllVideos();

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
    // Progress animation that syncs with video loading
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1.5; // Slower progress to sync with video loading
      setProgress(Math.min(currentProgress, 95)); // Don't reach 100% until videos are loaded
      if (currentProgress >= 95) {
        clearInterval(interval);
      }
    }, 50);
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
            <div className="text-lg text-gray-300 font-inter mb-2">
              {progress}%
            </div>
            {preloadStatus && (
              <div className="text-sm text-gray-400 font-inter">
                {preloadStatus}
              </div>
            )}
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
