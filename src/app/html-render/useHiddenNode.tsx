import { useContext, useEffect, useRef } from 'react'

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
      <div style={{
        width: 0,
        height: 0,
        // overflow: 'hidden'
        zIndex: 1000,
        position: 'fixed'
      }}>
        <div
          ref={hiddenSiteRef}
          style={{
            width: '512px',
            height: '512px',
            backgroundColor: 'white'
          }}
        >
          {node}
        </div>
      </div>
    )
    onLoad?.()
  }, [])

  return hiddenSiteRef
}


export default useHiddenNode
