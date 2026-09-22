import { motion } from 'framer-motion';
import sorobanaImg from '@/assets/sorobana/sorobana-main.webp';

interface SorobanaCompanionProps {
  isSpeaking: boolean;
  onClick?: () => void;
}

export function SorobanaCompanion({ isSpeaking, onClick }: SorobanaCompanionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="سوروبانا — المعلمة"
      className="fixed z-[55] select-none focus:outline-none"
      style={{
        bottom: '8rem',
        right: '0',
        width: 'clamp(140px, 30vw, 200px)',
        height: 'clamp(190px, 40vw, 270px)',
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
          y: isSpeaking ? [0, -6, 0, -6, 0] : [0, -4, 0],
          scale: isSpeaking ? [1, 1.06, 1] : 1,
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
            objectPosition: 'right bottom',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
          }}
          draggable={false}
        />
      </motion.div>
    </motion.button>
  );
}

export default SorobanaCompanion;