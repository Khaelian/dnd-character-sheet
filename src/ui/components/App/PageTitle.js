import React, { Component } from 'react'

import useContext from './appContext'

class PageTitle extends Component {
  setPageTitle = () => {
    const {title} = this.props
    this.props.setAppTitle(title)
    if (title) {
      document.title = `${title} - Saturday Night Naturals`
    } else {
      document.title = `Saturday Night Naturals`
    }
  }
  componentDidMount = () => {
    this.componentDidUpdate()
  }
  
  componentDidUpdate = () => {
    this.setPageTitle()
  }

  shouldComponentUpdate = ({title}) => {
    return title !== this.props.title
  }
  render () {
    return null
  }
}

export default useContext(PageTitle)
