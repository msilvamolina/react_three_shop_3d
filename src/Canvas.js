import React, { useRef } from "react";
import {Canvas} from '@react-three/fiber'
import {OrbitControls, Center, useGLTF, Environment, AccumulativeShadows, RandomizedLight} from '@react-three/drei'

export const App = ({position=[-1, 0, 2.5], fov=25}) => {

  return (
    <Canvas 
        shadows
        eventSource={document.getElementById('root')}
        eventPrefix='client'
        camera={{position, fov}} >
        <ambientLight intensity={0.5} />
        <Environment preset="city"/>
        <Center>
            <Shirt />
            <Backdrop />
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
      scale={[0.10, 0.10, 0.10]}
        castShadow
        receiveShadow
        geometry={nodes.buzo.geometry}
        material={materials.Knit_Fleece_Terry_FRONT_54054}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
    )
}

function Backdrop() {
    return(
        <AccumulativeShadows
        temporal
        frames={60}
        alphaTest={0.85}
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0,0,-0.14]}>
            <RandomizedLight
                amount={4}
                radius={9}
                intensity={1}
                ambient={0.25}
                position={[5, 5, -10]}
            />
            <RandomizedLight
                amount={4}
                radius={5}
                intensity={0.25}
                ambient={0.55}
                position={[-5, 5, -9]}
            />            
        </AccumulativeShadows>
    )
}
useGLTF.preload("/buzo_starter.glb");

