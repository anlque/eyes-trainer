export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function easeInOutSine(t: number) {
  const u = clamp01(t);
  return 0.5 - 0.5 * Math.cos(Math.PI * u);
}

export function pingPong01(phase: number) {
  const cycle = Math.floor(phase);
  const local = phase - cycle;
  return cycle % 2 === 0 ? local : 1 - local;
}

export function wrap01(phase: number) {
  return phase - Math.floor(phase);
}
