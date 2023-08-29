"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { PerspectiveCamera } from "@react-three/drei"

const Boxes = dynamic(() => import("@/components/other/benda").then(mod => mod.Boxes), { ssr: false })
const Views = dynamic(() => import("@/components/canvas/view").then(mod => mod.Views), {
  ssr: false,
  loading: () => (
    <h1 className="text-lg text-white">Loading...</h1>
  )
})

export default function Interface() {
  return (
    <Views className="w-full h-3/4">
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault fov={40} position={[0, 0.5, 2]} />
        <Boxes />
      </Suspense>
    </Views>
  )
}