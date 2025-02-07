import React, { useContext, useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Camera, Raycaster, Vector2, Vector3 } from 'three'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { useThree } from '@react-three/fiber'
import { debounce } from 'lodash'

import { useVector3Animation } from '../app/animation'
import { HiddenNodesContext } from '../app/html-material/HiddenNodesContext'


export type CameraControlsProps = {
  _ref?: React.RefObject<OrbitControlsType>
}


const raycaster = new Raycaster()

const CameraControls: React.FC<CameraControlsProps> = ({
  // _ref
}) => {
  const controlsRef = useRef<OrbitControlsType>(null)

  // START OF: CAMERA INIT
  useEffect(() => {
    if (controlsRef?.current) {
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.object.position.set(25, 25, 25)
      controlsRef.current.maxPolarAngle = Math.PI / 2 - .1
      controlsRef.current.update()
    }
  }, [controlsRef?.current])
  // END OF: CAMERA INIT

  // START OF: MOVE CAMERA TO BLOCK FUNCTIONALITY
  const { camera } = useThree()
  const positionRef = useRef(camera.position)
  const targetRef = useRef<null | Vector3>(null)
  const {
    play: playPos,
    setTransition: setTransitionPos
  } = useVector3Animation(positionRef)
  const {
    play: playTarget,
    setTransition: setTransitionTarget
  } = useVector3Animation(targetRef)

  useEffect(() => {
    if (!controlsRef.current)
      return

    targetRef.current = controlsRef.current.target
  }, [controlsRef.current])

  const pointer = useRef(new Vector2())
  const onPointerMove = debounce((e: any) => {
    pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.current.y = - (e.clientY / window.innerHeight) * 2 + 1;
  }, 33)

  const { scene } = useThree()
  const moveCameraTo = (e: any) => {
    raycaster.setFromCamera(pointer.current, camera)

    const intersects = raycaster.intersectObjects(scene.children)
    const intersection = intersects.sort((a, b) => a.distance - b.distance)[0]
    const blockPos = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().normalize().multiplyScalar(intersection.distance))
    const animDuration = Math.round(Math.sqrt(intersection.distance / 4) * 250)

    setTransitionPos(blockPos.clone().add(new Vector3(0, 7, .1)), animDuration, 'linear')
    playPos()
    setTransitionTarget(blockPos, animDuration, 'easeIn')
    playTarget()
  }

  const { setTextureOpened } = useContext(HiddenNodesContext)
  const openTexture = () => setTimeout(() => setTextureOpened(true), 500)

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove)

    window.addEventListener('dblclick', moveCameraTo)
    window.addEventListener('dblclick', openTexture)
    // window.addEventListener('dblclick', openTexture)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)

      window.removeEventListener('dblclick', moveCameraTo)
      window.removeEventListener('dblclick', openTexture)
      // window.removeEventListener('dblclick', openTexture)
    }
  }, [])
  // END OF: MOVE CAMERA TO BLOCK FUNCTIONALITY

  return (
    <OrbitControls ref={controlsRef} />
  )
}


export default CameraControls
