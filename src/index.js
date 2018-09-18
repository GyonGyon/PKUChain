import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import registerServiceWorker from './utils/registerServiceWorker'
import Modal from 'react-modal'

const main = () => {
  const appRoot = document.getElementById('app-root')
  Modal.setAppElement(appRoot)
  ReactDOM.render(<App />, appRoot)
  registerServiceWorker()
}

main()