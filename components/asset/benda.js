"use client"

import { Box } from '@react-three/drei'

function Boxes(props) {
  return (
    <Box args={[1, 1, 1]} position={[...props.position]}>
      <meshBasicMaterial color="blue" />
    </Box>
  )
}

export {
  Boxes,
}