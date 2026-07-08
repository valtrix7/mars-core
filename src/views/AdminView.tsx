import { Activity, AlertTriangle, CheckCircle, Database, Server, Shield } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function AdminView() {
  const { t } = useAppContext();

  return (
    <div className="h-full flex flex-col justify-center w-full animate-in fade-in duration-500 pb-16">
      
      {/* 3-column Rule of Thirds layout around the center Orb */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        
        {/* Left HUD Panel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.2em] text-lg">{t('SYSTEM_ADMIN')}</h3>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold uppercase text-[var(--theme-text)] hud-border px-4 py-2 hud-clip bg-[var(--theme-clip-bg)]">
              <Shield className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{t('SUPER_ADMIN_ACCESS')}</span>
            </div>
          </div>

          <div className="hud-border hud-clip p-6 flex flex-col justify-between hover:bg-[var(--theme-clip-hover)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('TOTAL_USERS')}</h3>
              <div className="p-2 hud-clip border border-[var(--theme-border-solid)] bg-[var(--theme-clip-bg)]">
                <Database className="w-5 h-5 text-[var(--theme-accent)]" />
              </div>
            </div>
            <p className="text-3xl font-mono font-bold text-[var(--theme-text)]">104,249</p>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] mt-4 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] w-fit px-3 py-1.5 hud-clip">+1,204 {t('THIS_WEEK')}</p>
          </div>

          <div className="hud-border hud-clip p-6 flex flex-col justify-between hover:bg-[var(--theme-clip-hover)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('GLOBAL_HASHRATE')}</h3>
              <div className="p-2 hud-clip border border-[var(--theme-border-solid)] bg-[var(--theme-clip-bg)]">
                <Activity className="w-5 h-5 text-[var(--theme-accent)]" />
              </div>
            </div>
            <p className="text-3xl font-mono font-bold text-[var(--theme-text)]">14.2<span className="text-sm font-display font-bold text-[var(--theme-text)] opacity-60 ml-1">PH/s</span></p>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] mt-4 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] w-fit px-3 py-1.5 hud-clip">{t('ALL_POOLS_ONLINE')}</p>
          </div>
        </div>

        {/* Right HUD Panel */}
        <div className="space-y-6">
          <div className="hud-border hud-clip p-6 flex flex-col justify-between hover:opacity-80 transition-all relative overflow-hidden bg-[var(--theme-accent)]">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className="font-display font-bold text-xs text-[var(--theme-bg)] uppercase tracking-widest">{t('PENDING_WITHDRAWALS')}</h3>
              <div className="p-2 hud-clip bg-[var(--theme-bg)] border border-[var(--theme-bg)] text-[var(--theme-accent)]">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-mono font-bold text-[var(--theme-bg)] relative z-10">42</p>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-accent)] mt-4 bg-[var(--theme-bg)] border border-[var(--theme-border)] w-fit px-3 py-1.5 hud-clip relative z-10">{t('REQUIRES_MANUAL_REVIEW')}</p>
          </div>

          <div className="hud-border hud-clip p-6 flex flex-col justify-between hover:bg-[var(--theme-clip-hover)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('SYSTEM_HEALTH')}</h3>
              <div className="p-2 hud-clip border border-[var(--theme-border-solid)] bg-[var(--theme-clip-bg)]">
                <Server className="w-5 h-5 text-[var(--theme-accent)]" />
              </div>
            </div>
            <p className="text-3xl font-mono font-bold text-[var(--theme-text)]">99.99<span className="text-sm font-display font-bold text-[var(--theme-text)] opacity-60 ml-1">%</span></p>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] mt-4 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] w-fit px-3 py-1.5 hud-clip">{t('ALL_SERVICES_NOMINAL')}</p>
          </div>

          <div className="hud-border hud-clip overflow-hidden">
            <div className="p-6 border-b border-[var(--theme-border-solid)] flex justify-between items-center bg-[var(--theme-clip-bg)]">
              <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.2em] text-lg">{t('RECENT_AUDITS')}</h3>
            </div>
            <div className="flex flex-col p-2">
              {[
                { action: t('LEDGER_RECONCILIATION'), status: 'Passed', time: t('MINS_AGO_10'), desc: t('DOUBLE_ENTRY_CHECK') },
                { action: t('COLD_WALLET_SYNC'), status: 'Passed', time: t('HOUR_AGO_1'), desc: t('LIABILITIES_MATCHED') },
                { action: t('KYC_WEBHOOK_SYNC'), status: 'Passed', time: t('HOURS_AGO_2'), desc: t('COMPLIANCE_BATCH') },
              ].map((audit, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-[var(--theme-clip-hover)] transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] hud-clip group-hover:border-[var(--theme-border-solid)] transition-colors">
                      <CheckCircle className="w-5 h-5 text-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <p className="text-sm font-display font-bold text-[var(--theme-text)] uppercase tracking-wide">{audit.action}</p>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mt-1">{audit.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[var(--theme-text)] opacity-40 group-hover:opacity-100 transition-colors hidden xl:block">{audit.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
