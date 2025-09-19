import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Fix: Use HTMLMotionProps<'div'> instead of React.HTMLAttributes<HTMLDivElement>.
// This resolves type conflicts between React's standard HTML attributes and
// framer-motion's animation props (e.g., onAnimationStart).
interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-sm p-6 ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
};


interface CardHeaderProps {
    icon: React.ReactNode;
    title: string;
    action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ icon, title, action }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
        </div>
        {action}
    </div>
);
