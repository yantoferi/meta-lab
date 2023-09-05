"use client"

import { View } from '@react-three/drei'
import { useRef } from 'react'
import { gate } from '../utils/tunnel'

export default function Views(props) {
  const target = useRef()

  return (
    <>
      <div ref={target} className={props.className} />
      <gate.In>
        <View track={target}>
          {props.children}
        </View>
      </gate.In>
    </>
  )
}