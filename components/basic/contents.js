"use client"

import dynamic from 'next/dynamic'
import { OrbitControls, PerspectiveCamera, Plane, PointerLockControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'
import { DoubleSide } from 'three'
import Wrapping from '@/components/canvas/wrap'
import { Controllers } from '@react-three/xr'

const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam))
const SmallPortal = dynamic(() => import("@/components/asset/circleportal").then(mod => mod.SmallPortal))
const TrainLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.TrainLight))

export default function Contents(props) {
  return (
    <Suspense fallback={null}>
      {/* {props.fps && <PointerLockControls selector='#startfps' />} */}
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <TrainLight />
      <Wrapping usePhysic={props.physic}>
        {props.vr && <Controllers rayMaterial="red" />}
        <SmallPortal hitPortal={props.hitPortal} />
        <Adam step={props.step} />
        <RigidBody colliders="hull" type='fixed'>
          <Plane args={[20, 20]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial color="whitesmoke" side={DoubleSide} />
          </Plane>
        </RigidBody>
      </Wrapping>
    </Suspense>
  )
}