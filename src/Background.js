import React from 'react'
import { useSnapshot } from 'valtio'
import { state } from './store'

const Background = () => {
  const snap = useSnapshot(state)
  return (
        <div  style={{
    width: '100%',
    height: '100%',
    background: snap.selectedColor,
    background: `radial-gradient(circle, rgba(255,255,255,1) 0%, ${snap.selectedColor} 100%)`
    }}></div>
  )
}

export default Background