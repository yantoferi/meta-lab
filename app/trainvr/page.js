"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { BsJoystick } from 'react-icons/bs'
import { VRButton } from '@react-three/xr'
import Contents from '@/components/basic/contents'
import Modal from '@/components/basic/modal'
import { toast } from 'react-toastify'

const Views = dynamic(() => import("@/components/canvas/views"), { ssr: false })

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
      toast.warning('Bergeraklah menuju empat lokasi panah', { autoClose: 3000 })
    } else if (step.length === 2) {
      toast.warning('Ambil benda bola atau kapsul', { autoClose: 3000 })
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
      <Modal open={openModal} close={closeModal} keys={infoKey[step.length]} vrModal={true} />
    </>
  )
}

const infoKey = [
  [
    {
      key: 'L thumbstick',
      ket: 'Untuk bergerak ke depan, samping, dan belakang'
    },
    {
      key: 'B',
      ket: 'Untuk bergerak melompat'
    },
  ],
  [
    {
      key: 'R triger',
      ket: 'Untuk berinteraksi dengan objek'
    },
  ]
]