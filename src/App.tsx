import { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useAppContext } from './AppContext';
import AppShell from './components/layout/AppShell';
import AuthenticatedLayout from './components/layout/AuthenticatedLayout';
import PublicRoutes from './routes/PublicRoutes';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <Router>
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      </Router>
    );
  }

  return (
    <Router>
      <AppShell>
        {isAuthenticated ? <AuthenticatedLayout /> : <PublicRoutes />}
      </AppShell>
    </Router>
  );
}
