import { useContext, useEffect, useRef, cloneElement, FC } from 'react'

import { HiddenNodesContext } from './HiddenNodesContext'


export type useHiddenNodeProps = {
  node: React.ReactNode
  onLoad?: () => void
}


const useHiddenNode = ({
  node,
  onLoad
}: useHiddenNodeProps) => {
  const hiddenSiteRef = useRef(null)
  const { addHiddenNode } = useContext(HiddenNodesContext)

  useEffect(() => {
    addHiddenNode(
      <HiddenNode hiddenSiteRef={hiddenSiteRef}>
        {node}
      </HiddenNode>
    )
  }, [])

  return hiddenSiteRef
}


export type HiddenNodeProps = {
  hiddenSiteRef: any
  children: React.ReactNode
}


const HiddenNode: FC<HiddenNodeProps> = ({
  hiddenSiteRef,
  children
}) => {
  const { textureOpened, setTextureOpened } = useContext(HiddenNodesContext)

  return (
    <div style={textureOpened ? {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      zIndex: 1000,
    } : {
      width: 0,
      height: 0,
      overflow: 'hidden',
      position: 'fixed',
    }
    }>
      <div
        onClick={() => setTextureOpened(false)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          backgroundColor: 'rgba(0, 0, 0, .5)'
        }}
      />
      <div style={{
        overflow: 'hidden',
        width: `${512 / 2}px`,
        height: `${512 / 2}px`,

        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)'
      }}>
        <div
          ref={hiddenSiteRef}
          style={{
            width: '512px',
            height: '512px',
            backgroundColor: 'white'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}


export default useHiddenNode
