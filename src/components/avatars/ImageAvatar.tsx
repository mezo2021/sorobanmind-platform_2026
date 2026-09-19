import React from 'react';
import { motion } from 'framer-motion';

interface ImageAvatarProps {
  src: string;
  alt: string;
  className?: string;
  animated?: boolean;
  motionType?: 'float' | 'breathe' | 'sway';
}

export const ImageAvatar: React.FC<ImageAvatarProps> = ({
  src,
  alt,
  className = 'w-32 h-32',
  animated = true,
  motionType = 'float',
}) => {
  const animations = {
    float: {
      animate: { y: [0, -6, 0] },
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
    },
    breathe: {
      animate: { scale: [1, 1.04, 1] },
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const },
    },
    sway: {
      animate: { rotate: [-2, 2, -2] },
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  const config = animations[motionType];

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-white to-slate-100 shadow-inner ${className}`}
      animate={animated ? config.animate : undefined}
      transition={config.transition}
      whileHover={animated ? { scale: 1.08 } : undefined}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain object-bottom select-none pointer-events-none p-1"
        draggable={false}
      />
    </motion.div>
  );
};

export default ImageAvatar;