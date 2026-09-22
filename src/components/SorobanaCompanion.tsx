import { motion } from 'framer-motion';
import sorobanaImg from '@/assets/sorobana/sorobana-main.webp';

type LessonMode = 'watch' | 'try';

interface SorobanaCompanionProps {
  isSpeaking: boolean;
  onClick?: () => void;
  mode?: LessonMode;
}

export function SorobanaCompanion({
  isSpeaking,
  onClick,
  mode = 'watch',
}: SorobanaCompanionProps) {
  // حجم مختلف حسب الوضع
  const size = mode === 'watch' ? 180 : 90;
  const height = Math.round(size * 1.35);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="سوروبانا — المعلمة"
      className="fixed z-[55] select-none focus:outline-none"
      style={{
        bottom: '12rem',
        right: '0.25rem',
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
        className="flex items-end justify-center"
        animate={{
          width: size,
          height: height,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <motion.img
          src={sorobanaImg}
          alt="سوروبانا"
          className="w-full h-full pointer-events-none"
          style={{
            objectFit: 'contain',
            objectPosition: 'right bottom',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
          }}
          draggable={false}
          animate={{
            y: isSpeaking ? [0, -3, 0, -3, 0] : [0, -2, 0],
            scale: isSpeaking ? [1, 1.04, 1] : 1,
          }}
          transition={{
            duration: isSpeaking ? 0.8 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.button>
  );
}

export default SorobanaCompanion;