import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '8-0 — World Cup Draft Game'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A1128 0%, #1E3A8A 50%, #0A1128 100%)',
          color: '#F5F0E1',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 40,
            letterSpacing: 12,
            textTransform: 'uppercase',
            color: '#E8C86A',
            marginBottom: 8,
          }}
        >
          World Cup Draft Game
        </div>
        <div
          style={{
            fontSize: 260,
            fontWeight: 800,
            lineHeight: 1,
            color: '#E8C86A',
          }}
        >
          8-0
        </div>
        <div style={{ fontSize: 44, fontWeight: 600, marginTop: 16 }}>
          Draft legends. Simulate glory.
        </div>
        <div style={{ fontSize: 30, color: '#8B9DC3', marginTop: 24 }}>
          akaran.dev/8-0
        </div>
      </div>
    ),
    { ...size },
  )
}
