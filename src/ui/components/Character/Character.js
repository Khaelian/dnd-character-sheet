import React, { Component } from 'react'

// react-router
import {Redirect} from 'react-router-dom'

// custom
import PageTitle from '../App/PageTitle';

// misc
import axios from 'axios'
import {get} from 'lodash'
import api from '../../config/api';

const _ = {get}

class Character extends Component {
  state = {
    redirect: false,
    data: null,
    error: null,
    loading: true,
  }

  fetchCharacter = () => {
    const characterId = _.get(this.props, 'match.params.characterId')
    if (!characterId) {
      this.setState({redirect: true})
      return
    }
    this.setState({
      loading: true,
      error: null,
      data: null,
    }, () => {
      axios.get(`${api.dnd}/character/${characterId}`)
        .then((res) => {
          this.setState({
            error: null,
            data: res.data,
          })
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            data: null,
          })
        })
        .finally(() => this.setState({loading: false}))
    })
  }

  componentDidMount = () => {
    this.fetchCharacter()
  }

  render () {
    const {
      data,
      error,
      loading,
      redirect,
    } = this.state

    if (redirect) return <Redirect to="/" />
    if (loading) {
      return <PageTitle title="Loading" />
    }

    // todo return character not found

    return (
      <div>
        <PageTitle title={data.name} />
      </div>
    )
  }
}

export default Character
