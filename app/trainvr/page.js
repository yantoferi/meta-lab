"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { VRButton } from '@react-three/xr'
import Contents from '@/components/basic/contents'
import styles from '../app.module.css'
import { Button } from '@/components/basic/button'

const Views = dynamic(() => import("@/components/canvas/views"), {
  loading: () => (
    <div className={styles['custom-loader']}></div>
  )
})

export default function TrainVR() {
  const [step, setStep] = useState([])

  useEffect(() => {
    console.log(step)
  })

  const updateStep = value => {
    setStep([...step, value])
  }

  return (
    <>
      <VRButton />
      <Views className="w-full h-full">
        <Contents physic={true} fps={false} vr={true} step={step} />
      </Views>
    </>
  )
}