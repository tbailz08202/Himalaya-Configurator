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
    'Crew Cab': '/models/D110-CrewCab.glb'
  },
  'Defender 130': {
    'Hard Top': '/models/D130-2.glb',
    'Soft Top': '/models/D130-2.glb',
    'None': '/models/D130-2.glb',
  }
};

const FALLBACK_URL = '/models/D90-Hard.glb';

function ActiveCarModel({ 
  url, 
  paint,
  finish, 
  roofColor, 
  roofColorSoft, 
  fenderColor, 
  mirrorColor, 
  headlightColor,
  wheelColor
}) {
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
    
    //Color option hexes
    const NAMED = {
      'Alpine White': '#fff2d0',
      'Fuji White': '#f5f4e8',
      'Beluga Black': '#0b0b0b',
      'Sand': '#c09873',
      'Deep Green': '#32382a'
    }

    const roofPaint = roofColor === "Alpine White" ?  NAMED['Alpine White'] : paint;
    
    const roofPaintSoft = 
      roofColorSoft === "Sand" ? NAMED["Sand"] 
        : roofColorSoft === "Deep Green" ? NAMED["Deep Green"]
        : null;
    
    const fenderPaint = fenderColor === "Beluga Black" ?  NAMED['Beluga Black'] : paint;
    const mirrorPaint = mirrorColor === "Beluga Black" ? NAMED['Beluga Black'] : paint;
    const headlightPaint = headlightColor === "Beluga Black" ? NAMED['Beluga Black'] : paint;
    const finishParams = finish === 'Matte'? { metalness: 0.2, roughness: 0.65 } : null;

    const wheelPaint =
      wheelColor === "Alpine White" ? NAMED["Alpine White"] 
        : wheelColor === "Fuji White" ? NAMED["Fuji White"]
        : wheelColor === "Beluga Black" ? NAMED["Beluga Black"]
        : paint;

    
    const applyColor = (child, hex, opts = {}) => {
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material.clone();
      }
      const mat = child.userData.originalMaterial.clone();
      if (hex) mat.color = new Color(hex);

      if (opts.transparent != null) mat.transparent = opts.transparent;
      if (opts.opacity != null) mat.opacity = opts.opacity;
      if (opts.metalness != null && 'metalness' in mat) mat.metalness = opts.metalness;
      if (opts.roughness != null && 'roughness' in mat) mat.roughness = opts.roughness;

      mat.needsUpdate = true;
      child.material = mat;
    };

    
    scene.traverse((child) => {
      if (!child.isMesh && !child.material) return;

      const materialName = child.material.name;
      const meshName = child.name;
      const isHeadlight = meshName === 'Headlight_Bezels001_4' || 
                          meshName === 'Headlight_Bezels001_3' || 
                          meshName === 'Headlight_Bezels003_3';

      const isSoftTop = meshName === 'Soft_Top' || 
                        meshName === "Soft_Top_1" ||  
                        meshName === 'Soft_Top_Down_1' || 
                        meshName === 'Soft_Top_Rolled_Up'


      //Handles tire color and appearance
      if (materialName === 'Tires') {
        applyColor(child, '#1a1a1a', { metalness: 0, roughness: 0.9 });
        return;
      }
      //Makes headlights look more realistic
      if (materialName === 'Headlight Clear') {
        applyColor(child, '#ffffff', { transparent: true, opacity: 0.4, metalness: 0.6, roughness: 0.05 });
        child.material.refractionRatio = 0;
        child.material.ior = 2;
        child.material.needsUpdate = true;
        return;
      }
      //Handles cage color on topless Defender 110
      if (meshName === 'Exterior_Cage_1'){
        applyColor(child, '#0b0b0b', {transparent: true, opacity: 0});
        return;
      }

      //Handles bumper color
      if (meshName.includes('Front_Bumper') || meshName.includes('Capped_Front_Bumper')) {
        applyColor(child, '#292929', { metalness: 0.1, roughness: 0.3 });
        return;
       }
      
      //Handles glass appearance and tint
      if (materialName === 'Glass') {
        applyColor(child, '#1a1a1a', {
          transparent: true,
          opacity: 0.3,
          metalness: 0.9,
          roughness: 0.1,
        });
        return;
      }

      //Handles interior appearance
      if (materialName === 'Interior' || materialName === 'Interior Secondary') {
        applyColor(child, null, { metalness: 0, roughness: 0.9 });
        return;
      }

      // Handles Hard Top color change
      if (meshName.startsWith('Roof')) {
        if (finishParams) applyColor(child, roofPaint, finishParams);
        else applyColor(child, roofPaint);
      }

      // Handles Soft Top Color Change
      if (isSoftTop) {
        applyColor(child, roofPaintSoft,{ metalness: 0.1, roughness: 0.9});  
        return;
      }
      
      // Handles wheels with "Paint Secondary" material using body color
      else if (materialName === 'Paint Secondary' && (meshName.includes('Rims') 
        || meshName.includes('Wheel') || meshName.includes('Spare'))) {
        applyColor(child, wheelPaint); 
        return;
      }    

      // Handles fender colorseparately
      else if (meshName === 'Fenders' || meshName === 'BodyPaint002') {
        if (finishParams) applyColor(child, fenderPaint, finishParams);
        else applyColor(child, fenderPaint);
      }

      // Handles mirror color separately
      else if (meshName === 'Mirrors_1') {
        if (finishParams) applyColor(child, mirrorPaint, finishParams);
        else applyColor(child, mirrorPaint);
      }

      // Handles headlight trim color separately
      else if (isHeadlight) {
        if (finishParams) applyColor(child, headlightPaint, finishParams);
        else applyColor(child, headlightPaint);
      }
      
      // Handles body paint Paint or Paint Matte
      else if (materialName === 'Paint' || materialName === 'Paint Matte') {
        if (meshName.startsWith('Roof')) return;

        if (finishParams) applyColor(child, paint, finishParams);
        else applyColor(child, paint);
      }
    }
  )
  }, [scene, paint, finish, roofColor, roofColorSoft, fenderColor, mirrorColor, headlightColor, wheelColor]);
  
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
          <directionalLight position={[10, 20, 5]} intensity={1} />
          <directionalLight position={[-10,20, -5]} intensity={1} />
          <directionalLight position={[-5, 20, 0]} intensity={1} />

          <ActiveCarModel
            key={activeUrl + config.paint + config.finish + config.roofColor + config.fenderColor + config.headlightColor + config.wheelColor}
            url={activeUrl}
            paint={config.paint}
            finish={config.finish}
            roofColor={config.roofColor}
            roofColorSoft={config.roofColorSoft}
            fenderColor={config.fenderColor}
            mirrorColor={config.mirrorColor}
            headlightColor={config.headlightColor}
            wheelColor={config.wheelColor}
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