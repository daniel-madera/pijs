import { action, observable } from 'mobx'
import api from './_api'

export default class TextbookEditorStore {
  @observable textbookId = undefined
  @observable modules = []
  @observable words = []
  @observable selectedModule = undefined
  @observable showImportModal = false

  constructor() {

  }

  fetchModules(success = () => {}, failure = () => {}) {
    let store = this
    api.get(`/textbooks/${this.textbookId}/modules/`).then(response => {
      store.modules = response.data
      store.selectModule(store.modules[0])
      console.log('Modules were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  fetchWords(success = () => {}, failure = () => {}) {
    if (!this.selectedModule) {
      console.log('No module selected.')
      return
    }

    let store = this
    api.get(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/`).then(response => {
      store.words = response.data
      console.log('Words were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  addWord(data, success = () => {}, failure = () => {}) {
    let store = this
    api.post(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/`, data).then(response => {
      console.log('Word was successfuly created.')
      store.words.push(response.data)
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  addModule(data, success = () => {}, failure = () => {}) {
    let store = this
    api.post(`/textbooks/${this.textbookId}/modules/`, data).then(response => {
      console.log('Module was successfuly created.')
      store.fetchModules()
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  patch(word, data, success = () => {}, failure = () => {}) {
    let store = this
    api.patch(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/${word.id}/`, data).then(response => {
      console.log('Word was successfuly updated.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  savePicture(word, url, success = () => {}, failure = () => {}) {
    let store = this
    let data = {
      action: 'save',
      url: url
    }
    api.post(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/${word.id}/picture/`, data).then(response => {
      console.log('Picture was successfuly saved.')
      word.picture = response.data.path
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  removePicture(word, success = () => {}, failure = () => {}) {
    let store = this
    api.post(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/${word.id}/picture/`, { 'action': 'remove' }).then(response => {
      word.picture = ''
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  saveSound(word, success = () => {}, failure = () => {}) {
    let store = this
    api.post(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/${word.id}/sound/`, { 'action': 'save' }).then(response => {
      console.log('Sound was successfuly saved.')
      word.sound = response.data.path
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  removeSound(word, success = () => {}, failure = () => {}) {
    let store = this
    api.post(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/${word.id}/sound/`, { 'action': 'remove' }).then(response => {
      console.log('Sound was successfuly removed.')
      word.sound = ''
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  remove(word, success = () => {}, failure = () => {}) {
    let store = this
    api.delete(`/textbooks/${this.textbookId}/modules/${this.selectedModule.id}/words/${word.id}/`).then(response => {
      let i = store.words.indexOf(word)
      store.words.splice(i, 1)
      console.log('Word was successfuly deleted.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  selectModule(m) {
    this.selectedModule = m
    this.fetchWords()
  }
}
