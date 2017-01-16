import { action, observable } from 'mobx'
import api from './_api'

export default class TextbookStore {
  @observable tests = []
  @observable selectedGroups = []

  fetch(success = () => {}, failure = () => {}) {
    let store = this
    api.get('/tests/').then(response => {
      store.tests = response.data
      console.log('Tests were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  add(test, success = () => {}, failure = () => {}) {
    let store = this
    api.post('/tests/', test).then(response => {
      console.log('Test was successfuly created.')
      store.fetch()
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  remove(test, success = () => {}, failure = () => {}) {
    let store = this
    api.delete(`/tests/${test.id}/`).then(response => {
      console.log('Test was successfuly deleted.')
      let i = store.tests.indexOf(test)
      store.tests.splice(i, 1)
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  patch(test, data, success = () => {}, failure = () => {}) {
    let store = this
    api.patch(`/tests/${test.id}/`, data).then(response => {
      console.log('Test was successfuly updated.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  toggleSelectedGroups(id) {
    if (!this.selectedGroups.includes(id)) {
      this.selectedGroups.push(id)
    } else {
      let i = this.selectedGroups.indexOf(id)
      this.selectedGroups.splice(i, 1)
    }
  }
}
