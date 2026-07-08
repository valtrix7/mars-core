import { CSSProperties, useEffect, useState } from 'react';

interface DashboardOrbProps {
  onClick?: () => void;
  isMenuOpen?: boolean;
}

export default function DashboardOrb({ onClick, isMenuOpen = true }: DashboardOrbProps) {
  const [hashrate, setHashrate] = useState(1.35);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHashrate(prev => {
        const change = (Math.random() - 0.5) * 0.05;
        return Math.max(1.2, Math.min(1.5, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.5) % 360);
      requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const isInteractive = !isMenuOpen && onClick;

  return (
    <div 
      className={`dashboard-orb ${isInteractive ? 'dashboard-orb--interactive' : ''}`}
      aria-hidden="true"
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {/* Outer glow rings */}
      <div className="dashboard-orb__glow dashboard-orb__glow--1" />
      <div className="dashboard-orb__glow dashboard-orb__glow--2" />
      <div className="dashboard-orb__glow dashboard-orb__glow--3" />
      
      {/* Orbital rings */}
      <div className="dashboard-orb__ring dashboard-orb__ring--outer" />
      <div className="dashboard-orb__ring dashboard-orb__ring--middle" />
      <div className="dashboard-orb__ring dashboard-orb__ring--inner" />
      <div className="dashboard-orb__ring dashboard-orb__ring--core" />
      
      {/* Scan effect */}
      <div className="dashboard-orb__scan" />
      <div className="dashboard-orb__scan dashboard-orb__scan--secondary" />
      
      {/* Core */}
      <div className="dashboard-orb__core" />
      <div className="dashboard-orb__core-inner" />
      
      {/* Data readouts */}
      <div className="dashboard-orb__data" style={{ transform: `rotate(${rotation}deg)` }}>
        <span className="dashboard-orb__data-item">{hashrate.toFixed(2)} GH/s</span>
      </div>
      
      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="dashboard-orb__particle"
          style={{
            '--i': i,
            '--delay': `${i * 0.5}s`,
            '--size': `${2 + Math.random() * 3}px`
          } as CSSProperties}
        />
      ))}
      
      {/* Tick marks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="dashboard-orb__tick"
          style={{ transform: `rotate(${i * 30}deg)` }}
        />
      ))}
    </div>
  );
}
