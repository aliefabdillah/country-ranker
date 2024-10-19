export function randomRGB() {
  const r = () => (Math.random() * 256) >> 0;
  return `rgb(${r()}, ${r()}, ${r()})`;
}

export function hash(s: string) {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}
