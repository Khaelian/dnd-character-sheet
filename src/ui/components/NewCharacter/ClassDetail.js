import React from 'react'

// material-ui
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// custom
import ClassIcon from '../ClassIcon/ClassIcon';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.large,
    width: 300,
  },
  classIcon: {
    margin: theme.spacing.large,
    height: 100,
    width: 100,
  },
})

const ClassDetail = ({characterClass: className, classDescription, classes}) => {
  return (
    <div className={classes.container}>
      <Typography variant="title">{className}</Typography>
      <ClassIcon className={classes.classIcon} class={className} />
      <Typography>
        {classDescription}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(ClassDetail)
