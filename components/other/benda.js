"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Box, Capsule, Sphere, useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import { Vector3, Object3D } from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { Interactive, useXR } from "@react-three/xr"

function Boxes() {
  return (
    <Box args={[0.5, 0.5, 0.5]}>
      <meshBasicMaterial color="brown" />
    </Box>
  )
}

function Target() {
  const parentRef = useRef()

  const [isDynamic, setIsDynamic] = useState(true)

  const { session, controllers } = useXR()

  useFrame(state => {
    const adam = state.scene.getObjectByName('Adam')
    if (session && controllers.length !== 0) {
      const gripPos = controllers[1].grip.matrixWorld
      if (!isDynamic && parentRef.current && parentRef.current.userData.parentType === 'rigid_body') {
        parentRef.current.position.copy(new Vector3().setFromMatrixPosition(gripPos))
        parentRef.current.position.add(new Vector3(0, 0, -0.5))
      }
    } else {
      if (!isDynamic && parentRef.current && parentRef.current.userData.parentType === 'rigid_body') {
        const offset = new Vector3(0, 0.8, -1)
        offset.applyQuaternion(adam.quaternion)
        offset.add(adam.position)
        parentRef.current.position.copy(offset)
      }
    }
  })

  return (
    <Interactive
      onSelectStart={(xrEvent) => { setIsDynamic(false); parentRef.current = xrEvent.intersection?.object.parent }}
      onSelectEnd={() => setIsDynamic(true)}
    >
      <RigidBody colliders="ball" type={isDynamic ? "dynamic" : "kinematicPosition"} mass={10} userData={{ parentType: "rigid_body" }} position={[0, 2, -2]}>
        <Sphere args={[0.15]} onClick={event => {
          setIsDynamic(!isDynamic)
          parentRef.current = event.object.parent
        }}>
          <meshStandardMaterial color="orange" roughness={0.8} />
        </Sphere>
      </RigidBody>
    </Interactive>
  )
}

function Char() {
  // Refs
  const charRef = useRef()

  // Vector direction
  const vectorMovement = useMemo(() => new Vector3(), [])
  const pivot = useMemo(() => new Object3D(), [])

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
    //
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
  Target,
}