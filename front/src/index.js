import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const App = Loadable({
  loader: () => import('./container/App'),
  loading: () => <div style={{ textAlign: 'center' }}><CircularProgress /></div>
})

const theme = createMuiTheme({
  typography: {
    fontSize: 16
  }
})

const MyAwesomeReactComponent = ({history}) => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App history={history} />
    </BrowserRouter>
  </MuiThemeProvider>
)

ReactDOM.render(
  <MyAwesomeReactComponent history={history} />,
  document.getElementById('app')
)