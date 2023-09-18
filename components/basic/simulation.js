"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { PointerLockControls, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Controllers } from '@react-three/xr'
import Wrapping from '@/components/canvas/wrap'

const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam), { ssr: false })
const Labs = dynamic(() => import("../asset/Labs").then(mod => mod.Labs), {ssr: false})
const Labter = dynamic(() => import("../asset/Labter").then(mod => mod.Labter), {ssr: false})
const SimulateLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.SimulationLight), {ssr: false})

export default function Simulation(props) {
  return (
    <Suspense fallback={null}>
      {/* {props.fps && <PointerLockControls selector='#startfps' />} */}
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <SimulateLight />
      <Wrapping usePhysic={props.physic}>
        {props.vr && <Controllers rayMaterial="red" />}
        <Labs />
        <Labter />
        <Adam />
      </Wrapping>
    </Suspense>
  )
}