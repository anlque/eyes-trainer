import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import { App } from '@/app/App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found. React app mount failed');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
