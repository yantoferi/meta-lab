"use client"

import dynamic from 'next/dynamic'
import { PerspectiveCamera, Plane, PointerLockControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'
import { DoubleSide } from 'three'
import Wrapping from '@/components/canvas/wrap'
import { Controllers } from '@react-three/xr'

const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam))
const Portal = dynamic(() => import("@/components/asset/portal").then(mod => mod.Portal))
const TrainLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.TrainLight))

export default function Contents(props) {
  return (
    <Suspense fallback={null}>
      {props.fps && <PointerLockControls selector='#startfps' />}
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <TrainLight />
      <Wrapping usePhysic={props.physic}>
        {props.vr && <Controllers rayMaterial="red" />}
        <Adam step={props.step} />
        <Portal gate={props.gate} intersect={props.intersect} />
        <RigidBody colliders="hull" type='fixed'>
          <Plane args={[20, 20]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial color="whitesmoke" side={DoubleSide} />
          </Plane>
        </RigidBody>
      </Wrapping>
    </Suspense>
  )
}