
import { Logo } from '@pmndrs/branding'
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'

import { useSnapshot } from 'valtio'
import { state } from './store'

export default function Overlay() {
    const snap = useSnapshot(state)
    return (
        <div className="container">
            <header>
                <Logo width="40" height="40" />
                <AiOutlineShopping size="3em" />
            </header>
            {snap.intro ? <Intro /> : <Customizer />}
           
        </div>
        )
}

function Intro() {
    return <section key="main">
            <div className="section--container">
                <div>
                    <h1>LET'S DO IT.</h1>
                </div>
                <div className="section--content">
                    <div>
                        <p>
                            Create your own custom clothing with our 3D configurator.
                        </p>
                        <button style={{background: 'black'}} onClick={()=>{state.intro = false}}>
                            CUSTOMIZE IT <AiOutlineHighlight size="1.3em"/> 
                        </button>
                    </div>
                </div> 
            </div>
        </section>
}

function Customizer() {
  const colors = [
    '#ccc',
    '#EFBD4E',
    '#80C670',
    '#726DE8',
    '#EF674E',
    '#353934',
    'Purple'
  ]
  const decals = ['react', 'three2', 'pmndrs']
    return <section key="custom">
        <div className='customizer'>
            <div className='color-options'>
                {colors.map(color => 
                <div 
                    key={color}
                    className='circle'
                    style={{background: color}}></div>
                )}
            </div>
        </div>
        <div className='decals'>
            <div className='decals--container'>
                {decals.map(decal =>(
                    <div key={decal} className='decal'>
                        <img src={decal + '_thumb.png'} alt="brand" />
                    </div>
                ))}
            </div>
        </div>
        <button className='share' style={{background: 'black'}}>
            DOWNLOAD <AiFillCamera size="1.3em"/>
        </button>
        <button className='exit' style={{background: 'black'}} onClick={()=>{state.intro = true}}>
            GO BACK <AiOutlineArrowLeft size="1.3em"/>
        </button>        
    </section>
}