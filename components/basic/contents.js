"use client"

import dynamic from 'next/dynamic'
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Controllers } from '@react-three/xr'
import Wrapping from '@/components/canvas/wrap'
import Experices from './experiences'

const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam), {ssr: false})
const Arrow = dynamic(() => import("@/components/asset/arrow").then(mod => mod.Arrow), {ssr: false})
const Room = dynamic(() => import("@/components/asset/room").then(mod => mod.Room), {ssr: false})
const TrainLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.TrainLight), {ssr: false})

export default function Contents(props) {
  return (
    <Suspense fallback={null}>
      {props.fps && <PointerLockControls selector='#startfps' onLock={() => props.setLocked(true)} onUnlock={() => props.setLocked(false)} />}
      <PerspectiveCamera makeDefault position={[0, 2, 2]} />
      <TrainLight />
      <Wrapping usePhysic={props.physic}>
        {props.vr && <Controllers rayMaterial="red" />}
        {(props.step.length < 2) && arrowPosition.map((item, id) => (
          <Arrow key={id} identity={id} position={[item.x, item.y, item.z]} hitPortal={props.hitPortal} />
        ))}
        <Room />
        <Adam step={props.step} modalOpen={props.isModalOpen} />
        <Experices step={props.step} />
      </Wrapping>
    </Suspense>
  )
}

const arrowPosition = [
  {
    x: -0.8,
    y: 0.01,
    z: -1.3,
  },
  {
    x: 0.8,
    y: 0.01,
    z: -1.3,
  },
  {
    x: -1,
    y: 0.01,
    z: 2,
  },
  {
    x: 1,
    y: 0.01,
    z: 2,
  }
]