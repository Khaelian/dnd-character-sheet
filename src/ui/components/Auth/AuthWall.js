import React, { Component } from 'react'



// misc
import {Switch, Route} from 'react-router-dom'

// custom
import {useContext} from '../App/AppState'
import LoginSuccess from './LoginSuccess'
import SignInButton from './SignInButton';

class AuthWall extends Component {
  render () {
    const {
      auth,
      children,
    } = this.props
    if (auth && auth.id_token) return children
    return (
      <Switch>
        <Route path="/auth/login" component={LoginSuccess} />
        <Route path="/" component={SignInButton} />
      </Switch>
    )
  }
}

export default useContext(AuthWall)

