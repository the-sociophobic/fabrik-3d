import React, { useEffect } from 'react'

const TestHTML = ({ onLoad }: { onLoad?: () => void }) => {
  const [scale, setScale] = React.useState(100)
  const [enlarge, setEnlarge] = React.useState(1)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scale > 200)
        setEnlarge(-1)
      if (scale < 100)
        setEnlarge(1)

      setScale(scale * (1 + enlarge * .01))
      onLoad?.()
    }, 100)

    return () => clearInterval(intervalId)
  }, [scale])

  return (
    <>
      <div style={{
        width: 53,
        height: 53,
        backgroundColor: 'red'
      }} />
      <div style={{
        width: 53,
        height: 53,
        backgroundColor: 'green'
      }} />
      <button style={{
        width: `${scale}px`,
        height: `${scale}px`,
        backgroundColor: 'blue',
        cursor: 'pointer'
      }}>
        test
      </button>
      {/* <iframe
      src={'kiss-graph.com'}
      style={{
        width: '100%',
        height: '100%',
      }}
    /> */}
    </>
  )
}


export default TestHTML
