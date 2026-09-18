import React, { useState, useEffect } from 'react';
import { FoxAvatar } from './avatars/FoxAvatar';
import { OwlAvatar } from './avatars/OwlAvatar';
import { PandaAvatar } from './avatars/PandaAvatar';
import { RabbitAvatar } from './avatars/RabbitAvatar';

export type CharacterType = 'fox' | 'owl' | 'panda' | 'rabbit';

interface CompanionProps {
  character?: CharacterType;
  xp?: number;
}

const MOTIVATIONAL_MESSAGES = [
  "أنت رائع في حساب السوروبان! 🧮",
  "واصل التركيز، عقلك أصبح أسرع الآن! ⚡",
  "ممتاز! كل خرزة تحركها تقربك للقمة 🚀",
  "يا لك من بطل! إجابة ذكية جداً 💡",
  "تركيز عالي اليوم! أنا فخور بك 🌟",
  "السوروبان يمنحك قوة خارقة في الرياضيات! 💪"
];

export const Companion: React.FC<CompanionProps> = ({ character = 'fox', xp = 0 }) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [showBubble, setShowBubble] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleTap = () => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    setCurrentMessage(MOTIVATIONAL_MESSAGES[randomIndex]);
    setShowBubble(true);
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    if (xp > 0) {
      setCurrentMessage(`أحسنت! حصلت على +${xp} نقطة خبرة! 🎉`);
      setShowBubble(true);
      triggerAnimation();
    }
  }, [xp]);

  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => setShowBubble(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showBubble]);

  const renderCharacter = () => {
    switch (character) {
      case 'owl':
        return <OwlAvatar className="w-24 h-24 sm:w-28 sm:h-28" />;
      case 'panda':
        return <PandaAvatar className="w-24 h-24 sm:w-28 sm:h-28" />;
      case 'rabbit':
        return <RabbitAvatar className="w-24 h-24 sm:w-28 sm:h-28" />;
      case 'fox':
      default:
        return <FoxAvatar className="w-24 h-24 sm:w-28 sm:h-28" />;
    }
  };

  return (
    <div dir="rtl" className="fixed bottom-4 right-4 z-40 flex flex-col items-end select-none pointer-events-none">
      {showBubble && (
        <div className="mb-2 max-w-[220px] sm:max-w-[280px] p-3 bg-white text-slate-800 rounded-2xl rounded-bl-none shadow-xl border-2 border-amber-300 text-sm sm:text-base font-bold animate-pulse text-right relative pointer-events-auto">
          {currentMessage}
          <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
        </div>
      )}

      <button
        onClick={handleTap}
        className={`focus:outline-none transition-transform duration-300 transform active:scale-90 pointer-events-auto ${
          isAnimating ? 'animate-bounce' : 'hover:scale-105'
        }`}
        aria-label="الرفيق الكرتوني"
      >
        <div className="filter drop-shadow-lg">
          {renderCharacter()}
        </div>
      </button>
    </div>
  );
};

export default Companion;
