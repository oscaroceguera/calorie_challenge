import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Paper, Tabs, Tab} from '@material-ui/core'
import format from 'date-fns/format'
import { UTCDate } from '../../helpers/getUTCDate'
import esLocale from 'date-fns/locale/es'
import { StyledComponents} from '../../components'

class ByDay extends React.Component {
  state = {
    items: [],
    loading: false,
    error: null
  }

  componentDidMount() {
    this.load()
  }

  async load() {
    this.setState({ loading: true })
    try {
      const items = await axios.get('http://localhost:5000/api/summary/byDay').then(res => res.data)
      this.setState({
        loading: false,
        items
      })
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message
      })
    }
  }
  render () {
    const {items} = this.state
    return (<div>
      {items.map((item, index) => {
        return (
          <div key={index} style={{ margin: '1em', textAlign: 'center'}}>
            <StyledComponents title={`El ${format(new Date(`${item.year}, ${item.month}, ${item.day}`), 'dd MMMM YYYY', { locale: esLocale })} consumiste ${item.totalKcal} calorías`} />
          </div>
        )
      })}
    </div>)
  }
}

class ByMonth extends React.Component {
  state = {
    items: [],
    loading: false,
    error: null
  }

  componentDidMount() {
    this.load()
  }

  async load() {
    this.setState({ loading: true })
    try {
      const items = await axios.get('http://localhost:5000/api/summary/byMonth').then(res => res.data)
      this.setState({
        loading: false,
        items
      })
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message
      })
    }
  }
  render () {
    const {items} = this.state
    return (
      <div>
        {items.map((item, index) => {
          return (
            <div key={index} style={{ margin: '1em', textAlign: 'center' }}>
              <StyledComponents title={`En ${format(new Date(`${item.year}, ${item.month}`), 'MMMM YYYY', { locale: esLocale })} consumiste ${item.totalKcal} calorías`} />
            </div>
          )
        })}
      </div>
    )
  }
}

class ByYear extends React.Component {
  state = {
    items: [],
    loading: false,
    error: null
  }

  componentDidMount() {
    this.load()
  }

  async load() {
    this.setState({ loading: true })
    try {
      const items = await axios.get('http://localhost:5000/api/summary/byYear').then(res => res.data)
      this.setState({
        loading: false,
        items
      })
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message
      })
    }
  }
  render () {
    const {items} = this.state
    return (
      <div>
        {
          items.map((item, index) => {
            return <div key={index} style={{ margin: '1em', textAlign: 'center' }}>
              <StyledComponents title={`En el ${format(new Date(`${item.year}`), 'YYYY', { locale: esLocale })} consumiste ${item.totalKcal} calorías`} />
            </div>
          })
        }
      </div>
    )
  }
}

class Summary extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render () {
    return (
      <div>
        <h1 style={{textAlign: 'center', color: '#f44336'}}>Resumen de calorías</h1>
        <Paper square style={{ width: '50%', margin: '.5em auto' }}>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label='Día' />
            <Tab label='Mes' />
            <Tab label='Año' />
          </Tabs>
        </Paper>
        {this.state.value === 0 && <ByDay/>}
        {this.state.value === 1 && <ByMonth/>}
        {this.state.value === 2 && <ByYear/>}
      </div>
    )
  }
}

export default Summary
