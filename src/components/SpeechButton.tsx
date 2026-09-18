import { motion } from 'framer-motion';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface SpeechButtonProps {
  text: string;
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  className?: string;
}

export function SpeechButton({
  text,
  speak,
  stop,
  isSpeaking,
  isSupported,
  className = '',
}: SpeechButtonProps) {
  if (!isSupported) return null;

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all font-body text-sm font-bold ${
        isSpeaking
          ? 'bg-red-500/20 border-red-400/40 text-red-200'
          : 'bg-gradient-to-br from-electric-500/20 to-purple-500/20 border-electric-400/40 text-electric-200 hover:from-electric-500/30 hover:to-purple-500/30'
      } ${className}`}
      aria-label={isSpeaking ? 'إيقاف الصوت' : 'تشغيل الصوت'}
    >
      {isSpeaking ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>إيقاف</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          <span>اسمع الشرح</span>
        </>
      )}
    </motion.button>
  );
}

export default SpeechButton;
