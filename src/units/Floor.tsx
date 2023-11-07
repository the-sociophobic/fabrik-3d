import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'


const Floor = () => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    meshRef.current.rotation.x = -Math.PI / 2
  }, [meshRef.current])

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={1000}
    >
      <planeGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'gray'} />
    </mesh>
  )
}


export default Floor
