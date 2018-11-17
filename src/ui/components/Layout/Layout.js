import React, { Component } from 'react'

// material-ui
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'
// import IconButton from '@material-ui/core/IconButton'
// import MenuOpenIcon from '@material-ui/icons/Menu'
// import MenuCloseIcon from '@material-ui/icons/KeyboardArrowLeft'

// custom
import BackButton from './BackButton'

import {useContext} from '../App/AppState'

const drawerWidth = 250

const styles = theme => ({
  body: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    userSelect: 'none',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  content: {
    margin: theme.spacing.large,
    padding: theme.spacing.large,
    textAlign: 'center',
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBarWithDrawerExtended: {
    marginLeft: drawerWidth,
  },
  spacer: {
    marginLeft: drawerWidth + theme.spacing.large,
  },
})

class Layout extends Component {
  state = {
    menuOpen: false,
  }

  toggleMenuOpen = () => this.setState(({menuOpen}) => ({menuOpen: !menuOpen}))

  render () {
    const {
      classes,
      children,
      appTitle,
    } = this.props
    
    const {
      menuOpen,
    } = this.state


    return (
      <div className={classes.body}>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="persistent"
          open={menuOpen}
          onClose={this.toggleMenuOpen}
        >
          Stuff
        </Drawer>
        <AppBar
          position="static"
          className={menuOpen ? classes.appBarWithDrawerExtended : null}
        >
          <Toolbar>
            {/* <IconButton
              color="inherit"
              onClick={this.toggleMenuOpen}
            >
              {!menuOpen
                ? <MenuOpenIcon />
                : <MenuCloseIcon />
              }
            </IconButton> */}
            <Typography color="inherit" variant="title">Saturday Night Naturals</Typography>
          </Toolbar>
        </AppBar>
        <Paper className={[classes.content, (menuOpen && classes.spacer)].join(' ')}>
          <BackButton />
          <Typography variant="headline">
            {appTitle}
          </Typography>
          {children}
        </Paper>
      </div>
    )
  }
}

export default useContext(withStyles(styles)(Layout))
