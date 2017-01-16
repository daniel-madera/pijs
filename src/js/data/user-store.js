import { observable } from 'mobx'
import api from './_api'

export default class UserStore {
  @observable user = undefined
  @observable statistics = undefined

  login(username, password, success = () => {}, failure = () => {}) {
    let store = this
    api.post('/api-token-auth/', {
        username: username,
        password: password
      })
      .then(function(response) {
        store.user = response.data.user
        store.setToken(response.data.token)
        success()
        console.log('Login successful')
      })
      .catch(function(error) {
        console.log(error)
        failure()
      })
  }

  register(data, success, failure) {
    let store = this
    api.post('/users/', data).then(function(response) {
      success()
      console.log('Registration was successful.')
    }).catch(function(error) {
      console.log(error.response)
      failure()
    })
  }

  setToken(token) {
    api.defaults.headers.common['Authorization'] = 'JWT ' + token
  }

  logout(success = () => {}, failure = () => {}) {
    this.user = undefined
    this.statistics = undefined
    api.defaults.headers.common['Authorization'] = ''
    success()
  }

  fetchStatistics(success = () => {}, failure = () => {}) {
    let store = this
    api.get('/statistics/').then(response => {
      store.statistics = response.data
      console.log('Statistics were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  validateUsername(username, success = () => {}, failure = () => {}) {
    let store = this
    let data = {
      username: username
    }
    api.post('/users/is_valid/', data).then(response => {
      console.log('Username is valid.')
      success()
    }, errors => {
      console.log('Username already exists.')
      failure()
    })
  }
}
