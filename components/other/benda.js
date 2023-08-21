"use client"

import { useEffect, useMemo, useRef } from "react"
import { Box, Capsule, useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, quat, vec3 } from "@react-three/rapier"
import { Quaternion, Vector3, Object3D, Matrix4 } from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { useXR } from "@react-three/xr"

function Boxes() {
  return (
    <Box args={[0.5, 0.5, 0.5]}>
      <meshBasicMaterial color="brown" />
    </Box>
  )
}

function Char() {
  // Refs
  const charRef = useRef()

  // Vector direction
  const vectorMovement = useMemo(() => new Vector3(), [])
  const camQunion = useMemo(() => new Quaternion(), [])

  // Keyboard controls
  const [, getKey] = useKeyboardControls()

  // Three
  const three = useThree()

  // XR hooks
  const { session, player } = useXR()

  // Effect
  useEffect(() => {
    console.log("mount")
    return () => {
      console.log("unmount")
    }
  }, [])

  // Animation frame
  useFrame((state, delta) => {
    const { forward, backward, left, right } = getKey()
    const charPos = vec3(charRef.current.translation())
    const charVel = vec3(charRef.current.linvel())
    const charRot = quat(charRef.current.rotation())
    const offsetCam = new Vector3(0, 0.5, 1)
    const offsetVr = new Vector3(0, 0.2, 1)
    let camRot = state.camera.quaternion

    if (session) {
      camRot = camQunion.setFromRotationMatrix(state.camera.matrixWorld)
      offsetVr.applyQuaternion(charRot)
      offsetVr.add(charPos)
      player.position.copy(offsetVr)
    } else {
      // Camera movement
      offsetCam.applyQuaternion(charRot)
      offsetCam.add(charPos)
      state.camera.position.copy(offsetCam)
    }

    // Movement
    vectorMovement.set(right - left, 0, backward - forward).multiplyScalar(delta * 5).normalize()
    vectorMovement.applyQuaternion(charRot)
    charRef.current.setRotation(quat({ ...charRot, y: camRot.y, w: camRot.w }))
    charRef.current.setLinvel({ ...vectorMovement, y: charVel.y }, true)
  })

  return (
    <RigidBody ref={charRef} colliders={false} type="dynamic" mass={30} friction={0.1} position={[0, 2, 0]} enabledRotations={[false, true, false]}>
      <CapsuleCollider args={[0.13, 0.1]} />
      <Capsule args={[0.1, 0.2]}>
        <meshBasicMaterial color="orange" />
      </Capsule>
    </RigidBody>
  )
}

export {
  Boxes,
  Char,
}