import React, { Component } from 'react';

// react-router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// material-ui
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from '../../config/muiTheme'
import Typography from '@material-ui/core/Typography'

// custom
import AppState from './AppState'
import Layout from '../Layout/Layout'
import HomePage from '../HomePage/HomePage'
import CharacterSelect from '../CharacterSelect/CharacterSelect'
import Character from '../Character/Character'
import AuthWall from '../Auth/AuthWall'
import Interceptor from './Interceptor';
import NewCharacter from '../NewCharacter/NewCharacter'

class App extends Component {
  

  render() {
    return (
      <AppState>
        <Interceptor />
        <MuiThemeProvider theme={theme}>
          <Typography color="inherit">
            <Router>
              <Layout>
                <AuthWall>
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/character_select" component={CharacterSelect} />
                    <Route path="/character/new" component={NewCharacter} />
                    <Route path="/character/:characterId?" component={Character} />
                  </Switch>
                </AuthWall>
              </Layout>
            </Router>
          </Typography>
        </MuiThemeProvider>
      </AppState>
    );
  }
}

export default App;
