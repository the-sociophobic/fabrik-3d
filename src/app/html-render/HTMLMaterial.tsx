import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { toPixelData } from 'html-to-image'

import useHiddenNode from './useHiddenNode'
import { useFrame } from '@react-three/fiber'


export type HTMLMaterial = {
  width?: number
  height?: number
  children: ReactNode
}


const HTMLMaterial: FC<HTMLMaterial> = ({
  width = 512,
  height = 512,
  children
}) => {
  const siteRef = useHiddenNode({
    node: children,
    onLoad: () => {
    }
  })

  const [texture, setTexture] = useState<THREE.DataTexture | null>(null)

  useFrame(() => {
    if (!siteRef.current)
      return

    toPixelData(siteRef.current)
      .then(async (data) => {
        const _texture = new THREE.DataTexture(data, width, height)
        _texture.wrapS = THREE.RepeatWrapping
        _texture.wrapT = THREE.RepeatWrapping
        _texture.repeat.set(1, 1)
        _texture.needsUpdate = true
        setTexture(_texture)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
  })
  

  return !texture ? <></> : (
    <meshStandardMaterial
      map={texture}
    />
  )
}


export default HTMLMaterial
