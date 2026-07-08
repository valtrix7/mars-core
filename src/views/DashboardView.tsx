import { Activity, ArrowUpRight, Cpu, Zap } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppContext } from '../AppContext';

const data = [
  { time: '00:00', hashrate: 1.2, rewards: 0.05 },
  { time: '04:00', hashrate: 1.25, rewards: 0.06 },
  { time: '08:00', hashrate: 1.15, rewards: 0.04 },
  { time: '12:00', hashrate: 1.3, rewards: 0.08 },
  { time: '16:00', hashrate: 1.28, rewards: 0.07 },
  { time: '20:00', hashrate: 1.4, rewards: 0.09 },
  { time: '24:00', hashrate: 1.35, rewards: 0.08 },
];

export default function DashboardView() {
  const { t } = useAppContext();

  return (
    <div className="h-full flex flex-col justify-center w-full animate-in fade-in duration-500 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(220px,24vw,360px)_minmax(0,1fr)] gap-8 items-start w-full">
        
        {/* Left HUD Panel */}
        <div className="space-y-6 lg:col-start-3 lg:row-start-1">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="font-display font-bold text-[var(--theme-accent)] tracking-[0.2em] uppercase text-xl">{t('MAIN_DASHBOARD')}</h3>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold uppercase text-[var(--theme-text)] hud-border px-4 py-2">
              <span className="w-2 h-2 bg-[var(--theme-accent)] animate-pulse inline-block"></span>
              <span>{t('PROVIDERS_ONLINE')}</span>
            </div>
          </div>

          <div className="hud-border hud-clip p-6 flex flex-col justify-between hover:bg-[var(--theme-clip-hover)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('TOTAL_HASHRATE')}</h3>
              <div className="p-2 border border-[var(--theme-border-solid)] hud-clip">
                <Zap className="w-5 h-5 text-[var(--theme-accent)]" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-mono font-bold text-[var(--theme-text)]">1.35</span>
              <span className="text-sm font-display font-bold text-[var(--theme-text)] opacity-60">GH/s</span>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-mono font-bold uppercase text-[var(--theme-text)] border border-[var(--theme-border)] w-fit px-3 py-1.5 hud-clip bg-[var(--theme-clip-bg)]">
              <ArrowUpRight className="w-3 h-3 mr-1 text-[var(--theme-accent)]" />
              <span>+12.5% {t('VS_LAST_WEEK')}</span>
            </div>
          </div>

          <div className="hud-border hud-clip p-6 flex flex-col justify-between hover:bg-[var(--theme-clip-hover)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('ACTIVE_CONTRACTS')}</h3>
              <div className="p-2 border border-[var(--theme-border-solid)] hud-clip">
                <Cpu className="w-5 h-5 text-[var(--theme-accent)]" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-mono font-bold text-[var(--theme-text)]">3</span>
              <span className="text-sm font-display font-bold text-[var(--theme-text)] opacity-60">{t('ACTIVE')}</span>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-mono font-bold uppercase text-[var(--theme-text)] border border-[var(--theme-border)] w-fit px-3 py-1.5 hud-clip bg-[var(--theme-clip-bg)]">
              <span>2 LTC • 1 STX</span>
            </div>
          </div>
        </div>

        {/* Right HUD Panel */}
        <div className="space-y-6">
          <div className="hud-border hud-clip p-6 flex flex-col justify-between hover:bg-[var(--theme-clip-hover)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('TOTAL_YIELD')}</h3>
              <div className="p-2 border border-[var(--theme-border-solid)] hud-clip">
                <Activity className="w-5 h-5 text-[var(--theme-accent)]" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-mono font-bold text-[var(--theme-text)]">4.205</span>
              <span className="text-sm font-display font-bold text-[var(--theme-text)] opacity-60">LTC</span>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-mono font-bold uppercase text-[var(--theme-text)] border border-[var(--theme-border)] w-fit px-3 py-1.5 hud-clip bg-[var(--theme-clip-bg)]">
              <ArrowUpRight className="w-3 h-3 mr-1 text-[var(--theme-accent)]" />
              <span>+0.45 LTC {t('TODAY')}</span>
            </div>
          </div>

          <div className="hud-border hud-clip p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.2em] text-lg">{t('PERFORMANCE_LOG')}</h3>
              <select className="bg-transparent border border-[var(--theme-border-solid)] text-[var(--theme-text)] text-[10px] font-display font-bold uppercase tracking-widest hud-clip focus:ring-0 focus:border-[var(--theme-accent)] block p-2 px-4 outline-none cursor-pointer hover:bg-[var(--theme-clip-hover)] transition-colors">
                <option>{t('T_24H')}</option>
                <option>{t('T_7D')}</option>
                <option>{t('T_30D')}</option>
              </select>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--theme-accent)" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="var(--theme-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="var(--theme-text)" fontSize={10} fontFamily="'Elianto', 'Orbitron', sans-serif" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--theme-text)" fontSize={10} fontFamily="'Elianto', 'Orbitron', sans-serif" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--theme-panel-bg)', borderColor: 'var(--theme-border-solid)', color: 'var(--theme-text)', borderRadius: '0px', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", borderWidth: '1px' }}
                    itemStyle={{ color: 'var(--theme-accent)', fontWeight: 'bold' }}
                  />
                  <Area type="step" dataKey="hashrate" stroke="var(--theme-accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorHash)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
