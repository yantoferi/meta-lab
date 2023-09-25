"use client"

import dynamic from 'next/dynamic'
import Simulation from '@/components/basic/simulation'
import { VRButton } from '@react-three/xr'

const Views = dynamic(() => import("@/components/canvas/views"), { ssr: false })

export default function SimulationVR() {
  return (
    <>
      <VRButton />
      <Views className="w-full h-full">
        <Simulation physic={true} vr={true} />
      </Views>
    </>
  )
}