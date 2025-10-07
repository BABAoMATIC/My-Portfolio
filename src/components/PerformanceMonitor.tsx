import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  Wifi, 
  Battery, 
  Monitor,
  Smartphone,
  WifiOff
} from 'lucide-react';

interface PerformanceMonitorProps {
  isDarkMode: boolean;
}

interface PerformanceMetrics {
  loadTime: number;
  connectionType: string;
  deviceType: string;
  batteryLevel?: number;
  isOnline: boolean;
  memoryUsage?: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ isDarkMode }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    connectionType: 'unknown',
    deviceType: 'desktop',
    isOnline: navigator.onLine
  });

  // Scroll-based animation
  const { scrollY } = useScroll();
  const heroSectionHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  // Fade out when scrolling past hero section, fade in when back at top
  const opacity = useTransform(scrollY, [0, heroSectionHeight * 0.5, heroSectionHeight], [1, 0.3, 0]);
  const x = useTransform(scrollY, [0, heroSectionHeight * 0.5, heroSectionHeight], [0, -50, -100]);

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime: Math.round(loadTime) }));

    // Detect connection type
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      setMetrics(prev => ({ ...prev, connectionType: connection.effectiveType || 'unknown' }));
    }

    // Detect device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setMetrics(prev => ({ ...prev, deviceType: isMobile ? 'mobile' : 'desktop' }));

    // Monitor battery level if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setMetrics(prev => ({ ...prev, batteryLevel: Math.round(battery.level * 100) }));
      });
    }

    // Monitor memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      setMetrics(prev => ({ 
        ...prev, 
        memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024) 
      }));
    }

    // Monitor online/offline status
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getConnectionIcon = () => {
    if (!metrics.isOnline) return <WifiOff className="w-4 h-4 text-red-400" />;
    return <Wifi className="w-4 h-4 text-green-400" />;
  };

  const getDeviceIcon = () => {
    return metrics.deviceType === 'mobile' ? 
      <Smartphone className="w-4 h-4 text-blue-400" /> : 
      <Monitor className="w-4 h-4 text-purple-400" />;
  };

  const getPerformanceColor = (loadTime: number) => {
    if (loadTime < 1000) return 'text-green-400';
    if (loadTime < 3000) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ 
        opacity,
        x
      }}
      className={`fixed bottom-6 left-6 z-40 p-4 rounded-xl backdrop-blur-md border ${
        isDarkMode 
          ? 'bg-black/20 border-white/10' 
          : 'bg-white/80 border-gray-200'
      } shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center space-x-4 text-sm">
        {/* Load Time */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-neon-cyan" />
          <span className={`font-mono ${getPerformanceColor(metrics.loadTime)}`}>
            {metrics.loadTime}ms
          </span>
        </div>

        {/* Connection Status */}
        <div className="flex items-center space-x-2">
          {getConnectionIcon()}
          <span className="text-xs">
            {metrics.connectionType}
          </span>
        </div>

        {/* Device Type */}
        <div className="flex items-center space-x-2">
          {getDeviceIcon()}
          <span className="text-xs capitalize">
            {metrics.deviceType}
          </span>
        </div>

        {/* Battery Level (if available) */}
        {metrics.batteryLevel && (
          <div className="flex items-center space-x-2">
            <Battery className="w-4 h-4 text-green-400" />
            <span className="text-xs">
              {metrics.batteryLevel}%
            </span>
          </div>
        )}

        {/* Memory Usage (if available) */}
        {metrics.memoryUsage && (
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs">
              {metrics.memoryUsage}MB
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;
