import React, { Component } from 'react'

// material-ui
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// custom
import useContext from '../App/appContext'

// misc
import axios from 'axios'
import PageTitle from '../App/PageTitle';
import SelectableCharacter from './SelectableCharacter';

const styles = theme => ({
  container: {

  },
  paper: {
    margin: theme.spacing.large,
  },
  characterContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
})

class CharacterSelect extends Component {
  state = {
    loading: false,
    characters: null,
    error: null,
  }

  fetchCharacters = () => {
    this.setState({
      loading: true,
      error: null,
      characters: null,
    }, () => {
      axios.get('http://localhost:8080/api/character')
        .then((res) => {
          const {data} = res
          console.log(data)
          this.setState({
            characters: data,
            error: null,
          })
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            characters: null,
          })
        })
        .finally(() => {
          this.setState({
            loading: false,
          })
        })
    })
  }

  componentDidMount = () => {
    this.fetchCharacters()
  }

  render () {
    const {
      classes,
    } = this.props
    const {
      loading,
      error,
      characters: characterData,
    } = this.state

    var content
    if (loading) {
      content = <CircularProgress />
    } else if (error) {
      content = (
        <div>
          Error retrieving characters: {error}
        </div>
      )
    } else if (!characterData) {
      content = (
        <div>
          No character data was returned from the server.
        </div>
      )
    } else {
      content = Object.keys(characterData).map((id) => {
        console.log(characterData[id])
        return <SelectableCharacter id={id} data={characterData[id]} />
      })
    }

    return (
      <div className={classes.container}>
        <PageTitle title="Character Select" />
        <div className={classes.characterContainer}>
          {content}
        </div>
      </div>
    )
  }
}

export default useContext(withStyles(styles)(CharacterSelect))
