import { useRef } from 'react'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

import timingFns, { TimingFnName } from './timingFunctions'
import { clamp } from '../math'


export const useVector3Animation = (
  variable: React.MutableRefObject<Vector3 | null>
) => {
  const state = useRef<'playing' | 'paused'>('paused')
  const initialValue = useRef((variable.current || new Vector3(0, 0, 0)).clone())
  const finalValue = useRef(new Vector3(0, 0, 0))
  const currentValue = variable
  const elapsedTime = useRef(0)
  const duration = useRef(555)
  const easingFn = useRef(timingFns['linear'])

  useFrame((three, delta) => {
    if (state.current === 'paused' || !currentValue.current)
      return

    elapsedTime.current = clamp(elapsedTime.current + delta * 1000, 0, duration.current)

    if (elapsedTime.current === duration.current) {
      state.current = 'paused'
    }

    currentValue.current.copy(
      initialValue.current
        .clone()
        .lerp(
          finalValue.current,
          easingFn.current(elapsedTime.current / duration.current)
        )
    )
  })

  const play = () => {
    if (elapsedTime.current === duration.current)
      elapsedTime.current = 0

    state.current = 'playing'
  }
  const pause = () => {
    state.current = 'paused'
  }
  const stop = () => {
    elapsedTime.current = 0
    initialValue.current.copy(variable.current || new Vector3(0, 0, 0))
    state.current = 'paused'
  }
  const setTransition = (
    _finalValue: Vector3,
    _duration: number,
    easingFnName: TimingFnName = 'linear'  
  ) => {
    initialValue.current.copy(variable.current || new Vector3(0, 0, 0))
    finalValue.current.copy(_finalValue)
    duration.current = _duration
    easingFn.current = timingFns[easingFnName]
    elapsedTime.current = 0
  }

  return ({
    play,
    pause,
    stop,
    setTransition
  })
}
