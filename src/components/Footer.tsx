import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`py-12 ${
      isDarkMode ? 'bg-dark-bg border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'
    }`}>
      <div className="container-custom px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 gradient-text">Contact Info</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-neon-purple flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">nishitbhardwaj11@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan flex-shrink-0" />
                <span className="text-xs sm:text-sm">+91 9351399555</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 gradient-text">Quick Links</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <a href="#about" className="block text-xs sm:text-sm hover:text-neon-purple transition-colors">About</a>
              <a href="#skills" className="block text-xs sm:text-sm hover:text-neon-purple transition-colors">Skills</a>
              <a href="#projects" className="block text-xs sm:text-sm hover:text-neon-purple transition-colors">Projects</a>
              <a href="#experience" className="block text-xs sm:text-sm hover:text-neon-purple transition-colors">Experience</a>
              <a href="#contact" className="block text-xs sm:text-sm hover:text-neon-purple transition-colors">Contact</a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 gradient-text">Follow Me</h3>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <motion.a 
                href="https://www.linkedin.com/in/nishitbhardwaj4" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm hover:text-neon-cyan transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-white/5"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a 
                href="https://github.com/BABAoMATIC" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm hover:text-neon-cyan transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-white/5"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>GitHub</span>
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/babaomatic?igsh=Yjc1cnhpdWt6OHdw" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm hover:text-neon-cyan transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-white/5"
              >
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Instagram</span>
              </motion.a>
              <motion.a 
                href="https://x.com/Nishitbhardwa11" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm hover:text-neon-cyan transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-white/5"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Twitter</span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Section with Made by and Running Animal */}
        <div className={`border-t pt-6 sm:pt-8 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 mb-4 md:mb-0"
            >
              <span className="text-sm text-gray-400">Made by Nishit Bhardwaj</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                💖
              </motion.span>
            </motion.div>

            {/* Running Animal Animation */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{ 
                  x: [0, 15, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.3, 0.6, 0.8, 1]
                }}
                className="text-3xl"
                whileHover={{ scale: 1.2 }}
              >
                🐎
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-gray-400 italic"
              >
                Always moving forward
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
