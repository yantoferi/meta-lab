"use client"

import { Preload } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { gate } from "../utils/tunnel"

export default function Scene(props) {
  return (
    <Canvas shadows style={props.style} eventSource={props.source} eventPrefix="client">
      <gate.Out />
      <Preload all />
    </Canvas>
  )
}