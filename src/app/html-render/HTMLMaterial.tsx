import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { toPixelData } from 'html-to-image'

import useHiddenNode from './useHiddenNode'


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
  const [readyForSnapshot, setReadyForSnapshot] = useState(false)
  const siteRef = useHiddenNode({
    node: children,
    onLoad: () => {
      setTimeout(() => {
        setReadyForSnapshot(true)
      }, 100)
    }
  })
  const [texture, setTexture] = useState<THREE.DataTexture | null>(null)

  useEffect(() => {
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
  }, [readyForSnapshot])

  return !texture ? <></> : (
    <meshStandardMaterial
      map={texture}
    />
  )
}


export default HTMLMaterial
