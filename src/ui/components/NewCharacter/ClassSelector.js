import React from 'react'

// material-ui
import MenuItem from '@material-ui/core/MenuItem'
import {withStyles} from '@material-ui/core/styles'

// custom
import {classes as classObj} from '../ClassIcon/ClassIcon'

const styles = theme => ({
  container: {
    borderRight: `1px solid ${theme.palette.divider}`,
  }
})

const characterClassOptions = Object.keys(classObj)

const ClassSelector = ({onChange, characterClass, classes}) => {
  return (
    <div className={classes.container}>
      {characterClassOptions.map((classItem) => {
        return (
          <MenuItem
            selected={characterClass === classItem}
            onClick={() => onChange(classItem)}
          >
            {classItem}
          </MenuItem>
        )
      })}
    </div>
  )
}

export default withStyles(styles)(ClassSelector)
