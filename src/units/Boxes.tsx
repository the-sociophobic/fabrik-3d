import { useRef, useEffect } from 'react'
import * as THREE from 'three'


const NUMBER_OF_BOXES = 10000
const BOX_SIZE_VARIANCE = 6
const SPHERE_RADIUS = 195

const tmpObject = new THREE.Object3D()
const tmpColor = new THREE.Color()

const calcNumberOfLayers = (R: number, distance: number) =>
  Math.round(R * 2 / distance)
const calcSectionRadius = (R: number, top_offset: number) =>
  Math.sqrt(R ** 2 - (top_offset - R) ** 2)


function Boxes() {
  const boxesRef = useRef<THREE.InstancedMesh>(null)
  const planesRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    if (boxesRef.current && planesRef.current) {
      const sphere_volume = 4 / 3 * Math.PI * (SPHERE_RADIUS ** 3)
      const boxes_distance = (sphere_volume / NUMBER_OF_BOXES) ** (1 / 3)
      const boxes_random_offset = boxes_distance / 3
      const box_size = boxes_distance / 5
      const number_of_Z_sections = calcNumberOfLayers(SPHERE_RADIUS, boxes_distance)

      for (let current_Z_section = 0, currentBox = 0; current_Z_section < number_of_Z_sections; current_Z_section++) {
        const current_Z_coord = current_Z_section * boxes_distance
        const current_Z_section_radius = calcSectionRadius(SPHERE_RADIUS, current_Z_coord)
        const number_of_Y_rows = calcNumberOfLayers(current_Z_section_radius, boxes_distance)

        for (let current_Y_row = 0; current_Y_row < number_of_Y_rows; current_Y_row++) {
          const current_Y_coord = current_Y_row * boxes_distance
          const current_Y_row_length = calcSectionRadius(current_Z_section_radius, current_Y_coord)
          const number_of_X_items = calcNumberOfLayers(current_Y_row_length, boxes_distance)

          for (let current_X_item = 0; current_X_item < number_of_X_items; current_X_item++) {
            const current_X_coord = current_X_item * boxes_distance

            tmpObject.position.set(
              current_X_coord - current_Y_row_length     + (Math.random() - .5) * boxes_random_offset,
              current_Y_coord - current_Z_section_radius + (Math.random() - .5) * boxes_random_offset,
              current_Z_coord - SPHERE_RADIUS            + (Math.random() - .5) * boxes_random_offset
            )
            tmpObject.scale.set(box_size, box_size * (1 + Math.random() * (BOX_SIZE_VARIANCE - 1)), box_size)
            tmpObject.updateMatrix()
            boxesRef.current.setMatrixAt(currentBox, tmpObject.matrix)
            planesRef.current.setMatrixAt(currentBox, tmpObject.matrix)

            tmpColor.set(
              Math.random() * 1,
              Math.random() * 1,
              Math.random() * 1
            )
            boxesRef.current.setColorAt(currentBox, tmpColor)
            tmpColor.set(1, 1, 1)
            planesRef.current.setColorAt(currentBox, tmpColor)

            currentBox++

            if (currentBox >= NUMBER_OF_BOXES)
              break
          }
          if (currentBox >= NUMBER_OF_BOXES)
            break
        }
        if (currentBox >= NUMBER_OF_BOXES)
          break
      }
      boxesRef.current.instanceMatrix.needsUpdate = true
      if (boxesRef.current.instanceColor)
        boxesRef.current.instanceColor.needsUpdate = true
    }
  }, [boxesRef.current, planesRef.current])

  return (
    <>
      <instancedMesh
        ref={boxesRef}
        args={[undefined, undefined, NUMBER_OF_BOXES]}
        onClick={e => console.log(e)}
      >
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            array={new Float32Array([
               .5,  .5,  .5,
               .5,  .5, -.5,
              -.5,  .5, -.5,
              -.5,  .5,  .5,
               .5, -.5,  .5,
               .5, -.5, -.5,
              -.5, -.5, -.5,
              -.5, -.5,  .5,
            ])}
            count={8}
            itemSize={3}
          />
          <bufferAttribute
            attach='index'
            array={new Uint16Array([
              0, 4, 5,
              0, 5, 1,
              1, 5, 6,
              1, 6, 2,
              2, 6, 7,
              2, 7, 3,
              3, 7, 0,
              7, 4, 0,
              4, 6, 5,
              4, 7, 6,
            ])}
            count={30}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial />
      </instancedMesh>

      <instancedMesh
        ref={planesRef}
        args={[undefined, undefined, NUMBER_OF_BOXES]}
        onClick={e => console.log(e)}
      >
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            array={new Float32Array([
               .5, .5,  .5,
               .5, .5, -.5,
              -.5, .5, -.5,
              -.5, .5,  .5,
            ])}
            count={4}
            itemSize={3}
          />
          <bufferAttribute
            attach='index'
            array={new Uint16Array([
              0, 1, 2,
              0, 2, 3
            ])}
            count={6}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial />
      </instancedMesh>
    </>
  )
}


export default Boxes
