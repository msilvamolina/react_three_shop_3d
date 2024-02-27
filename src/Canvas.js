import React, { useRef } from "react";
import {Canvas} from '@react-three/fiber'
import {OrbitControls, Center, useGLTF} from '@react-three/drei'

export const App = ({position=[-1, 0, 2.5], fov=25}) => {

  return (
    <Canvas 
        eventSource={document.getElementById('root')}
        eventPrefix='client'
        camera={{position, fov}} >
        <Center>
            <Shirt />
        </Center>
        <OrbitControls />
    </Canvas>
  )
}

function Shirt(props) {
    const { nodes, materials } = useGLTF("/buzo_starter.glb");

    return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.buzo.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_54054}
        position={[0, 4.829, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
    )
}

useGLTF.preload("/buzo_starter.glb");

