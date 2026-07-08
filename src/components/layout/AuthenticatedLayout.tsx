import { useState } from 'react';
import AuthenticatedHeader from './AuthenticatedHeader';
import BottomNav from './BottomNav';
import MainContent from './MainContent';

export default function AuthenticatedLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <AuthenticatedHeader />
      <MainContent isMenuOpen={isMenuOpen} />
      <BottomNav
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
