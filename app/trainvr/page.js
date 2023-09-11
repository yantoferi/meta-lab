"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { VRButton } from '@react-three/xr'
import Contents from '@/components/basic/contents'
import styles from '../app.module.css'
import Modal from '@/components/basic/modal'
import { toast } from 'react-toastify'

const Views = dynamic(() => import("@/components/canvas/views"), {
  loading: () => (
    <div className={styles['custom-loader']}></div>
  )
})

export default function TrainVR() {
  const [step, setStep] = useState([])
  const [gate, setGate] = useState([])
  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    console.log(step)
    console.log(gate)
  })
  useEffect(() => {
    if (step.length === 1) {
      toast.warning('Bergeraklah menuju empat lokasi panah', {autoClose:3000})
    } else if (step.length === 2) {
      toast.warning('Ambil benda bola atau kapsul', {autoClose:3000})
    }
  }, [step])
  useEffect(() => {
    if (gate.length === 4) {
      setOpenModal(true)
    }
  }, [gate])

  const closeModal = () => {
    setOpenModal(false)
    setStep([...step, true])
  }
  const updateGate = value => {
    const exist = gate.includes(value)
    if (!exist) {
      setGate([...gate, value])
    }
  }

  return (
    <>
      <VRButton />
      <Views className="w-full h-full">
        <Contents physic={true} fps={false} vr={true} step={step} hitPortal={updateGate} isModalOpen={openModal} />
      </Views>
      <Modal open={openModal} close={closeModal} />
    </>
  )
}