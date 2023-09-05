"use client"

import { KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { XR } from '@react-three/xr'
import { useMemo } from 'react'

export default function Wrapping(props) {
  const mapKeys = useMemo(() => [
    { name: 'forward', keys: ['w'] },
    { name: 'backward', keys: ['s'] },
    { name: 'left', keys: ['a'] },
    { name: 'right', keys: ['d'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['ShiftLeft'] },
    { name: 'action', keys: ['f'] },
  ], [])

  return (
    <XR referenceSpace='local'>
      <KeyboardControls map={mapKeys}>
        {
          props.usePhysic?
          <Physics debug>
            {props.children}
          </Physics>:
          props.children
        }
      </KeyboardControls>
    </XR>
  )
}