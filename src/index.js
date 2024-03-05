import { createRoot } from 'react-dom/client'
import './styles.css'
import { App as Canvas } from './Canvas'
import Overlay from './Overlay'
import Background from './Background'
createRoot(document.getElementById('root')).render(
  <>
    <Canvas />
    <Overlay />
    <Background />


  </>
)
