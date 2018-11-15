import React, { Component } from 'react';

// react-router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// material-ui
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from '../../config/muiTheme'
import Typography from '@material-ui/core/Typography'

// custom
import {ContextProvider} from './appContext'
import Layout from '../Layout/Layout'
import HomePage from '../HomePage/HomePage'
import CharacterSelect from '../CharacterSelect/CharacterSelect'
import Character from '../Character/Character'

const initialState = {
  appTitle: 'Saturday Night Naturals',
}

class App extends Component {
  setAppTitle = (appTitle) => this.setState({appTitle})

  state = {
    ...initialState,
    setAppTitle: this.setAppTitle,
  }

  render() {
    return (
      <ContextProvider value={this.state}>
        <MuiThemeProvider theme={theme}>
          <Typography color="inherit">
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/character_select" component={CharacterSelect} />
                <Route path="/character/:characterId?" component={Character} />
              </Switch>
              </Layout>
            </Router>
          </Typography>
        </MuiThemeProvider>
      </ContextProvider>
    );
  }
}

export default App;
