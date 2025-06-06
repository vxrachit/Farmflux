import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane as Plant, ArrowRight, Leaf, Sun, CloudRain, BarChart2, Shield, Users } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function LandingPage() {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const statsControls = useAnimation();
  const ctaControls = useAnimation();

  useEffect(() => {
    if (heroInView) heroControls.start('visible');
    if (featuresInView) featuresControls.start('visible');
    if (statsInView) statsControls.start('visible');
    if (ctaInView) ctaControls.start('visible');
  }, [heroInView, featuresInView, statsInView, ctaInView, heroControls, featuresControls, statsControls, ctaControls]);

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


  const slideInFromRight = {
    hidden: { x: 80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
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

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const titleText = "Transform Your Farm with";
  const highlightText = "Smart Technology";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 overflow-x-hidden">

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center"
            >
              <Plant className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              <span className="ml-2 text-xl md:text-2xl font-bold text-green-600">FarmFlux</span>
            </motion.div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/auth"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Link
                  to="/auth"
                  className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section ref={heroRef} className="relative min-h-[90vh] md:min-h-screen flex items-center pt-16 md:pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&q=80')] bg-no-repeat bg-center bg-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div
              initial="hidden"
              animate={heroControls}
              variants={staggerContainer}
              className="text-center lg:text-left lg:col-span-6"
            >
              <motion.div variants={fadeUp}>
                <span className="block text-sm font-semibold uppercase tracking-wide text-green-600">
                  Future of Farming
                </span>
              </motion.div>
              
              <h1 className="mt-2 block text-2xl sm:text-3xl md:text-4xl xl:text-5xl tracking-tight font-extrabold">
                <motion.div variants={fadeUp} className="text-xl sm:text-xl md:text-2xl text-gray-900">
                  {titleText.split("").map((char, i) => (
                    <motion.span 
                      key={i} 
                      variants={letterAnimation}
                      style={{ display: 'inline-block' }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div variants={fadeUp} className="block text-green-600 mt-1">
                  {highlightText.split("").map((char, i) => (
                    <motion.span 
                      key={i} 
                      variants={letterAnimation}
                      style={{ display: 'inline-block' }}
                      transition={{ delay: i * 0.05 + 0.3 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>
              </h1>
              
              <motion.p 
                variants={fadeUp}
                className="mt-3 text-sm sm:text-base md:text-lg text-gray-500 max-w-md mx-auto lg:mx-0"
              >
                Harness the power of AI and real-time analytics to optimize your agricultural operations,
                increase yields, and promote sustainable farming practices.
              </motion.p>
              
              <motion.div 
                variants={fadeUp}
                className="mt-6 sm:mt-8 sm:max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
              >
                <Link
                  to="/auth"
                  className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-300 hover:shadow-md"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={heroControls}
              variants={slideInFromRight}
              className="mt-12 relative mx-auto lg:mt-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-xl shadow-2xl lg:max-w-md overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="w-full rounded-xl"
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
                  alt="Smart farming dashboard"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

         <section ref={featuresRef} id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={featuresControls}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">
              Comprehensive Farm Management Platform
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your farm efficiently in one place
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={featuresControls}
            variants={staggerContainer}
            className="mt-12 md:mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: <Sun className="h-8 w-8" />,
                title: "Weather Intelligence",
                description: "Advanced weather forecasting with agricultural-specific insights and alerts"
              },
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Disease Detection",
                description: "AI-powered crop disease detection with 98% accuracy and treatment recommendations"
              },
              {
                icon: <CloudRain className="h-8 w-8" />,
                title: "Smart Irrigation",
                description: "Automated irrigation management based on real-time soil and weather data"
              },
              {
                icon: <BarChart2 className="h-8 w-8" />,
                title: "Yield Analytics",
                description: "Data-driven insights to optimize crop yields and reduce resource waste"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Crop Protection",
                description: "Proactive pest and disease management with early warning system"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Management",
                description: "Coordinate farm activities and track task completion efficiently"
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeUp}>
                <FeatureCard 
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-green-700 relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80')] bg-cover bg-center"
        />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20 relative">
          <motion.div
            initial="hidden"
            animate={statsControls}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by farmers worldwide
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-xl text-green-200">
              Join thousands of farmers who have transformed their operations with FarmFlux
            </motion.p>
          </motion.div>
          
          <motion.dl
            initial="hidden"
            animate={statsControls}
            variants={staggerContainer}
            className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8"
          >
            <motion.div variants={fadeUp} className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                Accuracy Rate
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                <AnimatedCounter from={0} to={98} duration={1.5} />%
              </dd>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                Active Users
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                <AnimatedCounter from={0} to={10} duration={1.5} />k+
              </dd>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                Yield Increase
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                <AnimatedCounter from={0} to={15} duration={1.5} />%
              </dd>
            </motion.div>
          </motion.dl>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={ctaControls}
            variants={scaleUp}
            className="bg-green-700 rounded-xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4 relative"
          >
            <div className="absolute inset-0 opacity-10">
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80')] bg-cover bg-center"
              />
            </div>
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20 relative">
              <div className="lg:self-center">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-extrabold text-white sm:text-4xl"
                >
                  <span className="block">Ready to get started?</span>
                  <span className="block">Start your free trial today.</span>
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-lg leading-6 text-green-200"
                >
                  Join thousands of farmers who have already transformed their operations with FarmFlux.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/auth"
                    className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-green-600 hover:bg-green-50 transition-all duration-300 hover:shadow-md"
                  >
                    Sign up for free
                  </Link>
                </motion.div>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1 relative">
              <motion.img
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="transform translate-x-6 translate-y-6 rounded-xl object-cover object-left-top sm:translate-x-16 lg:translate-y-20 shadow-lg"
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
                alt="App screenshot"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-50"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Plant className="h-6 w-6 text-green-600" />
              <span className="text-gray-500">© 2025 FarmFlux. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
              >
                Privacy
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
              >
                Terms
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
              >
                Contact
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay = 0 }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, type: "spring" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 shadow-sm">
          {icon}
        </div>
      </motion.div>
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

function AnimatedCounter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    let start = from;
    const end = to;
    const increment = end > start ? 1 : -1;
    const range = Math.abs(end - start);
    const stepTime = duration / range;

    const timer = setInterval(() => {
      start += increment;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <>{count}</>;
}

export default LandingPage;