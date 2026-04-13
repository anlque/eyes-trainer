import { useEffect, useMemo, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'eye-training.theme';

function readStoredTheme(): Theme | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === 'dark' || raw === 'light') return raw;
  return null;
}

function getSystemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    return readStoredTheme() ?? getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!mq) return;

    // Only auto-follow system if user hasn't chosen explicitly.
    if (readStoredTheme() !== null) return;

    const handler = () => setTheme(mq.matches ? 'light' : 'dark');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = useMemo(() => {
    return () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggle };
}
