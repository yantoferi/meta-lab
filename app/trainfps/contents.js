"use client"

import dynamic from 'next/dynamic'
import { OrbitControls, PerspectiveCamera, Plane, PointerLockControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'
import { DoubleSide } from 'three'
import Wrapping from '@/components/canvas/wrap'

const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam))
// const Portal = dynamic(() => import("@/components/asset/portal").then(mod => mod.Portal))
const TrainLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.TrainLight))

export default function Contents() {
  return (
    <Suspense fallback={null}>
      {/* <PointerLockControls /> */}
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <TrainLight />
      <Wrapping usePhysic={true}>
        <Adam />
        <RigidBody colliders="hull" type='fixed'>
          <Plane args={[20, 20]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial color="whitesmoke" side={DoubleSide} />
          </Plane>
        </RigidBody>
      </Wrapping>
    </Suspense>
  )
}