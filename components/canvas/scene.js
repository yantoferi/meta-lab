"use client"

import { Canvas } from '@react-three/fiber'
import { gate } from '../utils/tunnel'
import { Preload } from '@react-three/drei'

export default function Scene(props) {
  return (
    <Canvas
      camera={{position: [0, -0.3, 1]}}
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
      }}
      eventSource={props.source}
    >
      <gate.Out />
      <Preload all />
    </Canvas>
  )
}