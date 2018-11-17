import React, { Component } from 'react'

// material-ui
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

// custom
import ClassDetail from './ClassDetail'
import ClassSelector from './ClassSelector';

const styles = theme => ({
  dialogContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

class ClassSelectorDialog extends Component {
  state = {
    popupVisible: false,
    selectedClass: null,
  }

  togglePopupVisible = () => {
    this.setState(({popupVisible}) => ({
      popupVisible: !popupVisible,
      selectedClass: this.props.characterClass,
    }))
  }
  handleChangeSelectedClass = (selectedClass) => this.setState({selectedClass})

  handleSelect = () => {
    this.props.onChange(this.state.selectedClass)
    this.togglePopupVisible()
  }

  render () {
    const {
      classes,
      characterClass,
      onChange,
    } = this.props

    const {
      popupVisible,
      selectedClass,
    } = this.state

    const hasEmphasis = !Boolean(characterClass)

    return (
      <div>
        <Button
          onClick={this.togglePopupVisible}
          variant={hasEmphasis ? 'raised' : 'flat'}
          color={hasEmphasis ? 'primary' : 'default'}
        >
          Select A Class
        </Button>
        <Dialog
          open={popupVisible}
          onClose={this.togglePopupVisible}
        >
          <DialogTitle>
            Select A Class
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <ClassSelector characterClass={selectedClass} onChange={this.handleChangeSelectedClass} />
            <ClassDetail characterClass={selectedClass} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.togglePopupVisible}
            >
              Close
            </Button>
            <Button
              onClick={this.handleSelect}
              color="primary"
              disabled={!selectedClass}
            >
              Select
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ClassSelectorDialog)
