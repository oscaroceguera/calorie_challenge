import AuthService from '../Login/authService'
import withAuth from '../Login/withAuth'
const Auth = new AuthService()

import React from 'react'
import axios from 'axios'
import styles from './styles.css'
import { Card, NavMenu} from '../../components'

import { Add, Assessment } from '@material-ui/icons'
import { Button, IconButton } from '@material-ui/core'

class Dashboard extends React.Component {
  state = {
    items: []
  }

  componentDidMount () {
    this.load()
  }

  async load () {
    const token = localStorage.getItem('id_token')
    const headers = { headers: { 'x-auth': token } }

    const items = await axios.get('http://localhost:5000/api/meals', headers).then(response => response.data)
    this.setState({items})
  }

  goToAddCalories = e => {
    e && e.preventDefault()
    this.props.history.push('/add-calories')
  }

  goToSummary = e => {
    e && e.preventDefault()
    this.props.history.push('/summary')
  }

  getDetail = uuid => e => {
    e && e.preventDefault()
    this.props.history.push(`/detail/${uuid}`)
  }

  logout = e => {
    Auth.logout()
    this.props.history.replace('/login')
  }

  render () {
    console.log('PROPS ==>', this.props)
    return (
      <div className={styles.container}>
        <NavMenu username={this.props.user.username} logout={this.logout} />
        <h1 className={styles.title}>Consumo de calorías</h1>
        <div className={styles.section}>
          {this.state.items.map(item => {
            return <Card onClick={this.getDetail} key={item.uuid} data={item} />
          })}
          <div className={styles.btnContainer}>
            <IconButton
              color='primary'
              aria-label='charts'
              onClick={this.goToSummary}
            >
              <Assessment style={{ fontSize: '46px', color: '#ffc107' }} />
            </IconButton>
            <br />
            <Button
              variant='fab'
              color='secondary'
              aria-label='Add'
              onClick={this.goToAddCalories}
            >
              <Add />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Dashboard)
