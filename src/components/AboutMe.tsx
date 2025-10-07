import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Trophy } from 'lucide-react';

// Component for animated numbers using framer-motion
const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

interface AboutMeProps {
  isDarkMode: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animated counter values
  const projectsValue = isInView ? 50 : 0;
  const experienceValue = isInView ? 1 : 0;
  const goldMedalsValue = isInView ? 20 : 0;
  const silverMedalsValue = isInView ? 15 : 0;
  const bronzeMedalsValue = isInView ? 17 : 0;

  const stats = [
    {
      icon: <Code className="w-8 h-8" />,
      label: "Projects Completed",
      value: projectsValue,
      suffix: "+",
      color: "text-neon-purple"
    },
    {
      icon: <Database className="w-8 h-8" />,
      label: "Years Experience",
      value: experienceValue,
      suffix: "+",
      color: "text-neon-cyan"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      label: "Gold Medals",
      value: goldMedalsValue,
      suffix: "+",
      color: "text-yellow-400"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      label: "Silver Medals",
      value: silverMedalsValue,
      suffix: "+",
      color: "text-gray-300"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      label: "Bronze Medals",
      value: bronzeMedalsValue,
      suffix: "+",
      color: "text-orange-400"
    }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full"
        >
          {/* Left Column - Bio */}
          <div className="space-y-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 sm:mb-6 font-urbanist">
                About Me
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mb-6 sm:mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed"
            >
              <p>
                Hello! I'm <span className="font-semibold gradient-text">Nishit Bhardwaj</span>, 
                a passionate Full Stack Developer and Data Scientist with a love for creating 
                innovative solutions and turning complex data into actionable insights.
              </p>
              
              <p>
                With expertise in modern web technologies and data analysis tools, I specialize 
                in building scalable applications and extracting meaningful patterns from data. 
                My journey in technology is driven by curiosity and a desire to solve real-world problems.
              </p>
              
              <p>
                When I'm not coding, you'll find me practicing Karate (where I've earned 20+ Gold medals), 
                playing music instruments (Flute, Trumpet, Clarinet, Saxophone), 
                exploring new technologies, or working on personal projects that challenge my skills.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4"
            >
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-neon-purple/10 text-neon-purple rounded-full text-xs sm:text-sm font-medium">
                React & Node.js
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-neon-cyan/10 text-neon-cyan rounded-full text-xs sm:text-sm font-medium">
                Python & Data Science
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-xs sm:text-sm font-medium">
                Machine Learning
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-400/10 text-green-400 rounded-full text-xs sm:text-sm font-medium">
                Cloud Computing
              </span>
            </motion.div>
          </div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 w-full"
          >
            {/* Top Row - Main Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className={`p-4 sm:p-6 rounded-xl card-hover ${
                  isDarkMode 
                    ? 'glass-morphism-dark' 
                    : 'bg-white shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`${stats[0].color} flex-shrink-0`}>
                    {stats[0].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-2xl sm:text-3xl font-bold ${stats[0].color} mb-1`}>
                      <AnimatedNumber value={stats[0].value} />
                      <span className="text-lg">{stats[0].suffix}</span>
                    </div>
                    <p className={`text-sm font-medium truncate ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {stats[0].label}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={`p-4 sm:p-6 rounded-xl card-hover ${
                  isDarkMode 
                    ? 'glass-morphism-dark' 
                    : 'bg-white shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`${stats[1].color} flex-shrink-0`}>
                    {stats[1].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-2xl sm:text-3xl font-bold ${stats[1].color} mb-1`}>
                      <AnimatedNumber value={stats[1].value} />
                      <span className="text-lg">{stats[1].suffix}</span>
                    </div>
                    <p className={`text-sm font-medium truncate ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {stats[1].label}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row - Medals Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.slice(2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + (0.1 * index) }}
                  viewport={{ once: true }}
                  className={`p-3 sm:p-4 rounded-xl card-hover ${
                    isDarkMode 
                      ? 'glass-morphism-dark' 
                      : 'bg-white shadow-lg border border-gray-100'
                  }`}
                >
                  <div className="text-center">
                    <div className={`${stat.color} mb-2 flex justify-center`}>
                      {stat.icon}
                    </div>
                    <div className={`text-xl sm:text-2xl font-bold ${stat.color} mb-1`}>
                      <AnimatedNumber value={stat.value} />
                      <span className="text-sm">{stat.suffix}</span>
                    </div>
                    <p className={`text-xs font-medium leading-tight ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {stat.label.split(' ')[0]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`p-8 rounded-2xl ${
            isDarkMode 
              ? 'glass-morphism-dark' 
              : 'bg-white shadow-xl border border-gray-100'
          }`}>
            <h3 className="text-2xl font-bold mb-4 gradient-text font-urbanist">
              My Mission
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              To bridge the gap between complex data and meaningful insights, creating 
              applications that not only function flawlessly but also provide real value 
              to users. I believe in continuous learning and pushing the boundaries of 
              what's possible with technology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
