// src/components/ThreeScene.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PANEL_TYPES } from '../utils/solarCalculator';

interface ThreeSceneProps {
  roofLength: number;
  roofWidth: number;
  layout: {
    panelPositions: { x: number; z: number }[];
  };
  panelType: keyof typeof PANEL_TYPES;
  obstacles?: { x: number; z: number; radius?: number }[];
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ roofLength, roofWidth, layout, panelType, obstacles = [] }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // Configuración básica
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Tejado (una caja plana)
    const roofGeometry = new THREE.BoxGeometry(roofLength, 0.05, roofWidth);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xaa8866, roughness: 0.7, metalness: 0.1 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = -0.1;
    roof.receiveShadow = true;
    roof.castShadow = true;
    scene.add(roof);

    // Perímetro de seguridad (línea roja)
    const edgeMargin = 0.4;
    const marginPoints = [
      new THREE.Vector3(-roofLength / 2 + edgeMargin, 0, -roofWidth / 2 + edgeMargin),
      new THREE.Vector3(roofLength / 2 - edgeMargin, 0, -roofWidth / 2 + edgeMargin),
      new THREE.Vector3(roofLength / 2 - edgeMargin, 0, roofWidth / 2 - edgeMargin),
      new THREE.Vector3(-roofLength / 2 + edgeMargin, 0, roofWidth / 2 - edgeMargin),
      new THREE.Vector3(-roofLength / 2 + edgeMargin, 0, -roofWidth / 2 + edgeMargin),
    ];
    const marginLineGeometry = new THREE.BufferGeometry().setFromPoints(marginPoints);
    const marginMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const marginLine = new THREE.Line(marginLineGeometry, marginMaterial);
    scene.add(marginLine);

    // Obstáculos (chimeneas)
    obstacles.forEach(obs => {
      const cylinderGeo = new THREE.CylinderGeometry(0.4, 0.5, 0.8, 16);
      const material = new THREE.MeshStandardMaterial({ color: 0xcc8866 });
      const chimney = new THREE.Mesh(cylinderGeo, material);
      chimney.position.set(obs.x, 0, obs.z);
      chimney.castShadow = true;
      scene.add(chimney);
      // Zona de seguridad (círculo semitransparente)
      const circlePoints = [];
      const radius = 0.914; // clearance
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        const x = obs.x + Math.cos(angle) * radius;
        const z = obs.z + Math.sin(angle) * radius;
        circlePoints.push(new THREE.Vector3(x, 0.02, z));
      }
      const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
      const circleMat = new THREE.LineBasicMaterial({ color: 0xffaa00 });
      const circle = new THREE.LineLoop(circleGeo, circleMat);
      scene.add(circle);
    });

    // Paneles solares
    const panel = PANEL_TYPES[panelType];
    const panelGeometry = new THREE.BoxGeometry(panel.width, 0.02, panel.height);
    const panelMaterialObj = new THREE.MeshStandardMaterial({ color: panelType === 'monocrystalline' ? 0x2266ff : 0x44aaff, metalness: 0.2, roughness: 0.4 });
    layout.panelPositions.forEach(pos => {
      const panelMesh = new THREE.Mesh(panelGeometry, panelMaterialObj);
      panelMesh.position.set(pos.x, 0, pos.z);
      panelMesh.castShadow = true;
      panelMesh.receiveShadow = false;
      scene.add(panelMesh);
    });

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const backLight = new THREE.DirectionalLight(0x88aaff, 0.5);
    backLight.position.set(-2, 3, -4);
    scene.add(backLight);

    // Cámara
    camera.position.set(roofLength * 0.8, roofLength * 0.6, roofWidth * 1.2);
    camera.lookAt(0, 0, 0);
    camera.zoom = 1;
    camera.updateProjectionMatrix();

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Ajustar cámara al redimensionar
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [roofLength, roofWidth, layout, panelType, obstacles]);

  return <div ref={mountRef} style={{ width: '100%', height: '500px', backgroundColor: '#f0f0f0', borderRadius: '8px' }} />;
};

export default ThreeScene;
