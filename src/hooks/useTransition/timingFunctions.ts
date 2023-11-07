let fns: any = {}

fns.linear = (t: number) => t
fns.easeInQuad = (t: number) => t * t
fns.easeOutQuad = (t: number) => t * (2 - t)
fns.easeInOutQuad = (t: number) => t < .5 ? 2 * (t ** 2) : -1 + (4 - 2 * t) * t
fns.easeInCubic = (t: number) => t * t * t
fns.easeOutCubic = (t: number) => (--t) * t * t + 1
fns.easeInOutCubic = (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
fns.easeInQuart = (t: number) => t * t * t * t
fns.easeOutQuart = (t: number) => 1-(--t) * t * t * t
fns.easeInOutQuart = (t: number) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
fns.easeInQuint = (t: number) => t * t * t * t * t
fns.easeOutQuint = (t: number) => 1 + (--t) * t * t * t * t
fns.easeInOutQuint = (t: number) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t

fns.easeIn = (t: number, k: number) => (t ** k)
fns.easeOut = (t: number, k: number) => 1 - fns.easeIn(1 - t, k)
fns.easeInOut = (t: number, k: number) => t < .5 ?
  fns.easeIn(t * 2, k) / 2
  :
  1 - fns.easeIn((1 - t) * 2, k) / 2

fns.easeIn2 = (t: number) => fns.easeIn(t, 1.5)
fns.easeOut2 = (t: number) => fns.easeOut(t, 1.5)
fns.easeInOut2 = (t: number) => fns.easeInOut(t, 1.5)


export default fns
