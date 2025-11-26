import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
