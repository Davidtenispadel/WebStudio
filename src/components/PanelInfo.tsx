import React from 'react';
import { PANEL_TYPES } from '../utils/solarCalculator';

interface PanelInfoProps {
  panelType: keyof typeof PANEL_TYPES;
}

const PanelInfo: React.FC<PanelInfoProps> = ({ panelType }) => {
  const panel = PANEL_TYPES[panelType];
  return (
    <div className="flex flex-col items-center p-4 border rounded-xl shadow-md bg-white w-72">
      <img
        src={panel.imageUrl}
        alt={panel.name}
        className="w-full h-40 object-contain rounded-md"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/300x200?text=No+Image')}
      />
      <h3 className="text-xl font-bold mt-3">{panel.name}</h3>
      <table className="text-sm w-full mt-2">
        <tbody>
          <tr><td className="font-semibold">Dimensiones:</td><td>{panel.width} m × {panel.height} m</td></tr>
          <tr><td className="font-semibold">Potencia:</td><td>{panel.powerWp} Wp</td></tr>
          <tr><td className="font-semibold">Precio aprox:</td><td>£{(panel.pricePerWp * panel.powerWp).toFixed(0)}</td></tr>
          <tr><td className="font-semibold">Precio por Wp:</td><td>£{panel.pricePerWp}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default PanelInfo;
