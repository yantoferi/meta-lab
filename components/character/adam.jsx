/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ../assets/adam.glb --transform --shadows 
Files: ../assets/adam.glb [36.13MB] > adam-transformed.glb [2.25MB] (94%)
*/

import { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, quat, useRapier, vec3 } from '@react-three/rapier'
import { Quaternion, Vector3 } from 'three'
import { useXR } from '@react-three/xr'
import { Ray } from '@dimforge/rapier3d-compat'

const vectorMovement = new Vector3()

export function Adam(props) {
  const group = useRef()
  const adam = useRef()
  const { nodes, materials, animations } = useGLTF('models/Adam-transformed.glb')
  const { actions } = useAnimations(animations, group)

  // State
  const [pose, setPose] = useState("Idle")
  const [canJump, setCanJump] = useState(true)

  // Keyboard controls
  const [subKey, getKey] = useKeyboardControls()

  // XR
  const { session, player, controllers } = useXR()

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
    const offsetCam = new Vector3(0, session? 0.08:0.22, -0.08)
    const { forward, backward, left, right, jump } = getKey()
    const adamPosition = vec3(adam.current.translation())
    const adamRotate = quat(adam.current.rotation())
    const adamVel = vec3(adam.current.linvel())
    let camRotate = state.camera.quaternion
    
    if (session && (controllers.length !== 0)) {
      const analog = controllers[0]?.inputSource?.gamepad?.axes
      vectorMovement.set(analog[2], 0, analog[3]).multiplyScalar(5 * delta).normalize()
    } else {
      vectorMovement.set(right - left, 0, backward - forward).multiplyScalar(5 * delta).normalize()
    }
    vectorMovement.applyQuaternion(adamRotate)

    // Camera movement
    // offsetCam.applyQuaternion(adamRotate)
    // offsetCam.add(adamPosition)
    // if (session) {
    //   camRotate = new Quaternion().setFromRotationMatrix(state.camera.matrixWorld)
    //   player.position.copy(offsetCam)
    // } else {
    //   state.camera.position.copy(offsetCam)
    // }

    if (!props.modalOpen) {
      adam.current.setLinvel({ ...vectorMovement, y: adamVel.y }, true)
    }

    // For jump
    if (session && (controllers.length !== 0)) {
      if (canJump && controllers[0]?.inputSource?.gamepad?.buttons[5].pressed) {
        adam.current.setLinvel({ ...vectorMovement, y: 2 }, true)
      }
    } else {
      if (canJump && jump) {
        adam.current.setLinvel({ ...vectorMovement, y: 2 }, true)
      }
    }

    adam.current.setRotation({ x: adamRotate.x, y: camRotate.y, z: adamRotate.z, w: camRotate.w })
  })

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
        <RigidBody ref={adam} colliders={false} type='dynamic' mass={70} position-y={0.5} enabledRotations={[false, true, false]} friction={0.2} name='AdamBody'
          onCollisionEnter={payload => changeStatusJump(payload, "enter")}
          onCollisionExit={payload => changeStatusJump(payload, "exit")}
        >
          <CapsuleCollider args={[0.08, 0.07]} />
          <group name="Armature" rotation={[Math.PI / 2, 0, -Math.PI]} scale={0.002} position-y={-0.16}>
            <primitive object={nodes.mixamorigHips} />
          </group>
          <skinnedMesh name="Ch23_Belt" geometry={nodes.Ch23_Belt.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Belt.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Body" geometry={nodes.Ch23_Body.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Body.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Eyelashes" geometry={nodes.Ch23_Eyelashes.geometry} material={materials.Ch23_hair} skeleton={nodes.Ch23_Eyelashes.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Hair" geometry={nodes.Ch23_Hair.geometry} material={materials.Ch23_hair} skeleton={nodes.Ch23_Hair.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Pants" geometry={nodes.Ch23_Pants.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Pants.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Shirt" geometry={nodes.Ch23_Shirt.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Shirt.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Shoes" geometry={nodes.Ch23_Shoes.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Shoes.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
          <skinnedMesh name="Ch23_Suit" geometry={nodes.Ch23_Suit.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Suit.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.002} castShadow receiveShadow />
        </RigidBody>
      </group>
    </group>
  )
}

useGLTF.preload('models/Adam-transformed.glb')
