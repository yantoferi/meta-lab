"use client"

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
  return (
    <RigidBody colliders="ball" type='dynamic' position={[0, 0.5, -5]}>
      <Sphere args={[0.3]}>
        <meshBasicMaterial color="brown" />
      </Sphere>
    </RigidBody>
  )
}

export {
  Boxes,
  Ball,
}