import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Loadable from 'react-loadable'

import { Circular, NoMatch } from '../../components'
import styles from './style.css'

const dynamicImport = importingComponent => (
  Loadable({
    loader: importingComponent,
    loading: Circular
  })
)

const Dashboard = dynamicImport(() => import('../Dashboard'))
const CreateCalories = dynamicImport(() => import('../Calories/create'))
const Summary = dynamicImport(() => import('../Summary'))
const Login = dynamicImport(() => import('../Login'))

const App = props => {
  const {history} = props

  return (
    <div className={styles.container}>
      <Switch>
        <Route
          exact
          path='/'
          render={() => <Redirect to='/login' />}
        />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Login} />
        <Route
          exact
          path='/dashboard'
          component={Dashboard}
        />
        <Route
          exact
          path='/add-calories'
          component={CreateCalories}
        />
        <Route
          exact
          path='/detail/:uuid'
          component={CreateCalories}
        />
        <Route
          exact
          path='/summary'
          component={Summary}
        />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default App
