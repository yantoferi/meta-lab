"use client"

import dynamic from 'next/dynamic'
import { FpsButton } from '@/components/basic/button'
import Simulation from '@/components/basic/simulation'

const Views = dynamic(() => import("@/components/canvas/views"), { ssr: false })

export default function SimulationFPS() {
  return (
    <>
      <FpsButton />
      <Views className="w-full h-full">
        <Simulation physic={true} fps={true} />
      </Views>
    </>
  )
}