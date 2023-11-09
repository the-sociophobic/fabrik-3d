import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

import sphericalIterator from './sphericalIterator'
import { LowerPartGeometry, UpperPartGeometry } from './geometries'


const tmpObject = new THREE.Object3D()
const tmpMatrix = new THREE.Matrix4()
const tmpColor = new THREE.Color()


export type BoxesProps = {
  amount: number
  minBoxHeight: number
  maxBoxHeight: number
  containerRadius: number
  controlsRef: React.RefObject<OrbitControlsType>
}


const Boxes: React.FC<BoxesProps> = ({
  amount,
  minBoxHeight,
  maxBoxHeight,
  containerRadius,
  controlsRef
}) => {
  const boxesRef = useRef<THREE.InstancedMesh>(null)
  const planesRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    const boxesRender = boxesRef.current
    const planesRender = planesRef.current

    if (boxesRender && planesRender) {
      sphericalIterator({
        amount,
        containerRadius,
        fn: (pos, boxes_distance, currentBox) => {
          const box_size = boxes_distance / maxBoxHeight

          tmpObject.position.set(pos.x, pos.y, pos.z)
          tmpObject.scale.set(
            box_size,
            box_size * (minBoxHeight + Math.random() * (maxBoxHeight - minBoxHeight)),
            box_size
          )
          tmpObject.updateMatrix()
          boxesRender.setMatrixAt(currentBox, tmpObject.matrix)
          planesRender.setMatrixAt(currentBox, tmpObject.matrix)

          tmpColor.set(
            Math.random() * 1,
            Math.random() * 1,
            Math.random() * 1
          )
          boxesRender.setColorAt(currentBox, tmpColor)
          tmpColor.set(1, 1, 1)
          planesRender.setColorAt(currentBox, tmpColor)
        }
      })

      boxesRender.instanceMatrix.needsUpdate = true
      if (boxesRender.instanceColor)
        boxesRender.instanceColor.needsUpdate = true

      planesRender.instanceMatrix.needsUpdate = true
      if (planesRender.instanceColor)
        planesRender.instanceColor.needsUpdate = true
    }
  }, [boxesRef.current, planesRef.current])

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (!boxesRef.current || !e.instanceId || !controlsRef.current)
      return

    e.stopPropagation()

    boxesRef.current.getMatrixAt(e.instanceId, tmpMatrix)
    tmpMatrix.decompose(tmpObject.position, tmpObject.quaternion, tmpObject.scale)

    const targetPos = new THREE.Vector3()
      .copy(tmpObject.position)
      .add(new THREE.Vector3(0, tmpObject.scale.y / 2, 0))
    const cameraOffset = new THREE.Vector3()
      .copy(controlsRef.current.object.position)
      .sub(controlsRef.current.target)
      .normalize()
      .multiplyScalar(maxBoxHeight * 2)
    const newCameraPos = new THREE.Vector3()
      .copy(targetPos)
      .add(cameraOffset)
    
    controlsRef.current.target.copy(targetPos)
    controlsRef.current.object.position.copy(newCameraPos)
  }

  return (
    <>
      <instancedMesh
        ref={boxesRef}
        args={[undefined, undefined, amount]}
        onDoubleClick={onClick}
      >
        <LowerPartGeometry />
        <meshStandardMaterial />
      </instancedMesh>

      <instancedMesh
        ref={planesRef}
        args={[undefined, undefined, amount]}
        onDoubleClick={onClick}
      >
        <UpperPartGeometry />
        <meshStandardMaterial />
      </instancedMesh>
    </>
  )
}


export default Boxes
