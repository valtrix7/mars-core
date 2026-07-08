import { useState, FormEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, TrendingUp, Server, ArrowRight, X, Eye, EyeOff, Pickaxe, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../AppContext';

function LoginModal({ initialMode, onClose, onLogin }: { initialMode: 'login' | 'signup', onClose: () => void, onLogin: () => void }) {
  const { t, login } = useAppContext();
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      onLogin();
      return;
    }

    const success = login(email.trim().toLowerCase(), password.trim());
    if (success) {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (ready && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onAnimationComplete={() => setReady(true)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative hud-border p-8 w-full max-w-md bg-[var(--theme-panel-bg)] backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--theme-text)] opacity-50 hover:opacity-100 transition-opacity">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 hud-border hud-clip bg-[var(--theme-accent)] mb-4">
            <Pickaxe className="w-8 h-8" style={{ color: 'var(--theme-bg)' }} />
          </div>
          <h2 className="font-display font-bold text-2xl tracking-[0.15em] text-[var(--theme-accent)] uppercase">
            {isSignUp ? t('CREATE_ACCOUNT') : t('WELCOME_BACK')}
          </h2>
          <p className="text-xs font-mono text-[var(--theme-text)] opacity-60 mt-2 uppercase tracking-widest">
            {isSignUp ? t('JOIN_MINING_NETWORK') : t('ACCESS_YOUR_DASHBOARD')}
          </p>
        </div>

        <form autoComplete="off" className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mb-2">{t('FULL_NAME')}</label>
              <input autoComplete="off" type="text" name="fullname" className="w-full px-4 py-3 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm font-mono outline-none focus:border-[var(--theme-accent)] transition-colors hud-clip" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mb-2">{t('EMAIL')}</label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm font-mono outline-none focus:border-[var(--theme-accent)] transition-colors hud-clip"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mb-2">{t('PASSWORD')}</label>
            <div className="relative">
              <input
                autoComplete="new-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm font-mono outline-none focus:border-[var(--theme-accent)] transition-colors hud-clip pr-12"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text)] opacity-40 hover:opacity-100 transition-opacity">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-xs font-mono uppercase tracking-widest">{error}</p>
          )}
          <button type="submit" className="w-full py-3 bg-[var(--theme-accent)] text-[var(--theme-bg)] text-[11px] font-display font-bold uppercase tracking-widest hud-clip hover:opacity-80 transition-opacity mt-6">
            {isSignUp ? t('SIGN_UP') : t('LOGIN')}
          </button>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-[10px] font-mono text-[var(--theme-text)] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest">
            {isSignUp ? t('ALREADY_HAVE_ACCOUNT') : t('NO_ACCOUNT')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const features = [
  { icon: Shield, title: 'SECURE_INFRASTRUCTURE', desc: 'ENTERPRISE_GRADE_SECURITY' },
  { icon: Zap, title: 'HIGH_HASHRATE', desc: 'OPTIMIZED_MINING_PERFORMANCE' },
  { icon: TrendingUp, title: 'DAILY_YIELDS', desc: 'CONSISTENT_PASSIVE_INCOME' },
  { icon: Server, title: 'GLOBAL_NODES', desc: 'DISTRIBUTED_MINING_NETWORK' },
];

const stats = [
  { value: '104K+', label: 'ACTIVE_MINERS' },
  { value: '14.2 PH/s', label: 'GLOBAL_HASHRATE' },
  { value: '$2.4M', label: 'DAILY_PAYOUTS' },
  { value: '99.99%', label: 'UPTIME' },
];

const footerPlatformLinks = [
  { label: 'Mining Packages', to: '/pricing' },
  { label: 'Wallet', to: '/docs' },
  { label: 'Referrals', to: '/docs' },
  { label: 'Pricing', to: '/pricing' },
];

const footerResourceLinks = [
  { label: 'Documentation', to: '/docs' },
  { label: 'API Status', to: '/status' },
  { label: 'Support', to: '/support' },
  { label: 'Blog', to: '/blog' },
];

const footerLegalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Cookies', to: '/cookies' },
  { label: 'Risk', to: '/risk-disclosure' },
  { label: 'AML/KYC', to: '/aml-kyc' },
];

