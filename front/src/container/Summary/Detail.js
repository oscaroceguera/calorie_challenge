import AuthService from '../Login/authService'
import withAuth from '../Login/withAuth'
const Auth = new AuthService()

import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import format from 'date-fns/format'
import esLocale from 'date-fns/locale/es'
import { StyledComponents } from '../../components'

class Detail extends React.Component {
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
      const token = localStorage.getItem('id_token')
      const headers = { headers: { 'x-auth': token } }

      const items = await axios.get(`http://localhost:5000/api/summary/${this.props.summaryType}`, headers).then(res => res.data)
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

  render() {
    const { items } = this.state
    const { summaryType} = this.props

    return (<div>
      {items.map((item, index) => {
        return (
          <div key={index} style={{ margin: '1em', textAlign: 'center' }}>
            {summaryType === 'byDay' && <StyledComponents title={`El ${format(new Date(`${item.year}, ${item.month}, ${item.day}`), 'dd MMMM YYYY', { locale: esLocale })} consumiste ${item.totalKcal} calorías`} />}
            {summaryType === 'byMonth' && <StyledComponents title={`En ${format(new Date(`${item.year}, ${item.month}`), 'MMMM YYYY', { locale: esLocale })} consumiste ${item.totalKcal} calorías`} />}
            {summaryType === 'byYear' && <StyledComponents title={`En el ${format(new Date(`${item.year}`), 'YYYY', { locale: esLocale })} consumiste ${item.totalKcal} calorías`} />}
          </div>
        )
      })}
    </div>)
  }
}

export default withAuth(Detail)

