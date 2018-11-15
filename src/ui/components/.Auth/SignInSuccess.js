import React, { Component } from 'react'

// material-ui
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// misc
import axios from 'axios'
import queryString from 'query-string'
import moment from 'moment'

// custom
import api from '../../utils/api'

class SignInSuccess extends Component {
  state = {
    loaded: false,
  }
  componentDidMount = () => {
    var auth = queryString.parse(window.location.hash)
    const expire_timestamp = moment().add('second', auth.expires_in).toDate()
    auth.expire_timestamp = expire_timestamp

    axios({
      method: 'GET',
      url: api.userProfile,
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`
      },
    }).then((res) => {
      const {data} = res
      auth = {
        ...auth,
        ...data,
      }
      localStorage.setItem('google-auth', JSON.stringify(auth))
    }).catch((err) => {
      console.log('Error accessing profile', err.message)
    }).finally(() => {
      setTimeout(this.closeSuccessWin, 1000)
    })

    setTimeout(() => {
      this.setState({
        loaded: true,
      })
    }, 0)
  }

  closeSuccessWin = () => {
    window.close()
  }

  render () {
    const {loaded} = this.state
    const style = {
      container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,.13)',
        userSelect: 'none',
      },
      paper: {
        padding: 20,
        borderRadius: 5000,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 2s',
      },
    }
    return (
      <div style={style.container}>
        <Paper style={style.paper}>
          <Typography variant="headline">
            Fetching Logon Details
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default SignInSuccess
