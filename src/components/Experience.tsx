import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Code,
  Database,
  Users,
  Award,
  TrendingUp,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ExperienceProps {
  isDarkMode: boolean;
}

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance' | 'Project';
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  icon: React.ReactNode;
  color: string;
}

const Experience: React.FC<ExperienceProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Full Stack Developer | Data Scientist",
      company: "Optimum Research Solutions",
      location: "Jaipur, Rajasthan, India",
      duration: "October 2024 – Present (1+ year)",
      type: "Full-time",
      description: "Leading development of full-stack applications and performing comprehensive data analysis and visualization for research solutions.",
      responsibilities: [
        "Developing and maintaining full-stack applications using modern web technologies",
        "Performing data analysis and visualization using Python, Tableau, and Power BI",
        "Designing and implementing RESTful APIs and database solutions",
        "Creating interactive dashboards and reports for stakeholders",
        "Collaborating with research teams to deliver data-driven insights"
      ],
      technologies: ["React", "Node.js", "Python", "Tableau", "Power BI", "MongoDB", "PostgreSQL", "Express", "TypeScript"],
      achievements: [
        "Successfully delivered 5+ full-stack applications within project timelines",
        "Created 10+ interactive dashboards improving data accessibility by 60%",
        "Implemented automated data processing pipelines reducing manual work by 70%"
      ],
      icon: <Code className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      id: 2,
      title: "Freelance Web Developer",
      company: "Self-Employed",
      location: "Remote",
      duration: "Sep 2022 - Present",
      type: "Freelance",
      description: "Provided web development services to small and medium businesses, creating custom websites and web applications.",
      responsibilities: [
        "Developed custom websites and web applications for clients",
        "Managed client relationships and project timelines",
        "Provided technical consultation and recommendations",
        "Ensured cross-browser compatibility and responsive design",
        "Maintained and updated existing client websites"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB", "WordPress"],
      achievements: [
        "Completed 8 successful projects with 100% client satisfaction",
        "Generated $15K in revenue within 4 months",
        "Built long-term relationships with 5 recurring clients"
      ],
      icon: <Users className="w-6 h-6" />,
      color: "text-orange-500"
    },
    {
      id: 5,
      title: "Machine Learning Project",
      company: "Columbia University",
      location: "New York, NY",
      duration: "Aug 2025 - Sep 2025",
      type: "Project",
      description: "Developed a machine learning model for predictive analytics as part of the Columbia University Machine Learning certification program.",
      responsibilities: [
        "Researched and implemented various machine learning algorithms",
        "Preprocessed and analyzed large datasets for model training",
        "Evaluated model performance using appropriate metrics",
        "Created comprehensive documentation and presentation materials",
        "Collaborated with peers on group projects and peer reviews"
      ],
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter", "TensorFlow"],
      achievements: [
        "Achieved 92% accuracy on the final project model",
        "Completed the program with distinction",
        "Published findings in the program's showcase portfolio"
      ],
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-pink-500"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      'Full-time': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Part-time': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Internship': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Freelance': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Project': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <section id="experience" className="section-padding">
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
            Professional Experience
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg max-w-2xl mx-auto px-4">
            A journey through my professional growth, showcasing diverse experiences in technology and data analysis
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
            isDarkMode ? 'bg-gradient-to-b from-neon-purple to-neon-cyan' : 'bg-gradient-to-b from-gray-300 to-gray-500'
          }`} />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start space-x-6"
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-dark-bg border-3 border-neon-purple' : 'bg-light-bg border-3 border-neon-purple'
                  } shadow-lg`}
                >
                  <div className={`${experience.color} scale-75`}>
                    {experience.icon}
                  </div>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`flex-1 p-6 rounded-xl card-hover ${
                    isDarkMode 
                      ? 'glass-morphism-dark' 
                      : 'bg-white shadow-lg border border-gray-100'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 font-urbanist">{experience.title}</h3>
                      <div className="flex items-center gap-2 text-lg font-semibold text-neon-purple mb-2">
                        <Briefcase className="w-5 h-5" />
                        {experience.company}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(experience.type)}`}>
                        {experience.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </div>
                  </div>

                  {/* Basic Description - Always Visible */}
                  <p className={`text-sm leading-relaxed mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {experience.description}
                  </p>

                  {/* Read More Button */}
                  <div className="flex justify-center mb-4">
                    <motion.button
                      onClick={() => toggleExpanded(experience.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isDarkMode 
                          ? 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30' 
                          : 'bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20'
                      }`}
                    >
                      {expandedCards.has(experience.id) ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Read More</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Expanded Content */}
                  {expandedCards.has(experience.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Responsibilities */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-neon-cyan">Key Responsibilities:</h4>
                        <ul className={`text-sm space-y-1 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {experience.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-neon-purple rounded-full mt-2 flex-shrink-0" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-neon-cyan">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-1 rounded text-xs ${
                                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-neon-cyan">Key Achievements:</h4>
                        <ul className={`text-sm space-y-1 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Award className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
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
              Career Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-purple mb-2">1+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-cyan mb-2">50+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
                <div className="text-sm text-gray-500">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
