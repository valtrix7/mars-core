import { ArrowLeft, FileText, Pickaxe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContext';

type PublicPageId =
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'risk'
  | 'aml'
  | 'pricing'
  | 'docs'
  | 'status'
  | 'support'
  | 'blog';

interface Section {
  title: string;
  body: string;
}

interface PublicPageContent {
  title: string;
  eyebrow: string;
  summary: string;
  updated: string;
  sections: Section[];
}

const publicPages: Record<PublicPageId, PublicPageContent> = {
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    summary: 'How Mars Ore handles account, wallet, device, and platform usage data.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Information We Collect', body: 'We collect account details, authentication events, mining package activity, wallet ledger records, support messages, and technical device data needed to operate the platform.' },
      { title: 'How We Use Data', body: 'Data is used to provide account access, maintain security, process platform activity, detect abuse, improve reliability, and communicate operational updates.' },
      { title: 'Security Controls', body: 'We apply access controls, audit logs, encrypted transport, and operational monitoring to protect platform records from unauthorized access.' },
      { title: 'Your Choices', body: 'Users may request account updates, support review, export assistance, or account closure where allowed by platform policy and applicable requirements.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    eyebrow: 'Legal',
    summary: 'The operating rules for using Mars Ore accounts, mining packages, wallet features, and platform services.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Account Responsibility', body: 'Users are responsible for keeping credentials secure, maintaining accurate account information, and reviewing activity shown inside their dashboard.' },
      { title: 'Platform Access', body: 'Mars Ore may update, limit, suspend, or discontinue features to protect users, maintain service quality, or comply with operational requirements.' },
      { title: 'Acceptable Use', body: 'Users may not abuse platform systems, attempt unauthorized access, bypass controls, submit fraudulent information, or interfere with service availability.' },
      { title: 'Service Changes', body: 'Mining package terms, fees, displayed yields, and availability may change based on network, infrastructure, compliance, or business conditions.' },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    eyebrow: 'Legal',
    summary: 'How Mars Ore uses essential cookies, local storage, and similar browser technologies.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Essential Storage', body: 'We may use browser storage to keep interface settings, language, theme preference, session state, and security-related signals.' },
      { title: 'Analytics', body: 'If analytics are enabled, they are used to understand reliability, feature usage, device classes, and high-level platform performance.' },
      { title: 'Preference Controls', body: 'Users can clear cookies or browser storage in their browser settings, though doing so may reset preferences or require signing in again.' },
    ],
  },
  risk: {
    title: 'Risk Disclosure',
    eyebrow: 'Legal',
    summary: 'Important risks related to digital assets, mining infrastructure, network rewards, and platform availability.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Digital Asset Volatility', body: 'Digital asset values can change rapidly and may be affected by liquidity, regulation, market events, and network conditions.' },
      { title: 'Mining Variability', body: 'Displayed yields, hashrate, uptime, and reward estimates are operational indicators and may differ from future realized results.' },
      { title: 'Network Dependency', body: 'Mining and wallet activity can depend on third-party networks, node availability, confirmations, fees, maintenance, and protocol-level changes.' },
      { title: 'No Financial Advice', body: 'Platform information is provided for product use and operational visibility. It is not investment, tax, legal, or financial advice.' },
    ],
  },
  aml: {
    title: 'AML & KYC Policy',
    eyebrow: 'Legal',
    summary: 'How Mars Ore approaches identity review, fraud controls, sanctions screening, and suspicious activity workflows.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Identity Review', body: 'Certain account actions may require identity, ownership, or source-of-funds review before deposits, withdrawals, or package allocation can proceed.' },
      { title: 'Monitoring', body: 'The platform may monitor activity patterns, wallet behavior, login signals, and transaction records to detect fraud or prohibited use.' },
      { title: 'Restricted Activity', body: 'Accounts connected to prohibited jurisdictions, sanctions exposure, fraud, abuse, or evasion attempts may be limited or closed.' },
      { title: 'Records', body: 'Compliance records may be retained as needed for audit, dispute resolution, fraud prevention, and applicable operational requirements.' },
    ],
  },
  pricing: {
    title: 'Pricing',
    eyebrow: 'Platform',
    summary: 'A public overview of package pricing, maintenance fees, and allocation rules.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Package Pricing', body: 'Mining package prices are shown before allocation and may vary by protocol, duration, capacity, and active promotions.' },
      { title: 'Maintenance Fees', body: 'Maintenance fees can cover infrastructure, pool operations, monitoring, energy exposure, support, and platform administration.' },
      { title: 'Availability', body: 'Package availability may be limited by inventory, network demand, operational capacity, and account eligibility.' },
    ],
  },
  docs: {
    title: 'Documentation',
    eyebrow: 'Resources',
    summary: 'Core concepts for accounts, packages, wallet activity, referrals, and admin review.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Getting Started', body: 'Create an account, review package options, allocate resources, and monitor hashrate, contracts, and yield inside the dashboard.' },
      { title: 'Wallet Ledger', body: 'The wallet page shows asset balances, pending operations, deposit actions, extraction actions, and exchange controls.' },
      { title: 'Referrals', body: 'Referral workflows are designed to track invited accounts, reward eligibility, and status as the module is integrated.' },
    ],
  },
  status: {
    title: 'API Status',
    eyebrow: 'Resources',
    summary: 'Current public service status for core platform systems.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Dashboard API', body: 'Operational. Dashboard metrics, package records, and account state are currently available.' },
      { title: 'Wallet API', body: 'Operational. Ledger, balance display, and pending operation views are currently available.' },
      { title: 'Mining Nodes', body: 'Operational. Public status indicators show all pools online and nominal network performance.' },
    ],
  },
  support: {
    title: 'Support',
    eyebrow: 'Resources',
    summary: 'Where users can get help with accounts, wallet records, mining packages, or platform access.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Account Help', body: 'For login, profile, or account access issues, include your account email and a clear description of the problem.' },
      { title: 'Wallet Review', body: 'For deposit, extraction, or ledger questions, include the asset, amount, date, and any available transaction reference.' },
      { title: 'Package Questions', body: 'For mining package questions, include the package name, protocol, allocation date, and dashboard status shown in your account.' },
    ],
  },
  blog: {
    title: 'Blog',
    eyebrow: 'Resources',
    summary: 'Product updates, mining infrastructure notes, platform reliability updates, and digital asset education.',
    updated: 'July 9, 2026',
    sections: [
      { title: 'Mining Infrastructure Notes', body: 'Updates about platform capacity, uptime practices, pool monitoring, and reliability engineering.' },
      { title: 'Product Releases', body: 'Release notes for dashboard modules, wallet workflows, referral updates, and account management improvements.' },
      { title: 'Education', body: 'Plain-language explainers covering mining concepts, hashrate, maintenance fees, confirmations, and risk awareness.' },
    ],
  },
};

