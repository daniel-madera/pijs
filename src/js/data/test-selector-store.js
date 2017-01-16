import { action, observable } from 'mobx'
import api from './_api'

export default class TestSelectorStore {
  @observable ownedTests = []
  @observable loggedTests = []
  @observable selectedTest = undefined
  @observable testWords = []

  fetchTests(success = () => {}, failure = () => {}) {
    let store = this
    api.get('/tests/owned/').then(response => {
      store.ownedTests = response.data
      console.log('Tests were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })

    api.get('/tests/logged/').then(response => {
      store.loggedTests = response.data
      console.log('Tests were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }
}
