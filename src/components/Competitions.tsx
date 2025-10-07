import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar,
  ExternalLink,
  Star,
  Zap,
  Brain,
  Music,
  BarChart3
} from 'lucide-react';

interface CompetitionsProps {
  isDarkMode: boolean;
}

interface Competition {
  id: number;
  title: string;
  platform: string;
  type: string;
  description: string;
  dataset: string;
  approach: string[];
  results: string;
  link: string;
  icon: React.ReactNode;
  color: string;
  date: string;
}

const Competitions: React.FC<CompetitionsProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const competitions: Competition[] = [
    {
      id: 1,
      title: "Binary Classification with Bank Dataset",
      platform: "Kaggle",
      type: "Machine Learning Competition",
      description: "Developed a machine learning model to predict customer behavior using bank dataset. Implemented various classification algorithms and feature engineering techniques to achieve optimal performance.",
      dataset: "Bank Customer Dataset",
      approach: [
        "Data preprocessing and feature engineering",
        "Exploratory data analysis (EDA)",
        "Multiple algorithm comparison (Random Forest, XGBoost, SVM)",
        "Hyperparameter tuning and cross-validation",
        "Model evaluation and performance metrics"
      ],
      results: "Achieved high accuracy in binary classification with comprehensive feature analysis",
      link: "https://www.kaggle.com/nishitbhardrwaj/competitions",
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      date: "2025"
    },
    {
      id: 2,
      title: "Predicting BPM of Songs",
      platform: "Kaggle",
      type: "Regression Challenge",
      description: "Built a regression model to predict the beats per minute (BPM) of songs using audio features. Applied advanced machine learning techniques to analyze musical characteristics and tempo prediction.",
      dataset: "Music Dataset with Audio Features",
      approach: [
        "Audio feature extraction and analysis",
        "Temporal and spectral feature engineering",
        "Regression model development (Linear, Random Forest, Neural Networks)",
        "Feature importance analysis",
        "Cross-validation and model optimization"
      ],
      results: "Successfully predicted BPM with high accuracy using audio feature analysis",
      link: "https://www.kaggle.com/nishitbhardrwaj/competitions",
      icon: <Music className="w-6 h-6" />,
      color: "from-pink-500 to-red-600",
      date: "2025"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'kaggle':
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes('Machine Learning')) return <Brain className="w-5 h-5" />;
    if (type.includes('Regression')) return <TrendingUp className="w-5 h-5" />;
    return <Target className="w-5 h-5" />;
  };

  return (
    <section id="competitions" className="section-padding">
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
            Competitions & Hackathons
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-8" />
          <p className="text-lg max-w-2xl mx-auto">
            Showcasing my participation in data science competitions and hackathons, demonstrating practical problem-solving skills
          </p>
        </motion.div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {competitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`rounded-xl overflow-hidden card-hover ${
                isDarkMode 
                  ? 'glass-morphism-dark' 
                  : 'bg-white shadow-lg border border-gray-100'
              }`}
            >
              {/* Header */}
              <div className={`p-4 sm:p-6 bg-gradient-to-r ${competition.color} text-white`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {competition.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold font-urbanist leading-tight break-words">
                        {competition.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm opacity-90 mt-2">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(competition.platform)}
                          <span>{competition.platform}</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <span>{competition.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                    <span className="text-xs sm:text-sm font-medium">Active</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(competition.type)}
                    <span className="break-words">{competition.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Individual</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {competition.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-neon-purple">Dataset:</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {competition.dataset}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 text-neon-purple">Key Approaches:</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {competition.approach.slice(0, 2).map((approach, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {approach}
                      </span>
                    ))}
                    {competition.approach.length > 2 && (
                      <span className={`px-2 py-1 rounded text-xs ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        +{competition.approach.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <motion.button
                    onClick={() => setSelectedCompetition(competition)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Zap className="w-4 h-4" />
                    View Details
                  </motion.button>
                  
                  <motion.a
                    href={competition.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg transition-all text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Kaggle
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kaggle Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="https://www.kaggle.com/nishitbhardrwaj"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span>View My Kaggle Profile</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
          
          <p className={`text-sm mt-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore all my data science competitions and contributions
          </p>
        </motion.div>

        {/* Competition Detail Modal */}
        {selectedCompetition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCompetition(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl ${
                isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {selectedCompetition.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold gradient-text font-urbanist leading-tight break-words">
                      {selectedCompetition.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-gray-500 mt-2">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(selectedCompetition.platform)}
                        <span>{selectedCompetition.platform}</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span>{selectedCompetition.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompetition(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 self-start sm:self-auto"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Description</h4>
                  <p className={`text-sm leading-relaxed mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedCompetition.description}
                  </p>

                  <h4 className="text-lg font-semibold mb-3">Dataset</h4>
                  <p className={`text-sm mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedCompetition.dataset}
                  </p>

                  <h4 className="text-lg font-semibold mb-3">Results</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedCompetition.results}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Approach & Methodology</h4>
                  <ul className={`text-sm space-y-2 mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedCompetition.approach.map((approach, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0" />
                        <span>{approach}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    <motion.a
                      href={selectedCompetition.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all font-medium"
                    >
                      <BarChart3 className="w-5 h-5" />
                      View on Kaggle
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Competitions;
