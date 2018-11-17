import React, {createContext, Component} from 'react'

const {Provider, Consumer} = createContext()

const initialState = {
  appTitle: 'Saturday Night Naturals',
  auth: null,
}

const storageKeys = {
  auth: 'google-auth'
}

class AppState extends Component {
  setAppTitle = (appTitle) => this.setState({appTitle})

  setAuth = (auth) => this.setState({auth})

  state = {
    ...initialState,
    setAppTitle: this.setAppTitle,
    setAuth: this.setAuth,
  }

  handleStorage = (e) => {
    switch (e.key) {
      case storageKeys.auth: {
        const authStr = e.newValue
        const auth = JSON.parse(authStr)
        console.log(auth)
        this.setState({
          auth,
        })
        break
      }
      default:
        // do nothing
    }
  }

  fetchLocalStorage = () => {
    Object.keys(storageKeys).forEach((key) => {
      const stringValue = localStorage.getItem(storageKeys[key])
      const value = JSON.parse(stringValue)
      this.setState({
        [key]: value,
      })
    })
  }

  componentDidMount = () => {
    this.fetchLocalStorage()
    window.addEventListener('storage', this.handleStorage)
  }

  componentWillUnmount = () => {
    window.removeEventListener('storage', this.handleStorage)
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
