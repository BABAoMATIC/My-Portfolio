import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle,
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'success' | 'error';
  message: string;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: 'idle', message: '' });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({ 
        type: 'success', 
        message: 'Thank you for your message! I\'ll get back to you soon.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Nishit bhardwaj resume.pdf';
    link.download = 'Nishit_Bhardwaj_Resume.pdf';
    link.click();
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi Nishit! I'd like to discuss a potential opportunity.");
    window.open(`https://wa.me/919351399555?text=${message}`, '_blank');
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "nishitbhardwaj11@gmail.com",
      link: "mailto:nishitbhardwaj11@gmail.com",
      color: "text-blue-400"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 9351399555",
      link: "tel:+919351399555",
      color: "text-green-400"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Jaipur, Rajasthan, India",
      link: "#",
      color: "text-red-400"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/nishitbhardwaj4",
      color: "text-blue-500 hover:text-blue-400"
    },
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/BABAoMATIC",
      color: "text-gray-400 hover:text-white"
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      url: "https://www.instagram.com/babaomatic?igsh=Yjc1cnhpdWt6OHdw",
      color: "text-pink-500 hover:text-pink-400"
    },
    {
      name: "Kaggle",
      icon: <Github className="w-6 h-6" />,
      url: "https://www.kaggle.com/nishitbhardrwaj",
      color: "text-blue-600 hover:text-blue-500"
    },
    {
      name: "HackerRank",
      icon: <Github className="w-6 h-6" />,
      url: "https://www.hackerrank.com/profile/nishitbhardwaj11",
      color: "text-green-500 hover:text-green-400"
    },
    {
      name: "Twitter/X",
      icon: <Twitter className="w-6 h-6" />,
      url: "https://x.com/Nishitbhardwa11",
      color: "text-blue-400 hover:text-blue-300"
    },
    {
      name: "LeetCode",
      icon: <Github className="w-6 h-6" />,
      url: "https://leetcode.com/u/Nishit_11/",
      color: "text-yellow-500 hover:text-yellow-400"
    }
  ];

  return (
    <section id="contact" className="section-padding">
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
            Get In Touch
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg max-w-2xl mx-auto px-4">
            Ready to collaborate or have a project in mind? Let's connect and create something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-0">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-urbanist">Let's Connect</h3>
              <p className={`text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I'm always excited to discuss new opportunities, collaborate on interesting projects, 
                or simply chat about technology and innovation. Feel free to reach out!
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl card-hover ${
                    isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
                  }`}
                >
                  <div className={`${info.color} p-2 sm:p-3 rounded-lg bg-white/10 flex-shrink-0`}>
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-base sm:text-lg">{info.title}</h4>
                    <p className={`text-xs sm:text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 sm:p-4 rounded-xl ${
                      isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-lg border border-gray-100'
                    } ${social.color} transition-all duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 sm:space-y-4">
              <motion.button
                onClick={openWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors font-medium text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Chat on WhatsApp</span>
              </motion.button>

              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl btn-primary text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download Resume</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-4 sm:p-6 lg:p-8 rounded-2xl ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-urbanist">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-neon-purple'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-neon-purple'
                    } focus:outline-none focus:ring-2 focus:ring-neon-purple/20`}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-neon-purple'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-neon-purple'
                    } focus:outline-none focus:ring-2 focus:ring-neon-purple/20`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-neon-purple'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-neon-purple'
                  } focus:outline-none focus:ring-2 focus:ring-neon-purple/20`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors resize-none text-sm sm:text-base ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-neon-purple'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-neon-purple'
                  } focus:outline-none focus:ring-2 focus:ring-neon-purple/20`}
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              {/* Form Status */}
              {formStatus.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    formStatus.type === 'success'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {formStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="text-sm">{formStatus.message}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full flex items-center justify-center space-x-2 sm:space-x-3 py-3 sm:py-4 px-4 sm:px-6 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-semibold hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center px-4 sm:px-6 lg:px-0"
        >
          <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl ${
            isDarkMode 
              ? 'glass-morphism-dark' 
              : 'bg-white shadow-xl border border-gray-100'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 gradient-text font-urbanist">
              Ready to Work Together?
            </h3>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              Whether you have a project in mind, need consultation, or just want to chat about technology, 
              I'm here to help. Let's turn your ideas into reality!
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-neon-purple/10 text-neon-purple rounded-full text-xs sm:text-sm font-medium">
                Available for Freelance
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-neon-cyan/10 text-neon-cyan rounded-full text-xs sm:text-sm font-medium">
                Open to Full-time Roles
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-xs sm:text-sm font-medium">
                Remote & On-site
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
