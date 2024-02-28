
import { Logo } from '@pmndrs/branding'
import { AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'

export default function Overlay() {
    return <Intro />
}

function Intro() {
    return <div className="container">
        <header>
            <Logo width="40" height="40" />
            <AiOutlineShopping size="3em" />
        </header>

        <section key="main">
            <div className="section--container">
                <div>
                    <h1>LET'S DO IT.</h1>
                </div>
                <div className="section--content">
                    <div>
                        <p>
                            Create your own custom clothing with our 3D configurator.
                        </p>
                        <button style={{background: 'black'}}>
                            CUSTOMIZE IT <AiOutlineHighlight size="1.3em"/> 
                        </button>
                    </div>
                </div> 
            </div>
        </section>
    </div>
}