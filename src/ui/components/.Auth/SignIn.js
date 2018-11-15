import React from 'react'

// material-ui
import Paper from '@material-ui/core/Paper'

// react-router
import {Redirect} from 'react-router-dom'

// custom
import SignInButton from './SignInButton'
import context from '../App/appContext'
import { Typography } from '@material-ui/core'

const SignIn = ({token, tokenExpiry}) => {
  console.log({
    token,
    tokenExpiry,
  })
  if (token && tokenExpiry && tokenExpiry > new Date()) {
    return <Redirect to="/" />
  }

  const style = {
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
    },
    typography: {
      paddingBottom: 8,
    },
  }
  return (
    <div style={style.container}>
      <Paper style={style.paper}>
        <Typography style={style.typography} variant="subheading">
          Google Sign-In Required
        </Typography>
        <SignInButton />
      </Paper>
    </div>
  )
}

export default context(SignIn)
