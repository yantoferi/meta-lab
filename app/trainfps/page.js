"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FpsButton } from '@/components/basic/button'
import Contents from '@/components/basic/contents'
import Modal from '@/components/basic/modal'

const Views = dynamic(() => import("@/components/canvas/views"), { ssr: false })

export default function TrainFps() {
  const [step, setStep] = useState([])
  const [gate, setGate] = useState([])
  const [openModal, setOpenModal] = useState(true)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    console.log(step)
    console.log(gate)
  })
  useEffect(() => {
    if (step.length === 1) {
      toast.warning('Bergeraklah menuju empat lokasi panah', { autoClose: 2000 })
    } else if (step.length === 2) {
      toast.warning('Ambil botol dan letakan di meja', { autoClose: 2000 })
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
  const pointerLock = (value) => {
    setIsLocked(value)
  }

  return (
    <>
      {!isLocked && <FpsButton />}
      <Views className="w-full h-full">
        <Contents physic={true} fps={true} step={step} hitPortal={updateGate} isModalOpen={openModal} setLocked={pointerLock} />
      </Views>
      <Modal open={openModal} close={closeModal} keys={infoKey[step.length]} vrModal={false} />
    </>
  )
}

const infoKey = [
  [
    {
      key: 'W',
      ket: 'Untuk bergerak ke depan.'
    },
    {
      key: 'A',
      ket: 'Untuk bergerak kearah kiri.'
    },
    {
      key: 'S',
      ket: 'Untuk bergerak ke belakang.'
    },
    {
      key: 'D',
      ket: 'Untuk bergerak kearah kanan.'
    },
    {
      key: 'Space',
      ket: 'Untuk bergerak melompat.'
    },
  ],
  [
    {
      key: 'L click',
      ket: 'Untuk interaksi pada objek.'
    },
  ],
]