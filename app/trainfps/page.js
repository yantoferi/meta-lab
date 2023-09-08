"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FpsButton } from '@/components/basic/button'
import Contents from '../../components/basic/contents'
import styles from '../app.module.css'
import Modal from '@/components/basic/modal'
import { toast } from 'react-toastify'

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
  useEffect(() => {
    if (gate.length === 5) {
      toast.success('complete', {autoClose:3000})
    } else if (gate.length > 0) {
      toast.dismiss()
      toast.info(`you hit ${gate.length} portal`, {autoClose:3000})
    }
  }, [gate])

  const closeModal = () => {
    setOpenModal(false)
    setStep([...step, true])
    toast.success('Hit 5 portal', {autoClose:3000})
  }
  const updateGate = () => {
    if (gate.length <= 5) {
      setGate([...gate, true])
    }
  }

  return (
    <>
      <FpsButton />
      <Views className="w-full h-full">
        <Contents physic={true} fps={true} step={step} hitPortal={updateGate} />
      </Views>
      <Modal open={openModal} close={closeModal} />
    </>
  )
}