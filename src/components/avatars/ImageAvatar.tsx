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
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    breathe: {
      animate: { scale: [1, 1.04, 1] },
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    sway: {
      animate: { rotate: [-2, 2, -2] },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const config = animations[motionType];

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`object-contain select-none pointer-events-none ${className}`}
      animate={animated ? config.animate : undefined}
      transition={config.transition}
      whileHover={animated ? { scale: 1.08, rotate: 2 } : undefined}
      draggable={false}
    />
  );
};

export default ImageAvatar;