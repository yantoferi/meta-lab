"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { PerspectiveCamera, Plane, OrbitControls } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { DoubleSide } from "three"

// const Adam = dynamic(() => import("@/components/character/adam").then(mod => mod.Adam), { ssr: false })
const Door = dynamic(() => import("@/components/laboratory/Door").then(mod => mod.Door), { ssr: false })
const Lab = dynamic(() => import("@/components/laboratory/Lab").then(mod => mod.Labs), { ssr: false })
const Lighting = dynamic(() => import("@/components/lighting/light").then(mod => mod.TutorLighting), { ssr: false })
const Views = dynamic(() => import("@/components/canvas/view").then(mod => mod.Views), {
  ssr: false,
  loading: () => (
    <h1 className="text-lg text-white">Loading...</h1>
  )
})

const doorLoc = [
  {
    x: [12.8831, 8.92445, 8.08288, 4.12423, 3.28266, -0.675997], // dah bener
    y: [-2.14384],
    z: [0.015]
  },
  {
    x: [-2.10128, 1.85738, 2.69894, 6.6576, 7.49917, 11.4578],
    y: [5.18721],
    z: [0.015]
  },
]

export default function Interface(props) {
  return (
    <Views className="w-full h-full" fps={true}>
      <OrbitControls />
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault fov={30} position={[0, 2, 4]} />
        <Lighting />
        <Lab />
        {
          doorLoc.map(door => (
            door.x.map((item, keyId) => {
              return (
                <Door key={keyId} location={[item, door.z, door.y]} />
              )
            })
          ))
        }
        <Physics debug>
          <RigidBody colliders="hull" type="fixed">
            <Plane args={[20, 20]} rotation-x={-Math.PI / 2} receiveShadow>
              <meshStandardMaterial color="whitesmoke" side={DoubleSide} />
            </Plane>
          </RigidBody>
          {/* <Adam /> */}
        </Physics>
      </Suspense>
    </Views>
  )
}