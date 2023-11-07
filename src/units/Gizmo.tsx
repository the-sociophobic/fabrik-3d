import { GizmoHelper, GizmoViewport } from '@react-three/drei'
import React from 'react'


const Gizmo: React.FC = () => {
  return (
    <GizmoHelper
      alignment='bottom-right'
      margin={[80, 80]}
    >
      <GizmoViewport
        axisColors={['red', 'green', 'blue']}
        labelColor='black'
      />
    </GizmoHelper>
  )
}


export default Gizmo
