"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"

const Scene = dynamic(() => import("../canvas/scene"), { ssr: false })

export default function Template({ children }) {
  const parent = useRef()
  return (
    <div ref={parent} className='w-full h-screen relative'>
      {children}
      <Scene source={parent} style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
      }} />
    </div>
  )
}