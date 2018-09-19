import React from 'react'
import { storiesOf } from '@storybook/react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { Circular } from '../src/components'

const stories = storiesOf('Progress', module)

stories.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))

stories.add('Circular', () => <Circular />)
