import React from 'react';
import { motion } from 'framer-motion';

interface SlideUpFadeInProps {
  children: React.ReactNode;
}

const SlideUpFadeIn: React.FC<SlideUpFadeInProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpFadeIn;
