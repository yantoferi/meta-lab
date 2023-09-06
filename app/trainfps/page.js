"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Button, FpsButton } from '@/components/basic/button'
import Contents from '../../components/basic/contents'
import styles from '../app.module.css'

const Views = dynamic(() => import("@/components/canvas/views"), {
  loading: () => (
    <div className={styles['custom-loader']}></div>
  )
})

export default function TrainFps() {
  const [step, setStep] = useState([])

  useEffect(() => {
    console.log(step)
  })

  const updateStep = value => {
    setStep([...step, value])
  }

  return (
    <>
      <FpsButton />
      <Views className="w-full h-full">
        <Contents physic={true} fps={true} step={step} />
      </Views>
    </>
  )
}