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
    'cyan'
  ],
  decals: ['react', 'three2', 'pmndrs'],
  models: ['shirt', 'hoodie', 'womanShirt', 'shirtManLong', 'womanTop', 'womanShirt2', 'womanShirtLong', 'kidShirt', 'bolso'],
  selectedColor: '#EFBD4E',
  selectedDecal: 'three2',
  selectedModel: 'shirt'
})

export { state }
