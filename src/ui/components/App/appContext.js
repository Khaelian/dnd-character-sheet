import React, {createContext} from 'react'

const context = createContext()

export const ContextProvider = context.Provider
const {Consumer} = context

const useContext = (Component) => (props) => {
  return (
    <Consumer>
      {appState =>
        <Component {...appState} {...props} />
      }
    </Consumer>
  )
}

export default useContext
