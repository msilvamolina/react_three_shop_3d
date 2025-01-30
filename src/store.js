import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: [
    '#ccc',
    '#EFBD4E',
    '#80C670',
    '#726DE8',
    '#EF674E',
    '#353934',
    '#2c688b',
    '#a33b31',
    '#cc7ca7',
    '#469c6d',
    '#97999b',
    '#e5c5b4',
  ],
  decals: ['react', 'three2', 'pmndrs'],
  models: ['shirt', 'hoodie', 'womanShirt', 'long-sleeves-man', 'womanTop', 'womanShirt2', 'womanShirtLong', 'kidShirt', 'bolso', 'womanShirtDress', 'tank-top', 'baby'],
  selectedColor: '#EFBD4E',
  selectedDecal: null,
  selectedModel: 'shirt',
  finalShirtSnapshot: null,
})

export { state }
