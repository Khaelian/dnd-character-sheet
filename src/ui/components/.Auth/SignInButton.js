import React, { Component } from 'react'

// material-ui
import Button from '@material-ui/core/Button'

// misc
import queryString from 'query-string'

// custom
import context from '../App/appContext'
import api from '../../utils/api'

class SignInButton extends Component {
  signInWindow = () => {
    const queryParams = {
      client_id: api.clientId,
      redirect_uri: `${window.location.origin}/auth/login`,
      response_type: 'token',
      scope: 'profile email',
      include_granted_scopes: true,
    }
    
    const url = `${api.googleSignIn}?${queryString.stringify(queryParams)}`
    const windowProps = 'height=800,width=600'
    window.open(url, '_blank', windowProps)
  }

  componentDidMount = () => {
    
  }

  render () {
    return (
      <div>
        <Button
          onClick={this.signInWindow}
          variant="raised"
          color="primary"
        >
          Sign In
        </Button>
      </div>
    )
  }
}

export default SignInButton
