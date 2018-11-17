import React, { Component } from 'react'

// material-ui
import {withStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'

// misc
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

// custom
import api from '../../config/api'
import PageTitle from '../App/PageTitle'
import ClassIcon, {classes as classObj} from '../ClassIcon/ClassIcon'

const characterClassOptions = Object.keys(classObj)

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      justifyContent: 'space-around',
      padding: theme.spacing.medium,
      width: 300,
    },
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    }
  },
  avatar: {
    height: 60,
    width: 60,
  }
})


class NewCharacter extends Component {
  state = {
    name: '',
    characterClass: null,
    imageUrl: '',
    loading: false,
    characterId: null,
  }

  handleChangeCharacterName = (e) => {
    var {value} = e.target
    if (value.length > 50) value = value.substr(0, 50)
    this.setState({
      name: value,
    })
  }

  handleChangeCharacterClass = (e) => this.setState({characterClass: e.target.value})
  handleChangeCharacterImage = (e) => this.setState({imageUrl: e.target.value})

  handleCreate = () => {
    this.setState({
      loading: true,
    }, () => {
      const {
        name,
        characterClass: classIndex,
        imageUrl,
      } = this.state
      const characterClass = characterClassOptions[classIndex]
      axios.post(`${api.dnd}/character`, {
        name,
        characterClass,
        imageUrl,
      }).then((res) => {
        const {data} = res
        if (data && data.id) {
          this.setState({
            characterId: data.id
          })
        }
      }).catch((err) => {
        // TODO handle error
      }).finally(() => {
        this.setState({
          loading: false,
        })
      })
    })
  }

  render () {
    const {classes} = this.props
    const {
      name,
      characterClass,
      imageUrl,
      loading,
      characterId,
    } = this.state

    if (characterId) {
      return <Redirect to={`/character/${characterId}`} />
    }

    if (loading) {
      return <CircularProgress />
    }

    console.log(characterClass)
    return (
      <div className={classes.container}>
        <PageTitle title="New Character" />
        <div>
          <Avatar className={classes.avatar} src={imageUrl}>
            {Boolean(imageUrl) || <ClassIcon class={characterClassOptions[characterClass]} />}
          </Avatar>
        </div>
        <div>
          <TextField
            required
            fullWidth
            label="Character Name"
            value={name}
            onChange={this.handleChangeCharacterName}
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel
              htmlFor="character-class"
              required
            >
              Class
            </InputLabel>
            <Select
              inputProps={{id: 'character-class'}}
              fullWidth
              onChange={this.handleChangeCharacterClass}
              value={characterClass}
            >
              {characterClassOptions.map((className, index) =>
                <MenuItem key={className} value={index}>{className}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={this.handleChangeCharacterImage}
          />
        </div>
        <Button
          variant="raised"
          color="primary"
          disabled={name.length < 3 || characterClass === null}
          onClick={this.handleCreate}
        >
          Create
        </Button>
        <Link to="/">
          <Button>
            Cancel
          </Button>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(NewCharacter)
