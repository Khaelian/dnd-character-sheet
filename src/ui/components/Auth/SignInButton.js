import React, { Component } from 'react'

// material-ui
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

// misc
import queryString from 'query-string'

// custom
import PageTitle from '../App/PageTitle'
import api from '../../config/api'

const styles = theme => ({
  button: {
    margin: 20,
  }
})

class SignInButton extends Component {
  handleClick = () => {
    const queryParams = {
      client_id: api.clientId,
      redirect_uri: `${window.location.origin}/auth/login`,
      scope: 'profile email',
      access_type: 'offline',
      response_type: 'code',
      include_granted_scopes: true,
    }
    const url = `${api.googleSignIn}?${queryString.stringify(queryParams)}`
    const windowProps = 'height=800,width=600'
    window.open(url, '_blank', windowProps)
  }

  render () {
    const {classes} = this.props
    return (
      <React.Fragment>
        <PageTitle />
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={this.handleClick}
          >
          Google Sign-In
        </Button>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SignInButton)
