import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// import PreloadAnimation from './components/PreloadAnimation'; // Removed - no loading screen
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
  const [isLoading, setIsLoading] = useState(false); // No loading screen
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // No loading screen - start immediately
    setIsLoading(false);
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
        {/* No loading screen - start immediately */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            
            <main>
              <section id="home">
                <HeroSection isDarkMode={isDarkMode} />
              </section>
              <section id="about">
                <AboutMe isDarkMode={isDarkMode} />
              </section>
              <section id="skills">
                <Skills isDarkMode={isDarkMode} />
              </section>
              <section id="projects">
                <Projects isDarkMode={isDarkMode} />
              </section>
              <section id="competitions">
                <Competitions isDarkMode={isDarkMode} />
              </section>
              <section id="experience">
                <Experience isDarkMode={isDarkMode} />
              </section>
              <section id="achievements">
                <Achievements isDarkMode={isDarkMode} />
              </section>
              <section id="contact">
                <Contact isDarkMode={isDarkMode} />
              </section>
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
