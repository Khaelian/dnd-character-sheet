import React, { Component } from 'react'

// misc
import axios from 'axios'

// custom
import {useContext} from './AppState'

class Interceptor extends Component {
  componentDidMount = () => {
    axios.interceptors.request.use((config) => {
      const {auth} = this.props
      if (auth && auth.id_token) {
        const Authorization = `Bearer ${auth.id_token}`
        config.headers.Authorization = Authorization
      }
      
      return config
    })
    axios.interceptors.response.use((response) => {
      return response
    }, (err) => {
      if (err.response.status === 401) {
        this.props.setAuth(null)
      }
    })
  }
  componentWillUnmount = () => {

  }
  render () {
    return null
  }
}

export default useContext(Interceptor)
