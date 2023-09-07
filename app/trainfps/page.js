"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Button, FpsButton } from '@/components/basic/button'
import Contents from '../../components/basic/contents'
import styles from '../app.module.css'
import Modal from '@/components/basic/modal'

const Views = dynamic(() => import("@/components/canvas/views"), {
  loading: () => (
    <div className={styles['custom-loader']}></div>
  )
})

export default function TrainFps() {
  const [step, setStep] = useState([])
  const [gate, setGate] = useState([])
  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    console.log(step)
    console.log(gate)
  })

  const updateStep = value => {
    setStep([...step, value])
  }
  const closeModal = () => {
    setOpenModal(false)
  }
  const updateGate = value => {
    setGate([...gate, value])
  }

  return (
    <>
      <FpsButton />
      <Views className="w-full h-full">
        <Contents physic={true} fps={true} step={step} gate={gate} intersect={updateGate} />
      </Views>
      <Modal open={openModal} close={closeModal} />
    </>
  )
}