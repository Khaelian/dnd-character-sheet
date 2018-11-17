import React from 'react'

// material-ui
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/SupervisorAccount'
import Tooltip from '@material-ui/core/Tooltip'
import {withStyles} from '@material-ui/core/styles'

// misc
import {Link} from 'react-router-dom'

const styles = theme => ({
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: theme.spacing.medium,
  },
})

const BackButton = ({classes}) => {
  // const isCharacterSelect = window.location.pathname === '/character_select'
  // if (isCharacterSelect) return null
  return (
    <Link className={classes.main} to="/">
      <Tooltip
        title="Character Select"
        placement="right"
      >
        <IconButton>
          <BackIcon />
        </IconButton>
      </Tooltip>
    </Link>
  )
}

export default withStyles(styles)(BackButton)
