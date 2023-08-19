"use client"

import { Suspense } from "react"
import { Plane } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { Controllers, VRButton } from "@react-three/xr"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const Views = dynamic(() => import("@/components/canvas/view").then(mod => mod.Views), { ssr: false })
const Char = dynamic(() => import("@/components/other/benda").then(mod => mod.Char), { ssr: false })

export default function Tutorial() {
  // Params
  const params = useSearchParams().get("mode")

  return (
    <>
      {params == "vr" && <VRButton />}
      <Views className="w-full h-full" fpsActive={params === "fps" ? true : false}>
        <Suspense fallback={null}>
          <Controllers rayMaterial="red" />
          <Physics debug>
            <Char />
            <RigidBody colliders="hull" type="fixed">
              <Plane args={[20, 20]} rotation-x={-Math.PI / 2}>
                <meshBasicMaterial color="grey" />
              </Plane>
            </RigidBody>
          </Physics>
        </Suspense>
      </Views>
    </>
  )
}