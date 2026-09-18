import React, { useState, useEffect } from 'react';
import { FoxAvatar } from './avatars/FoxAvatar';
import { OwlAvatar } from './avatars/OwlAvatar';
import { PandaAvatar } from './avatars/PandaAvatar';
import { RabbitAvatar } from './avatars/RabbitAvatar';

export type CharacterType = 'fox' | 'owl' | 'panda' | 'rabbit';

interface CharacterOption {
  id: CharacterType;
  name: string;
  title: string;
  bgColor: string;
  borderColor: string;
  Component: React.FC<{ className?: string }>;
}

const CHARACTERS: CharacterOption[] = [
  {
    id: 'fox',
    name: 'فَهِم',
    title: 'ثعلب ذكي وشجاع',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500',
    Component: FoxAvatar,
  },
  {
    id: 'owl',
    name: 'حَكيم',
    title: 'بومة حكيمة وصبورة',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-700',
    Component: OwlAvatar,
  },
  {
    id: 'panda',
    name: 'هادئ',
    title: 'باندا لطيف وهادئ',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-500',
    Component: PandaAvatar,
  },
  {
    id: 'rabbit',
    name: 'سريع',
    title: 'أرنب نشيط وسريع',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-400',
    Component: RabbitAvatar,
  },
];

interface CharacterSelectorProps {
  onSelectCharacter?: (character: CharacterType) => void;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  onSelectCharacter,
}) => {
  const [selected, setSelected] = useState<CharacterType>('fox');

  useEffect(() => {
    const savedCharacter = localStorage.getItem('soroban_companion') as CharacterType;
    if (savedCharacter && ['fox', 'owl', 'panda', 'rabbit'].includes(savedCharacter)) {
      setSelected(savedCharacter);
    }
  }, []);

  const handleSelect = (characterId: CharacterType) => {
    setSelected(characterId);
    localStorage.setItem('soroban_companion', characterId);

    if (onSelectCharacter) {
      onSelectCharacter(characterId);
    }
  };

  return (
    <div dir="rtl" className="w-full max-w-2xl mx-auto p-4 select-none">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
          اختر رفيقك المفضل! 🌟
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-semibold">
          سيرافقك صديقك في رحلتك ويتعلم معك السوروبان
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CHARACTERS.map((char) => {
          const isSelected = selected === char.id;
          const AvatarComponent = char.Component;

          return (
            <button
              key={char.id}
              onClick={() => handleSelect(char.id)}
              className={`relative flex flex-col items-center p-4 rounded-3xl transition-all duration-300 transform border-4 outline-none ${char.bgColor} ${
                isSelected
                  ? `${char.borderColor} scale-105 shadow-xl ring-4 ring-amber-300/50`
                  : 'border-transparent hover:scale-105 opacity-75 hover:opacity-100 shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="my-2">
                <AvatarComponent className="w-20 h-20 sm:w-24 sm:h-24 filter drop-shadow-md" />
              </div>

              <h3 className="text-lg font-black text-slate-800 mb-1">{char.name}</h3>
              <span className="text-xs font-bold text-slate-500 text-center">
                {char.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSelector;
