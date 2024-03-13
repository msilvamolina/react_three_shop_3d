import { Logo } from '@pmndrs/branding'
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import * as React from 'react';
import { reader } from './helpers';

import { useSnapshot } from 'valtio'
import { state } from './store'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import Button from '@mui/material/Button';
import ButtonGroupDropdown from './components/buttonGroupDropdown';
import MaxWidthDialog from './components/customizeModel';
export default function Overlay() {
  const snap = useSnapshot(state)

  const transition = { type: 'spring', duration: 0.8 }

  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }

  return (
    <div className="container">
      <header
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 1.8, delay: 1 }}>
        <Logo width="40" height="40" />
   
      </header>

      <AnimatePresence>
        {snap.intro ? (
          <Intro key="main" config={config} />
        ) : (
          <Customizer key="custom" config={config} />
        )}
      </AnimatePresence>
    </div>
  )
}

function Intro({ config }) {
  return (
    <motion.section {...config}>
      <div className="section--container">
        <div>
          <h1>LET'S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              style={{ background: 'black' }}
              onClick={() => (state.intro = false)}>
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const options = ['man', 'woman', 'children', 'bolso'];
const optionsMan = ['shirt', 'long-sleeves-man', 'hoodie', 'tank-top'];
const optionsWoman = ['womanShirt', 'womanShirtDress', 'womanShirt2', 'womanTop', 'womanShirtLong'];
const optionsKid = ['kidShirt', 'baby'];
const optionsSizes = ['S', 'M', 'L', 'XL', 'XXL'];

function Customizer({ config }) {
  const snap = useSnapshot(state)
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedManIndex, setSelectedManIndex] = React.useState(0);
  const [selectedWomanIndex, setSelectedWomanIndex] = React.useState(0);
  const [selectedKidIndex, setSelectedKidIndex] = React.useState(0);
  const [selectedSizesIndex, setSelectedSizesIndex] = React.useState(0);
  const [finalShirtSnapshot, setFinalShirtSnapshot] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const [file, setFile] = React.useState('');


  function onOptionsChange(index) {
    setSelectedWomanIndex(0);
    setSelectedKidIndex(0);
    setSelectedIndex(index);
    
    if(index===0){
      onOptionsChangeMan(0);
    }

    if(index===1){
      onOptionsChangeWoman(0);
    }

    if(index===2){
      onOptionsChangeKid(0);
    }

    if(index===3){
      state.selectedModel = options[index];
    }
  }

  function onOptionsChangeMan(index) {
    setSelectedManIndex(index);
    let option = optionsMan[index];
    state.selectedModel = option;
  }

  function onOptionsChangeWoman(index) {
    setSelectedWomanIndex(index);
    let option = optionsWoman[index];
    state.selectedModel = option;
  }

  function onOptionsChangeKid(index) {
    setSelectedKidIndex(index);
    let option = optionsKid[index];
    state.selectedModel = option;
  }

  const uploadImage = () => {
    if(file == '') {
      return state.selectedDecal = null;
    }
    reader(file)
      .then((result) => {
         state.selectedDecal = result;
      })
  }

  function downloadImage() {
    let result = document
                .querySelector('canvas')
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
    
    state.finalShirtSnapshot = result;
    // setFinalShirtSnapshot(result);

    setOpenModal(true);
  }

  return (
    <>
    <MaxWidthDialog open={openModal} setOpen={setOpenModal} />

    <motion.section {...config}>
      <div className="customizer">
        <div className="color-options">
          {snap.colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => (state.selectedColor = color)}></div>
          ))}
        </div>

        <div className="models">

            {/* {selectedIndex!==3 && <ButtonGroupDropdown text={true} onOptionsChange={onOptionsChange}  options={optionsSizes} selectedIndex={selectedSizesIndex} setSelectedIndex={setSelectedSizesIndex}/>} */}

          {/* <div className="models--container">
            <Button variant="contained"><img src="/img/man.png" /></Button>
            <Button variant="contained" ><img src="/img/woman.png" /></Button>
            <Button variant="contained"><img src="/img/children.png" /></Button>
            <Button variant="contained"><img src="/img/shopping-bag.png" /></Button>
            </div>
          <br />
          <div className="models--container">
            <Button variant="contained"><img src="/img/tshirt.png" /></Button>
            <Button variant="contained"><img src="/img/long-sleeves-t-shirt.png" /></Button>
            <Button variant="contained"><img src="/img/hoodie.png" /></Button>
            <Button variant="contained"><img src="/img/tank-top.png" /></Button>
          </div>
          <br />
          <div className="models--container">
            <Button variant="contained"><img src="/img/clothes-3.png" /></Button>
            <Button variant="contained"><img src="/img/women.png" /></Button>
            <Button variant="contained"><img src="/img/shirt-2.png" /></Button>
            <Button variant="contained"><img src="/img/shirt-1.png" /></Button>
            <Button variant="contained"><img src="/img/long-sleeve-1.png" /></Button>
          </div>
          <br />
          <div className="models--container">
            <Button variant="contained"><img src="/img/shirt.png" /></Button>
            <Button variant="contained"><img src="/img/clothing.png" /></Button>
       
          </div>
          <br />
          <div className="models--container">
            <Button variant="contained">S</Button>
            <Button variant="contained">M</Button>
            <Button variant="contained">L</Button>
            <Button variant="contained">XL</Button>
          </div>           */}
{/* <ToggleButtonGroup
  color="primary"
  exclusive
  value='android'
  aria-label="Platform"
>
  <ToggleButton value="web"><img src="/img/man.png" /></ToggleButton>
  <ToggleButton value="android">Android</ToggleButton>
  <ToggleButton value="ios">iOS</ToggleButton>
</ToggleButtonGroup> */}
            
            {/* {snap.models.map((model) => (
              <div
                key={model}
                className="decal"
                onClick={() => (state.selectedModel = model)}>
                <img src={model + '_thumb.png'} alt="brand" />
              </div>
            ))} */}
          
        </div>

        <div className="decals">
          <div className="decals--container">
          <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          style={{ background: snap.selectedColor }}
          onClick={uploadImage}>
          UPLOAD
          <AiFillCamera size="1.3em" />
        </button>
          </div>
        </div>
        <div className='models'>
          <ButtonGroupDropdown onOptionsChange={onOptionsChange} options={options} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
          &nbsp;
          {selectedIndex===0 && <ButtonGroupDropdown onOptionsChange={onOptionsChangeMan}  text={false} options={optionsMan} selectedIndex={selectedManIndex} />}
           {selectedIndex===1 &&<ButtonGroupDropdown onOptionsChange={onOptionsChangeWoman}  text={false} options={optionsWoman} selectedIndex={selectedWomanIndex} />}
           {selectedIndex===2 &&<ButtonGroupDropdown onOptionsChange={onOptionsChangeKid}  text={false} options={optionsKid} selectedIndex={selectedKidIndex} />}
           </div>
        <button
          className="share"
          style={{ background: snap.selectedColor }}
          onClick={downloadImage}
          // onClick={() => {
          //   const link = document.createElement('a')
          //   link.setAttribute('download', 'canvas.png')
          //   link.setAttribute(
          //     'href',
          //     document
          //       .querySelector('canvas')
          //       .toDataURL('image/png')
          //       .replace('image/png', 'image/octet-stream')
          //   )
          //   link.click()
          // }}
          >
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
   <button
          className="share"
          style={{ background: snap.selectedColor }}
          onClick={() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'canvas.png')
            link.setAttribute(
              'href',
              document
                .querySelector('canvas')
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream')
            )
            link.click()
          }}
          >
          DOWNLOAD IMAGE
          <AiFillCamera size="1.3em" />
        </button>

        {/* <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}>
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button> */}
      </div>
    </motion.section>
    </>
  )
}
