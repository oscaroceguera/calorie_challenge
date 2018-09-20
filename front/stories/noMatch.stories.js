import React from 'react'
import { storiesOf } from '@storybook/react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { NoMatch } from '../src/components'

const stories = storiesOf('No Match', module)

stories.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))

stories.add('NoMatch', () => <NoMatch />)
