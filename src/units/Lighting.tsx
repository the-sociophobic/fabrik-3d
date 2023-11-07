import React from 'react'


const Lighting: React.FC = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, -3]} intensity={55} />
      <pointLight position={[8, 5, -3]} intensity={55} />
      <pointLight position={[8, 5, 3]} intensity={55} />
    </>
  )
}


export default Lighting
