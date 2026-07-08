# Cloud Mining Platform - Architecture & System Design Document

## SECTION 1: EXECUTIVE SYSTEM OVERVIEW
This document outlines the architecture for a highly scalable, enterprise-grade cloud mining platform supporting native STX mining and third-party LTC mining. The system is designed using a microservices architecture to handle 100,000+ concurrent users, featuring a double-entry financial ledger, real-time hashrate allocation, and automated reward distribution.

**Data Flow:**
1. User deposits crypto (managed via Wallet/Deposit Service).
2. User purchases a Hashrate Package (Package Service).
3. Hashrate Allocation Engine routes the purchase to either internal STX nodes or external LTC pools.
4. Mining Service tracks worker performance and pool APIs.
5. Reward Engine calculates hourly/daily accruals based on allocated hashrate vs. pool performance.
6. Ledger Service credits user wallets and deducts maintenance/platform fees.

## SECTION 2: DOMAIN MODEL
- **Users**: End-users and Administrators.
- **Packages**: predefined mining contracts (e.g., "Pro LTC", 20 GH/s, 30 days).
- **Hashrate Allocations**: Active mapping of User -> Package -> Provider.
- **Mining Providers**: Internal STX nodes or external pools (ViaBTC, F2Pool).
- **Workers**: Individual mining machines/instances connected to pools.
- **Rewards**: Calculated earnings credited to users.
- **Referrals**: Multi-tier tree mapping for commission distribution.
- **Wallets**: Multi-asset storage for user balances (STX, LTC, USDT).
- **Ledger Entries**: Immutable double-entry accounting records.

## SECTION 3: DATABASE DESIGN (Prisma PostgreSQL)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  wallets   Wallet[]
  packages  UserPackage[]
  referrals ReferralNode[]
  createdAt DateTime @default(now())
}

enum Role { USER, ADMIN, SUPER_ADMIN }

model UserPackage {
  id             String   @id @default(uuid())
  userId         String
  packageId      String
  hashrateAmount Float
  status         PackageStatus
  expiresAt      DateTime
  user           User     @relation(fields: [userId], references: [id])
}

enum PackageStatus { ACTIVE, EXPIRED, CANCELLED }

model LedgerEntry {
  id          String   @id @default(uuid())
  walletId    String
  amount      Decimal
  currency    String
  type        EntryType // CREDIT, DEBIT
  referenceId String   // Links to Reward, Deposit, or Withdrawal
  createdAt   DateTime @default(now())
}

enum EntryType { CREDIT, DEBIT }
```
*(Note: Schema abbreviated for brevity; full schema includes Providers, Referrals, Withdrawals, etc.)*

## SECTION 4: MICROSERVICE ARCHITECTURE
- **Identity Service**: JWT/OAuth, 2FA, session management.
- **Package & Allocation Service**: Manages package catalog and assigns users to provider APIs.
- **Mining & Provider Service**: Aggregates API data from ViaBTC, F2Pool, and native STX nodes.
- **Reward Engine**: Cron-driven service calculating proportional rewards.
- **Ledger & Wallet Service**: The source of truth for all balances. Strict double-entry rules.
- **Referral Service**: Calculates real-time MLR commissions (8%/3%/1%).

## SECTION 5: AUTHENTICATION & SECURITY
- **Auth**: Short-lived JWTs (15m) + HttpOnly Refresh Tokens (7d).
- **Security**: 2FA (TOTP) mandatory for withdrawals. Device fingerprinting via browser heuristics.
- **Admin**: IP-whitelisted, hardware key (WebAuthn) secured RBAC.

## SECTION 6: MINING INFRASTRUCTURE (STX)
- **Stacks Nodes**: Clustered `stacks-node` instances deployed on Kubernetes.
- **Miner Orchestration**: Custom worker orchestration managing BTC burn vs. STX reward ratio.
- **Health Checks**: Liveness probes on RPC endpoints; automatic failover to backup nodes.

## SECTION 7: LTC PROVIDER LAYER
Implemented via Factory Pattern in Node.js/NestJS:
```typescript
interface MiningProvider {
  getHashrate(workerId: string): Promise<number>;
  getDailyRevenue(hashrate: number): Promise<number>;
}
class ViaBTCProvider implements MiningProvider { /* ... */ }
class F2PoolProvider implements MiningProvider { /* ... */ }
class ProviderFactory {
  static getProvider(name: string): MiningProvider { /* ... */ }
}
```

## SECTION 8: HASHRATE ALLOCATION ENGINE
- **Logic**: When a user buys 100 MH/s, the engine queries the `Provider Service` for the most profitable/available pool with spare capacity, allocating a virtual sub-account or distinct worker tag to represent that capacity.

## SECTION 9: REWARD ENGINE
- **Formula**: `User_Reward = (User_Hashrate / Total_Pool_Hashrate) * Total_Pool_Reward - Maintenance_Fee`
- **Execution**: Runs hourly via Kafka events; processes in batches to prevent DB locking.

## SECTION 10: FINANCIAL LEDGER
**Strict Double Entry**:
Every operation must balance. A user reward creates two entries:
1. `CREDIT` User Wallet (LTC)
2. `DEBIT` Platform Payable Account (LTC)
Balances are dynamically calculated `SUM(credits) - SUM(debits)` or cached via materialized views.

## SECTION 11-13: WALLET, DEPOSITS, WITHDRAWALS
- **Wallet**: Balances split into `Available`, `Locked` (in withdrawal processing), and `Total`.
- **Deposits**: Monitored via dedicated node WebSockets or services like Fireblocks/BitGo. Require N network confirmations.
- **Withdrawals**: Automated for < $1000 after fraud check; manual Admin approval for > $1000. Processed via batched cold-wallet transactions.

## SECTION 14: REFERRAL SYSTEM
- Tree structure stored using Adjacency List or Materialized Path in PostgreSQL.
- Triggers on `UserPackage` purchase. Calculates 8% (L1), 3% (L2), 1% (L3) and queues Ledger `CREDIT` entries.

## SECTION 15: REAL-TIME DASHBOARD
- **Tech**: WebSockets (Socket.io) or Redis Pub/Sub.
- **Events**: `hashrate.update`, `balance.update`, `reward.accrual`.

## SECTION 16: ADMIN PANEL
- Modules: KYC Review, Withdrawal Approvals, Pool Health metrics, Global Liability (User balances vs Platform cold wallets).

## SECTION 17: COMPLIANCE
- Integrated with Sumsub for tiered KYC (Tier 1: <$10k, Tier 2: Unlimited).
- Chainalysis API hook on all deposits/withdrawals to block high-risk wallets.

## SECTION 18-20: ANALYTICS, DEVOPS, & OBSERVABILITY
- **Data**: ClickHouse for immutable event logs; Metabase for business dashboards.
- **Infra**: AWS EKS (Kubernetes), PostgreSQL Aurora (Multi-AZ), Redis ElastiCache, MSK (Kafka).
- **Monitoring**: Prometheus scraping node metrics; Grafana for dashboards; PagerDuty alerts for Hashrate drops > 5%.

## SECTION 21-25: SCALING & FUTURE EXPANSION
- **Scaling**: Database sharding by User ID if > 10M rows. Read replicas for dashboard queries.
- **Expansion**: Provider Factory Pattern allows adding BTC or KASPA pools by implementing the `MiningProvider` interface without altering the core Ledger or Reward engines.
