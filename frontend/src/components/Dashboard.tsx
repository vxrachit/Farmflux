import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Plane as Plant, Calendar, BarChart2, Microscope, ArrowRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

function Dashboard() {
  const { language } = useLanguage();

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);


  const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <div className="space-y-12 md:space-y-20 bg-gray-50 min-h-screen pb-20">
          <div className="relative -mt-8 -mx-4 sm:-mx-6 px-4 sm:px-6 py-12 md:py-24 bg-gradient-to-br from-green-600 to-emerald-700 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&q=80')] bg-cover bg-center"
        />
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-tight"
          >
            {getTranslation(language, 'smartFarming')}
          </motion.h1>
          <motion.p 
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-lg text-green-100 mb-6 md:mb-8 max-w-2xl mx-auto"
          >
            {getTranslation(language, 'transformAgriculture')}
          </motion.p>
          <motion.div 
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6"
          >
            <Link
              to="/disease-detection"
              className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-100 transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
            >
              {getTranslation(language, 'getStarted')}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/analytics"
              className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-all duration-300 hover:shadow-lg text-sm sm:text-base mt-3 sm:mt-0"
            >
              {getTranslation(language, 'viewAnalytics')}
            </Link>
          </motion.div>
        </div>
      </div>

         <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial="hidden"
          animate={controls}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12 text-center"
        >
          {getTranslation(language, 'farmManagementTools')}
        </motion.h2>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {getFeatureData(language).map((feature, index) => (
            <motion.div key={index} variants={fadeUp}>
              <FeatureCard 
                {...feature} 
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scaleUp}
        className="max-w-5xl bg-white rounded-2xl shadow-lg p-6 md:p-12 mx-4 md:mx-auto"
      >
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {statsData.map((stat, index) => (
            <motion.div key={index} variants={fadeUp}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  to,
  icon,
  title,
  description,
  color,
  delay = 0
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <Link
        to={to}
        className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1, type: "spring" }}
          className={`inline-block p-3 ${color} rounded-lg text-white mb-4`}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </Link>
    </motion.div>
  );
}

function StatCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
    >
      <div className="text-5xl font-extrabold text-green-600 mb-2">{value}</div>
      <div className="text-lg font-semibold text-gray-800 mb-1">{label}</div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

const getFeatureData = (language: 'en' | 'hi') => [
  {
    to: '/weather',
    icon: <Cloud className="h-8 w-8" />,
    title: getTranslation(language, 'weather'),
    description: getTranslation(language, 'weatherForecast'),
    color: 'bg-blue-500',
  },
  {
    to: '/disease-detection',
    icon: <Microscope className="h-8 w-8" />,
    title: getTranslation(language, 'diseaseDetection'),
    description: getTranslation(language, 'diseaseDetectionDescription'),
    color: 'bg-purple-500',
  },
  {
    to: '/crop-management',
    icon: <Plant className="h-8 w-8" />,
    title: getTranslation(language, 'cropManagement'),
    description: getTranslation(language, 'cropManagementDescription'),
    color: 'bg-green-500',
  },
  {
    to: '/tasks',
    icon: <Calendar className="h-8 w-8" />,
    title: getTranslation(language, 'taskManagement'),
    description: getTranslation(language, 'taskManagementDescription'),
    color: 'bg-orange-500',
  },
  {
    to: '/analytics',
    icon: <BarChart2 className="h-8 w-8" />,
    title: getTranslation(language, 'farmAnalytics'),
    description: getTranslation(language, 'farmAnalyticsDescription'),
    color: 'bg-red-500',
  },
];

const statsData = [
  { value: '98%', label: 'Accuracy Rate', description: 'In disease detection' },
  { value: '24/7', label: 'Monitoring', description: 'Real-time weather updates' },
  { value: '15%', label: 'Yield Increase', description: 'Average improvement' },
];

export default Dashboard;