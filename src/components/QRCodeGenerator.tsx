import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Download, 
  Share2, 
  Copy, 
  Check,
  Smartphone,
  Link,
  Mail,
  MessageCircle,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import QRCodeLib from 'qrcode';

interface QRCodeGeneratorProps {
  isDarkMode: boolean;
}

interface QRCodeOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
  description: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>('portfolio');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const qrOptions: QRCodeOption[] = useMemo(() => [
    {
      id: 'portfolio',
      name: 'Portfolio Website',
      icon: <Globe className="w-5 h-5" />,
      url: 'https://github.com/BABAoMATIC/Portfolio',
      description: 'View my portfolio repository on GitHub'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Profile',
      icon: <Link className="w-5 h-5" />,
      url: 'https://www.linkedin.com/in/nishitbhardwaj4',
      description: 'Connect with me on LinkedIn'
    },
    {
      id: 'github',
      name: 'GitHub Profile',
      icon: <Link className="w-5 h-5" />,
      url: 'https://github.com/BABAoMATIC',
      description: 'View my code repositories'
    },
    {
      id: 'email',
      name: 'Email Contact',
      icon: <Mail className="w-5 h-5" />,
      url: 'mailto:nishitbhardwaj11@gmail.com?subject=Portfolio Inquiry',
      description: 'Send me an email directly'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Chat',
      icon: <MessageCircle className="w-5 h-5" />,
      url: 'https://wa.me/919351399555?text=Hi%20Nishit!%20I%27d%20like%20to%20discuss%20a%20potential%20opportunity.',
      description: 'Start a WhatsApp conversation'
    },
    {
      id: 'resume',
      name: 'Resume Download',
      icon: <Download className="w-5 h-5" />,
      url: '/assets/Nishit bhardwaj resume.pdf',
      description: 'Download my resume PDF'
    },
    {
      id: 'instagram',
      name: 'Instagram Profile',
      icon: <Link className="w-5 h-5" />,
      url: 'https://www.instagram.com/babaomatic?igsh=Yjc1cnhpdWt6OHdw',
      description: 'Follow me on Instagram'
    },
    {
      id: 'kaggle',
      name: 'Kaggle Profile',
      icon: <Link className="w-5 h-5" />,
      url: 'https://www.kaggle.com/nishitbhardrwaj',
      description: 'View my data science projects'
    },
    {
      id: 'hackerrank',
      name: 'HackerRank Profile',
      icon: <Link className="w-5 h-5" />,
      url: 'https://www.hackerrank.com/profile/nishitbhardwaj11',
      description: 'Check my coding skills'
    },
    {
      id: 'twitter',
      name: 'Twitter/X Profile',
      icon: <Link className="w-5 h-5" />,
      url: 'https://x.com/Nishitbhardwa11',
      description: 'Follow me on Twitter/X'
    },
    {
      id: 'leetcode',
      name: 'LeetCode Profile',
      icon: <Link className="w-5 h-5" />,
      url: 'https://leetcode.com/u/Nishit_11/',
      description: 'View my coding solutions'
    }
  ], []);

  const generateQRCode = useCallback(async (url: string) => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      const qrDataUrl = await QRCodeLib.toDataURL(canvas, url, {
        width: 256,
        margin: 2,
        color: {
          dark: isDarkMode ? '#8B5CF6' : '#1F2937',
          light: isDarkMode ? '#0D0D0D' : '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });
      setQrCodeDataUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const selected = qrOptions.find(option => option.id === selectedOption);
    if (selected) {
      generateQRCode(selected.url);
    }
  }, [selectedOption, isDarkMode, generateQRCode, qrOptions]);

  const handleDownloadQR = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `nishit-bhardwaj-${selectedOption}-qr.png`;
    link.href = qrCodeDataUrl;
    link.click();
  };

  const handleCopyURL = async () => {
    const selected = qrOptions.find(option => option.id === selectedOption);
    if (selected) {
      try {
        await navigator.clipboard.writeText(selected.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
  };

  const handleShare = async () => {
    const selected = qrOptions.find(option => option.id === selectedOption);
    if (selected && navigator.share) {
      try {
        await navigator.share({
          title: `Nishit Bhardwaj - ${selected.name}`,
          text: selected.description,
          url: selected.url
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyURL();
    }
  };

  return (
    <section className="section-padding">
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
            QR Code Generator
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg max-w-2xl mx-auto px-4">
            Generate QR codes to easily share my portfolio, contact information, and social profiles. 
            Perfect for networking events, business cards, and offline sharing!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* QR Code Options - Responsive Design */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-urbanist">Choose What to Share</h3>
            
            {/* Mobile Dropdown - Hidden on Desktop */}
            <div className="lg:hidden relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  isDarkMode
                    ? 'glass-morphism-dark hover:bg-white/5'
                    : 'bg-white shadow-lg border border-gray-100 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      'bg-neon-purple/10 text-neon-purple'
                    }`}>
                      {qrOptions.find(opt => opt.id === selectedOption)?.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-base mb-1">
                        {qrOptions.find(opt => opt.id === selectedOption)?.name}
                      </h4>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {qrOptions.find(opt => opt.id === selectedOption)?.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    {isDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </motion.div>
                </div>
              </motion.button>

              {/* Mobile Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: isDropdownOpen ? 1 : 0,
                  y: isDropdownOpen ? 0 : -10,
                  height: isDropdownOpen ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-10 ${
                  isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
                }`}
                style={{ display: isDropdownOpen ? 'block' : 'none' }}
              >
                <div className="max-h-80 overflow-y-auto">
                  {qrOptions.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => {
                        setSelectedOption(option.id);
                        setIsDropdownOpen(false);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                      className={`w-full p-3 text-left transition-all duration-200 ${
                        selectedOption === option.id
                          ? isDarkMode
                            ? 'bg-neon-purple/20 border-l-4 border-neon-purple'
                            : 'bg-neon-purple/10 border-l-4 border-neon-purple'
                          : 'hover:bg-gray-50/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedOption === option.id
                            ? 'bg-neon-purple text-white'
                            : 'bg-neon-purple/10 text-neon-purple'
                        }`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{option.name}</h4>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {option.description}
                          </p>
                        </div>
                        {selectedOption === option.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-neon-purple flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Desktop Full List - Hidden on Mobile */}
            <div className="hidden lg:block space-y-4">
              {qrOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedOption === option.id
                      ? isDarkMode
                        ? 'bg-neon-purple/20 border-2 border-neon-purple'
                        : 'bg-neon-purple/10 border-2 border-neon-purple'
                      : isDarkMode
                      ? 'glass-morphism-dark hover:bg-white/5'
                      : 'bg-white shadow-lg border border-gray-100 hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedOption === option.id
                        ? 'bg-neon-purple text-white'
                        : 'bg-neon-purple/10 text-neon-purple'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{option.name}</h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {option.description}
                      </p>
                    </div>
                    {selectedOption === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-neon-purple flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* QR Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-4 sm:p-6 lg:p-8 rounded-2xl ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-urbanist text-center">
              Generated QR Code
            </h3>
            
            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              {/* QR Code Canvas */}
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="border-2 sm:border-4 border-white rounded-xl shadow-lg max-w-full h-auto"
                  width={256}
                  height={256}
                />
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Selected Option Info */}
              <div className="text-center px-2">
                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                  {qrOptions.find(opt => opt.id === selectedOption)?.name}
                </h4>
                <p className={`text-xs sm:text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {qrOptions.find(opt => opt.id === selectedOption)?.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center w-full">
                <motion.button
                  onClick={handleDownloadQR}
                  disabled={!qrCodeDataUrl || isGenerating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>

                <motion.button
                  onClick={handleCopyURL}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy URL'}</span>
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl ${
            isDarkMode 
              ? 'glass-morphism-dark' 
              : 'bg-white shadow-xl border border-gray-100'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text font-urbanist">
              How to Use QR Codes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center">
                  <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Scan with Phone</h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  Use your phone's camera to scan the QR code and instantly access the content
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center">
                  <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Download & Print</h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  Download the QR code and print it on business cards, flyers, or presentations
                </p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center">
                  <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Share Digitally</h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  Share QR codes via email, social media, or messaging apps for easy access
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QRCodeGenerator;
