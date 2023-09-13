"use client"

import dynamic from 'next/dynamic'
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { Suspense } from 'react'
import Wrapping from '@/components/canvas/wrap'
import { Controllers } from '@react-three/xr'
import Experices from './experiences'

const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam))
const Arrow = dynamic(() => import("@/components/asset/arrow").then(mod => mod.Arrow))
const Room = dynamic(() => import("@/components/asset/room").then(mod => mod.Room))
const TrainLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.TrainLight))

export default function Contents(props) {
  return (
    <Suspense fallback={null}>
      {props.fps && <PointerLockControls selector='#startfps' />}
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <TrainLight />
      <Wrapping usePhysic={props.physic}>
        {props.vr && <Controllers rayMaterial="red" />}
        {arrowPosition.map((item, id) => (
          <Arrow key={id} identity={id} position={[item.x, item.y, item.z]} hitPortal={props.hitPortal} />
        ))}
        <Room />
        <Adam step={props.step} modalOpen={props.isModalOpen} />
        <Experices fps={props.fps} />
      </Wrapping>
    </Suspense>
  )
}

const arrowPosition = [
  {
    x: -4.5,
    y: -2.8,
    z: -14,
  },
  {
    x: 4.5,
    y: -2.8,
    z: -14,
  },
  {
    x: -4.5,
    y: -2.8,
    z: 5,
  },
  {
    x: 4.5,
    y: -2.8,
    z: 5,
  }
]