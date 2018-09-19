import React from 'react'
import styles from './styles.css'
import {Card} from '../../components'

import { Add, Assessment } from '@material-ui/icons'
import { Button, IconButton } from '@material-ui/core'

class Dashboard extends React.Component {
  goToAddCalories = e => {
    e && e.preventDefault()
    this.props.history.push('/add-calories')
  }

  goToSummary = e => {
    e && e.preventDefault()
    this.props.history.push('/summary')
  }

  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Consumo de calorías</h1>
        <div className={styles.section}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
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

export default Dashboard
