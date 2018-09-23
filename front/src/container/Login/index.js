import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Avatar, Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import { isEmail } from 'validator'
import axios from 'axios'
import AuthService from './authService'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '350px',
    '@media (max-width: 376px)': {
      width: '100%'
    }
  }
})

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: null
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.Auth = new AuthService()
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/dashboard')
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLogin = e => {
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err)
      })
  }

  handleSignup = async (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    try {
      await axios.post('http://localhost:5000/api/users', data)
      this.handleLogin()
    } catch (e) {
      alert(err)
    }
  }

  render () {
    const { classes, match } = this.props
    const {email, password} = this.state

    const path = match.path.replace('/', '')

    const link = path === 'login' ? 'signup' : 'login'
    const handleOpt = path === 'login' ? this.handleLogin : this.handleSignup

    const disabled = !!email && !!password && isEmail(email)

    return (
      <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Paper className={classes.root} elevation={1}>
          <TextField
            error={!isEmail(email)}
            name='email'
            label='Email'
            value={email}
            onChange={this.onChange}
            margin='normal'
            style={{ width: '100%' }}
          />
          <TextField
            type='password'
            name='password'
            label='Password'
            value={password}
            onChange={this.onChange}
            margin='normal'
            style={{ width: '100%' }}
          />
          <div style={{textAlign: 'center', marginTop: '1em'}}>
            <Button
              disabled={!disabled}
              name='mealType'
              variant='contained'
              color='secondary'
              onClick={handleOpt}
            >
              {path}
            </Button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1em' }}>
            <Link to={`/${link}`}>{link.toUpperCase()}</Link>
          </div>
        </Paper>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
