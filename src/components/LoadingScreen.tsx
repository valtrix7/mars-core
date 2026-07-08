import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pickaxe } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const statuses = [
      'INITIALIZING',
      'CONNECTING TO NODES',
      'LOADING MINING POOLS',
      'SYNCING BLOCKCHAIN',
      'CALIBRATING HASHRATE',
      'ESTABLISHING SECURE LINK',
      'LOADING DASHBOARD',
      'READY'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        setStatus('READY');
        setTimeout(() => {
          setShow(false);
          setTimeout(onComplete, 500);
        }, 800);
      } else {
        const statusIndex = Math.min(Math.floor((current / 100) * statuses.length), statuses.length - 2);
        setStatus(statuses[statusIndex]);
      }
      setProgress(Math.min(current, 100));
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--theme-bg)]"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-grid-pattern animate-grid opacity-5" />
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[var(--theme-accent)] rounded-full"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0
                }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 border-l-2 border-t-2 border-[var(--theme-accent)] w-16 h-16 opacity-30" />
          <div className="absolute top-8 right-8 border-r-2 border-t-2 border-[var(--theme-accent)] w-16 h-16 opacity-30" />
          <div className="absolute bottom-8 left-8 border-l-2 border-b-2 border-[var(--theme-accent)] w-16 h-16 opacity-30" />
          <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-[var(--theme-accent)] w-16 h-16 opacity-30" />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Spinning pickaxe */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-8"
            >
              <div className="w-24 h-24 hud-border hud-clip bg-[var(--theme-accent)] flex items-center justify-center">
                <Pickaxe className="w-12 h-12 text-[var(--theme-bg)]" />
              </div>
            </motion.div>

            {/* Logo text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="font-display font-bold text-4xl tracking-[0.3em] text-[var(--theme-accent)] uppercase mb-2">
                MARS ORE
              </h1>
              <p className="text-xs font-mono text-[var(--theme-text)] opacity-50 tracking-[0.4em] uppercase">
                MINING_CORE_v1.0
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4 }}
              className="w-80 mb-6"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-[var(--theme-text)] opacity-50 uppercase tracking-widest">
                  {status}
                </span>
                <span className="text-[10px] font-mono text-[var(--theme-accent)] uppercase tracking-widest">
                  {Math.floor(progress)}%
                </span>
              </div>
              <div className="h-1 bg-[var(--theme-clip-bg)] hud-clip overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--theme-accent)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Status lines */}
            <div className="w-80 space-y-2">
              {['SYSTEM ONLINE', 'ENCRYPTION ACTIVE', 'NODE SYNCED'].map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: progress > (i + 1) * 25 ? 0.5 : 0, x: progress > (i + 1) * 25 ? 0 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${progress > (i + 1) * 25 ? 'bg-green-500' : 'bg-[var(--theme-text)] opacity-30'}`} />
                  <span className="text-[10px] font-mono text-[var(--theme-text)] uppercase tracking-widest">{line}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-30"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
