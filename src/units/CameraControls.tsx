import React, { useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'


export type CameraControlsProps = {
  _ref?: React.RefObject<OrbitControlsType>
}


const CameraControls: React.FC<CameraControlsProps> = ({
  _ref
}) => {
  useEffect(() => {
    if (_ref?.current) {
      _ref.current.target.set(0, 0, 0)
      _ref.current.object.position.set(55, 55, 55)
      _ref.current.maxPolarAngle = Math.PI / 2 - .1
      _ref.current.update()
    }
  }, [_ref?.current])

  return (
    <OrbitControls ref={_ref} />
  )
}


export default CameraControls
