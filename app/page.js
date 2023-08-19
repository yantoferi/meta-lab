"use client"

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
        <Boxes />
      </Views>
    </div>
  )
}
