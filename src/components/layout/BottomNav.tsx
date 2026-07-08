import { Activity, Bell, ChevronDown, LayoutDashboard, LogOut, Server, Users, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { cn } from '../../lib/utils';

interface BottomNavProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

export default function BottomNav({ isMenuOpen, onClose }: BottomNavProps) {
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
