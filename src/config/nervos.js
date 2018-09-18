import Nervos from '@nervos/chain'
import transaction from './transaction'
import config from "./index";

if (typeof window.nervos !== 'undefined') {
  window.nervos = Nervos(window.nervos.currentProvider)
  window.nervos.currentProvider.setHost(config.chain)
} else {
  window.nervos = Nervos(config.chain)
}

const nervos = window.nervos

window.addEventListener('neuronWebReady', async () => {
  window.console.log('neuron web ready')
  window.addMessenger(nervos)
  nervos.appchain.getDefaultAccount().then((address) => {
    transaction.from = address
  })
  delete transaction.privateKey
})
console.log('nervos.js')
export default nervos
export { transaction }
