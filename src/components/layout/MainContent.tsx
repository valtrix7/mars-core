import { AnimatePresence, motion } from 'motion/react';
import AppRoutes from '../../routes/AppRoutes';

export default function MainContent({ isMenuOpen }: { isMenuOpen: boolean }) {
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
            <AppRoutes />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
