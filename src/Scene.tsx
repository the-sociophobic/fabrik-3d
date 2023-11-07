import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'

import CameraControls from './units/CameraControls'
import Lighting from './units/Lighting'
import Floor from './units/Floor'
import Boxes from './units/Boxes'




const Scene: React.FC = () => {
  return (
    <Canvas>
      <Stats />
      <CameraControls />
      <Lighting />
      <Floor />
      <Boxes />
    </Canvas>
  )
}


export default Scene