export default function PublicInfoPage({ pageId }: { pageId: PublicPageId }) {
  const { t } = useAppContext();
  const page = publicPages[pageId];

  return (
    <div className="min-h-screen w-full overflow-y-auto no-scrollbar px-6 py-8">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between pb-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center hud-border hud-clip bg-[var(--theme-accent)]">
            <Pickaxe className="h-5 w-5" style={{ color: 'var(--theme-bg)' }} />
          </div>
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-[0.2em] text-[var(--theme-accent)]">{t('MARS_ORE')}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--theme-text)] opacity-50">{page.eyebrow}</p>
          </div>
        </Link>

        <Link
          to="/"
          className="hud-border hud-clip inline-flex items-center gap-2 px-4 py-2 text-[10px] font-display font-bold uppercase tracking-widest text-[var(--theme-text)] transition-all hover:bg-[var(--theme-clip-hover)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 pb-16 lg:grid-cols-[0.78fr_1.22fr]">
        <section className="hud-border hud-clip h-fit p-8">
          <div className="mb-8 flex h-14 w-14 items-center justify-center border border-[var(--theme-border-solid)] hud-clip">
            <FileText className="h-6 w-6 text-[var(--theme-accent)]" />
          </div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--theme-text)] opacity-50">{page.eyebrow}</p>
          <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-tight tracking-[0.14em] text-[var(--theme-accent)] md:text-5xl">{page.title}</h1>
          <p className="font-mono text-sm uppercase leading-7 tracking-wider text-[var(--theme-text)] opacity-65">{page.summary}</p>
          <div className="mt-8 border-t border-[var(--theme-border)] pt-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--theme-text)] opacity-45">Last updated</p>
            <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">{page.updated}</p>
          </div>
        </section>

        <section className="space-y-5">
          {page.sections.map((section, index) => (
            <article key={section.title} className="hud-border hud-clip p-6 transition-all hover:bg-[var(--theme-clip-hover)]">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--theme-accent)]">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="font-display text-lg font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">{section.title}</h2>
              </div>
              <p className="font-mono text-xs uppercase leading-7 tracking-wider text-[var(--theme-text)] opacity-65">{section.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
