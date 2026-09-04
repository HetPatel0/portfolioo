import { useMemo } from 'react'

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface StarLayer {
  shadows: string
  size: number
  dur: string
  color: string
}

function makeLayer(count: number, seed: number, color: string): string {
  const rand = mulberry32(seed)
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    parts.push(`${(rand() * 100).toFixed(2)}vw ${(rand() * 100).toFixed(2)}vh 0 ${color}`)
  }
  return parts.join(',')
}

export default function Starfield() {
  const layers = useMemo<StarLayer[]>(
    () => [
      { shadows: makeLayer(90, 7, '#cdd6ff'), size: 1, dur: '2.8s', color: '#cdd6ff' },
      { shadows: makeLayer(45, 21, '#ffffff'), size: 2, dur: '4.2s', color: '#ffffff' },
      { shadows: makeLayer(18, 42, '#f0c541'), size: 2, dur: '5.6s', color: '#f0c541' },
    ],
    [],
  )
  return (
    <div className="starfield" aria-hidden="true">
      {layers.map((l, i) => (
        <i
          key={i}
          style={{
            width: l.size,
            height: l.size,
            background: l.color,
            boxShadow: l.shadows,
            ['--twinkle-dur' as string]: l.dur,
          }}
        />
      ))}
    </div>
  )
}
