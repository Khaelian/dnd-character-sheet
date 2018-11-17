import React from 'react'

// material-ui
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// custom
import ClassSelectorDialog from './ClassSelectorDialog';
import ClassDetail from './ClassDetail'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  characterClassDisplay: {
    textAlign: 'left',
    flexGrow: 1,
  },
})

const CharacterClass = ({characterClass, onChange, classes}) => {
  return (
    <div className={classes.container}>
      <Typography variant="subheading" color="primary">
        Class
      </Typography>
      <div className={classes.content}>
        <ClassSelectorDialog characterClass={characterClass} onChange={onChange} />
        <ClassDetail characterClass={characterClass} />
      </div>
    </div>
  )
}

export default withStyles(styles)(CharacterClass)
