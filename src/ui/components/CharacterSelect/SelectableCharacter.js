import React, { Component } from 'react'

// material-ui
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

// custom
import ClassIcon from '../ClassIcon/ClassIcon'

// misc
import {Link} from 'react-router-dom'

const styles = theme => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'color .25s',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.08)',
      color: theme.palette.primary.main,
      '& svg': {
        fill: theme.palette.primary.main,
      },
    },
    padding: theme.spacing.medium,
  },
  avatar: {
    height: 60,
    width: 60,
    // position: 'relative',
  },
  classIcon: {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    fill: 'black',
    height: 45,
    width: 45,
  }
})

class SelectableCharacter extends Component {
  render () {
    const {
      data,
      classes,
      hideClassText,
    } = this.props
    const {
      characterClass,
      name,
      imageUrl,
    } = data

    const characterImage = imageUrl ? (
      <Avatar className={classes.avatar} src={imageUrl} />
    ) : (
      <Avatar className={classes.avatar}><ClassIcon className={classes.classIcon} class={characterClass} /></Avatar>
    )

    return (
      <Link className={classes.row} to={`/character/${data.id}`}>
        {characterImage}
        <Typography
          color="inherit"
          variant="subtitle1"
        >
          {name}
        </Typography>
        <Typography
          color="inherit"
          variant="subtitle1"
        >
          {hideClassText || characterClass}
        </Typography>
      </Link>
    )
  }
}

export default withStyles(styles)(SelectableCharacter)
