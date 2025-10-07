import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Medal, 
  FileText, 
  Star,
  Shield,
  Music,
  Volume2
} from 'lucide-react';

interface AchievementsProps {
  isDarkMode: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  category: 'Gold' | 'Silver' | 'Bronze' | 'Certification' | 'Special' | 'Music';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  count?: number;
  year?: string;
  issuer?: string;
  proficiency?: string;
}

const Achievements: React.FC<AchievementsProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Gold Medals",
      description: "Karate competitions and martial arts tournaments",
      category: "Gold",
      icon: <Trophy className="w-8 h-8" />,
      color: "text-yellow-400",
      bgColor: "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20",
      count: 20,
      year: "2018-2024"
    },
    {
      id: 2,
      title: "Silver Medals",
      description: "Regional and national karate championships",
      category: "Silver",
      icon: <Medal className="w-8 h-8" />,
      color: "text-gray-300",
      bgColor: "bg-gradient-to-br from-gray-300/20 to-gray-500/20",
      count: 15,
      year: "2017-2023"
    },
    {
      id: 3,
      title: "Bronze Medals",
      description: "Local and state-level martial arts competitions",
      category: "Bronze",
      icon: <Award className="w-8 h-8" />,
      color: "text-orange-400",
      bgColor: "bg-gradient-to-br from-orange-400/20 to-orange-600/20",
      count: 17,
      year: "2016-2022"
    },
    {
      id: 4,
      title: "Machine Learning Certificate",
      description: "Columbia University Machine Learning Specialization",
      category: "Certification",
      icon: <FileText className="w-8 h-8" />,
      color: "text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-400/20 to-blue-600/20",
      year: "August 2025",
      issuer: "Columbia University"
    },
    {
      id: 5,
      title: "Power BI Certification",
      description: "Microsoft Power BI Data Scientist Associate",
      category: "Certification",
      icon: <FileText className="w-8 h-8" />,
      color: "text-yellow-500",
      bgColor: "bg-gradient-to-br from-yellow-500/20 to-yellow-700/20",
      year: "2023",
      issuer: "Microsoft"
    },
    {
      id: 6,
      title: "Tableau Specialist",
      description: "Tableau Desktop Specialist Certification",
      category: "Certification",
      icon: <FileText className="w-8 h-8" />,
      color: "text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-400/20 to-purple-600/20",
      year: "2023",
      issuer: "Tableau"
    },
    {
      id: 7,
      title: "Python Programming",
      description: "Python for Data Science and Machine Learning",
      category: "Certification",
      icon: <FileText className="w-8 h-8" />,
      color: "text-green-400",
      bgColor: "bg-gradient-to-br from-green-400/20 to-green-600/20",
      year: "2022",
      issuer: "Coursera"
    },
    {
      id: 8,
      title: "Outstanding Intern",
      description: "Recognized for exceptional performance during internship",
      category: "Special",
      icon: <Star className="w-8 h-8" />,
      color: "text-pink-400",
      bgColor: "bg-gradient-to-br from-pink-400/20 to-pink-600/20",
      year: "2023",
      issuer: "Digital Innovations"
    },
    {
      id: 9,
      title: "Karate Black Belt",
      description: "Achieved 1st Dan Black Belt in Shotokan Karate",
      category: "Special",
      icon: <Shield className="w-8 h-8" />,
      color: "text-red-400",
      bgColor: "bg-gradient-to-br from-red-400/20 to-red-600/20",
      year: "2021",
      issuer: "Shotokan Karate Association"
    },
    {
      id: 10,
      title: "Flute",
      description: "Classical and contemporary flute performance",
      category: "Music",
      icon: <Music className="w-8 h-8" />,
      color: "text-indigo-400",
      bgColor: "bg-gradient-to-br from-indigo-400/20 to-indigo-600/20",
      proficiency: "Advanced",
      year: "2015-Present"
    },
    {
      id: 11,
      title: "Trumpet",
      description: "Jazz and classical trumpet playing",
      category: "Music",
      icon: <Volume2 className="w-8 h-8" />,
      color: "text-amber-400",
      bgColor: "bg-gradient-to-br from-amber-400/20 to-amber-600/20",
      proficiency: "Intermediate",
      year: "2017-Present"
    },
    {
      id: 12,
      title: "Clarinet",
      description: "Woodwind instrument mastery",
      category: "Music",
      icon: <Music className="w-8 h-8" />,
      color: "text-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-400/20 to-emerald-600/20",
      proficiency: "Intermediate",
      year: "2018-Present"
    },
    {
      id: 13,
      title: "Saxophone",
      description: "Jazz and contemporary saxophone performance",
      category: "Music",
      icon: <Volume2 className="w-8 h-8" />,
      color: "text-rose-400",
      bgColor: "bg-gradient-to-br from-rose-400/20 to-rose-600/20",
      proficiency: "Beginner",
      year: "2020-Present"
    }
  ];

  const getCategoryStats = () => {
    const gold = achievements.filter(a => a.category === 'Gold').reduce((sum, a) => sum + (a.count || 0), 0);
    const silver = achievements.filter(a => a.category === 'Silver').reduce((sum, a) => sum + (a.count || 0), 0);
    const bronze = achievements.filter(a => a.category === 'Bronze').reduce((sum, a) => sum + (a.count || 0), 0);
    const certifications = achievements.filter(a => a.category === 'Certification').length;
    const special = achievements.filter(a => a.category === 'Special').length;
    const music = achievements.filter(a => a.category === 'Music').length;
    
    return { gold, silver, bronze, certifications, special, music };
  };

  const stats = getCategoryStats();

  return (
    <section id="achievements" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-urbanist">
            Achievements & Awards
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-8" />
          <p className="text-lg max-w-2xl mx-auto">
            A collection of my accomplishments, certifications, and recognition across various domains
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center card-hover ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
            }`}
          >
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.gold}</div>
            <div className="text-sm text-gray-500">Gold Medals</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center card-hover ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
            }`}
          >
            <Medal className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-300 mb-1">{stats.silver}</div>
            <div className="text-sm text-gray-500">Silver Medals</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center card-hover ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
            }`}
          >
            <Award className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-400 mb-1">{stats.bronze}</div>
            <div className="text-sm text-gray-500">Bronze Medals</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center card-hover ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
            }`}
          >
            <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-400 mb-1">{stats.certifications}</div>
            <div className="text-sm text-gray-500">Certifications</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center card-hover ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
            }`}
          >
            <Star className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-pink-400 mb-1">{stats.special}</div>
            <div className="text-sm text-gray-500">Special Awards</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center card-hover ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
            }`}
          >
            <Music className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-indigo-400 mb-1">{stats.music}</div>
            <div className="text-sm text-gray-500">Music Instruments</div>
          </motion.div>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-64 perspective-1000"
              onMouseEnter={() => setFlippedCard(achievement.id)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <motion.div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  flippedCard === achievement.id ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of Card */}
                <div className={`absolute inset-0 w-full h-full rounded-xl card-hover backface-hidden ${
                  isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
                } ${achievement.bgColor}`}>
                  <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <motion.div
                      className={`${achievement.color} mb-4`}
                      whileHover={{ 
                        scale: 1.3, 
                        rotate: achievement.category === 'Gold' ? 15 : achievement.category === 'Silver' ? -15 : 10,
                        filter: achievement.category === 'Gold' ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' : 
                                achievement.category === 'Silver' ? 'drop-shadow(0 0 20px rgba(192, 192, 192, 0.8))' :
                                achievement.category === 'Bronze' ? 'drop-shadow(0 0 20px rgba(205, 127, 50, 0.8))' : 'none'
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {achievement.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-2 font-urbanist">{achievement.title}</h3>
                    
                    {achievement.count && (
                      <div className="text-3xl font-bold mb-2 gradient-text">
                        {achievement.count}+
                      </div>
                    )}
                    
                    {achievement.proficiency && (
                      <div className="text-lg font-semibold mb-2 text-indigo-400">
                        {achievement.proficiency}
                      </div>
                    )}
                    
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {achievement.description}
                    </p>

                    {achievement.year && (
                      <div className="mt-4 text-xs text-gray-500">
                        {achievement.year}
                      </div>
                    )}
                  </div>
                </div>

                {/* Back of Card */}
                <div className={`absolute inset-0 w-full h-full rounded-xl card-hover backface-hidden rotate-y-180 ${
                  isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
                }`}>
                  <div className="p-6 h-full flex flex-col justify-center">
                    <div className="text-center mb-4">
                      <div className={`${achievement.color} mb-3`}>
                        {achievement.icon}
                      </div>
                      <h3 className="text-lg font-bold font-urbanist">{achievement.title}</h3>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      {achievement.count && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-semibold">{achievement.count}+</span>
                        </div>
                      )}
                      
                      {achievement.year && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Year:</span>
                          <span className="font-semibold">{achievement.year}</span>
                        </div>
                      )}
                      
                      {achievement.issuer && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Issuer:</span>
                          <span className="font-semibold text-right">{achievement.issuer}</span>
                        </div>
                      )}
                      
                      {achievement.proficiency && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Proficiency:</span>
                          <span className="font-semibold text-indigo-400">{achievement.proficiency}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className={`font-semibold ${achievement.color}`}>
                          {achievement.category}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-xs text-gray-500">
                        Hover to flip
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Special Recognition Section */}
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
              Continuous Excellence
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              These achievements represent not just recognition, but a commitment to continuous improvement, 
              dedication to excellence, and the pursuit of mastery in both technical and personal development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium">
                Martial Arts Excellence
              </span>
              <span className="px-4 py-2 bg-blue-400/10 text-blue-400 rounded-full text-sm font-medium">
                Academic Achievement
              </span>
              <span className="px-4 py-2 bg-green-400/10 text-green-400 rounded-full text-sm font-medium">
                Professional Growth
              </span>
              <span className="px-4 py-2 bg-purple-400/10 text-purple-400 rounded-full text-sm font-medium">
                Technical Mastery
              </span>
              <span className="px-4 py-2 bg-indigo-400/10 text-indigo-400 rounded-full text-sm font-medium">
                Musical Talent
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
