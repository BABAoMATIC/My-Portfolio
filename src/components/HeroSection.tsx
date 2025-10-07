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
  const [isVideoLoading, setIsVideoLoading] = useState(false); // No initial loading state
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

    const videoFiles = useMemo(() => [
      '/videos/hero2.webm',  // hero2.webm - Start with this
      '/videos/hero4.mp4',   // hero4.mp4
      '/videos/hero5.webm',  // hero5.webm
      '/videos/hero6.mp4',   // hero6.mp4
      '/videos/hero7.webm',  // hero7.webm
      '/videos/hero8.webm',  // hero8.webm
      '/videos/hero9.webm',  // hero9.webm
      '/videos/hero10.webm', // hero10.webm
      '/videos/hero11.webm'   // hero11.webm - Removed problematic hero1.mp4
    ], []);

  useEffect(() => {
    // Immediate video preloading without delays
    const preloadVideosImmediately = () => {
      console.log('🚀 Starting immediate video preloading...');
      
      // Preload first few videos immediately
      for (let i = 0; i < Math.min(3, videoFiles.length); i++) {
        const video = document.createElement('video');
        video.src = videoFiles[i];
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.load();
        
        video.addEventListener('canplaythrough', () => {
          console.log(`✅ Video ${i + 1} ready: ${videoFiles[i]}`);
        });
        
        video.addEventListener('error', (e) => {
          console.warn(`⚠️ Video ${i + 1} failed: ${videoFiles[i]}`, e);
        });
      }
    };

    // Start preloading immediately
    preloadVideosImmediately();

    // Ensure video starts playing immediately when component mounts
    const playVideoImmediately = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(console.log);
      }
    };
    
    // Try to play video immediately
    playVideoImmediately();

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => {
        const nextIndex = (prev + 1) % videoFiles.length;
        console.log(`🎬 Switching to video ${nextIndex + 1}/${videoFiles.length}: ${videoFiles[nextIndex]}`);
        setVideoError(false); // Reset error state when switching videos
        setIsVideoLoading(true); // Set loading state
        return nextIndex;
      });
    }, 40000); // Change video every 40 seconds

    return () => clearInterval(interval);
  }, [videoFiles]);

    // Reset error state when video index changes
    useEffect(() => {
      setVideoError(false);
      setIsVideoLoading(false); // No loading state
      setRetryCount(0); // Reset retry count for new video
      
      // Try to play video immediately when index changes
      if (videoRef.current) {
        videoRef.current.play().catch(console.log);
      }
    }, [currentVideoIndex]);

  // Enhanced preloading system optimized for Vercel deployment
  useEffect(() => {
    // Preload current video with quality optimization
    const currentVideo = document.createElement('video');
    currentVideo.src = videoFiles[currentVideoIndex];
    currentVideo.preload = 'auto';
    currentVideo.muted = true;
    currentVideo.playsInline = true;
    currentVideo.crossOrigin = 'anonymous';
    currentVideo.load();

    // Preload next video
    const nextIndex = (currentVideoIndex + 1) % videoFiles.length;
    const nextVideo = document.createElement('video');
    nextVideo.src = videoFiles[nextIndex];
    nextVideo.preload = 'auto';
    nextVideo.muted = true;
    nextVideo.playsInline = true;
    nextVideo.crossOrigin = 'anonymous';
    nextVideo.load();

    // Preload the video after next
    const afterNextIndex = (currentVideoIndex + 2) % videoFiles.length;
    const afterNextVideo = document.createElement('video');
    afterNextVideo.src = videoFiles[afterNextIndex];
    afterNextVideo.preload = 'auto';
    afterNextVideo.muted = true;
    afterNextVideo.playsInline = true;
    afterNextVideo.crossOrigin = 'anonymous';
    afterNextVideo.load();

    // Preload the video after that for even smoother transitions
    const fourthIndex = (currentVideoIndex + 3) % videoFiles.length;
    const fourthVideo = document.createElement('video');
    fourthVideo.src = videoFiles[fourthIndex];
    fourthVideo.preload = 'metadata'; // Metadata preload for fourth video
    fourthVideo.muted = true;
    fourthVideo.playsInline = true;
    fourthVideo.crossOrigin = 'anonymous';
    fourthVideo.load();

    // 5-second early preloading timer (35 seconds into 40-second video)
    const earlyPreloadTimer = setTimeout(() => {
      console.log('⏰ 5 seconds remaining - Starting aggressive early preload...');
      
      // Aggressive preloading for next video
      const nextVideoEarly = document.createElement('video');
      nextVideoEarly.src = videoFiles[nextIndex];
      nextVideoEarly.preload = 'auto';
      nextVideoEarly.muted = true;
      nextVideoEarly.playsInline = true;
      nextVideoEarly.crossOrigin = 'anonymous';
      nextVideoEarly.load();
      
      // Preload the video after next
      const afterNextVideoEarly = document.createElement('video');
      afterNextVideoEarly.src = videoFiles[afterNextIndex];
      afterNextVideoEarly.preload = 'auto';
      afterNextVideoEarly.muted = true;
      afterNextVideoEarly.playsInline = true;
      afterNextVideoEarly.crossOrigin = 'anonymous';
      afterNextVideoEarly.load();
      
      // Preload the fourth video
      const fourthVideoEarly = document.createElement('video');
      fourthVideoEarly.src = videoFiles[fourthIndex];
      fourthVideoEarly.preload = 'auto';
      fourthVideoEarly.muted = true;
      fourthVideoEarly.playsInline = true;
      fourthVideoEarly.crossOrigin = 'anonymous';
      fourthVideoEarly.load();
      
      console.log(`🎯 Aggressive early preload completed for videos ${nextIndex + 1}, ${afterNextIndex + 1}, and ${fourthIndex + 1}`);
    }, 35000); // 5 seconds before video ends (40s total - 5s = 35s remaining)
    
    // Clean up previous preloaded videos and timer
    return () => {
      clearTimeout(earlyPreloadTimer);
      if (currentVideo) {
        currentVideo.src = '';
        currentVideo.load();
      }
      if (nextVideo) {
        nextVideo.src = '';
        nextVideo.load();
      }
      if (afterNextVideo) {
        afterNextVideo.src = '';
        afterNextVideo.load();
      }
      if (fourthVideo) {
        fourthVideo.src = '';
        fourthVideo.load();
      }
    };
  }, [currentVideoIndex, videoFiles]);

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
                if (videoRef.current) {
                  videoRef.current.play().catch(console.log);
                }
              }}
              onCanPlay={() => {
                // Video is ready to play without buffering
                setIsVideoLoading(false);
                if (videoRef.current) {
                  videoRef.current.play().catch(console.log);
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
                console.log(`❌ Failed to load video ${currentVideoIndex + 1}: ${videoFiles[currentVideoIndex]}`);
                console.log(`🔄 Retry count: ${retryCount}`);
                
                setVideoError(true);
                setIsVideoLoading(false);
                
                // Retry logic: try same video up to 2 times, then move to next
                if (retryCount < 2) {
                  setTimeout(() => {
                    console.log(`🔄 Retrying video ${currentVideoIndex + 1} (attempt ${retryCount + 1})...`);
                    setRetryCount(prev => prev + 1);
                    setVideoError(false);
                    // Force reload the video
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }, 3000);
                } else {
                  // After 2 retries, move to next video
                  setTimeout(() => {
                    console.log(`🔄 Moving to next video after ${retryCount} retries...`);
                    setRetryCount(0);
                    setCurrentVideoIndex((prev) => (prev + 1) % videoFiles.length);
                  }, 2000);
                }
              }}
                onLoadStart={() => {
                  // Start playing immediately when loading starts
                  setIsVideoLoading(false);
                  console.log(`🔄 Starting to load video ${currentVideoIndex + 1}`);
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.log);
                  }
                }}
                onLoadedMetadata={() => {
                  // Video metadata loaded - start playing immediately
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.log);
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
              <source src={videoFiles[currentVideoIndex]} type={videoFiles[currentVideoIndex].endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
              {/* Fallback sources for better compatibility */}
              {videoFiles[currentVideoIndex].endsWith('.mp4') && (
                <source src={videoFiles[currentVideoIndex].replace('.mp4', '.webm')} type="video/webm" />
              )}
              {videoFiles[currentVideoIndex].endsWith('.webm') && (
                <source src={videoFiles[currentVideoIndex].replace('.webm', '.mp4')} type="video/mp4" />
              )}
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
