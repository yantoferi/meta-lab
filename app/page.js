"use client"

import { PerspectiveCamera } from "@react-three/drei"
import dynamic from "next/dynamic"
import Link from "next/link"

const Views = dynamic(() => import("@/components/canvas/view").then(mod => mod.Views), { ssr: false })
const Boxes = dynamic(() => import("@/components/other/benda").then(mod => mod.Boxes), { ssr: false })

export default function Home() {
  return (
    <div className="w-full">
      <div>
        <Link href={{
          pathname: "/tutorial",
          query: {mode: "fps"},
        }}>Tutorial FPS</Link>
        <Link href={{
          pathname: "/tutorial",
          query: {mode: "vr"},
        }}>Tutorial VR</Link>
      </div>
      <Views className="w-full h-80">
        <PerspectiveCamera makeDefault position={[0, 0.5, 2]} fov={40} />
        <Boxes />
      </Views>
    </div>
  )
}
