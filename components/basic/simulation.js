"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { PointerLockControls, PerspectiveCamera, Environment} from '@react-three/drei'
import { Controllers } from '@react-three/xr'
import Wrapping from '@/components/canvas/wrap'

const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam), { ssr: false })
const Labs = dynamic(() => import("../asset/labs").then(mod => mod.Labs), { ssr: false })
const Labter = dynamic(() => import("../asset/labter").then(mod => mod.Labter), { ssr: false })
const SimulateLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.SimulationLight), { ssr: false })
const Stair = dynamic(() => import("@/components/asset/stair").then(mod => mod.Stair), { ssr: false })
const Tables = dynamic(() => import("@/components/asset/tables").then(mod => mod.Tables), { ssr: false })
const SmartTV = dynamic(() => import("@/components/asset/tv").then(mod => mod.SmartTV), { ssr: false })

export default function Simulation(props) {
  return (
    <Suspense fallback={null}>
      {props.fps && <PointerLockControls selector='#startfps' />}
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <SimulateLight />
      <Environment files="hdr/cloudy.hdr" background />
      <Wrapping usePhysic={props.physic}>
        {props.vr && <Controllers rayMaterial="red" />}
        <Labter />
        <Labs />
        <Stair />
        <Adam />
      </Wrapping>
    </Suspense>
  )
}