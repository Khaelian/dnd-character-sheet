import React, { Component } from 'react'

import {Redirect} from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <Redirect to="/character_select" />
    )
  }
}

export default HomePage
