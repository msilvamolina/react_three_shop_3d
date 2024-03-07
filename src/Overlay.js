import { Logo } from '@pmndrs/branding'
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import * as React from 'react';

import { useSnapshot } from 'valtio'
import { state } from './store'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

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
        <div>
          <AiOutlineShopping size="3em" />
        </div>
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

const options = ['man', 'woman', 'children', 'shopping-bag'];

function Customizer({ config }) {
  const snap = useSnapshot(state)
const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
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
            <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button className='buttonsContainer' onClick={handleClick}> <img src={`/img/` + options[selectedIndex] + `.png`} /></Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      <img src={`/img/` + option + `.png`} />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
          <div className="models--container">
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
          </div>          
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
            {snap.decals.map((decal) => (
              <div
                key={decal}
                className="decal"
                onClick={() => (state.selectedDecal = decal)}>
                <img src={decal + '_thumb.png'} alt="brand" />
              </div>
            ))}
          </div>
        </div>

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
          }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>

        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}>
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </motion.section>
  )
}
