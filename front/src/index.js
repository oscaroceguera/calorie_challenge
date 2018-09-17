import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

const App = Loadable({
  loader: () => import('./container/App'),
  loading: () => <div style={{ textAlign: 'center' }}>Cargando...</div>
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)