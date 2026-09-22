import { useEffect, useState } from 'react';
import { subscribeDebug } from '@/hooks/useSorobanaVoice';

export function DebugOverlay() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeDebug((msg) => {
      setMessages((prev) => [...prev.slice(-8), msg]);
    });
    return unsubscribe;
  }, []);

  if (messages.length === 0) return null;

  return (
    <div
      dir="ltr"
      className="fixed top-2 left-2 z-[999] max-w-[90vw] p-2 rounded-lg font-mono text-[10px] leading-tight"
      style={{
        background: 'rgba(0,0,0,0.85)',
        color: '#0f0',
        border: '1px solid #0f0',
        maxHeight: '35vh',
        overflowY: 'auto',
        pointerEvents: 'none',
      }}
    >
      <div style={{ color: '#ff0', fontWeight: 'bold', marginBottom: 4 }}>
        🔍 SOROBANA DEBUG
      </div>
      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: 2 }}>
          {msg}
        </div>
      ))}
    </div>
  );
}

export default DebugOverlay;