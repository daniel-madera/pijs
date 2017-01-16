import { action, computed, observable } from 'mobx'
import api from './_api'

export default class ReminderStore {
  @observable words
  @observable selectedWord

  fetchWords(success = () => {}, failure = () => {}) {
    let store = this
    api.get(`/remind/words/`).then(response => {
      store.words = []
      response.data.forEach(d => {
        store.words.push(d.word)
      })

      console.log('Words were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  remind(word, remembered, success = () => {}, failure = () => {}) {
    let store = this
    let data = { 'action': 'success' }
    if (!remembered) {
      data = { 'action': '' }
    }
    api.post(`/remind/words/${word.id}/`, data).then(response => {
      word.following_reminder = response.data['following_reminder']
      console.log('Word\'s reminder saved. Next reminder: ' + response.data['following_reminder'])
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }



}
