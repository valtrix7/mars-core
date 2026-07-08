import { useState } from 'react';
import { Copy, Check, Users, TrendingUp, DollarSign, Clock, Share2, UserPlus, ChevronRight } from 'lucide-react';
import { useAppContext } from '../AppContext';

const referralData = [
  { id: 1, name: 'Alex M.', email: 'alex***@gmail.com', date: '07/08', status: 'active', earnings: 45.20 },
  { id: 2, name: 'Sarah K.', email: 'sarah***@outlook.com', date: '07/06', status: 'active', earnings: 128.50 },
  { id: 3, name: 'Mike R.', email: 'mike***@yahoo.com', date: '07/04', status: 'pending', earnings: 0 },
  { id: 4, name: 'Emma L.', email: 'emma***@gmail.com', date: '07/02', status: 'active', earnings: 89.30 },
  { id: 5, name: 'James W.', email: 'james***@hotmail.com', date: '06/28', status: 'active', earnings: 215.00 },
];

const tiers = [
  { name: 'TIER_BRONZE', rate: '5%', color: 'text-orange-400' },
  { name: 'TIER_SILVER', rate: '8%', color: 'text-gray-300' },
  { name: 'TIER_GOLD', rate: '10%', color: 'text-yellow-400' },
  { name: 'TIER_PLATINUM', rate: '12%', color: 'text-purple-400' },
];

export default function ReferralsPage() {
  const { t } = useAppContext();
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://marsore.io/ref/MARS2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalReferrals = 12;

  return (
    <div className="h-full flex flex-col w-full animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-display font-bold text-[var(--theme-accent)] tracking-[0.2em] uppercase text-lg">{t('REFERRAL_PROGRAM')}</h3>
        <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase text-[var(--theme-text)] hud-border px-3 py-1.5">
          <span className="w-1.5 h-1.5 bg-[var(--theme-accent)] animate-pulse inline-block"></span>
          <span>10% Commission</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Referral Link */}
          <div className="hud-border hud-clip p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('YOUR_REFERRAL_LINK')}</h3>
              <Share2 className="w-4 h-4 text-[var(--theme-accent)]" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] hud-clip px-3 py-2 min-w-0">
                <span className="text-xs font-mono text-[var(--theme-text)] truncate block">{referralLink}</span>
              </div>
              <button
                onClick={handleCopy}
                className={`hud-border hud-clip px-4 py-2 flex items-center gap-1.5 transition-all flex-shrink-0 ${
                  copied ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-[var(--theme-accent)] text-[var(--theme-bg)] hover:opacity-80'
                }`}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px] font-display font-bold uppercase tracking-widest">{copied ? 'COPIED!' : t('COPY_LINK')}</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: t('TOTAL_REFERRALS'), value: '12', icon: Users, color: 'text-[var(--theme-text)]' },
              { label: t('ACTIVE_REFERRALS'), value: '8', icon: UserPlus, color: 'text-[var(--theme-accent)]' },
              { label: t('TOTAL_EARNINGS'), value: '$478', icon: DollarSign, color: 'text-green-400' },
              { label: t('PENDING'), value: '$45', icon: Clock, color: 'text-yellow-400' },
            ].map((stat, i) => (
              <div key={i} className="hud-border hud-clip p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display font-bold text-[9px] text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{stat.label}</h4>
                  <stat.icon className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                </div>
                <p className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Referral List */}
          <div className="hud-border hud-clip p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.15em] text-sm">{t('REFERRAL_LIST')}</h3>
              <span className="text-[10px] font-mono text-[var(--theme-text)] opacity-50">{totalReferrals} total</span>
            </div>
            <div className="space-y-2">
              {referralData.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-2.5 bg-[var(--theme-clip-bg)] border border-[var(--theme-border)] hud-clip">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 hud-border hud-clip bg-[var(--theme-accent)] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-display font-bold text-[var(--theme-bg)]">{referral.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono font-bold text-[var(--theme-text)] truncate">{referral.name}</p>
                      <p className="text-[10px] font-mono text-[var(--theme-text)] opacity-50 truncate">{referral.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-[10px] font-mono uppercase ${referral.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {referral.status}
                    </span>
                    <span className={`text-xs font-mono font-bold ${referral.earnings > 0 ? 'text-green-400' : 'text-[var(--theme-text)] opacity-30'}`}>
                      {referral.earnings > 0 ? `$${referral.earnings}` : '—'}
                    </span>
                    <ChevronRight className="w-3 h-3 text-[var(--theme-text)] opacity-30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Tier Card */}
          <div className="hud-border hud-clip p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-xs text-[var(--theme-text)] opacity-60 uppercase tracking-widest">{t('REFERRAL_TIER')}</h3>
              <TrendingUp className="w-4 h-4 text-[var(--theme-accent)]" />
            </div>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 hud-border hud-clip bg-[var(--theme-accent)] mb-2">
                <span className="text-2xl font-display font-bold text-[var(--theme-bg)]">G</span>
              </div>
              <h4 className="text-lg font-display font-bold text-yellow-400 uppercase tracking-wider">{t('TIER_GOLD')}</h4>
              <p className="text-xs font-mono text-[var(--theme-text)] opacity-60">10% commission</p>
            </div>
            <div className="space-y-2">
              {tiers.map((tier, i) => (
                <div key={i} className={`flex items-center justify-between p-2 border ${i === 2 ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10' : 'border-[var(--theme-border)]'} hud-clip`}>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${tier.color}`}>{t(tier.name)}</span>
                  <span className="text-[10px] font-mono text-[var(--theme-text)] opacity-60">{tier.rate}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 border border-[var(--theme-border)] hud-clip">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-mono text-[var(--theme-text)] opacity-60 uppercase">{t('NEXT_TIER')}</span>
                <span className="text-[10px] font-mono text-[var(--theme-accent)]">18 more</span>
              </div>
              <div className="w-full bg-[var(--theme-clip-bg)] h-1.5 hud-clip">
                <div className="bg-[var(--theme-accent)] h-full hud-clip" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="hud-border hud-clip p-4">
            <h3 className="font-display font-bold text-[var(--theme-accent)] uppercase tracking-[0.15em] text-sm mb-4">{t('HOW_IT_WORKS')}</h3>
            <div className="space-y-3">
              {[
                { num: '1', title: t('STEP_1'), desc: t('STEP_1_DESC') },
                { num: '2', title: t('STEP_2'), desc: t('STEP_2_DESC') },
                { num: '3', title: t('STEP_3'), desc: t('STEP_3_DESC') },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <div className="w-7 h-7 hud-border hud-clip bg-[var(--theme-accent)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-display font-bold text-[var(--theme-bg)]">{step.num}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-bold text-[var(--theme-accent)] uppercase tracking-wider mb-0.5">{step.title}</h4>
                    <p className="text-[10px] font-mono text-[var(--theme-text)] opacity-60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