export default function LandingPage() {
  const { t } = useAppContext();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto no-scrollbar">
      <AnimatePresence>
        {showAuth && <LoginModal initialMode={authMode} onClose={() => setShowAuth(false)} onLogin={() => setShowAuth(false)} />}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 hud-border hud-clip bg-[var(--theme-accent)]">
              <Pickaxe className="w-6 h-6" style={{ color: 'var(--theme-bg)' }} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl tracking-[0.2em] text-[var(--theme-accent)] uppercase leading-none">{t('MARS_ORE')}</h1>
              <p className="text-[10px] text-[var(--theme-text)] opacity-60 tracking-[0.3em] font-mono uppercase mt-1 font-bold">{t('MINING_CORE')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => openAuth('login')} className="hud-border hud-clip flex items-center gap-2 px-5 py-2.5 hover:bg-[var(--theme-clip-hover)] hover:shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.3)] hover:scale-105 active:scale-95 transition-all duration-300 text-[var(--theme-text)] text-xs font-display font-bold tracking-widest uppercase">{t('LOGIN')}</button>
            <button onClick={() => openAuth('signup')} className="hud-border hud-clip flex items-center gap-2 px-5 py-2.5 bg-[var(--theme-accent)] text-[var(--theme-bg)] hover:shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.5)] hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-display font-bold tracking-widest uppercase">{t('SIGN_UP')}</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 hud-border hud-clip mb-8">
              <span className="w-2 h-2 bg-[var(--theme-accent)] animate-pulse rounded-full" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)]">{t('SYSTEM_ONLINE')} // {t('ALL_POOLS_ONLINE')}</span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl tracking-[0.1em] text-[var(--theme-accent)] uppercase leading-tight mb-6">{t('FUTURE_OF_MINING')}</h1>
            <p className="text-sm md:text-base font-mono text-[var(--theme-text)] opacity-70 max-w-2xl mx-auto mb-10 leading-relaxed uppercase tracking-wider">{t('HERO_DESCRIPTION')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => openAuth('signup')} className="hud-border hud-clip flex items-center gap-3 px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] hover:shadow-[0_0_40px_rgba(var(--theme-accent-rgb),0.6)] hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-display font-bold tracking-widest uppercase group">
                {t('START_MINING')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })} className="hud-border hud-clip flex items-center gap-3 px-8 py-4 hover:bg-[var(--theme-clip-hover)] hover:shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.3)] hover:scale-105 active:scale-95 transition-all duration-300 text-[var(--theme-text)] text-xs font-display font-bold tracking-widest uppercase">
                {t('VIEW_PLANS')}
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-32 left-8 border-l-2 border-t-2 border-[var(--theme-border)] w-20 h-20 pointer-events-none opacity-30" />
        <div className="absolute bottom-16 right-8 border-r-2 border-b-2 border-[var(--theme-border)] w-20 h-20 pointer-events-none opacity-30" />
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="hud-border hud-clip p-6 text-center hover:bg-[var(--theme-clip-hover)] hover:shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.3)] hover:scale-105 hover:border-[var(--theme-accent)] transition-all duration-300 cursor-pointer group">
              <p className="text-2xl md:text-3xl font-mono font-bold text-[var(--theme-accent)] mb-2 group-hover:scale-110 transition-transform">{stat.value}</p>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 group-hover:opacity-100 transition-opacity">{t(stat.label)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl tracking-[0.15em] text-[var(--theme-accent)] uppercase mb-4">{t('WHY_MARS_ORE')}</h2>
            <p className="text-xs font-mono text-[var(--theme-text)] opacity-60 uppercase tracking-widest max-w-lg mx-auto">{t('PLATFORM_ADVANTAGES')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="hud-border hud-clip p-8 flex items-start gap-5 hover:bg-[var(--theme-clip-hover)] hover:shadow-[0_0_40px_rgba(var(--theme-accent-rgb),0.3)] hover:scale-[1.02] hover:border-[var(--theme-accent)] transition-all duration-300 group cursor-pointer">
                <div className="p-3 border border-[var(--theme-border-solid)] hud-clip group-hover:bg-[var(--theme-accent)] group-hover:shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.5)] transition-all duration-300 flex-shrink-0">
                  <feat.icon className="w-5 h-5 text-[var(--theme-accent)] group-hover:text-[var(--theme-bg)] transition-colors" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-[0.15em] text-[var(--theme-accent)] uppercase mb-2 group-hover:tracking-[0.2em] transition-all">{t(feat.title)}</h3>
                  <p className="text-[10px] font-mono text-[var(--theme-text)] opacity-60 uppercase tracking-widest leading-relaxed group-hover:opacity-80 transition-opacity">{t(feat.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mining Packages Preview */}
      <section id="packages" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl tracking-[0.15em] text-[var(--theme-accent)] uppercase mb-4">{t('MINING_PACKAGES')}</h2>
            <p className="text-xs font-mono text-[var(--theme-text)] opacity-60 uppercase tracking-widest max-w-lg mx-auto">{t('CHOOSE_YOUR_NODE')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Starter LTC', coin: 'LTC', price: 49, hashrate: '1 GH/s', duration: '30 Days' },
              { name: 'Pro LTC', coin: 'LTC', price: 699, hashrate: '20 GH/s', duration: '90 Days', popular: true },
              { name: 'Starter STX', coin: 'STX', price: 39, hashrate: '100 MH/s', duration: '30 Days' },
              { name: 'Pro STX', coin: 'STX', price: 299, hashrate: '1000 MH/s', duration: '90 Days' },
            ].map((pkg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative hud-border p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(var(--theme-accent-rgb),0.4)] ${pkg.popular ? '' : 'hover:bg-[var(--theme-clip-hover)] hover:border-[var(--theme-accent)]'}`}
                style={pkg.popular ? { background: 'var(--theme-accent)', color: 'var(--theme-bg)' } : undefined}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
                    <div className="bg-[var(--theme-bg)] text-[var(--theme-accent)] text-[10px] font-display font-bold uppercase tracking-widest py-1.5 px-4 hud-clip flex items-center gap-1 shadow-md">
                      <Pickaxe className="w-3 h-3" /> {t('OPTIMAL_NODE')}
                    </div>
                  </div>
                )}
                <span className={`inline-block px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest hud-clip border w-fit mb-4 mt-1 ${pkg.popular ? 'bg-[var(--theme-bg)]/10 border-[var(--theme-bg)]/30 text-[var(--theme-bg)]' : 'bg-[var(--theme-clip-bg)] border-[var(--theme-border)] text-[var(--theme-text)]'}`}>
                  {pkg.coin}_{t('PROTOCOL')}
                </span>
                <h3 className={`text-lg font-display font-bold uppercase tracking-wide mb-3 ${pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-accent)]'}`}>{pkg.name}</h3>
                <div className={`my-3 py-3 border-y border-dashed ${pkg.popular ? 'border-[var(--theme-bg)]/30' : 'border-[var(--theme-border)]'}`}>
                  <span className={`text-3xl font-mono font-bold ${pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-text)]'}`}>${pkg.price}</span>
                </div>
                <div className={`space-y-2 text-[10px] font-mono font-bold uppercase tracking-widest mb-4 flex-1 ${pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-text)]'}`}>
                  <div className="flex justify-between"><span className="opacity-60">{t('HASHRATE')}</span><span>{pkg.hashrate}</span></div>
                  <div className="flex justify-between"><span className="opacity-60">{t('DURATION')}</span><span>{pkg.duration}</span></div>
                </div>
                <button onClick={() => openAuth('signup')} className={`w-full py-3 text-[10px] font-display font-bold uppercase tracking-widest hud-clip transition-all duration-300 border hover:scale-105 active:scale-95 ${pkg.popular ? 'bg-[var(--theme-bg)] text-[var(--theme-accent)] border-[var(--theme-bg)] hover:shadow-[0_0_20px_rgba(var(--theme-bg),0.5)]' : 'bg-transparent border-[var(--theme-border-solid)] text-[var(--theme-text)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.5)]'}`}>
                  {t('GET_STARTED')}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="hud-border hud-clip p-12 bg-[var(--theme-clip-bg)] hover:shadow-[0_0_60px_rgba(var(--theme-accent-rgb),0.3)] transition-all duration-500 group">
            <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[var(--theme-accent)] hud-clip mb-6 group-hover:bg-[var(--theme-accent)] group-hover:shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.5)] transition-all duration-300">
              <Lock className="w-7 h-7 text-[var(--theme-accent)] group-hover:text-[var(--theme-bg)] transition-colors" />
            </div>
            <h2 className="font-display font-bold text-3xl tracking-[0.15em] text-[var(--theme-accent)] uppercase mb-4 group-hover:tracking-[0.2em] transition-all">{t('START_TODAY')}</h2>
            <p className="text-xs font-mono text-[var(--theme-text)] opacity-60 uppercase tracking-widest max-w-md mx-auto mb-8 leading-relaxed group-hover:opacity-80 transition-opacity">{t('CTA_DESCRIPTION')}</p>
            <button onClick={() => openAuth('signup')} className="hud-border hud-clip inline-flex items-center gap-3 px-10 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] hover:shadow-[0_0_40px_rgba(var(--theme-accent-rgb),0.6)] hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-display font-bold tracking-widest uppercase group">
              {t('CREATE_ACCOUNT')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[var(--theme-border)]">
        <div className="absolute inset-0 bg-[var(--theme-clip-bg)] opacity-30 pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 hud-border hud-clip bg-[var(--theme-accent)]">
                  <Pickaxe className="w-6 h-6" style={{ color: 'var(--theme-bg)' }} />
                </div>
                <div>
                  <span className="font-display font-bold text-xl tracking-[0.15em] text-[var(--theme-accent)] uppercase">{t('MARS_ORE')}</span>
                  <p className="text-xs font-mono text-[var(--theme-text)] opacity-50 tracking-widest uppercase">{t('MINING_CORE')}</p>
                </div>
              </div>
              <p className="text-sm font-mono text-[var(--theme-text)] opacity-50 leading-relaxed uppercase tracking-wider max-w-xs">
                Enterprise-grade mining infrastructure. Secure, fast, and globally distributed.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-display font-bold text-sm tracking-[0.2em] text-[var(--theme-accent)] uppercase mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[var(--theme-accent)] rounded-full animate-pulse" />
                Platform
              </h3>
              <ul className="space-y-4">
                {footerPlatformLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm font-mono text-[var(--theme-text)] opacity-50 hover:opacity-100 hover:text-[var(--theme-accent)] hover:pl-2 transition-all duration-300 uppercase tracking-widest flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-[var(--theme-text)] opacity-0 group-hover:opacity-100 group-hover:bg-[var(--theme-accent)] group-hover:shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.5)] transition-all duration-300 rounded-full" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-display font-bold text-sm tracking-[0.2em] text-[var(--theme-accent)] uppercase mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[var(--theme-accent)] rounded-full animate-pulse" />
                Resources
              </h3>
              <ul className="space-y-4">
                {footerResourceLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm font-mono text-[var(--theme-text)] opacity-50 hover:opacity-100 hover:text-[var(--theme-accent)] hover:pl-2 transition-all duration-300 uppercase tracking-widest flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-[var(--theme-text)] opacity-0 group-hover:opacity-100 group-hover:bg-[var(--theme-accent)] group-hover:shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.5)] transition-all duration-300 rounded-full" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-display font-bold text-sm tracking-[0.2em] text-[var(--theme-accent)] uppercase mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[var(--theme-accent)] rounded-full animate-pulse" />
                Legal
              </h3>
              <ul className="space-y-4">
                {footerLegalLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm font-mono text-[var(--theme-text)] opacity-50 hover:opacity-100 hover:text-[var(--theme-accent)] hover:pl-2 transition-all duration-300 uppercase tracking-widest flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-[var(--theme-text)] opacity-0 group-hover:opacity-100 group-hover:bg-[var(--theme-accent)] group-hover:shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.5)] transition-all duration-300 rounded-full" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Status */}
            <div>
              <h3 className="font-display font-bold text-sm tracking-[0.2em] text-[var(--theme-accent)] uppercase mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                System Status
              </h3>
              <div className="hud-border hud-clip p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--theme-text)] opacity-50 uppercase tracking-widest">Network</span>
                  <span className="text-xs font-mono text-green-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--theme-text)] opacity-50 uppercase tracking-widest">Uptime</span>
                  <span className="text-xs font-mono text-[var(--theme-accent)] uppercase tracking-widest">99.99%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--theme-text)] opacity-50 uppercase tracking-widest">Hashrate</span>
                  <span className="text-xs font-mono text-[var(--theme-accent)] uppercase tracking-widest">14.2 PH/s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--theme-border)] mb-6" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-xs font-mono text-[var(--theme-text)] opacity-40 uppercase tracking-widest">
                © 2026 Mars Ore. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-[var(--theme-text)] opacity-40 uppercase tracking-widest">All Systems Operational</span>
              </div>
              <span className="text-[var(--theme-border)]">|</span>
              <span className="text-xs font-mono text-[var(--theme-text)] opacity-40 uppercase tracking-widest">v2.4.1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
