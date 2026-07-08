import { Globe, Monitor, Pickaxe } from 'lucide-react';
import { useAppContext } from '../../AppContext';
import { Language, Theme } from '../../translations';

export default function AuthenticatedHeader() {
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
