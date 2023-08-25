"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"

const Scene = dynamic(() => import("../canvas/scene"), { ssr: false })

export default function Template({ children }) {
  const parent = useRef()
  return (
    <div ref={parent} className='w-full h-screen relative touch-auto'>
      {children}
      <Scene source={parent} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }} />
    </div>
  )
}