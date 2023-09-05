"use client"

import { PerspectiveCamera, PointerLockControls, Preload } from '@react-three/drei'
import { Suspense } from 'react'

export default function Contents() {
  return (
    <Suspense fallback={null}>
      <PointerLockControls />
      <PerspectiveCamera makeDefault position={[0, 0.3, 2]} />
      <mesh onClick={() => console.log('clicked')}>
        <sphereGeometry args={[0.3]} />
        <meshBasicMaterial color="orange" />
      </mesh>
      <Preload all />
    </Suspense>
  )
}