import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageAvatar } from './avatars/ImageAvatar';
import { useCharacterVoice } from '@/hooks/useCharacterVoice';
import type { CharacterType } from '@/types';

import shamImg from '../assets/avatars/sham.png';
import rayanImg from '../assets/avatars/rayan.png';
import banaImg from '../assets/avatars/bana.png';
import joudImg from '../assets/avatars/joud2.png';

const CHARACTER_DATA: Record<CharacterType, { name: string; image: string }> = {
  sham: { name: 'شام', image: shamImg },
  rayan: { name: 'ريان', image: rayanImg },
  bana: { name: 'بانة', image: banaImg },
  joud: { name: 'جود', image: joudImg },
};

const PHRASES: string[] = [
  'كيف حالك اليوم؟',
  'هل أنت مستعد لنتعلم أشياء جديدة؟',
  'أنا فخور بك يا بطل!',
  'استمر، أنت رائع!',
  'كل خطوة تقربك من الإتقان!',
  'هيا نحقق إنجازاً جديداً اليوم!',
  'أحب رؤيتك تتعلم!',
  'التركيز هو سر النجاح!',
  'أنت بطل حقيقي!',
  'رحلة الألف ميل تبدأ بخطوة!',
  'تعلّم شيئاً جديداً كل يوم!',
  'أنت ذكي ومجتهد!',
];

const CHARACTER_GRADIENTS: Record<CharacterType, string> = {
  sham: 'from-violet-500 to-purple-700',
  rayan: 'from-blue-500 to-indigo-700',
  bana: 'from-teal-400 to-emerald-700',
  joud: 'from-indigo-500 to-purple-700',
};

function getStoredCharacter(): CharacterType {
  try {
    const saved = localStorage.getItem('soroban_companion');
    if (saved === 'sham' || saved === 'rayan' || saved === 'bana' || saved === 'joud') {
      return saved as CharacterType;
    }
  } catch {
    /* ignore */
  }
  return 'sham';
}

interface FloatingCompanionProps {
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  size?: number;
  offsetBottom?: string;
}

export function FloatingCompanion({
  playSound,
  size = 76,
  offsetBottom = '1.5rem',
}: FloatingCompanionProps) {
  const [character] = useState<CharacterType>(() => getStoredCharacter());
  const [currentPhrase, setCurrentPhrase] = useState<string | null>(null);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const { speak, stop, isSpeaking, isSupported } = useCharacterVoice(character);

  const data = CHARACTER_DATA[character] ?? CHARACTER_DATA.sham;
  const gradient = CHARACTER_GRADIENTS[character] ?? CHARACTER_GRADIENTS.sham;

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const pickPhrase = useCallback((): string => {
    let available = PHRASES.map((_, i) => i).filter((i) => !usedIndices.includes(i));
    if (available.length === 0) {
      setUsedIndices([]);
      available = PHRASES.map((_, i) => i);
    }
    const idx = available[Math.floor(Math.random() * available.length)];
    setUsedIndices((prev) => [...prev, idx]);
    return PHRASES[idx];
  }, [usedIndices]);

  const handleClick = useCallback(() => {
    if (isSpeaking) {
      stop();
      setCurrentPhrase(null);
      return;
    }
    playSound('whoosh');
    const phrase = pickPhrase();
    setCurrentPhrase(phrase);
    setTimeout(() => {
      speak(phrase, () => setCurrentPhrase(null));
    }, 250);
  }, [isSpeaking, stop, playSound, pickPhrase, speak]);

  if (!isSupported) return null;

  return (
    <>
      {/* فقاعة الكلام */}
      <AnimatePresence>
        {currentPhrase && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed z-[70] pointer-events-none"
            style={{
              bottom: `calc(${offsetBottom} + ${size + 14}px)`,
              right: '1rem',
              maxWidth: 'min(72vw, 240px)',
            }}
          >
            <div
              className="relative px-3 py-2 rounded-2xl shadow-2xl border-2"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5EBD0 100%)',
                borderColor: '#DAA520',
                color: '#5D3A1A',
              }}
            >
              <p
                className="text-xs sm:text-sm font-bold font-body leading-snug text-right"
                dir="rtl"
              >
                {currentPhrase}
              </p>
              <div
                className="absolute"
                style={{
                  bottom: '-9px',
                  right: '22px',
                  width: '14px',
                  height: '14px',
                  background: '#F5EBD0',
                  borderRight: '2px solid #DAA520',
                  borderBottom: '2px solid #DAA520',
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* زر الشخصية */}
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={`رفيقك ${data.name}`}
        className="fixed z-[65] rounded-full shadow-2xl border-2 border-white/40 overflow-hidden select-none"
        style={{
          bottom: offsetBottom,
          right: '1rem',
          width: size,
          height: size,
          padding: 0,
          background: 'transparent',
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} flex items-end justify-center shadow-inner overflow-hidden`}
          animate={{
            y: isSpeaking ? [0, -3, 0, -3, 0] : [0, -4, 0],
            scale: isSpeaking ? [1, 1.07, 1] : 1,
          }}
          transition={{
            duration: isSpeaking ? 0.7 : 2.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ImageAvatar
            src={data.image}
            alt={data.name}
            className="w-full h-full drop-shadow-lg"
            motionType="breathe"
          />
        </motion.div>
      </motion.button>
    </>
  );
}

export default FloatingCompanion;