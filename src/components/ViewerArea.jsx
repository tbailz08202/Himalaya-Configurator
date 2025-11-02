import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo, useEffect } from 'react';
import { Color } from 'three';
import { useConfigurator } from '../state/ConfigContext';

const MODEL_URLS = {
  'Defender 90': {
    'Hard Top': '/models/D90-Hard.glb',
    'Soft Top': '/models/D90-Soft.glb',
    'None': '/models/D90-Topless.glb'
  },
  'Defender 110': {
    'Hard Top': '/models/D110-Hard.glb',
    'Soft Top': '/models/D110-Soft.glb',
    'None': '/models/D110-Topless.glb'
  },
  'Defender 130': {
    'Hard Top': '/models/D130.glb',
    'Soft Top': '/models/D130-2.glb',
  }
};

const FALLBACK_URL = '/models/D90-Hard.glb';

function ActiveCarModel({ url, paint, roofPaint }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (!scene) return;
    
    console.log('=== Model meshes ===');
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log('Mesh name:', child.name, '| Material:', child.material?.name);
      }
    });
  }, [scene]);
  
  useEffect(() => {
    if (!scene || !paint) return;
    
    const cleanHex = paint;
    const whiteHex = "#fff2d0";
    const roofColor = roofPaint === "Alpine White" ? whiteHex : cleanHex;

    
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materialName = child.material.name;
        const meshName = child.name;
      
        if (materialName === 'Tires') {
          child.material.color = new Color('#1a1a1a');
          child.material.roughness = 0.9;
          child.material.metalness = 0;
          child.material.needsUpdate = true;
        }

        if (child.name.includes('Front_Bumper') || child.name.includes('Capped_Front_Bumper')) {
          child.material.color = new Color('#292929');
          child.material.roughness = 0.3;
          child.material.metalness = 0.1;
          child.material.needsUpdate = true;
        }

        if (materialName === 'Glass') {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          
          child.material = child.userData.originalMaterial.clone();
          child.material.color = new Color('#1a1a1a');
          child.material.opacity = 0.3;
          child.material.metalness = 0.9;
          child.material.roughness = 0.1;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }

        if (materialName === 'Interior' || materialName === 'Interior Secondary') {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          
          child.material = child.userData.originalMaterial.clone();
          child.material.metalness = 0;
          child.material.roughness = 0.9;
          child.material.needsUpdate = true;
        }

        if (materialName === 'Paint Secondary' && meshName.startsWith('Roof')) {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          
          child.material = child.userData.originalMaterial.clone();
          child.material.color = new Color(roofColor);
          child.material.needsUpdate = true;
        }

        // Handle wheels with "Paint Secondary" material - always use body color
        else if (materialName === 'Paint Secondary' && (meshName.includes('Rims') || meshName.includes('Wheel'))) {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          
          child.material = child.userData.originalMaterial.clone();
          child.material.color = new Color(cleanHex);
          child.material.needsUpdate = true;
        }
        // Handle roof mesh by name (130 and topless models - mesh named "Roof")
        else if (meshName === 'Roof' && (materialName === 'Paint Matte' || materialName === 'Paint')) {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          
          child.material = child.userData.originalMaterial.clone();
          child.material.color = new Color(roofColor);
          child.material.needsUpdate = true;
        }
        // Handle body paint (Paint or Paint Matte, but NOT the roof mesh)
        else {
          const isPaintable = (materialName === 'Paint' || materialName === 'Paint Matte') && meshName !== 'Roof';
          if (isPaintable) {
            if (!child.userData.originalMaterial) {
              child.userData.originalMaterial = child.material.clone();
            }
            
            child.material = child.userData.originalMaterial.clone();
            child.material.color = new Color(cleanHex);
            child.material.needsUpdate = true;
          }
        }
      }
    })
  }, [scene, paint, roofPaint]);
  
  return <primitive object={scene} />;
}

function ViewerArea() {
  const { config } = useConfigurator();

  const activeUrl = useMemo(() => {
    const byModel = MODEL_URLS[config.model];
    return byModel?.[config.roof] ?? FALLBACK_URL;
  }, [config.model, config.roof]);

  useEffect(() => {
    const urls = Object.values(MODEL_URLS).flatMap(m => Object.values(m));
    urls.forEach(u => useGLTF.preload(u));
    useGLTF.preload(FALLBACK_URL);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [3, 25, 3], fov: 10 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 20, 5]} intensity={2} />
          <directionalLight position={[-10,20, -5]} intensity={2} />
          <directionalLight position={[-5, 20, 0]} intensity={2} />

          <ActiveCarModel
            key={activeUrl + config.paint + config.roofPaint}
            url={activeUrl}
            paint={config.paint}
            roofPaint={config.roofPaint}
          />

          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.75} 
            scale={10} 
            blur={2}
            far={2}
          />

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            target={[0, 1.25, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ViewerArea;