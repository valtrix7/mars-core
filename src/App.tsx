import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Server, Wallet, Users, Activity, Bell, LogOut, ChevronDown, ChevronUp, Globe, Monitor, Pickaxe, UserPlus, LogIn } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import DashboardView from './views/DashboardView';
import PackagesView from './views/PackagesView';
import WalletView from './views/WalletView';
import AdminView from './views/AdminView';
import LandingPage from './views/LandingPage';
import { useAppContext } from './AppContext';
import { Theme, Language } from './translations';

function StarsBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--theme-bg)] transition-colors duration-500">
      <div className="absolute top-8 left-8 border-l-2 border-t-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute top-8 right-8 border-r-2 border-t-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 left-8 border-l-2 border-b-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute -inset-10 bg-grid-pattern animate-grid opacity-10 pointer-events-none" />
    </div>
  );
}

function BottomNav({ isMenuOpen, onClose }: { isMenuOpen: boolean, onClose: () => void }) {
  const location = useLocation();
  const { t, logout } = useAppContext();
  const links = [
    { name: t('Dashboard'), path: '/', icon: LayoutDashboard },
    { name: t('Mining'), path: '/packages', icon: Server },
    { name: t('Wallet'), path: '/wallet', icon: Wallet },
    { name: t('Referrals'), path: '/referrals', icon: Users },
    { name: t('Admin'), path: '/admin', icon: Activity },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pb-6 px-4 pointer-events-none"
        >
          <div className="hud-border hud-clip p-4 flex items-center gap-2 pointer-events-auto shadow-2xl mx-auto max-w-4xl w-full">
            <button
              onClick={onClose}
              className="p-3 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-none hover:opacity-80 transition-opacity border border-[var(--theme-border-solid)] mr-4"
            >
              <ChevronDown className="w-5 h-5" />
            </button>

            <div className="flex-1 flex justify-around items-center gap-2 overflow-x-auto no-scrollbar">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => {}}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 min-w-[80px] transition-all duration-200 group relative",
                      isActive ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)] opacity-50 hover:opacity-100"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[var(--theme-clip-bg)] border border-[var(--theme-border-solid)] hud-clip z-[-1]"
                      />
                    )}
                    <Icon className="w-5 h-5 mb-2" />
                    <span className="text-[10px] font-display font-bold tracking-wider uppercase">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <button className="p-3 ml-4 border border-[var(--theme-border-solid)] text-[var(--theme-text)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] transition-colors relative group hud-clip">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--theme-accent)] rounded-full group-hover:bg-[var(--theme-bg)]"></span>
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={logout} className="p-3 border border-[var(--theme-border-solid)] text-[var(--theme-text)] hover:bg-red-600 hover:border-red-600 hover:text-[var(--theme-bg)] transition-colors hud-clip">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MainContent({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.main
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="fixed inset-0 z-10 pt-24 pb-24 px-4 md:px-8 overflow-y-auto no-scrollbar flex items-center justify-center pointer-events-none"
        >
          <div className="w-full max-w-7xl pointer-events-auto">
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/packages" element={<PackagesView />} />
              <Route path="/wallet" element={<WalletView />} />
              <Route path="/referrals" element={
                <div className="flex items-center justify-center h-64 hud-border hud-clip">
                  <div className="text-center text-[var(--theme-text)] opacity-50 font-display font-bold uppercase tracking-widest text-sm">
                    Referrals module pending integration...
                  </div>
                </div>
              } />
              <Route path="/admin" element={<AdminView />} />
            </Routes>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

function AuthenticatedHeader() {
  const { t, theme, setTheme, language, setLanguage } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="pointer-events-auto flex items-center justify-center w-12 h-12 hud-border hud-clip bg-[var(--theme-accent)]">
          <Pickaxe className="w-6 h-6" style={{ color: 'var(--theme-bg)' }} />
        </div>
        <div className="pointer-events-auto">
          <h1 className="font-display font-bold text-2xl tracking-[0.2em] text-[var(--theme-accent)] uppercase leading-none">
            {t('MARS_ORE')}
          </h1>
          <p className="text-[10px] text-[var(--theme-text)] opacity-60 tracking-[0.3em] font-mono uppercase mt-1 font-bold">
            {t('MINING_CORE')}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex pointer-events-auto gap-3 items-center">
        <div className="flex bg-[var(--theme-clip-bg)] hud-border hud-clip">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-[var(--theme-text)] text-[10px] font-display font-bold uppercase tracking-widest py-2 px-3 outline-none cursor-pointer hover:bg-[var(--theme-clip-hover)] transition-colors appearance-none"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="zh">ZH</option>
          </select>
          <div className="pointer-events-none flex items-center pr-2">
             <Globe className="w-3 h-3 text-[var(--theme-text)]" />
          </div>
        </div>

        <div className="flex bg-[var(--theme-clip-bg)] hud-border hud-clip">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="bg-transparent text-[var(--theme-text)] text-[10px] font-display font-bold uppercase tracking-widest py-2 px-3 outline-none cursor-pointer hover:bg-[var(--theme-clip-hover)] transition-colors appearance-none"
          >
            <option value="theme-monochrome-inverted">{t('THEME_MONO_INV')}</option>
            <option value="theme-monochrome">{t('THEME_MONO')}</option>
            <option value="theme-orange">{t('THEME_ORANGE')}</option>
          </select>
          <div className="pointer-events-none flex items-center pr-2">
             <Monitor className="w-3 h-3 text-[var(--theme-text)]" />
          </div>
        </div>
      </div>
    </header>
  );
}

function LandingHeader() {
  const { t } = useAppContext();
  const { login } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="pointer-events-auto flex items-center justify-center w-12 h-12 hud-border hud-clip bg-[var(--theme-accent)]">
          <Pickaxe className="w-6 h-6" style={{ color: 'var(--theme-bg)' }} />
        </div>
        <div className="pointer-events-auto">
          <h1 className="font-display font-bold text-2xl tracking-[0.2em] text-[var(--theme-accent)] uppercase leading-none">
            {t('MARS_ORE')}
          </h1>
          <p className="text-[10px] text-[var(--theme-text)] opacity-60 tracking-[0.3em] font-mono uppercase mt-1 font-bold">
            {t('MINING_CORE')}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex pointer-events-auto gap-3 items-center">
        <button className="hud-border hud-clip flex items-center gap-2 px-4 py-2 hover:bg-[var(--theme-clip-hover)] transition-all text-[var(--theme-text)] text-xs font-display font-bold tracking-widest uppercase">
          <LogIn className="w-4 h-4" />
          {t('LOGIN')}
        </button>
        <button onClick={login} className="hud-border hud-clip flex items-center gap-2 px-4 py-2 bg-[var(--theme-accent)] text-[var(--theme-bg)] hover:opacity-80 transition-all text-xs font-display font-bold tracking-widest uppercase">
          <UserPlus className="w-4 h-4" />
          {t('SIGN_UP')}
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="flex h-screen w-screen bg-transparent font-sans text-[var(--theme-text)] overflow-hidden relative transition-colors duration-500">
          <StarsBackground />
          <LandingPage />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex h-screen w-screen bg-transparent font-sans text-[var(--theme-text)] overflow-hidden relative transition-colors duration-500">
        <StarsBackground />

        <AuthenticatedHeader />

        <MainContent isMenuOpen={isMenuOpen} />

        <BottomNav
          isMenuOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </Router>
  );
}
