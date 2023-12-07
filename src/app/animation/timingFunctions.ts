export type TimingFnType = (t: number, k?: number) => number

export type TimingFnName = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' |
'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' |
'easeIn' | 'easeOut' | 'easeInOut' | 'easeIn2' | 'easeOut2' | 'easeInOut2'


const timingFns: {
  [key in TimingFnName]: TimingFnType
} = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < .5 ? 2 * (t ** 2) : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1-(--t) * t * t * t,
  easeInOutQuart: (t: number) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  
  easeIn: (t: number, k: number = 1) => (t ** k),
  easeOut: (t: number, k: number = 1) => 1 - timingFns['easeIn'](1 - t, k),
  easeInOut: (t: number, k: number = 1) => t < .5 ?
    timingFns['easeIn'](t * 2, k) / 2
    :
    1 - timingFns['easeIn']((1 - t) * 2, k) / 2,
  
  easeIn2: (t: number) => timingFns['easeIn'](t, 1.5),
  easeOut2: (t: number) => timingFns['easeOut'](t, 1.5),
  easeInOut2: (t: number) => timingFns['easeInOut'](t, 1.5),  
}


export default timingFns
