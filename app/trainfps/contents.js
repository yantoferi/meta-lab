"use client"

import dynamic from 'next/dynamic'
import { PerspectiveCamera, Plane, PointerLockControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'
import { DoubleSide } from 'three'

const Adam = dynamic(() => import("@/components/character/Adam").then(mod => mod.Adam))
const TrainLight = dynamic(() => import("@/components/lighting/light").then(mod => mod.TrainLight))
const Wrapping = dynamic(() => import("@/components/canvas/wrap"))

export default function Contents() {
  return (
    <Suspense fallback={null}>
      <PointerLockControls />
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <TrainLight />
      <Wrapping usePhysic={true}>
        <Adam />
        <RigidBody colliders="hull" type='fixed'>
          <Plane args={[20, 20]} rotation-x={-Math.PI / 2} onClick={() => console.log("clicked")} receiveShadow>
            <meshStandardMaterial color="whitesmoke" side={DoubleSide} />
          </Plane>
        </RigidBody>
      </Wrapping>
    </Suspense>
  )
}