import React from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

import {
  useGLTF,
  useTexture,
  Decal,
} from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from '../store'

const Model = (props) => {

  const snap = useSnapshot(state)
  const texture = useTexture(snap.selectedDecal ?? `/three2.png`)

  const { nodes, materials } = useGLTF(`/models/${props.model}.glb`)
  useFrame((state, delta) =>
    easing.dampC(materials.Material.color, snap.selectedColor, 0.25, delta)
  )
  return snap.selectedModel === props.model && (
    <mesh
    position={[0,0,0]}
    rotation={[0,-0.5,0]}
    castShadow
        receiveShadow
      geometry={nodes.shirt.geometry}
      material={materials.Material}
      material-roughness={1}
      {...props}
      dispose={null}>
      <Decal
        position={[0, 0.30, 0.12]}
        rotation={[0, 0, 0]}
        scale={0.20}
        opacity={0.7}
        map={texture}
      />
    </mesh>
  )
}

export default Model