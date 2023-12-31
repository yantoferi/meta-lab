"use client"

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 C:/Users/labkom pc/Downloads/small_bottle.glb --transform --shadows 
Files: C:/Users/labkom pc/Downloads/small_bottle.glb [41.5MB] > small_bottle-transformed.glb [1.13MB] (97%)
Author: shuvalov.di (https://sketchfab.com/shuvalov.di)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/small-bottle-761e522abb934b0a98063a9851728180
Title: Small bottle
*/

import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Vector3 } from 'three'
import { Interactive, useXR } from '@react-three/xr'

export function Bottle(props) {
  const bottleRef = useRef()
  const parentRef = useRef()

  const { nodes, materials } = useGLTF('models/small_bottle-transformed.glb')

  const [isDynamic, setIsDynamic] = useState(true)

  // XR
  const { session, controllers } = useXR()

  useFrame((state, delta) => {
    const adam = state.scene.getObjectByName('AdamBody')
    if (!isDynamic && parentRef.current && parentRef.current.userData.parentType === 'rigid_body') {
      const offset = new Vector3(0, 0.1, -0.3)
      offset.applyQuaternion(adam.quaternion)
      offset.add(adam.position)
      parentRef.current.position.copy(offset)
    }
    if (session && controllers.length !== 0) {
      const gripPos = controllers[1].grip.matrixWorld
      if (!isDynamic && parentRef.current && parentRef.current.userData.parentType === 'rigid_body') {
        parentRef.current.position.copy(new Vector3().setFromMatrixPosition(gripPos))
        parentRef.current.position.add(new Vector3(0, -0.09, -0.1))
      }
    }
  })

  return (
    <group {...props} dispose={null}>
      <Interactive
        onSelectStart={(xrEvent) => { setIsDynamic(false); parentRef.current = xrEvent.intersection?.object.parent }}
        onSelectEnd={() => setIsDynamic(true)}
      >
        <RigidBody ref={bottleRef} colliders="cuboid" type={isDynamic ? "dynamic" : "kinematicPosition"} position={[0, 0.2, 0.3]} userData={{ parentType: 'rigid_body' }}>
          <mesh castShadow receiveShadow geometry={nodes.Sklianka__0.geometry} material={materials['Scene_-_Root']} position={[0, 0.088, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.4} onClick={(event) => {
            setIsDynamic(!isDynamic)
            parentRef.current = event.object.parent
          }} />
        </RigidBody>
      </Interactive>
    </group>
  )
}

useGLTF.preload('models/small_bottle-transformed.glb')
