import { ReactNode } from 'react';
import StarsBackground from '../common/StarsBackground';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen bg-transparent font-sans text-[var(--theme-text)] overflow-hidden relative transition-colors duration-500">
      <StarsBackground />
      {children}
    </div>
  );
}
