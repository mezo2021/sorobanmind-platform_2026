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
import { BadgeModal } from './components/BadgeModal';
import { Soroban2D5 } from './components/soroban2d5/Soroban2D5';

// ✅ استيراد الشاشات المتقدمة
import MultiplicationScreen from './screens/MultiplicationScreen';
import MagicSecretsScreen from './screens/MagicSecretsScreen';
import CrossMultiplicationScreen from './screens/CrossMultiplicationScreen';
import DivisionScreen from './screens/DivisionScreen';

// ✅ الشاشات التي تتطلب اجتياز الامتحان النهائي
const EXAM_REQUIRED_SCREENS: Screen[] = [
  'multiplication',
  'secrets',
  'cross-multiplication',
  'division',
];

function App() {
  const [role, setRole] = useState<Role>(null);
  const [screen, setScreen] = useState<Screen>('role');
  const [examPassed, setExamPassed] = useState(false);

  const { stats, addXP, toggleSound, incrementStreak, newBadge, clearNewBadge } = useGameStats();
  const playSound = useSound(stats.soundEnabled);
  const { burst, celebrate } = useConfetti();

  // ✅ قراءة حالة اجتياز الامتحان عند الإقلاع
  useEffect(() => {
    try {
      const raw = localStorage.getItem('soroban_exam_result');
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.passed === true) {
          setExamPassed(true);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

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
    if (EXAM_REQUIRED_SCREENS.includes(s) && !examPassed) {
      return;
    }
    setScreen(s);
  }, [examPassed]);

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
              onNavigate={handleNavigate}
            />
          )}

          {screen === 'final-exam' && (
            <FinalExam
              onBack={() => handleNavigate('hero-dashboard')}
              onGoToLearn={() => handleNavigate('learn')}
              onComplete={(score, passed) => {
                try {
                  localStorage.setItem(
                    'soroban_exam_result',
                    JSON.stringify({ score, passed, date: Date.now() })
                  );
                } catch { /* ignore */ }

                if (passed) {
                  setExamPassed(true);
                }
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
            <div className="min-h-screen flex flex-col">
              <div className="p-4">
                <button
                  type="button"
                  onClick={() => handleNavigate('hero-dashboard')}
                  className="px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold shadow-md transition"
                >
                  ← رجوع
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Soroban2D5
                  columns={4}
                  interactive={true}
                  showValue={true}
                  onValueChange={(v) => {
                    console.log('value =', v);
                  }}
                />
              </div>
            </div>
          )}

          {screen === 'multiplication' && examPassed && (
            <MultiplicationScreen
              onBack={() => handleNavigate('hero-dashboard')}
              onComplete={(stars) => addXP(stars * 10)}
            />
          )}

          {screen === 'cross-multiplication' && examPassed && (
            <CrossMultiplicationScreen
              onBack={() => handleNavigate('hero-dashboard')}
              onComplete={(stars) => addXP(stars * 10)}
              onXP={addXP}
            />
          )}

          {screen === 'secrets' && examPassed && (
            <MagicSecretsScreen
              onBack={() => handleNavigate('hero-dashboard')}
              onComplete={(stars) => addXP(stars * 10)}
              onXP={addXP}
            />
          )}

          {screen === 'division' && examPassed && (
            <DivisionScreen
              onBack={() => handleNavigate('hero-dashboard')}
              onComplete={(stars) => addXP(stars * 10)}
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