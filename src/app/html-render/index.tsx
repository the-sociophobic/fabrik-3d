import { FC } from 'react'
import { ThreeElements } from '@react-three/fiber'

import { PlaneGeometry } from '../../units/Boxes/geometries'
import HTMLMaterial from './HTMLMaterial'
import TestHTML from './TestHTML'


export type NodePlaneProps = {
} & ThreeElements['mesh']


const NodePlane: FC<NodePlaneProps> = ({
  ...meshData
}) => {
  return (
    <mesh position={meshData.position || [0, 0, 0]}>
      <boxGeometry />
      <HTMLMaterial>
        <TestHTML />
      </HTMLMaterial>
    </mesh>
  )
}








export default NodePlane
