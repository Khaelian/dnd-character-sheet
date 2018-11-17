import React, { Component } from 'react'

// misc
import axios from 'axios'
import queryString from 'query-string'
import moment from 'moment'

// custom
import { useContext } from '../App/AppState';
import api from '../../config/api'

class LoginSuccess extends Component {
  componentDidMount = () => {
    var auth = queryString.parse(window.location.search)
    
    axios.post(`${api.dnd}/auth`, auth)
      .then((res) => {
        const {data} = res
        localStorage.setItem('google-auth', JSON.stringify(data))
      })
      .catch((err) => {
        console.log('err', err.message)
      })
      .finally(() => {
        window.close()
      })
  }
  render () {
    return (
      <div>
        Finalizing Logon
      </div>
    )
  }
}

export default useContext(LoginSuccess)
