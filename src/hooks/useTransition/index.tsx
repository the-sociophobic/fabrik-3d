import { useState } from 'react'
import { useFrame } from '@react-three/fiber'

import timingFuntions from './timingFunctions'


export type TransitionType = {
  id: number
  variable: any
  value: any
  initialValue: any
  numberOfFrames: number
  currentFrame: number
  timingFuntion: string
  onComplete?: () => void,
}


const useTransitions = () => {
  const [transitions, setTransitions] = useState<TransitionType[]>([])
  const [currentId, setCurrentId] = useState(0)

  const animateTransitions = () => {
    let unregisteredTransitions: TransitionType[] = []

    transitions.forEach((transition, index) => {
      const _transition = {...transition}

      if (_transition.currentFrame >= _transition.numberOfFrames)
        unregisteredTransitions.push(_transition)
      else {
        const alpha = _transition.currentFrame / _transition.numberOfFrames
        const timingFuntion = timingFuntions[_transition.timingFuntion] || ((t: number) => t)

        _transition.variable.copy(_transition.initialValue
          .clone()
          .lerp(_transition.value, timingFuntion(alpha)))

        _transition.currentFrame++
      }

      setTransitions([
        ...transitions.slice(0, index),
        _transition,
        ...transitions.slice(index + 1),
      ])
    })

    unregisteredTransitions.forEach(transitionToUnregister => {
      transitionToUnregister.onComplete?.()
      unregisterTransition(transitionToUnregister.id)
    })
  }

  const registerTransition = (props: { variable: any, value: any, numberOfFrames: number, timingFuntion: string, onComplete?: () => void }) => {
    const _currentId = (currentId + 1) % Number.MAX_SAFE_INTEGER

    setCurrentId(_currentId)

    setTransitions([
      ...transitions,
      {
        id: _currentId,
        variable: props.variable,
        value: props.value.clone(),
        initialValue: props.variable.clone(),
        numberOfFrames: props.numberOfFrames || 10,
        currentFrame: 0,
        timingFuntion: props.timingFuntion || 'none',
        onComplete: props.onComplete || (() => {}),
      }
    ])

    return _currentId
  }

  const unregisterTransition = (transitionId: number) => {
    const transitionIndex = transitions
      .map(transition => transition.id)
      .indexOf(transitionId)

    if (transitionIndex !== -1)
      setTransitions([
        ...transitions.slice(0, transitionIndex),
        ...transitions.slice(transitionIndex + 1),
      ])
  }

  const unregisterAllTransitions = () => setTransitions([])

  useFrame(animateTransitions)
  
  return [
    registerTransition,
  ]
}


export default useTransitions
