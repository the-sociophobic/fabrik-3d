import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { ThreeEvent, useLoader, extend, Object3DNode } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'

import sphericalIterator from './sphericalIterator'
import { LowerPartGeometry, UpperPartGeometry } from './geometries'
import { fragmentShader, vertexShader } from './shaders'


extend({ InstancedUniformsMesh })
declare module '@react-three/fiber' {
  interface ThreeElements {
    instancedUniformsMesh: Object3DNode<InstancedUniformsMesh<any>, typeof InstancedUniformsMesh>
  }
}


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
  const planesRef = useRef<InstancedUniformsMesh<any>>(null)
  const uvOffsets: number[][] = new Array(amount)
    .fill([0, 0]).map((value, i) => {
      const numberOfTile = i % 16

      return [
        numberOfTile % 4 * .25,
        Math.floor(numberOfTile / 4) * .25
      ]
    })

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

          planesRender.setUniformAt('uvOffset', currentBox, new THREE.Vector2(...uvOffsets[currentBox]))
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
        // onDoubleClick={onClick}
      >
        <LowerPartGeometry />
        <meshStandardMaterial />
      </instancedMesh>

      <instancedUniformsMesh
        ref={planesRef}
        args={[new THREE.BufferGeometry(), undefined, amount]}
        onDoubleClick={onClick}
      >
        <UpperPartGeometry />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={{
            texture1: {
              value: useLoader(THREE.TextureLoader, './fabrik-3d/img/texture.png')
            },
            uvOffset: {
              value: [0, 0]
            }
          }}
        />
      </instancedUniformsMesh>
    </>
  )
}


export default Boxes
