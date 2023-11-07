import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'

import CameraControls from './units/CameraControls'
import Lighting from './units/Lighting'
import Boxes from './units/Boxes'
import Gizmo from './units/Gizmo'




const Scene: React.FC = () => {
  return (
    <Canvas>
      <Stats />
      <CameraControls />
      <Lighting />
      <Boxes />
      {/* <Gizmo /> */}
    </Canvas>
  )
}


export default Scene
