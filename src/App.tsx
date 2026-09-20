import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Role, Screen } from './types';
import { useGameStats } from './hooks/useGameStats';
import { useSound } from './hooks/useSound';
import { useConfetti } from './hooks/useConfetti';
import { BADGES } from './data';
import { Header } from './components/Header';
import { RoleSelection } from './components/RoleSelection';
import { HeroDashboard } from './components/HeroDashboard';
import { LearnScreen } from './components/LearnScreen';
import { FinalExam } from './components/FinalExam';
import { PracticeScreen } from './components/PracticeScreen';
import { AnzanScreen } from './components/AnzanScreen';
import { QuestsScreen } from './components/QuestsScreen';
import { GuardianDashboard } from './components/GuardianDashboard';
import InteractiveSorobanScreen from './components/InteractiveSorobanScreen';
import { BadgeModal } from './components/BadgeModal';

function App() {
  const [role, setRole] = useState<Role>(null);
  const [screen, setScreen] = useState<Screen>('role');

  const { stats, addXP, toggleSound, incrementStreak, newBadge, clearNewBadge } = useGameStats();
  const playSound = useSound(stats.soundEnabled);
  const { burst, celebrate } = useConfetti();

  useEffect(() => {
    if (newBadge) {
      playSound('levelup');
      celebrate();
    }
  }, [newBadge, playSound, celebrate]);

  const activeBadge = newBadge ? BADGES.find((b) => b.id === newBadge) || null : null;

  const handleRoleSelect = useCallback((r: Role) => {
    setRole(r);
    setScreen(r === 'hero' ? 'hero-dashboard' : 'guardian-dashboard');
    celebrate();
  }, [celebrate]);

  const handleHome = useCallback(() => {
    setRole(null);
    setScreen('role');
  }, []);

  const handleNavigate = useCallback((s: Screen) => {
    setScreen(s);
  }, []);

  const showHeader = role !== null && screen !== 'role';

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-72 h-72 rounded-full bg-purple-600/15 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-5%] w-80 h-80 rounded-full bg-electric-600/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[40%] left-[30%] w-64 h-64 rounded-full bg-emerald2-600/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {showHeader && (
        <Header
          xp={stats.xp}
          streak={stats.streak}
          level={stats.level}
          soundEnabled={stats.soundEnabled}
          onToggleSound={toggleSound}
          onHome={handleHome}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {screen === 'role' && (
            <RoleSelection onSelect={handleRoleSelect} playSound={playSound} />
          )}

          {screen === 'hero-dashboard' && (
            <HeroDashboard
              onNavigate={handleNavigate}
              playSound={playSound}
              xp={stats.xp}
              streak={stats.streak}
              earnedBadges={stats.earnedBadges}
            />
          )}

          {screen === 'learn' && (
            <LearnScreen
              onBack={() => handleNavigate('hero-dashboard')}
              playSound={playSound}
              onXP={addXP}
            />
          )}

          {screen === 'final-exam' && (
            <FinalExam
              onBack={() => handleNavigate('hero-dashboard')}
              onComplete={(score, passed) => {
                try {
                  localStorage.setItem(
                    'soroban_exam_result',
                    JSON.stringify({ score, passed, date: Date.now() })
                  );
                } catch { /* ignore */ }
              }}
              playSound={playSound}
            />
          )}

          {screen === 'practice' && (
            <PracticeScreen
              onBack={() => handleNavigate('hero-dashboard')}
              playSound={playSound}
              onXP={addXP}
              burst={burst}
            />
          )}

          {screen === 'anzan' && (
            <AnzanScreen
              onBack={() => handleNavigate('hero-dashboard')}
              playSound={playSound}
              onXP={addXP}
              burst={burst}
            />
          )}

          {screen === 'quests' && (
            <QuestsScreen
              onBack={() => handleNavigate('hero-dashboard')}
              playSound={playSound}
              onXP={addXP}
              burst={burst}
            />
          )}

          {screen === 'soroban' && (
            <InteractiveSorobanScreen
              onBack={() => handleNavigate('hero-dashboard')}
              playSound={playSound}
              onXP={addXP}
            />
          )}

          {screen === 'guardian-dashboard' && (
            <GuardianDashboard
              onBack={handleHome}
              playSound={playSound}
              childXP={stats.xp}
              childStreak={stats.streak}
              childLevel={stats.level}
            />
          )}
        </motion.main>
      </AnimatePresence>

      <BadgeModal badge={activeBadge} onClose={clearNewBadge} />
    </div>
  );
}

export default App;