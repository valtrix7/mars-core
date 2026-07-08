import { useState } from 'react';
import { Zap, Clock, ShieldCheck, Star } from 'lucide-react';
import { useAppContext } from '../AppContext';

const packages = [
  {
    id: 'ltc-starter',
    name: 'Starter LTC',
    coin: 'ltc',
    hashrate: '1 GH/s',
    duration: '30 Days',
    price: 49,
    maintenance: '2%',
    popular: false,
  },
  {
    id: 'ltc-pro',
    name: 'Pro LTC',
    coin: 'ltc',
    hashrate: '20 GH/s',
    duration: '90 Days',
    price: 699,
    maintenance: '1.5%',
    popular: true,
  },
  {
    id: 'stx-starter',
    name: 'Starter STX',
    coin: 'stx',
    hashrate: '100 MH/s',
    duration: '30 Days',
    price: 39,
    maintenance: '3%',
    popular: false,
  },
  {
    id: 'stx-pro',
    name: 'Pro STX',
    coin: 'stx',
    hashrate: '1000 MH/s',
    duration: '90 Days',
    price: 299,
    maintenance: '2%',
    popular: false,
  }
];

type Filter = 'all' | 'ltc' | 'stx';

export default function PackagesView() {
  const { t } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered = activeFilter === 'all'
    ? packages
    : packages.filter(p => p.coin === activeFilter);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'ltc', label: 'LTC' },
    { key: 'stx', label: 'STX' },
  ];

  return (
    <div className="h-full flex flex-col justify-center w-full animate-in fade-in duration-500 pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h3 className="font-display font-bold text-[var(--theme-accent)] tracking-[0.2em] uppercase text-xl">{t('MINING')}</h3>
        
        {/* Protocol Filter Tabs */}
        <div className="flex items-center gap-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-[10px] font-display font-bold uppercase tracking-widest hud-clip transition-all border ${
                activeFilter === f.key
                  ? 'bg-[var(--theme-accent)] text-[var(--theme-bg)] border-[var(--theme-accent)]'
                  : 'bg-transparent text-[var(--theme-text)] border-[var(--theme-border)] hover:border-[var(--theme-border-solid)] hover:bg-[var(--theme-clip-hover)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative hud-border p-6 flex flex-col transition-all hover:-translate-y-1 ${
              pkg.popular ? '' : 'hud-clip hover:bg-[var(--theme-clip-hover)]'
            }`}
            style={pkg.popular ? { background: 'var(--theme-accent)', color: 'var(--theme-bg)' } : undefined}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
                <div className="bg-[var(--theme-bg)] text-[var(--theme-accent)] text-[10px] font-display font-bold uppercase tracking-widest py-1.5 px-4 hud-clip flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-current" /> {t('OPTIMAL_NODE')}
                </div>
              </div>
            )}

            {/* Protocol Badge */}
            <div className="mb-4 mt-1">
              <span className={`inline-block px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest hud-clip border ${
                pkg.popular
                  ? 'bg-[var(--theme-bg)]/10 border-[var(--theme-bg)]/30 text-[var(--theme-bg)]'
                  : 'bg-[var(--theme-clip-bg)] border-[var(--theme-border)] text-[var(--theme-text)]'
              }`}>
                {pkg.coin.toUpperCase()}_{t('PROTOCOL')}
              </span>
            </div>

            {/* Package Name */}
            <h3 className={`text-lg font-display font-bold uppercase tracking-wide mb-4 ${
              pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-accent)]'
            }`}>
              {pkg.name}
            </h3>

            {/* Price */}
            <div className={`my-4 py-4 border-y border-dashed ${
              pkg.popular ? 'border-[var(--theme-bg)]/30' : 'border-[var(--theme-border)]'
            }`}>
              <span className={`text-3xl font-mono font-bold ${
                pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-text)]'
              }`}>
                ${pkg.price}
              </span>
            </div>

            {/* Specs */}
            <div className="space-y-3 mb-6 flex-1">
              <div className={`flex items-center text-[10px] font-mono font-bold uppercase tracking-widest ${
                pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-text)]'
              }`}>
                <div className={`w-7 h-7 hud-clip border flex items-center justify-center mr-3 ${
                  pkg.popular
                    ? 'bg-[var(--theme-bg)]/10 border-[var(--theme-bg)]/30'
                    : 'bg-[var(--theme-clip-bg)] border-[var(--theme-border)]'
                }`}>
                  <Zap className={`w-3.5 h-3.5 ${pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-accent)]'}`} />
                </div>
                <span className="flex-1 opacity-60">{t('HASHRATE')}</span>
                <span className="text-sm">{pkg.hashrate}</span>
              </div>
              <div className={`flex items-center text-[10px] font-mono font-bold uppercase tracking-widest ${
                pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-text)]'
              }`}>
                <div className={`w-7 h-7 hud-clip border flex items-center justify-center mr-3 ${
                  pkg.popular
                    ? 'bg-[var(--theme-bg)]/10 border-[var(--theme-bg)]/30'
                    : 'bg-[var(--theme-clip-bg)] border-[var(--theme-border)]'
                }`}>
                  <Clock className={`w-3.5 h-3.5 ${pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-accent)]'}`} />
                </div>
                <span className="flex-1 opacity-60">{t('DURATION')}</span>
                <span className="text-sm">{pkg.duration}</span>
              </div>
              <div className={`flex items-center text-[10px] font-mono font-bold uppercase tracking-widest ${
                pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-text)]'
              }`}>
                <div className={`w-7 h-7 hud-clip border flex items-center justify-center mr-3 ${
                  pkg.popular
                    ? 'bg-[var(--theme-bg)]/10 border-[var(--theme-bg)]/30'
                    : 'bg-[var(--theme-clip-bg)] border-[var(--theme-border)]'
                }`}>
                  <ShieldCheck className={`w-3.5 h-3.5 ${pkg.popular ? 'text-[var(--theme-bg)]' : 'text-[var(--theme-accent)]'}`} />
                </div>
                <span className="flex-1 opacity-60">{t('MAINT_FEE')}</span>
                <span className="text-sm">{pkg.maintenance}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className={`w-full py-3 text-[10px] font-display font-bold uppercase tracking-widest hud-clip transition-all border ${
              pkg.popular
                ? 'bg-[var(--theme-bg)] text-[var(--theme-accent)] border-[var(--theme-bg)] hover:opacity-80'
                : 'bg-transparent border-[var(--theme-border-solid)] text-[var(--theme-text)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)]'
            }`}>
              {t('ALLOCATE_RESOURCES')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
