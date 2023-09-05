"use client"

import Scene from '@/components/canvas/scene'
import { useRef } from 'react'

export default function Template({ children }) {
  const parent = useRef()

  return (
    <div ref={parent} className='w-full h-screen relative bg-white'>
      {children}
      <Scene source={parent} />
    </div>
  )
}