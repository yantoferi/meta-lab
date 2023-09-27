/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 /home/TA/resource/Laboratory/Stair.glb --transform --shadows 
Files: /home/TA/resource/Laboratory/Stair.glb [4.5MB] > Stair-transformed.glb [574.82KB] (87%)
*/

import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function Stair(props) {
  const { nodes, materials } = useGLTF('models/Stair-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <RigidBody colliders="trimesh" type="fixed">
        <group position={[-2.932, 2.717, -3.017]} rotation={[Math.PI, 0, Math.PI]} scale={0.3}>
          <mesh castShadow receiveShadow geometry={nodes.Cube011.geometry} material={materials['White Tiles Marble PBR Texture Seamless.001']} />
          <mesh castShadow receiveShadow geometry={nodes.Cube011_1.geometry} material={materials.Plastic} />
        </group>
      </RigidBody>
    </group>
  )
}

useGLTF.preload('models/Stair-transformed.glb')
