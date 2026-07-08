import { Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import DashboardPage from '../pages/DashboardPage';
import PackagesPage from '../pages/PackagesPage';
import ReferralsPage from '../pages/ReferralsPage';
import WalletPage from '../pages/WalletPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/referrals" element={<ReferralsPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
