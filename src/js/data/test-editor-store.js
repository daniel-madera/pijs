import { action, observable } from 'mobx'
import api from './_api'

export default class TestEditorStore {
  @observable tests = []
  @observable words = []
  @observable testWords = []
  @observable modules = []
  @observable selectedModule = undefined
  @observable selectedTest = undefined
  @observable areWordsChanged = false

  constructor() {

  }

  fetchTests(success = () => {}, failure = () => {}) {
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

  fetchModules(success = () => {}, failure = () => {}) {
    if (!this.selectedTest) {
      console.log('No module selected.')
      return
    }

    let store = this
    api.get(`/textbooks/${this.selectedTest.textbook.id}/modules/`).then(response => {
      store.modules = response.data
      if (store.modules.length > 0) {
        store.selectModule(store.modules[0])
      }
      console.log('Modules were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  fetchWordsInModule(success = () => {}, failure = () => {}) {
    if (!this.selectedModule || !this.selectedTest) {
      console.log('No module or test selected.')
      return
    }

    let store = this
    api.get(`/textbooks/${this.selectedTest.textbook.id}/modules/${this.selectedModule.id}/words/`).then(response => {
      store.words = response.data
      console.log('Words were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  fetchWordsInTest(success = () => {}, failure = () => {}) {
    if (!this.selectedTest) {
      console.log('No test selected.')
      return
    }

    let store = this
    api.get(`/tests/${this.selectedTest.id}/words/`).then(response => {
      store.testWords = response.data
      console.log('Words in test were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  saveTestWords(success = () => {}, failure = () => {}) {
    let data = {
      words: this.testWords.map(w => w.id)
    }

    let store = this
    api.post(`/tests/${this.selectedTest.id}/words/`, data).then(response => {
      store.fetchWordsInTest()
      store.areWordsChanged = false
      console.log('Words were successfuly added to test.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  removeWordFromTest(word) {
    let i = this.testWords.indexOf(word)
    if (i >= 0) {
      this.testWords.splice(i, 1)
      this.areWordsChanged = true
    }
  }

  selectModule(m) {
    this.selectedModule = m
    this.fetchWordsInModule()
  }

  selectTest(t) {
    this.selectedTest = t
    this.areWordsChanged = false
    this.fetchModules()
    this.fetchWordsInTest()
  }
}
