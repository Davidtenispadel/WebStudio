export const PANEL_TYPES = {
  monocrystalline: {
    name: 'Monocristalino (TOPCon)',
    width: 1.05,
    height: 1.74,
    powerWp: 430,
    pricePerWp: 0.90,
    color: '#2266ff',
    imageUrl: '/images/monocrystalline.jpg',
  },
  polycrystalline: {
    name: 'Policristalino (PERC)',
    width: 0.99,
    height: 1.65,
    powerWp: 380,
    pricePerWp: 0.70,
    color: '#44aaff',
    imageUrl: '/images/polycrystalline.jpg',
  },
};

export const EDGE_SETBACK = 0.400;
export const PANEL_GAP = 0.020;
export const OBSTACLE_CLEARANCE = 0.914;

export function calculateUsableDimensions(roofLength, roofWidth, _obstacles) {
  return {
    length: roofLength - 2 * EDGE_SETBACK,
    width: roofWidth - EDGE_SETBACK,
  };
}

function collidesWithObstacles(panelX, panelZ, panelWidth, panelHeight, obstacles) {
  if (!obstacles) return false;
  const halfW = panelWidth / 2;
  const halfH = panelHeight / 2;
  const minX = panelX - halfW;
  const maxX = panelX + halfW;
  const minZ = panelZ - halfH;
  const maxZ = panelZ + halfH;
  for (const obs of obstacles) {
    const clearance = OBSTACLE_CLEARANCE;
    const obsMinX = obs.x - clearance;
    const obsMaxX = obs.x + clearance;
    const obsMinZ = obs.z - clearance;
    const obsMaxZ = obs.z + clearance;
    if (maxX > obsMinX && minX < obsMaxX && maxZ > obsMinZ && minZ < obsMaxZ) return true;
  }
  return false;
}

export function calculatePanelLayout(usableLength, usableWidth, panelWidth, panelHeight, obstacles) {
  const panelStepX = panelWidth + PANEL_GAP;
  const panelStepZ = panelHeight + PANEL_GAP;
  const cols = Math.floor((usableLength + PANEL_GAP) / panelStepX);
  const rows = Math.floor((usableWidth + PANEL_GAP) / panelStepZ);
  if (cols <= 0 || rows <= 0) return { cols: 0, rows: 0, totalPanels: 0, panelPositions: [] };
  const totalWidth = cols * panelWidth + (cols - 1) * PANEL_GAP;
  const startX = (usableLength - totalWidth) / 2;
  const startZ = (usableWidth - (rows * panelHeight + (rows - 1) * PANEL_GAP)) / 2;

  const positions = [];
  for (let i = 0; i < cols; i++) {
    const x = startX + i * (panelWidth + PANEL_GAP) + panelWidth / 2;
    for (let j = 0; j < rows; j++) {
      const z = startZ + j * (panelHeight + PANEL_GAP) + panelHeight / 2;
      if (!collidesWithObstacles(x, z, panelWidth, panelHeight, obstacles)) {
        positions.push({ x, z });
      }
    }
  }
  return { cols, rows, totalPanels: positions.length, panelPositions: positions };
}
