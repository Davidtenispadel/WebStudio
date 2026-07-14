import { ViteReactSSG } from 'vite-react-ssg';
import App from './App';
import { STUDIO_PATHS } from './routes';
import './index.css';

export const createRoot = ViteReactSSG(
  {
    routes: [
      ...STUDIO_PATHS.map(path => ({ path, element: <App /> })),
      { path: '/solar-calculator', element: <App /> },
      { path: '/batteries', element: <App /> },
    ],
  }
);
