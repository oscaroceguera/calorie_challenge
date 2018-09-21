import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Tabs, Tab} from '@material-ui/core'

import ByMonth from './ByMonth'
import ByDay from './ByDay'
import ByYear from './ByYear'

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
