/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ../assets/adam.glb --transform --shadows 
Files: ../assets/adam.glb [36.13MB] > adam-transformed.glb [2.25MB] (94%)
*/

import { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, quat, useRapier, vec3 } from '@react-three/rapier'
import { Vector3 } from 'three'
import { useController, useXR } from '@react-three/xr'
import { Ray } from '@dimforge/rapier3d-compat'

const charRotate = quat()
const rayDirection = vec3()
const vectorMovement = new Vector3()

export function Adam(props) {
  // Refs
  const group = useRef()
  const adam = useRef()
  const colliderRef = useRef()

  // useGLTF hooks
  const { nodes, materials, animations } = useGLTF('models/Adam-transformed.glb')
  const { actions } = useAnimations(animations, group)

  // State
  const [pose, setPose] = useState("Idle")
  const [canJump, setCanJump] = useState(true)

  // Keyboard controls
  const [subKey, getKey] = useKeyboardControls()

  // XR
  const { session, player, controllers } = useXR()
  const leftStick = useController('left')
  const rightStick = useController('right')

  // Rapier
  const { world } = useRapier()

  // Effect
  useEffect(() => {
    actions[pose].reset().fadeIn(0.5).play()

    return () => {
      actions[pose]?.fadeOut(0.5)
    }
  }, [pose, actions])
  useEffect(() => {
    return subKey(state => state, (pressed) => {
      if (pressed.forward) {
        setPose('Walking')
      }
      if (pressed.backward) {
        setPose('Backward')
      }
      if (pressed.left) {
        setPose('Leftside')
      }
      if (pressed.right) {
        setPose('Rightside')
      }
      if (Object.values(pressed).every(key => !key)) {
        setPose('Idle')
      }
    })
  }, [subKey])

  // Frames
  useFrame((state, delta) => {
    const { forward, backward, left, right, jump, run } = getKey()
    const offsetCam = new Vector3(0, 0.3, -0.1)
    const currentPos = vec3(adam.current.translation())
    const currentRotate = quat(adam.current.rotation())
    const currentVeloc = vec3(adam.current.linvel())
    const minOrigin = new Vector3().copy(currentPos).add(new Vector3(0, -0.12, 0))

    offsetCam.applyQuaternion(currentRotate)
    offsetCam.add(currentPos)
    if (session) {
      player.position.copy(offsetCam)
    } else {
      state.camera.position.copy(offsetCam)
    }

    const raycastTop = new Ray(
      currentPos,
      rayDirection.set(right - left, 0, backward - forward).applyQuaternion(currentRotate)
    )
    const raycastBot = new Ray(
      minOrigin,
      rayDirection.set(right - left, 0, backward - forward).applyQuaternion(currentRotate)
    )
    const hitMax = world.castRay(raycastTop, 0.1, true, undefined, undefined, colliderRef.current, adam.current)
    const hitMin = world.castRay(raycastBot, 0.1, true, undefined, undefined, colliderRef.current, adam.current)

    if (session && rightStick) {
      const [, , xAxes, yAxes] = rightStick.inputSource.gamepad.axes
      vectorMovement.set(xAxes, 0, yAxes).multiplyScalar((run ? 50 : 20) * delta)
    } else if (!session) {
      vectorMovement.set(right - left, 0, backward - forward).multiplyScalar((run ? 50 : 20) * delta)
    }
    
    vectorMovement.applyQuaternion(currentRotate)
    adam.current.setLinvel({ ...vectorMovement, y: currentVeloc.y }, true)

    charRotate.setFromEuler(state.camera.rotation)
    adam.current.setRotation(quat({ ...currentRotate, y: charRotate.y, w: charRotate.w }), true)

    if (!hitMax && hitMin && (forward || backward || left || right)) {
      adam.current.applyImpulse({ x: 0, y: 0.008, z: 0 }, true)
    }
  })

  // Condition for jump or not
  const changeStatusJump = (payload, status) => {
    const typeObject = payload.other.colliderObject.name
    const acceptObject = ['floor', 'room']
    const isFloor = acceptObject.includes(typeObject)

    if (isFloor && status === 'enter') {
      setCanJump(true)
    } else if (isFloor && status === 'exit') {
      setCanJump(false)
    }
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Adam_character">
        <RigidBody ref={adam} colliders={false} type='dynamic' mass={70} position-y={1.5} enabledRotations={[false, true, false]} friction={0.2} name='AdamBody'
          onCollisionEnter={payload => changeStatusJump(payload, "enter")}
          onCollisionExit={payload => changeStatusJump(payload, "exit")}
        >
          <CapsuleCollider ref={colliderRef} args={[0.1, 0.08]} />
          <group name="Armature" rotation={[Math.PI / 2, 0, -Math.PI]} scale={0.003} position-y={-0.18}>
            <primitive object={nodes.mixamorigHips} />
          </group>
          <skinnedMesh name="Ch23_Belt" geometry={nodes.Ch23_Belt.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Belt.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Body" geometry={nodes.Ch23_Body.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Body.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Eyelashes" geometry={nodes.Ch23_Eyelashes.geometry} material={materials.Ch23_hair} skeleton={nodes.Ch23_Eyelashes.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Hair" geometry={nodes.Ch23_Hair.geometry} material={materials.Ch23_hair} skeleton={nodes.Ch23_Hair.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Pants" geometry={nodes.Ch23_Pants.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Pants.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Shirt" geometry={nodes.Ch23_Shirt.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Shirt.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Shoes" geometry={nodes.Ch23_Shoes.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Shoes.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Suit" geometry={nodes.Ch23_Suit.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Suit.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.003} castShadow receiveShadow />
        </RigidBody>
      </group>
    </group>
  )
}

useGLTF.preload('models/Adam-transformed.glb')
