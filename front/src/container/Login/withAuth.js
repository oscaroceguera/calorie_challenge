import React from 'react'
import AuthService from './authService'

export default function withAuth (AuthComponent) {
  const Auth = new AuthService('http://localhost:5000/api')

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
          console.log('profile', profile)
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
