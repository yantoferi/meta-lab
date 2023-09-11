/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 /home/feri/Downloads/room.glb --transform --shadows 
Files: /home/feri/Downloads/room.glb [44.54MB] > room-transformed.glb [5.87MB] (87%)
Author: NEYCER (https://sketchfab.com/NEYCER)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/empty-old-garage-room-778f5663b0c244508342bdc0f7a1db38
Title: Empty old Garage room
*/

import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

export function Room(props) {
  const { nodes, materials } = useGLTF('models/room-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <RigidBody colliders={false} type='fixed'>
        <group scale={0.5}>
          <mesh castShadow receiveShadow geometry={nodes.Object_13.geometry} material={materials.Poll_1} position={[-14.829, 0, 0.056]} rotation={[0, Math.PI / 2, 0]} scale={[1, 6.142, 1]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_28.geometry} material={materials['Material.002']} position={[0, 0, -10.187]} scale={[45.475, 5.938, 59.737]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_29.geometry} material={materials.ground} position={[0, 0, -10.187]} scale={[45.475, 5.938, 59.737]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_31.geometry} material={materials.top_concrete} position={[0, 5.064, 0.119]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 45.471, 1.105]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_39.geometry} material={materials['Material.001']} position={[0.244, -4.27, -40.037]} scale={[14.079, 1.849, 0.58]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_55.geometry} material={materials.pipe} position={[0, 5.531, -41.427]} rotation={[0, 0, -Math.PI / 2]} scale={[0.283, 45.554, 0.283]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_57.geometry} material={materials.DOOR} position={[0, 0, -10.187]} scale={[45.475, 5.938, 59.737]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_59.geometry} material={materials.Material} position={[15.245, 0.043, -9.934]} scale={[0.964, 5.948, 9.076]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_62.geometry} material={materials.metal_rod} position={[15.318, 0, -6.714]} scale={[0.042, 5.169, 0.042]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_65.geometry} material={materials.petli_low} position={[9.068, -4.805, 0.364]} rotation={[Math.PI / 2, 0, -1.591]} scale={2.424} />
          <mesh castShadow receiveShadow geometry={nodes.Object_82.geometry} material={materials['Material.003']} position={[0, 19.557, 0]} rotation={[0, Math.PI / 2, 0]} scale={3.594} />
          <instancedMesh args={[nodes.Object_0.geometry, materials.Poll_1, 7]} castShadow receiveShadow instanceMatrix={nodes.Object_0.instanceMatrix} />
          <instancedMesh args={[nodes.Object_1.geometry, materials.poll3, 8]} castShadow receiveShadow instanceMatrix={nodes.Object_1.instanceMatrix} />
          <instancedMesh args={[nodes.Object_23.geometry, materials.pipe, 7]} castShadow receiveShadow instanceMatrix={nodes.Object_23.instanceMatrix} />
          <instancedMesh args={[nodes.Object_35.geometry, materials.block_low, 6]} castShadow receiveShadow instanceMatrix={nodes.Object_35.instanceMatrix} />
        </group>
        <CuboidCollider args={[22, 0.5, 29]} position={[0, -3.45, -5]} />
      </RigidBody>
    </group>
  )
}

useGLTF.preload('models/room-transformed.glb')