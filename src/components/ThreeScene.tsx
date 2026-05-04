import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PANEL_TYPES, Obstacle, EDGE_SETBACK } from '../utils/solarCalculator';

interface ThreeSceneProps {
  roofLength: number;
  roofWidth: number;
  layout: { panelPositions: { x: number; z: number }[] };
  panelType: keyof typeof PANEL_TYPES;
  obstacles?: Obstacle[];
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ roofLength, roofWidth, layout, panelType, obstacles = [] }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // Tejado
    const roofGeo = new THREE.BoxGeometry(roofLength, 0.05, roofWidth);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xaa8866, roughness: 0.7, metalness: 0.1 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = -0.1;
    roof.receiveShadow = true;
    roof.castShadow = true;
    scene.add(roof);

    // Línea de seguridad
    const edge = EDGE_SETBACK;
    const points = [
      new THREE.Vector3(-roofLength / 2 + edge, 0, -roofWidth / 2 + edge),
      new THREE.Vector3(roofLength / 2 - edge, 0, -roofWidth / 2 + edge),
      new THREE.Vector3(roofLength / 2 - edge, 0, roofWidth / 2 - edge),
      new THREE.Vector3(-roofLength / 2 + edge, 0, roofWidth / 2 - edge),
      new THREE.Vector3(-roofLength / 2 + edge, 0, -roofWidth / 2 + edge),
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const marginLine = new THREE.Line(lineGeo, lineMat);
    scene.add(marginLine);

    // Obstáculos
    obstacles.forEach(obs => {
      const cylinderGeo = new THREE.CylinderGeometry(0.4, 0.5, 0.8, 16);
      const material = new THREE.MeshStandardMaterial({ color: 0xcc8866 });
      const chimney = new THREE.Mesh(cylinderGeo, material);
      chimney.position.set(obs.x, 0, obs.z);
      chimney.castShadow = true;
      scene.add(chimney);
      // círculo de seguridad
      const circlePoints = [];
      const radius = 0.914;
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

    // Paneles
    const panel = PANEL_TYPES[panelType];
    const panelGeo = new THREE.BoxGeometry(panel.width, 0.02, panel.height);
    const panelMat = new THREE.MeshStandardMaterial({ color: panel.color, metalness: 0.2, roughness: 0.4 });
    layout.panelPositions.forEach(pos => {
      const panelMesh = new THREE.Mesh(panelGeo, panelMat);
      panelMesh.position.set(pos.x, 0, pos.z);
      panelMesh.castShadow = true;
      scene.add(panelMesh);
    });

    // Luces
    const ambient = new THREE.AmbientLight(0x404060);
    scene.add(ambient);
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
    camera.updateProjectionMatrix();

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
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
