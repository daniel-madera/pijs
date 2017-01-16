import { computed, observable } from 'mobx'
import api from './_api'

export default class TextbookPublicStore {
  @observable textbooksPublic
  @observable selectedTextbook
  @observable selectedTextbookTitle
  @observable filterValue

  constructor() {
    this.textbooksPublic = []
    this.filterValue = ''
    this.selectedTextbook = undefined
  }

  @computed get filteredTextbooks() {
    let val = this.filterValue

    function filterText(textbook) {
      if (!val) return true
      return (
        textbook.title.includes(val) ||
        textbook.language.includes(val) ||
        textbook.owner.includes(val)
      )
    }
    return this.textbooksPublic.filter(filterText)
  }

  fetch(success = () => {}, failure = () => {}) {
    let store = this
    api.get('/textbooks/public/').then(response => {
      store.textbooksPublic = response.data
      console.log('Textbooks were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }


}
