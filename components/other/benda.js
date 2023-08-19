"use client"

import { useEffect, useMemo, useRef } from "react"
import { Box, Capsule, useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, quat, vec3 } from "@react-three/rapier"
import { Quaternion, Vector3 } from "three"
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
  const vrCamQuaternion = useMemo(() => new Quaternion(), [])

  // Keyboard controls
  const [, getKey] = useKeyboardControls()

  // Three
  const three = useThree()

  // XR
  const { session, player } = useXR()

  // Effect
  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  }, [])

  // Animation frame
  useFrame((state, delta) => {
    const { forward, backward, left, right, jump } = getKey()
    const offsetCam = new Vector3(0, 0.7, 1)
    const rotate = quat(charRef.current.rotation())
    const position = vec3(charRef.current.translation())
    const velocity = vec3(charRef.current.linvel())
    let camRotate = state.camera.quaternion

    if (session) {
      camRotate = vrCamQuaternion.setFromRotationMatrix(state.camera.matrixWorld)
      offsetCam.applyQuaternion(rotate)
      offsetCam.add(position)

      player.position.copy(offsetCam)
    } else {
      //     // vectorMovement.set(right - left, 0, backward - forward).multiplyScalar(delta * 5).normalize()
      //     // vectorMovement.applyQuaternion(rotate)
      offsetCam.applyQuaternion(rotate)
      offsetCam.add(position)

      state.camera.position.copy(offsetCam)
      //     // if (session) {
      //     //   camRotate = vrCamQuaternion.setFromRotationMatrix(state.camera.matrixWorld)
      //     // }
      //     // charRef.current.setRotation(quat({...rotate, y: camRotate.y, w: camRotate.w}))
      //     // charRef.current.setLinvel({ ...vectorMovement, y: velocity.y }, true)
    }
    vectorMovement.set(right - left, 0, backward - forward).multiplyScalar(delta * 5).normalize()
    vectorMovement.applyQuaternion(rotate)
    charRef.current.setRotation(quat({ ...rotate, y: camRotate.y, w: camRotate.w }))
    charRef.current.setLinvel({ ...vectorMovement, y: velocity.y }, true)
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

function CharFps() {
  // Refs
  const charRef = useRef()

  // Vector direction
  const vectorMovement = useMemo(() => new Vector3(), [])

  // Keyboard controls
  const [, getKey] = useKeyboardControls()

  // Effect
  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  }, [])

  // Animation frame
  // useFrame((state, delta) => {
  //   const sessionEnd = session.end()
  //   sessionEnd.then(res => console.log(res))
  // })

  return (
    <>
      <RigidBody ref={charRef} colliders={false} type="dynamic" mass={30} friction={0.1} position={[0, 2, 0]} enabledRotations={[false, true, false]}>
        <CapsuleCollider args={[0.13, 0.1]} />
        <Capsule args={[0.1, 0.2]}>
          <meshBasicMaterial color="orange" />
        </Capsule>
      </RigidBody>
    </>
  )
}

export {
  Boxes,
  Char,
  CharFps,
}