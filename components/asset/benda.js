"use client"

import { useRef, useState } from 'react'
import { Box, Sphere } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

function Boxes(props) {
  return (
    <Box args={[1, 1, 1]} position={[...props.position]}>
      <meshBasicMaterial color="blue" />
    </Box>
  )
}

function Ball() {
  const targetRef = useRef(null)

  const [getObject, setGetObject] = useState(null)
  console.log(getObject)

  const putObject = (event) => {
    if (event.distance >= 2.0) {return;}
    if (getObject) {
      setGetObject(null)
    } else {
      setGetObject(event)
    }
  }

  return (
    <RigidBody colliders="ball" type='dynamic' position={[0, 1, 0]}>
      <Sphere args={[0.3]} onClick={putObject}>
        <meshBasicMaterial color="brown" />
      </Sphere>
    </RigidBody>
  )
}

export {
  Boxes,
  Ball,
}