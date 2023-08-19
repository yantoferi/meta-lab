"use client"

import { Preload } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { gate } from "../utils/tunnel"

export default function Scene(props) {
  return (
    <Canvas camera={{ position: [0, 2, 4], fov: 40 }} shadows style={props.style} eventSource={props.source}>
      <gate.Out />
      <Preload all />
    </Canvas>
  )
}