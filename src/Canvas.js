import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import {
  useGLTF,
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  useTexture,
  Decal,
  OrbitControls
} from '@react-three/drei'

import { useSnapshot } from 'valtio'
import { state } from './store'
import Model from './models/Model'
export const App = ({ position = [0, 0, 2.5], fov = 25 }) => {
  const snap = useSnapshot(state)

return ( 
  <>
  <Canvas 
  style={{
    background: `radial-gradient(circle, rgba(255,255,255,1) 0%, ${snap.selectedColor} 100%, #000 130%)`
  
  }}
    shadows
    gl={{ preserveDrawingBuffer: true }}
    camera={{ position, fov }}
    eventSource={document.getElementById('root')}
    
    eventPrefix="client">
    <ambientLight intensity={0.5} />
    <Environment preset="city" />
    
    <CameraRig>
      <Center>
        {snap.models.map((model) =>         
          <Model model={model} />
        )}
      </Center>
     <OrbitControls
          // autoRotate
          // enableZoom={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
        />    </CameraRig>
  </Canvas>
  </>
)}

function Shirt(props) {
  const snap = useSnapshot(state)
  const texture = useTexture(`/${snap.selectedDecal}.png`)

  const { nodes, materials } = useGLTF('/shirt.glb')
  useFrame((state, delta) =>
    easing.dampC(materials.Material.color, snap.selectedColor, 0.25, delta)
  )
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.shirt.geometry}
      material={materials.Material}
      material-roughness={1}
      {...props}
      dispose={null}>
      <Decal
        position={[0, 0.34, 0.12]}
        rotation={[0, 0, 0]}
        scale={0.15}
        opacity={0.7}
        map={texture}
      />
    </mesh>
  )
}

function Backdrop() {
  const shadows = useRef()

  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      1,
      delta
    )
  )

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={120}
      alphaTest={1}
      scale={1}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}>
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
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

function CameraRig({ children }) {
  const group = useRef()

  const snap = useSnapshot(state)

  // useFrame((state, delta) => {
  //   easing.damp3(
  //     state.camera.position,
  //     [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
  //     0.25,
  //     delta
  //   )
  //   easing.dampE(
  //     group.current.rotation,
  //     [state.pointer.y / 10, -state.pointer.x / 5, 0],
  //     0.25,
  //     delta
  //   )
  // })
  return <group ref={group}>{children}</group>
}

useGLTF.preload('/shirt.glb');
