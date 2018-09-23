import React from 'react'
import AuthService from './authService'

const HOST = process.env.API_URL

export default function withAuth (AuthComponent) {
  const Auth = new AuthService(`${HOST}/api`)

  return class AuthWrapped extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        user: null
      }
    }

    componentWillMount () {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login')
      } else {
        try {
          const profile = Auth.getProfile()
          this.setState({
            user: profile
          })
        } catch (e) {
          Auth.logout()
          this.props.history.replace('/login')
        }
      }
    }

    render () {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} {...this.props} />
        )
      } else {
        return null
      }
    }
  }
}
