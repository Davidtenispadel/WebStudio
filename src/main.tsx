import { ViteReactSSG } from 'vite-react-ssg';
import App from './App';
import SolarPanelCalculator from './components/SolarPanelCalculator';
import BatteriesPage from './components/BatteriesPage';
import { STUDIO_PATHS } from './routes';
import './index.css';

export const createRoot = ViteReactSSG(
  {
    routes: [
      ...STUDIO_PATHS.map(path => ({ path, element: <App /> })),
      { path: '/solar-calculator', element: <SolarPanelCalculator /> },
      { path: '/batteries', element: <BatteriesPage /> },
    ],
  }
);
