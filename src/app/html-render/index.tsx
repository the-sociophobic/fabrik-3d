import { FC } from 'react'

import { PlaneGeometry } from '../../units/Boxes/geometries'
import HTMLMaterial from './HTMLMaterial'
import TestHTML from './TestHTML'


export type NodePlaneProps = {
}


const NodePlane: FC<NodePlaneProps> = () => {
  return (
    <mesh>
      <PlaneGeometry />
      <HTMLMaterial>
      <TestHTML />
      </HTMLMaterial>
    </mesh>
  )
}








export default NodePlane
