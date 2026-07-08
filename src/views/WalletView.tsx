import { ArrowDownToLine, ArrowUpFromLine, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function WalletView() {
  const { t } = useAppContext();

  return (
    <div className="h-full flex flex-col justify-center w-full animate-in fade-in duration-500 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        
        {/* Left HUD Panel */}
        <div className="space-y-6">
          <div className="hud-border hud-clip p-6">
            <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.2em] text-lg mb-6">{t('ASSET_LEDGER')}</h3>
            <div className="space-y-4">
              
              <div className="p-4 border border-[var(--theme-border)] hud-clip bg-[var(--theme-clip-bg)] flex items-center justify-between hover:bg-[var(--theme-clip-hover)] hover:border-[var(--theme-border-solid)] transition-all cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 hud-clip bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-accent)] group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-bg)] transition-colors">
                    <span className="font-mono font-bold text-xl">Ł</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[var(--theme-text)] text-sm uppercase tracking-wide">LITECOIN (LTC)</h4>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mt-1">{t('EXTRACTABLE_FUNDS')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-mono font-bold text-[var(--theme-text)]">4.20500000</p>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mt-1">~$360.42</p>
                </div>
              </div>

              <div className="p-4 border border-[var(--theme-border)] hud-clip bg-[var(--theme-clip-bg)] flex items-center justify-between hover:bg-[var(--theme-clip-hover)] hover:border-[var(--theme-border-solid)] transition-all cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 hud-clip bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-accent)] group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-bg)] transition-colors">
                    <span className="font-mono font-bold text-xl">S</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[var(--theme-text)] text-sm uppercase tracking-wide">STACKS (STX)</h4>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mt-1">{t('EXTRACTABLE_FUNDS')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-mono font-bold text-[var(--theme-text)]">124.500000</p>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60 mt-1">~$186.75</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right HUD Panel */}
        <div className="space-y-6">
          <div className="hud-border hud-clip p-6">
            <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.2em] text-lg mb-6">{t('QUICK_ACTIONS')}</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 py-4 px-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] hover:opacity-80 text-[10px] font-display font-bold uppercase tracking-widest hud-clip transition-all border border-[var(--theme-border-solid)]">
                <ArrowDownToLine className="w-4 h-4" />
                <span>{t('INJECT_USDT')}</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 py-4 px-4 bg-transparent text-[var(--theme-text)] hover:bg-[var(--theme-clip-hover)] text-[10px] font-display font-bold uppercase tracking-widest hud-clip transition-all border border-[var(--theme-border-solid)]">
                <ArrowUpFromLine className="w-4 h-4" />
                <span>{t('EXTRACT_CRYPTO')}</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 py-4 px-4 bg-transparent text-[var(--theme-text)] hover:bg-[var(--theme-clip-hover)] text-[10px] font-display font-bold uppercase tracking-widest hud-clip transition-all border border-[var(--theme-border-solid)]">
                <RefreshCcw className="w-4 h-4" />
                <span>{t('EXCHANGE_ASSETS')}</span>
              </button>
            </div>
          </div>
          
          <div className="hud-border hud-clip p-6">
             <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.2em] text-lg mb-4">{t('PENDING_OPS')}</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center pb-3 border-b border-dashed border-[var(--theme-border)]">
                 <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60">{t('LTC_REWARD')}</span>
                 <span className="font-mono font-bold text-sm text-[var(--theme-text)] bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] px-2.5 py-1 hud-clip">+0.02 LTC</span>
               </div>
               <div className="flex justify-between items-center pb-1">
                 <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-60">{t('NODE_FEE')}</span>
                 <span className="font-mono font-bold text-sm text-[var(--theme-text)] bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] px-2.5 py-1 hud-clip">-0.0004 LTC</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
