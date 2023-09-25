"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { PointerLockControls, PerspectiveCamera, Plane} from '@react-three/drei'
import { Controllers } from '@react-three/xr'
import Wrapping from '@/components/canvas/wrap'
import { RigidBody } from '@react-three/rapier'

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
      <Wrapping usePhysic={props.physic}>
        {props.vr && <Controllers rayMaterial="red" />}
        <RigidBody colliders="hull" type="fixed">
          <Plane args={[10, 10]} rotation-x={-Math.PI / 2}>
            <meshBasicMaterial color="whitesmoke" />
          </Plane>
        </RigidBody>
        <Stair />
        <Adam />
      </Wrapping>
    </Suspense>
  )
}