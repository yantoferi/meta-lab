/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ../assets/Tables.glb --transform --shadows 
Files: ../assets/Tables.glb [59.54MB] > Tables-transformed.glb [6.2MB] (90%)
*/

import { useGLTF } from '@react-three/drei'

export function Tables(props) {
  const { nodes, materials } = useGLTF('models/Tables-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-1.518, 3.555, 5.388]} rotation={[0, Math.PI / 2, 0]} scale={0.215}>
        <mesh castShadow receiveShadow geometry={nodes.Plane018.geometry} material={materials['Material.006']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane018_1.geometry} material={materials['Material.005']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane018_2.geometry} material={materials['Material.004']} />
      </group>
    </group>
  )
}

useGLTF.preload('models/Tables-transformed.glb')
