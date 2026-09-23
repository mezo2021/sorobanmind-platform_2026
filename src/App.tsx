import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Role, Screen } from './types';
import { useGameStats } from './hooks/useGameStats';
import { useSound } from './hooks/useSound';
import { useConfetti } from './hooks/useConfetti';
import { BADGES } from './data';
import { Header } from './components/Header';
import { RoleSelection } from './components/RoleSelection';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HeroDashboard } from './components/HeroDashboard';
import { LearnScreen } from './components/LearnScreen';
import { FinalExam } from './components/FinalExam';
import { PracticeScreen } from './components/PracticeScreen';
import { AnzanScreen } from './components/AnzanScreen';
import { QuestsScreen } from './components/QuestsScreen';
import { GuardianDashboard } from './components/GuardianDashboard';
import InteractiveSorobanScreen from './components/InteractiveSorobanScreen';
import { BadgeModal } from './components/BadgeModal';

import MultiplicationScreen from './screens/MultiplicationScreen';
import MagicSecretsScreen from './screens/MagicSecretsScreen';
import CrossMultiplicationScreen from './screens/CrossMultiplicationScreen';
import DivisionScreen from './screens/DivisionScreen';
import CertificateScreen from './screens/CertificateScreen';

const EXAM_REQUIRED_SCREENS: Screen[] = [
  'multiplication',
  'secrets',
  'cross-multiplication',
  'division',
  'certificate',
];

const WELCOME_KEY = 'soroban_seen_welcome';
const WELCOME_INTERVAL_DAYS = 7;

/** ✅ عرض الشاشة إذا مضى 7 أيام (أو لم تُعرض قط) */
function shouldShowWelcome(): boolean {
  try {
    const lastSeen = localStorage.getItem(WELCOME_KEY);
    if (!lastSeen) return true;
    const lastSeenTime = parseInt(lastSeen, 10);
    if (isNaN(lastSeenTime)) return true;
    const now = Date.now();
    const intervalMs = WELCOME_INTERVAL_DAYS * 24 * 60 * 60 * 1000;
    return now - lastSeenTime >= intervalMs;
  } catch {
    return true;
  }
}

function App() {
  const [role, setRole] = useState<Role>(null);
  const [screen, setScreen] = useState<Screen>('role');
  const [examPassed, setExamPassed] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(() => shouldShowWelcome());

  const { stats, addXP, toggleSound, incrementStreak, newBadge, clearNewBadge } = useGameStats();
  const playSound = useSound(stats.soundEnabled);
  const { burst, celebrate } = useConfetti();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('soroban_exam_result');
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.passed === true) setExamPassed(true);
      }
    } catch { /* ignore */ }
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
    let currentlyPassed = examPassed;
    if (!currentlyPassed) {
      try {
        const raw = localStorage.getItem('soroban_exam_result');
        if (raw) {
          const data = JSON.parse(raw);
          if (data?.passed === true) {
            currentlyPassed = true;
            setExamPassed(true);
          }
        }
      } catch { /* ignore */ }
    }
    if (EXAM_REQUIRED_SCREENS.includes(s) && !currentlyPassed) {
      return;
    }
    setScreen(s);
  }, [examPassed]);

  const handleWelcomeStart = useCallback(() => {
    try {
      localStorage.setItem(WELCOME_KEY, Date.now().toString());
    } catch { /* ignore */ }
    setShowWelcome(false);
  }, []);

  /** ✅ عرض شاشة الترحيب يدوياً (من لوحة ولي الأمر) */
  const handleShowWelcome = useCallback(() => {
    setShowWelcome(true);
  }, []);

  const showHeader = !showWelcome && role !== null && screen !== 'role';

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

      {/* ✅ Welcome Screen — تظهر كل 7 أيام */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 overflow-y-auto"
          >
            <WelcomeScreen onStart={handleWelcomeStart} />
          </motion.div>
        )}
      </AnimatePresence>

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
          {screen === 'role' && !showWelcome && (
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
            <InteractiveSorobanScreen
              onBack={() => handleNavigate('hero-dashboard')}
              playSound={playSound}
              onXP={addXP}
            />
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

          {screen === 'certificate' && examPassed && (
            <CertificateScreen
              onBack={() => handleNavigate('hero-dashboard')}
              playSound={playSound}
              onGoHome={() => handleNavigate('hero-dashboard')}
            />
          )}

          {screen === 'guardian-dashboard' && (
            <GuardianDashboard
              onBack={handleHome}
              playSound={playSound}
              childXP={stats.xp}
              childStreak={stats.streak}
              childLevel={stats.level}
              onShowWelcome={handleShowWelcome}
            />
          )}
        </motion.main>
      </AnimatePresence>

      <BadgeModal badge={activeBadge} onClose={clearNewBadge} />
    </div>
  );
}

export default App;