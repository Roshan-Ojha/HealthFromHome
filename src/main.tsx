import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
