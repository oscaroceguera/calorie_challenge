import React from 'react'
import { storiesOf } from '@storybook/react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { Card } from '../src/components'

const stories = storiesOf('Card', module)

stories.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))

stories.add('Card', () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: '1em'}}>
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
    <Card />
    <Card />
    <Card />
  </div>
))
