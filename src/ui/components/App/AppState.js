import React, {createContext, Component} from 'react'

const {Provider, Consumer} = createContext()

const initialState = {
  appTitle: 'Saturday Night Naturals',
}

class AppState extends Component {
  setAppTitle = (appTitle) => this.setState({appTitle})

  state = {
    ...initialState,
    setAppTitle: this.setAppTitle,
  }
  render () {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

export const useContext = (Component) => (props) => {
  return (
    <Consumer>
      {appState =>
        <Component {...appState} {...props} />
      }
    </Consumer>
  )
}

export default AppState
