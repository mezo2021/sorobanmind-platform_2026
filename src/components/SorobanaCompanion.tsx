import { motion } from 'framer-motion';
import sorobanaImg from '@/assets/sorobana/sorobana-main.webp';

interface SorobanaCompanionProps {
  isSpeaking: boolean;
  onClick?: () => void;
  size?: number;
  offsetBottom?: string;
}

export function SorobanaCompanion({
  isSpeaking,
  onClick,
  size = 130,
  offsetBottom = '12rem',
}: SorobanaCompanionProps) {
  const height = Math.round(size * 1.35);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="سوروبانا — المعلمة"
      className="fixed z-[55] select-none focus:outline-none"
      style={{
        bottom: offsetBottom,
        right: '0.5rem',
        width: size,
        height: height,
        padding: 0,
        background: 'transparent',
        border: 'none',
      }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-full h-full flex items-end justify-center"
        animate={{
          y: isSpeaking ? [0, -5, 0, -5, 0] : [0, -3, 0],
          scale: isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: isSpeaking ? 0.8 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src={sorobanaImg}
          alt="سوروبانا"
          className="w-full h-full pointer-events-none"
          style={{
            objectFit: 'contain',
            objectPosition: 'center bottom',
          }}
          draggable={false}
        />
      </motion.div>
    </motion.button>
  );
}

export default SorobanaCompanion;