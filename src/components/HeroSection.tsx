import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  isDarkMode: boolean;
}

// Enhanced Typing Animation Component with Endless Loop
const TypingAnimation: React.FC<{ text: string; speed?: number; eraseSpeed?: number; pauseTime?: number }> = ({ 
  text, 
  speed = 80, 
  eraseSpeed = 50, 
  pauseTime = 2000 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsErasing(true);
        setCurrentIndex(text.length - 1);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (isErasing) {
      if (currentIndex >= 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        }, eraseSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished erasing, start typing again
        setIsErasing(false);
        setCurrentIndex(0);
        setDisplayedText('');
      }
    } else {
      // Typing phase
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before erasing
        setIsPaused(true);
      }
    }
  }, [currentIndex, text, speed, eraseSpeed, pauseTime, isErasing, isPaused]);

  return (
    <span className="relative">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 text-blue-400"
      >
        |
      </motion.span>
    </span>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ isDarkMode }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Set<number>>(new Set()); // Track failed videos
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Track if video is playing
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadVideosRef = useRef<HTMLVideoElement[]>([]); // Track preloaded videos

    const videoFiles = useMemo(() => [
      '/videos/hero2.webm',   // hero2.webm - Start with this
      '/videos/hero4.webm',   // hero4.webm - Use webm version instead of mp4
      '/videos/hero5.webm',   // hero5.webm
      '/videos/hero6.webm',   // hero6.webm - Use webm version instead of mp4
      '/videos/hero7.webm',   // hero7.webm
      '/videos/hero8.webm',   // hero8.webm
      '/videos/hero9.webm',   // hero9.webm
      '/videos/hero10.webm',  // hero10.webm
      '/videos/hero11.webm'   // hero11.webm - Removed problematic hero1.mp4
    ], []);

  // Function to get next available video (skipping failed ones)
  const getNextAvailableVideo = (currentIndex: number): number => {
    let nextIndex = (currentIndex + 1) % videoFiles.length;
    let attempts = 0;
    
    // Keep trying until we find a working video or tried all videos
    while (failedVideos.has(nextIndex) && attempts < videoFiles.length) {
      nextIndex = (nextIndex + 1) % videoFiles.length;
      attempts++;
    }
    
    // If all videos failed, reset failed videos and start fresh
    if (attempts >= videoFiles.length) {
      console.log('🔄 All videos failed, resetting failed videos list');
      setFailedVideos(new Set());
      nextIndex = (currentIndex + 1) % videoFiles.length;
    }
    
    return nextIndex;
  };

  // Function to handle video errors and switch to next video
  const handleVideoError = (videoIndex: number, error: any) => {
    console.error(`❌ Video ${videoIndex + 1} failed: ${videoFiles[videoIndex]}`, error);
    
    // Mark video as failed
    setFailedVideos(prev => {
      const newSet = new Set(prev);
      newSet.add(videoIndex);
      return newSet;
    });
    
    // Stop current video if it's the failed one
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    // Switch to next available video immediately
    const nextIndex = getNextAvailableVideo(videoIndex);
    console.log(`🔄 Switching to next available video: ${nextIndex + 1}`);
    
    setTimeout(() => {
      setCurrentVideoIndex(nextIndex);
      setVideoError(false);
      setRetryCount(0);
      setIsVideoLoading(false);
    }, 500); // Small delay to ensure clean transition
  };

  useEffect(() => {
    // Smart preloading with comprehensive error handling
    const smartPreloadVideos = () => {
      console.log('🚀 Starting smart video preloading with error handling...');
      
      // Clear previous preloaded videos
      preloadVideosRef.current.forEach(video => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });
      preloadVideosRef.current = [];
      
      // Preload all videos in background with smart strategy
      videoFiles.forEach((videoSrc, index) => {
        // Skip if video is already marked as failed
        if (failedVideos.has(index)) {
          console.log(`⏭️ Skipping failed video ${index + 1}: ${videoSrc}`);
          return;
        }
        
        const video = document.createElement('video');
        video.src = videoSrc;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.style.display = 'none';
        video.volume = 0;
        
        // Store reference for cleanup
        preloadVideosRef.current.push(video);
        
        // Add to DOM to trigger preloading
        document.body.appendChild(video);
        
        video.addEventListener('canplaythrough', () => {
          console.log(`✅ Video ${index + 1} preloaded successfully: ${videoSrc}`);
        });
        
        video.addEventListener('error', (e) => {
          console.warn(`⚠️ Video ${index + 1} preload failed: ${videoSrc}`, e);
          // Mark as failed
          setFailedVideos(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
          // Remove from DOM
          if (video.parentNode) {
            video.parentNode.removeChild(video);
          }
          // Remove from refs
          preloadVideosRef.current = preloadVideosRef.current.filter(v => v !== video);
        });
        
        video.load();
      });
    };

    // Start smart preloading
    smartPreloadVideos();

    // Cleanup function
    return () => {
      preloadVideosRef.current.forEach(video => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });
      preloadVideosRef.current = [];
    };
  }, [videoFiles, failedVideos]);

  // Video switching interval with error handling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => {
        const nextIndex = getNextAvailableVideo(prev);
        console.log(`🎬 Switching to video ${nextIndex + 1}/${videoFiles.length}: ${videoFiles[nextIndex]}`);
        setVideoError(false);
        setIsVideoLoading(false);
        setRetryCount(0);
        return nextIndex;
      });
    }, 30000); // 30 seconds for better user experience

    return () => clearInterval(interval);
  }, [videoFiles, failedVideos]);

    // Reset error state and ensure single video playback when video index changes
    useEffect(() => {
      setVideoError(false);
      setIsVideoLoading(false);
      setRetryCount(0);
      setIsVideoPlaying(false);
      
      // Stop all other videos and ensure only current video plays
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        
        // Try to play new video after a short delay
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setIsVideoPlaying(true);
                console.log(`▶️ Video ${currentVideoIndex + 1} started playing`);
              })
              .catch((error) => {
                console.error(`❌ Failed to play video ${currentVideoIndex + 1}:`, error);
                handleVideoError(currentVideoIndex, error);
              });
          }
        }, 100);
      }
    }, [currentVideoIndex]);

  // Component cleanup - ensure no video overlap on unmount
  useEffect(() => {
    return () => {
      // Stop current video on unmount
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      
      // Clean up preloaded videos
      preloadVideosRef.current.forEach(video => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });
      preloadVideosRef.current = [];
    };
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Nishit_Bhardwaj_Resume.pdf';
    link.click();
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background with Smooth Transitions */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <AnimatePresence mode="wait">
          {!videoError ? (
            <motion.video
              key={currentVideoIndex}
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster=""
              crossOrigin="anonymous"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              onLoadedData={() => {
                setIsVideoLoading(false);
                if (videoRef.current && !isVideoPlaying) {
                  videoRef.current.play()
                    .then(() => setIsVideoPlaying(true))
                    .catch((error) => handleVideoError(currentVideoIndex, error));
                }
              }}
              onCanPlay={() => {
                setIsVideoLoading(false);
                if (videoRef.current && !isVideoPlaying) {
                  videoRef.current.play()
                    .then(() => setIsVideoPlaying(true))
                    .catch((error) => handleVideoError(currentVideoIndex, error));
                }
              }}
              onCanPlayThrough={() => {
                // Video can play through without stopping
                setIsVideoLoading(false);
                console.log(`✅ Video ${currentVideoIndex + 1} fully loaded and ready`);
              }}
              onWaiting={() => {
                // Video is buffering
                setIsVideoLoading(true);
                console.log(`⏳ Video ${currentVideoIndex + 1} buffering...`);
              }}
                onError={(e) => {
                  console.error('Video loading error:', e);
                  setIsVideoLoading(false);
                  setIsVideoPlaying(false);
                  handleVideoError(currentVideoIndex, e);
                }}
                onAbort={() => {
                  console.log(`⏹️ Video ${currentVideoIndex + 1} aborted`);
                  // Don't treat abort as error, just log it
                }}
                onLoadStart={() => {
                  setIsVideoLoading(true);
                  console.log(`🔄 Starting to load video ${currentVideoIndex + 1}`);
                }}
                onLoadedMetadata={() => {
                  console.log(`📊 Video ${currentVideoIndex + 1} metadata loaded`);
                  if (videoRef.current && !isVideoPlaying) {
                    videoRef.current.play()
                      .then(() => setIsVideoPlaying(true))
                      .catch((error) => handleVideoError(currentVideoIndex, error));
                  }
                }}
              onProgress={() => {
                // Video is downloading/buffering
                if (videoRef.current) {
                  const buffered = videoRef.current.buffered;
                  if (buffered.length > 0) {
                    const bufferedEnd = buffered.end(buffered.length - 1);
                    const duration = videoRef.current.duration;
                    const bufferedPercent = (bufferedEnd / duration) * 100;
                    console.log(`📊 Video ${currentVideoIndex + 1} buffered: ${bufferedPercent.toFixed(1)}%`);
                  }
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.8) contrast(1.1)', // Enhanced visual quality
                transform: 'scale(1.02)', // Slight zoom to prevent black borders
                willChange: 'transform, opacity' // Optimize for animations
              }}
            >
              <source src={videoFiles[currentVideoIndex]} type="video/webm" />
            </motion.video>
          ) : (
            /* Fallback background when video fails to load */
            <motion.div
              key={`fallback-${currentVideoIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse" />
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce" />
                <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Dark Overlay - 40% opacity */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* No loading indicator - videos start immediately */}
        
        {/* Subtle Animated Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
        />
        
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="text-center px-4 w-full max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 font-urbanist text-shadow-lg leading-tight"
          >
            Nishit Bhardwaj
          </motion.h1>

          {/* Subtitle with Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 font-inter min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center px-2"
          >
            <TypingAnimation 
              text="Full Stack Developer | Data Scientist" 
              speed={80}
              eraseSpeed={50}
              pauseTime={2000}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-inter px-4 leading-relaxed"
          >
            Passionate about creating innovative solutions and turning data into actionable insights. 
            Building the future with code and creativity.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12 px-4"
          >
            <button
              onClick={scrollToProjects}
              className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 group w-full sm:w-auto"
            >
              <span>View Projects</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </button>
            
            <button
              onClick={handleDownloadResume}
              className="btn-secondary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 group w-full sm:w-auto"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6 flex-wrap gap-3 sm:gap-4"
          >
            <motion.a
              href="https://www.linkedin.com/in/nishitbhardwaj4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-neon-cyan transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://github.com/BABAoMATIC"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-neon-purple transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.instagram.com/babaomatic?igsh=Yjc1cnhpdWt6OHdw"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-pink-400 transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://wa.me/919351399555"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-green-400 transition-colors" />
            </motion.a>
          </motion.div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-purple/30 rounded-full"
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
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
