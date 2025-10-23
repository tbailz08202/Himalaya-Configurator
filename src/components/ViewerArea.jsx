import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, useEffect, useMemo } from 'react'
import { useConfigurator } from '../state/ConfigContext'

const MODEL_URLS = {
  'Defender 90': {
    'Hard Top': '/models/D90-Hard.glb',
    'Soft Top': '/models/D90-Soft.glb',
    'None'    : '/models/D90-Topless.glb',
  },
  'Defender 110': {
    'Hard Top': '/models/D110-Hard.glb',
    'Soft Top': '/models/D110-Soft.glb',
    'None'    : '/models/D110-Topless.glb',
  }
}

//Fallback if a given (model, roof) isn’t present yet
const FALLBACK_URL = '/models/D90-Hard.glb'

function ActiveCarModel({ urlKey }) {
  // urlKey is the final URL string; changing it will re-mount the model
  const { scene } = useGLTF(urlKey)
  return <primitive object={scene} />
}

export default function ViewerArea() {
  const { config } = useConfigurator()

  //Resolve the active URL from current model + roof
  const activeUrl = useMemo(() => {
    const byModel = MODEL_URLS[config.model]
    const url = byModel?.[config.roof]
    return url ?? FALLBACK_URL
  }, [config.model, config.roof])

  //Preload everything once for instant swaps
  useEffect(() => {
    const allUrls = Object.values(MODEL_URLS).flatMap(map => Object.values(map))
    allUrls.forEach(u => useGLTF.preload(u))
    useGLTF.preload(FALLBACK_URL)
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [3, 22, 3], fov: 10 }}>
        <Suspense fallback={null}>
          <Environment preset="forest" />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />

          {/* Key forces a clean re-mount whenever URL changes */}
          <ActiveCarModel key={activeUrl} urlKey={activeUrl} />

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            target={[0, 1.25, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
