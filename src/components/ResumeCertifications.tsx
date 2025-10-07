import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Award, 
  Calendar, 
  ExternalLink,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Code,
  Database,
  Cloud,
  Smartphone,
  Eye
} from 'lucide-react';
import PreviewModal from './PreviewModal';

interface ResumeCertificationsProps {
  isDarkMode: boolean;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  url?: string;
}

const ResumeCertifications: React.FC<ResumeCertificationsProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCertPreviewOpen, setIsCertPreviewOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Sample resume images - in a real app, these would be actual resume screenshots
  const resumeImages = [
    '/assets/images/resume-page-1.jpg',
    '/assets/images/resume-page-2.jpg',
    '/assets/images/resume-page-3.jpg'
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Machine Learning Specialization",
      issuer: "Columbia University",
      date: "August 2025",
      credentialId: "ML-COL-2025-001",
      description: "Comprehensive machine learning program covering supervised and unsupervised learning, neural networks, and deep learning applications.",
      skills: ["Python", "Scikit-learn", "TensorFlow", "Neural Networks", "Data Preprocessing", "Model Evaluation"],
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-blue-700/20",
      url: "https://coursera.org/verify/ML-COL-2025-001"
    },
    {
      id: 2,
      title: "Microsoft Power BI Data Scientist",
      issuer: "Microsoft",
      date: "March 2023",
      credentialId: "MS-PBI-2023-002",
      description: "Professional certification in Power BI for data analysis, visualization, and business intelligence solutions.",
      skills: ["Power BI", "DAX", "Data Modeling", "Visualization", "Business Intelligence", "SQL"],
      icon: <Database className="w-8 h-8" />,
      color: "text-yellow-500",
      bgColor: "bg-gradient-to-br from-yellow-500/20 to-yellow-700/20",
      url: "https://learn.microsoft.com/certifications/power-bi-data-analyst-associate/"
    },
    {
      id: 3,
      title: "Tableau Desktop Specialist",
      issuer: "Tableau",
      date: "May 2023",
      credentialId: "TBL-SPEC-2023-003",
      description: "Specialist certification in Tableau Desktop for advanced data visualization and analytics.",
      skills: ["Tableau", "Data Visualization", "Dashboard Design", "Calculated Fields", "Parameters", "Storytelling"],
      icon: <Database className="w-8 h-8" />,
      color: "text-purple-500",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-purple-700/20",
      url: "https://www.tableau.com/learn/certification/desktop-specialist"
    },
    {
      id: 4,
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "June 2022",
      credentialId: "PY-DS-2022-004",
      description: "Specialized program in Python programming for data science, machine learning, and statistical analysis.",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Statistics"],
      icon: <Code className="w-8 h-8" />,
      color: "text-green-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-green-700/20",
      url: "https://coursera.org/verify/PY-DS-2022-004"
    },
    {
      id: 5,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "September 2023",
      credentialId: "AWS-CP-2023-005",
      description: "Foundational certification in AWS cloud services, architecture, and best practices.",
      skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda", "Cloud Architecture", "Security"],
      icon: <Cloud className="w-8 h-8" />,
      color: "text-orange-500",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-orange-700/20",
      url: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
    },
    {
      id: 6,
      title: "React Native Development",
      issuer: "Meta",
      date: "November 2023",
      credentialId: "RN-META-2023-006",
      description: "Professional certification in React Native for cross-platform mobile application development.",
      skills: ["React Native", "JavaScript", "Mobile Development", "iOS", "Android", "Cross-platform"],
      icon: <Smartphone className="w-8 h-8" />,
      color: "text-cyan-500",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-cyan-700/20",
      url: "https://developers.facebook.com/certifications/react-native/"
    }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Nishit bhardwaj resume.pdf';
    link.download = 'Nishit_Bhardwaj_Resume.pdf';
    link.click();
  };

  const handleCertPreview = (cert: Certification) => {
    setSelectedCert(cert);
    setIsCertPreviewOpen(true);
  };

  const getCertImages = (cert: Certification) => {
    if (cert.id === 1) { // Columbia ML Certificate
      return ['/assets/images/Machine learning 1 from columba +.png'];
    }
    // For other certificates, return placeholder images
    return ['/assets/images/cert-placeholder.jpg'];
  };

  const resumeHighlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Technical Skills",
      description: "Full-stack development, data analysis, machine learning",
      color: "text-blue-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Leadership",
      description: "Team management, project coordination, mentoring",
      color: "text-green-400"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Achievements",
      description: "50+ projects, 20+ gold medals, multiple certifications",
      color: "text-yellow-400"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth",
      description: "Continuous learning, skill development, innovation",
      color: "text-purple-400"
    }
  ];

  return (
    <section id="resume" className="section-padding">
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
            Resume & Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-8" />
          <p className="text-lg max-w-2xl mx-auto">
            Download my resume and explore my professional certifications and qualifications
          </p>
        </motion.div>

        {/* Resume Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`p-8 rounded-2xl mb-16 ${
            isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 gradient-text font-urbanist">
                Professional Resume
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Download my comprehensive resume featuring my technical expertise, professional experience, 
                project portfolio, and achievements. Updated regularly with the latest accomplishments.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {resumeHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`${highlight.color} p-2 rounded-lg bg-white/10`}>
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{highlight.title}</h4>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => setIsPreviewOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4 flex items-center gap-3"
                >
                  <Eye className="w-6 h-6" />
                  <span>Preview Resume</span>
                </motion.button>
                
                <motion.button
                  onClick={handleDownloadResume}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Resume (PDF)</span>
                </motion.button>
              </div>
            </div>

            <div className="relative">
              <div className={`p-8 rounded-xl ${
                isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-2">Nishit Bhardwaj</h4>
                  <p className="text-gray-500 mb-4">Full Stack Developer | Data Scientist</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Experience:</span>
                      <span className="font-semibold">1+ Year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Projects:</span>
                      <span className="font-semibold">50+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Certifications:</span>
                      <span className="font-semibold">6+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="font-semibold">Dec 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`p-6 rounded-xl card-hover ${cert.bgColor} ${
                isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${cert.color} p-3 rounded-lg bg-white/10`}>
                  {cert.icon}
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => handleCertPreview(cert)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    title="Preview Certificate"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  {cert.url && (
                    <motion.a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      title="View Certificate Online"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 font-urbanist">{cert.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-neon-purple" />
                <span className="font-semibold text-neon-purple">{cert.issuer}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{cert.date}</span>
              </div>

              {cert.credentialId && (
                <div className="mb-3">
                  <span className="text-xs text-gray-500">Credential ID: </span>
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {cert.credentialId}
                  </span>
                </div>
              )}

              <p className={`text-sm leading-relaxed mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {cert.description}
              </p>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-neon-cyan">Skills Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2 py-1 rounded text-xs ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Summary */}
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
              Continuous Learning Journey
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              These certifications represent my commitment to staying current with the latest technologies 
              and best practices in software development, data analysis, and cloud computing. Each certification 
              has been earned through rigorous study and practical application.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-purple mb-2">6+</div>
                <div className="text-sm text-gray-500">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-cyan mb-2">100%</div>
                <div className="text-sm text-gray-500">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">2020 - Still Going</div>
                <div className="text-sm text-gray-500">Active Period</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">4.7★</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Resume Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Resume Preview"
        images={resumeImages}
        currentImageIndex={currentImageIndex}
        onImageChange={setCurrentImageIndex}
        isDarkMode={isDarkMode}
        downloadUrl="/assets/Nishit bhardwaj resume.pdf"
      />

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <PreviewModal
          isOpen={isCertPreviewOpen}
          onClose={() => setIsCertPreviewOpen(false)}
          title={`${selectedCert.title} - Certificate Preview`}
          images={getCertImages(selectedCert)}
          currentImageIndex={0}
          onImageChange={() => {}}
          isDarkMode={isDarkMode}
          externalUrl={selectedCert.url}
        />
      )}
    </section>
  );
};

export default ResumeCertifications;
