import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Studio from './Studio';
import SolarPanelCalculator from './components/SolarPanelCalculator';
import BatteriesPage from './components/BatteriesPage';

const App: React.FC = () => (
  <Routes>
    <Route path="/solar-calculator" element={<SolarPanelCalculator />} />
    <Route path="/batteries" element={<BatteriesPage />} />
    <Route path="*" element={<Studio />} />
  </Routes>
);

export default App;
