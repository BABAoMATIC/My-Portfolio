import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PreloadAnimation from './components/PreloadAnimation';
import HeroSection from './components/HeroSection';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Navigation from './components/Navigation';
import ResumeCertifications from './components/ResumeCertifications';
import Competitions from './components/Competitions';
import InteractiveQuiz from './components/InteractiveQuiz';
import QRCodeGenerator from './components/QRCodeGenerator';
import PerformanceMonitor from './components/PerformanceMonitor';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'dark bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'
      }`}>
        <AnimatePresence>
          {isLoading && <PreloadAnimation />}
        </AnimatePresence>
        
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            
            <main>
              <HeroSection isDarkMode={isDarkMode} />
              <AboutMe isDarkMode={isDarkMode} />
              <Skills isDarkMode={isDarkMode} />
              <Projects isDarkMode={isDarkMode} />
              <Competitions isDarkMode={isDarkMode} />
              <Experience isDarkMode={isDarkMode} />
              <ResumeCertifications isDarkMode={isDarkMode} />
              <Achievements isDarkMode={isDarkMode} />
              <InteractiveQuiz isDarkMode={isDarkMode} />
              <QRCodeGenerator isDarkMode={isDarkMode} />
              <Contact isDarkMode={isDarkMode} />
            </main>
            
            <Chatbot isDarkMode={isDarkMode} />
            <PerformanceMonitor isDarkMode={isDarkMode} />
            <Footer isDarkMode={isDarkMode} />
          </motion.div>
        )}
      </div>
    </Router>
  );
}

export default App;
