import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code, 
  Database, 
  Globe, 
  Cpu,
  Shield,
  Zap,
  Layers,
  Brain,
  BarChart3,
  Server,
  Link
} from 'lucide-react';

interface AboutMeProps {
  isDarkMode: boolean;
}

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

interface Profile {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  skills: Skill[];
}

const Skills: React.FC<AboutMeProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });
  const [activeProfile, setActiveProfile] = useState(0);

  const profiles: Profile[] = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: <Code className="w-8 h-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      skills: [
        { name: 'React', level: 90, icon: <Code className="w-6 h-6" />, color: 'text-blue-400' },
        { name: 'TypeScript', level: 85, icon: <Code className="w-6 h-6" />, color: 'text-blue-500' },
        { name: 'HTML/CSS', level: 95, icon: <Globe className="w-6 h-6" />, color: 'text-orange-400' },
        { name: 'Tailwind CSS', level: 88, icon: <Layers className="w-6 h-6" />, color: 'text-cyan-400' },
        { name: 'JavaScript', level: 92, icon: <Code className="w-6 h-6" />, color: 'text-yellow-400' },
        { name: 'Next.js', level: 80, icon: <Code className="w-6 h-6" />, color: 'text-gray-400' },
        { name: 'Vue.js', level: 75, icon: <Code className="w-6 h-6" />, color: 'text-green-400' },
        { name: 'SASS/SCSS', level: 85, icon: <Layers className="w-6 h-6" />, color: 'text-pink-400' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: <Server className="w-8 h-8" />,
      color: 'text-green-400',
      bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      skills: [
        { name: 'Node.js', level: 85, icon: <Cpu className="w-6 h-6" />, color: 'text-green-400' },
        { name: 'Python', level: 90, icon: <Code className="w-6 h-6" />, color: 'text-yellow-500' },
        { name: 'Express.js', level: 80, icon: <Cpu className="w-6 h-6" />, color: 'text-gray-400' },
        { name: 'Django', level: 75, icon: <Code className="w-6 h-6" />, color: 'text-green-600' },
        { name: 'MongoDB', level: 75, icon: <Database className="w-6 h-6" />, color: 'text-green-500' },
        { name: 'PostgreSQL', level: 70, icon: <Database className="w-6 h-6" />, color: 'text-blue-600' },
        { name: 'Redis', level: 65, icon: <Database className="w-6 h-6" />, color: 'text-red-500' },
        { name: 'GraphQL', level: 70, icon: <Link className="w-6 h-6" />, color: 'text-pink-500' }
      ]
    },
    {
      id: 'data-science',
      name: 'Data Science',
      icon: <Brain className="w-8 h-8" />,
      color: 'text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      skills: [
        { name: 'Python Data Science', level: 88, icon: <Database className="w-6 h-6" />, color: 'text-purple-400' },
        { name: 'Machine Learning', level: 82, icon: <Zap className="w-6 h-6" />, color: 'text-pink-400' },
        { name: 'Deep Learning', level: 75, icon: <Brain className="w-6 h-6" />, color: 'text-purple-500' },
        { name: 'TensorFlow', level: 70, icon: <Zap className="w-6 h-6" />, color: 'text-orange-500' },
        { name: 'PyTorch', level: 65, icon: <Brain className="w-6 h-6" />, color: 'text-red-500' },
        { name: 'Pandas', level: 90, icon: <Database className="w-6 h-6" />, color: 'text-blue-500' },
        { name: 'NumPy', level: 85, icon: <Database className="w-6 h-6" />, color: 'text-green-500' },
        { name: 'Scikit-learn', level: 80, icon: <Zap className="w-6 h-6" />, color: 'text-orange-400' }
      ]
    },
    {
      id: 'data-analyst',
      name: 'Data Analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-cyan-400',
      bgColor: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      skills: [
        { name: 'Tableau', level: 85, icon: <BarChart3 className="w-6 h-6" />, color: 'text-blue-500' },
        { name: 'Power BI', level: 80, icon: <BarChart3 className="w-6 h-6" />, color: 'text-yellow-500' },
        { name: 'SQL', level: 90, icon: <Database className="w-6 h-6" />, color: 'text-blue-600' },
        { name: 'Excel', level: 95, icon: <BarChart3 className="w-6 h-6" />, color: 'text-green-600' },
        { name: 'SPSS', level: 75, icon: <BarChart3 className="w-6 h-6" />, color: 'text-red-400' },
        { name: 'R', level: 70, icon: <Code className="w-6 h-6" />, color: 'text-blue-400' },
        { name: 'Jupyter', level: 85, icon: <Code className="w-6 h-6" />, color: 'text-orange-500' },
        { name: 'Matplotlib', level: 80, icon: <BarChart3 className="w-6 h-6" />, color: 'text-blue-400' }
      ]
    },
    {
      id: 'ml-ai',
      name: 'ML/AI',
      icon: <Brain className="w-8 h-8" />,
      color: 'text-pink-400',
      bgColor: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20',
      skills: [
        { name: 'Machine Learning', level: 82, icon: <Zap className="w-6 h-6" />, color: 'text-pink-400' },
        { name: 'Deep Learning', level: 75, icon: <Brain className="w-6 h-6" />, color: 'text-purple-500' },
        { name: 'Computer Vision', level: 70, icon: <Brain className="w-6 h-6" />, color: 'text-blue-500' },
        { name: 'NLP', level: 65, icon: <Brain className="w-6 h-6" />, color: 'text-green-500' },
        { name: 'TensorFlow', level: 70, icon: <Zap className="w-6 h-6" />, color: 'text-orange-500' },
        { name: 'PyTorch', level: 65, icon: <Brain className="w-6 h-6" />, color: 'text-red-500' },
        { name: 'OpenCV', level: 60, icon: <Brain className="w-6 h-6" />, color: 'text-blue-600' },
        { name: 'Keras', level: 70, icon: <Zap className="w-6 h-6" />, color: 'text-red-400' }
      ]
    },
    {
      id: 'api-development',
      name: 'API Development',
      icon: <Link className="w-8 h-8" />,
      color: 'text-orange-400',
      bgColor: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      skills: [
        { name: 'REST APIs', level: 85, icon: <Link className="w-6 h-6" />, color: 'text-orange-400' },
        { name: 'GraphQL', level: 70, icon: <Link className="w-6 h-6" />, color: 'text-pink-500' },
        { name: 'Express.js', level: 80, icon: <Cpu className="w-6 h-6" />, color: 'text-gray-400' },
        { name: 'FastAPI', level: 75, icon: <Link className="w-6 h-6" />, color: 'text-green-500' },
        { name: 'Postman', level: 90, icon: <Link className="w-6 h-6" />, color: 'text-orange-500' },
        { name: 'Swagger', level: 80, icon: <Link className="w-6 h-6" />, color: 'text-green-400' },
        { name: 'JWT', level: 85, icon: <Shield className="w-6 h-6" />, color: 'text-purple-400' },
        { name: 'OAuth', level: 70, icon: <Shield className="w-6 h-6" />, color: 'text-blue-400' }
      ]
    }
  ];

  // Auto-switch profiles every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProfile((prev) => (prev + 1) % profiles.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [profiles.length]);

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 sm:mb-6 font-urbanist">
            Skills & Expertise
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg max-w-2xl mx-auto px-4">
            Dynamic skill profiles that automatically showcase my expertise across different domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {/* Profile Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1 w-full"
          >
            <div className={`p-4 sm:p-6 rounded-2xl ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
            }`}>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 gradient-text font-urbanist">
                Select Profile
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {profiles.map((profile, index) => (
                  <motion.button
                    key={profile.id}
                    onClick={() => setActiveProfile(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-3 sm:p-4 rounded-xl transition-all duration-300 text-left ${
                      activeProfile === index
                        ? `${profile.bgColor} border-2 border-current ${profile.color}`
                        : isDarkMode
                        ? 'glass-morphism-dark hover:bg-white/5'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`${profile.color} transition-transform duration-300 ${
                        activeProfile === index ? 'scale-110' : ''
                      }`}>
                        {profile.icon}
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{profile.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Enhanced Auto-switch indicator */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-blue-400 text-xs sm:text-sm">
                    <motion.div 
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="font-medium">Auto-switching every 10s</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {activeProfile + 1}/{profiles.length}
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Display Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 w-full"
          >
            <div className={`p-4 sm:p-6 rounded-2xl ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
            }`}>
              {/* Active Profile Header */}
              <motion.div
                key={`header-${activeProfile}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${profiles[activeProfile].bgColor} flex items-center justify-center`}>
                  <div className={profiles[activeProfile].color}>
                    {profiles[activeProfile].icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-urbanist">
                    {profiles[activeProfile].name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    {profiles[activeProfile].skills.length} skills mastered
                  </p>
                </div>
              </motion.div>

              {/* Skills Grid */}
              <motion.div
                key={`skills-${activeProfile}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {profiles[activeProfile].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`p-3 sm:p-4 rounded-xl card-hover group ${
                      isDarkMode 
                        ? 'glass-morphism-dark' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                          {skill.icon}
                        </div>
                        <span className="font-semibold text-sm sm:text-base">{skill.name}</span>
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${skill.color}`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className={`w-full h-2 rounded-full ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } overflow-hidden`}>
                      <motion.div
                        className={`h-full bg-gradient-to-r ${
                          activeProfile === 0 ? 'from-blue-500 to-cyan-500' :
                          activeProfile === 1 ? 'from-green-500 to-emerald-500' :
                          activeProfile === 2 ? 'from-purple-500 to-pink-500' :
                          activeProfile === 3 ? 'from-cyan-500 to-blue-500' :
                          activeProfile === 4 ? 'from-pink-500 to-purple-500' :
                          'from-orange-500 to-red-500'
                        } rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skills Summary */}
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
              Continuous Learning
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              I believe in staying updated with the latest technologies and continuously improving my skills. 
              Each project is an opportunity to learn something new and push the boundaries of what's possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-neon-purple/10 text-neon-purple rounded-full text-sm font-medium">
                Always Learning
              </span>
              <span className="px-4 py-2 bg-neon-cyan/10 text-neon-cyan rounded-full text-sm font-medium">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium">
                Team Player
              </span>
              <span className="px-4 py-2 bg-green-400/10 text-green-400 rounded-full text-sm font-medium">
                Detail Oriented
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
