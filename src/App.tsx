import { HashRouter as Router } from 'react-router-dom';
import { useAppContext } from './AppContext';
import AppShell from './components/layout/AppShell';
import AuthenticatedLayout from './components/layout/AuthenticatedLayout';
import LandingPage from './pages/LandingPage';

export default function App() {
  const { isAuthenticated } = useAppContext();

  return (
    <Router>
      <AppShell>
        {isAuthenticated ? <AuthenticatedLayout /> : <LandingPage />}
      </AppShell>
    </Router>
  );
}
