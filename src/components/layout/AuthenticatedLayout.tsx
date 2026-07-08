import { useState } from 'react';
import AuthenticatedHeader from './AuthenticatedHeader';
import BottomNav from './BottomNav';
import DashboardOrb from './DashboardOrb';
import MainContent from './MainContent';

export default function AuthenticatedLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <DashboardOrb onClick={() => setIsMenuOpen(true)} isMenuOpen={isMenuOpen} />
      <AuthenticatedHeader />
      <MainContent isMenuOpen={isMenuOpen} />
      <BottomNav
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
