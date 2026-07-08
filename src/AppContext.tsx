import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language, Theme } from './translations';

const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123'
};

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('theme-monochrome-inverted');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const t = (key: string) => {
    const langKey = key as keyof typeof translations['en'];
    return translations[language][langKey] || translations['en'][langKey] || key;
  };

  const login = (email: string, password: string): boolean => {
    if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
