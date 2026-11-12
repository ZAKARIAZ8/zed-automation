import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ensureWritableFetch} from './utils/commissionCalculator.ts';

if (typeof window !== 'undefined') {
  ensureWritableFetch(window as unknown as Record<string, unknown>);
}

createRoot(document.getElementById('root')!).render(<App />);

