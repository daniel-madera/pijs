import { action, observable } from 'mobx'
import api from './_api'

export default class TextbookStore {
  @observable textbooks

  constructor() {
    this.textbooks = []
  }

  fetch(success = () => {}, failure = () => {}) {
    let store = this
    api.get('/textbooks/').then(response => {
      store.textbooks = response.data
      console.log('Textbooks were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  add(textbook, success = () => {}, failure = () => {}) {
    let store = this
    api.post('/textbooks/', textbook).then(response => {
      console.log('Textbook was successfuly created.')
      store.fetch()
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  remove(textbook, success = () => {}, failure = () => {}) {
    let store = this
    api.delete('/textbooks/' + textbook.id + '/').then(response => {
      console.log('Textbook was successfuly deleted.')
      let i = store.textbooks.indexOf(textbook)
      store.textbooks.splice(i, 1)
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  patch(textbook, data, success = () => {}, failure = () => {}) {
    let store = this
    api.patch('/textbooks/' + textbook.id + '/', data).then(response => {
      console.log('Textbook was successfuly updated.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }
}
