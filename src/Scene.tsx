import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

import CameraControls from './units/CameraControls'
import Lighting from './units/Lighting'
import Boxes from './units/Boxes'
import Gizmo from './units/Gizmo'
import SitePlane from './app/html-render'




const Scene: React.FC = () => {
  const controlsRef = useRef<OrbitControlsType>(null)

  return (
    <Canvas>
      <Stats />
      <CameraControls _ref={controlsRef} />
      <Lighting />
      <Boxes
        amount={100}
        minBoxHeight={1}
        maxBoxHeight={6}
        containerRadius={35}
        controlsRef={controlsRef}
      />
      {/* <Gizmo /> */}
      {/* <SitePlane /> */}
    </Canvas>
  )
}


export default Scene
