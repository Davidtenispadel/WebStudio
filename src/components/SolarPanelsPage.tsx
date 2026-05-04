// src/components/SolarPanelsPage.tsx
import React from 'react';
import SolarPanelCalculator from './SolarPanelCalculator';

const SolarPanelsPage: React.FC = () => {
  return (
    <div className="text-black">
      <h2 className="text-3xl md:text-4xl font-light mb-6">Solar panels</h2>
      <p className="text-lg mb-4">
        Solar photovoltaic (PV) panels convert sunlight into electricity. They are the most accessible renewable energy source for homes.
      </p>
      <p className="text-lg mb-6">
        Use the interactive tool below to design the layout of panels on your roof. Enter dimensions, choose panel type, and see a 3D preview.
      </p>
      <SolarPanelCalculator />
    </div>
  );
};

export default SolarPanelsPage;
