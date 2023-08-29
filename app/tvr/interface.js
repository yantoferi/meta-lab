"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Plane, PerspectiveCamera, Environment } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { DoubleSide } from "three"
import { VRButton, Controllers } from "@react-three/xr"
import { Adam } from "@/components/character/adam"

const Lighting = dynamic(() => import("@/components/lighting/light").then(mod => mod.TutorLighting), { ssr: false })
const Target = dynamic(() => import("@/components/other/benda").then(mod => mod.Target), { ssr: false })
const Views = dynamic(() => import("@/components/canvas/view"), {
  ssr: false,
  loading: () => (
    <h1 className="text-lg text-white">Loading...</h1>
  )
})

export default function Interface(props) {
  return (
    <>
      <VRButton />
      <Views className="w-full h-full">
        <Suspense fallback={null}>
          <Physics debug>
            <Adam />
            <Target />
            <RigidBody colliders="hull" type="fixed">
              <Plane args={[20, 20]} rotation-x={-Math.PI / 2} receiveShadow onClick={() => console.log("clicked")}>
                <meshStandardMaterial color="whitesmoke" side={DoubleSide} />
              </Plane>
            </RigidBody>
          </Physics>
          <Environment files="hdr/cloudy.hdr" background />
          <Controllers rayMaterial="orange" />
          <Lighting />
          <PerspectiveCamera position={[0, 2, 4]} fov={40} makeDefault />
        </Suspense>
      </Views>
    </>
  )
}