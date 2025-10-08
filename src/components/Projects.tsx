import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Lightbulb, 
  X,
  Code,
  Database,
  Smartphone,
  Globe,
  Zap,
  Eye
} from 'lucide-react';
import PreviewModal from './PreviewModal';

interface ProjectsProps {
  isDarkMode: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  demoVideo?: string;
  features: string[];
}

const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const handlePreviewProject = (project: Project) => {
    setPreviewProject(project);
    setCurrentImageIndex(0);
    setIsPreviewOpen(true);
  };

  const getProjectImages = (project: Project) => {
    // Special handling for Predictive Analytics project with actual images
    if (project.id === 7) {
      return [
        "/src/assets/images/Predictive Analytics for Financial Risk Assessment/Data loadin.PNG",
        "/src/assets/images/Predictive Analytics for Financial Risk Assessment/Feature Target.PNG",
        "/src/assets/images/Predictive Analytics for Financial Risk Assessment/Model Matrix and evaluation.PNG",
        "/src/assets/images/Predictive Analytics for Financial Risk Assessment/Model pipeline.PNG"
      ];
    }
    
    // For other projects, use placeholders
    return [
      project.image,
      `/api/placeholder/400/300?text=${project.title}+Screenshot+2`,
      `/api/placeholder/400/300?text=${project.title}+Screenshot+3`,
      `/api/placeholder/400/300?text=${project.title}+Screenshot+4`
    ];
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      longDescription: "A comprehensive e-commerce platform featuring user authentication, product management, shopping cart, payment integration, and admin dashboard. Built with modern web technologies and responsive design.",
      image: "/api/placeholder/400/300",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
      category: "Full Stack",
      githubUrl: "https://github.com/BABAoMATIC/E-Commerce-Platform",
      liveUrl: "https://github.com/BABAoMATIC/E-Commerce-Platform",
      features: ["User Authentication", "Product Catalog", "Shopping Cart", "Payment Processing", "Admin Dashboard", "Order Management"]
    },
    {
      id: 2,
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for data visualization and business intelligence",
      longDescription: "A powerful data analytics dashboard that processes large datasets and presents insights through interactive charts and graphs. Features real-time data updates and customizable reporting.",
      image: "/api/placeholder/400/300",
      techStack: ["Python", "React", "D3.js", "Pandas", "Flask", "PostgreSQL"],
      category: "Data Analysis",
      githubUrl: "https://github.com/BABAoMATIC/Data-Analytics-Dashboard",
      liveUrl: "https://github.com/BABAoMATIC/Data-Analytics-Dashboard",
      features: ["Real-time Analytics", "Interactive Charts", "Data Export", "Custom Reports", "User Management", "API Integration"]
    },
    {
      id: 3,
      title: "Machine Learning Model",
      description: "Predictive model for customer behavior analysis",
      longDescription: "A machine learning model that analyzes customer behavior patterns to predict purchasing decisions. Uses advanced algorithms and provides actionable insights for business optimization.",
      image: "/api/placeholder/400/300",
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
      category: "Machine Learning",
      githubUrl: "https://github.com/BABAoMATIC/Machine-Learning-Model",
      liveUrl: "https://github.com/BABAoMATIC/Machine-Learning-Model",
      features: ["Predictive Modeling", "Data Preprocessing", "Model Training", "Performance Metrics", "Visualization", "API Endpoints"]
    },
    {
      id: 4,
      title: "Mobile Task Manager",
      description: "Cross-platform mobile app for task and project management",
      longDescription: "A feature-rich mobile application for managing tasks, projects, and team collaboration. Built with React Native for cross-platform compatibility and includes offline functionality.",
      image: "/api/placeholder/400/300",
      techStack: ["React Native", "Firebase", "Redux", "AsyncStorage", "Push Notifications"],
      category: "Mobile",
      githubUrl: "https://github.com/BABAoMATIC/Weather-Analytics-Platform",
      liveUrl: "https://github.com/BABAoMATIC/Weather-Analytics-Platform",
      features: ["Task Management", "Team Collaboration", "Offline Sync", "Push Notifications", "Progress Tracking", "File Sharing"]
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      description: "WebSocket-based chat application with real-time messaging",
      longDescription: "A modern chat application featuring real-time messaging, file sharing, emoji reactions, and group chat functionality. Built with Socket.io for real-time communication.",
      image: "/api/placeholder/400/300",
      techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "JWT"],
      category: "Full Stack",
      githubUrl: "https://github.com/BABAoMATIC/Real-time-Chat-Application",
      liveUrl: "https://github.com/BABAoMATIC/Real-time-Chat-Application",
      features: ["Real-time Messaging", "File Sharing", "Group Chats", "Emoji Reactions", "Message History", "User Status"]
    },
    {
      id: 6,
      title: "Weather Analytics Platform",
      description: "Weather data analysis and forecasting application",
      longDescription: "A comprehensive weather analytics platform that processes meteorological data, generates forecasts, and provides climate trend analysis. Features interactive maps and detailed reporting.",
      image: "/api/placeholder/400/300",
      techStack: ["Python", "React", "D3.js", "OpenWeather API", "PostgreSQL", "Docker"],
      category: "Data Analysis",
      githubUrl: "https://github.com/BABAoMATIC/Weather-Analytics-Platform",
      liveUrl: "https://github.com/BABAoMATIC/Weather-Analytics-Platform",
      features: ["Weather Forecasting", "Data Visualization", "Climate Analysis", "Interactive Maps", "Historical Data", "API Integration"]
    },
    {
      id: 7,
      title: "Predictive Analytics for Financial Risk Assessment",
      description: "Machine learning model for financial risk prediction and assessment",
      longDescription: "An advanced predictive analytics system that analyzes financial data to assess risk levels and predict potential market fluctuations. Features comprehensive data preprocessing, model pipeline, and evaluation metrics for accurate financial forecasting.",
      image: "/src/assets/images/Predictive Analytics for Financial Risk Assessment/Data loadin.PNG",
      techStack: ["Python", "Pandas", "Scikit-learn", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
      category: "Machine Learning",
      githubUrl: "https://github.com/BABAoMATIC/Predictive-Analytics-Financial-Risk",
      liveUrl: "https://github.com/BABAoMATIC/Predictive-Analytics-Financial-Risk",
      features: ["Data Loading & Preprocessing", "Feature Engineering", "Model Training", "Performance Evaluation", "Risk Assessment", "Visualization"]
    }
  ];

  const categories = ['All', 'Full Stack', 'Data Analysis', 'Machine Learning', 'Mobile'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Full Stack': <Code className="w-5 h-5" />,
      'Data Analysis': <Database className="w-5 h-5" />,
      'Machine Learning': <Zap className="w-5 h-5" />,
      'Mobile': <Smartphone className="w-5 h-5" />,
    };
    return icons[category as keyof typeof icons] || <Globe className="w-5 h-5" />;
  };

  const generateAIExplanation = async (project: Project) => {
    setIsGeneratingAI(true);
    
    // Simulate AI API call
    setTimeout(() => {
      const explanation = `This ${project.category.toLowerCase()} project demonstrates advanced technical skills in ${project.techStack.join(', ')}. 

Key Technical Highlights:
• ${project.features.slice(0, 3).join('\n• ')}

The project showcases expertise in modern development practices, including responsive design, API integration, and user experience optimization. It represents a comprehensive solution that addresses real-world challenges while maintaining clean, scalable code architecture.

This work demonstrates proficiency in full-stack development, data processing, and modern web technologies, making it an excellent example of technical capability and problem-solving skills.`;
      
      setAiExplanation(explanation);
      setIsGeneratingAI(false);
    }, 2000);
  };

  return (
    <section id="projects" className="section-padding">
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
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-8" />
          <p className="text-lg max-w-2xl mx-auto">
            Explore my portfolio of innovative projects spanning full-stack development, data analysis, and machine learning
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white shadow-lg'
                  : isDarkMode
                  ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category)}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`rounded-xl overflow-hidden card-hover ${
                isDarkMode 
                  ? 'glass-morphism-dark' 
                  : 'bg-white shadow-lg border border-gray-100'
              }`}
            >
              {/* Project Image */}
              <div className="relative h-36 sm:h-40 lg:h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                  <div className="text-4xl sm:text-6xl opacity-50">
                    {getCategoryIcon(project.category)}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(project)}
                    className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-neon-purple/20 text-neon-purple' : 'bg-neon-purple/10 text-neon-purple'
                  }`}>
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-urbanist">{project.title}</h3>
                <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded text-xs ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className={`px-2 py-1 rounded text-xs ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {/* First row - Preview and AI buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handlePreviewProject(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </motion.button>
                    
                    <motion.button
                      onClick={() => generateAIExplanation(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isGeneratingAI}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors disabled:opacity-50 text-sm font-medium"
                      title="AI Explanation"
                    >
                      <Lightbulb className="w-4 h-4" />
                      AI
                    </motion.button>
                  </div>
                  
                  {/* Second row - Code and Live buttons */}
                  <div className="flex gap-2">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                    
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg transition-all text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Development Status Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">Projects Under Development</span>
            </div>
            <p className="text-sm text-black text-center font-medium">
              Projects are under development and updated on a daily basis. Check next day for new updates or visit repositories directly for the latest changes.
            </p>
          </div>
        </motion.div>

        {/* See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/BABAoMATIC"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg hover:shadow-neon-purple/25'
                : 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg hover:shadow-neon-purple/25'
            }`}
          >
            <Github className="w-6 h-6" />
            <span>See More Projects on GitHub</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
          
          <p className={`text-sm mt-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore all my repositories and contributions
          </p>
        </motion.div>

        {/* AI Explanation Modal */}
        {aiExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setAiExplanation('')}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`max-w-2xl w-full p-6 rounded-xl ${
                isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold gradient-text font-urbanist">
                  AI Project Analysis
                </h3>
                <button
                  onClick={() => setAiExplanation('')}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className={`text-sm leading-relaxed whitespace-pre-line ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {aiExplanation}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl ${
                isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text font-urbanist">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Description</h4>
                  <p className={`text-sm leading-relaxed mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedProject.longDescription}
                  </p>

                  <h4 className="text-lg font-semibold mb-3">Features</h4>
                  <ul className={`text-sm space-y-2 mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-purple rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 text-neon-purple font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors font-medium"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </motion.a>
                    
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg transition-all font-medium"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      {previewProject && (
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={`${previewProject.title} - Project Preview`}
          images={getProjectImages(previewProject)}
          currentImageIndex={currentImageIndex}
          onImageChange={setCurrentImageIndex}
          isDarkMode={isDarkMode}
          externalUrl={previewProject.liveUrl}
        />
      )}
    </section>
  );
};

export default Projects;
