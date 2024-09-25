'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { LoginButton } from '../auth/login-button';

const HeroSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('HeroSection');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  return (
    <div className="relative bg-transparent py-28">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex justify-center items-center z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <div className="bg-gradient-to-r from-teal-500/60 via-emerald-500/50 to-blue-500/40 blur-[100px] w-[30rem] h-[30rem] rounded-full"></div>
      </motion.div>

      <motion.div
        className="relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            className="flex justify-center mb-12"
            variants={imageVariants}
          >
            <Image
              src={theme === 'dark' ? '/dark-hero.webp' : '/light-hero.webp'}
              alt="Hero"
              width={600}
              height={600}
              className="w-[250px] md:w-[450px] h-auto"
              priority
            />
          </motion.div>

          <motion.h1
            className="block font-extrabold text-gray-800 text-5xl md:text-6xl lg:text-7xl dark:text-white leading-tight"
            variants={textVariants}
          >
            {t('title')}
          </motion.h1>

          <motion.p
            className="mt-5 text-lg text-black dark:text-white font-normal max-w-4xl mx-auto"
            variants={textVariants}
          >
            {t('description')}
          </motion.p>

          <motion.div variants={textVariants} className="mt-8">
            <LoginButton>
              <Button variant="default" className="px-6 py-3 font-semibold text-white rounded-full bg-black dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border border-black dark:border-white transition-colors duration-300 ease-in-out">
                {t('getStarted')}
              </Button>
            </LoginButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
