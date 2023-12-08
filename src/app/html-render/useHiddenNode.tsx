import { useContext, useEffect, useRef, cloneElement } from 'react'

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
        // width: 0,
        // height: 0,
        overflow: 'hidden',
        width: `${512 / 2}px`,
        height: `${512 / 2}px`,

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
          {cloneElement(node as any, { onLoad })}
        </div>
      </div>
    )
    // onLoad?.()
  }, [])

  return hiddenSiteRef
}


export default useHiddenNode
