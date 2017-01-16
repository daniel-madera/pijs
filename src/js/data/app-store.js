import { observable } from 'mobx'

import api from './_api'


export default class AppStore {
  @observable message
  @observable languages
  @observable difficulties
  @observable wordClasses
  @observable indicator
  timeout
  indicatorTimeout
  apiURL

  constructor() {
    this.title = "Multimediální jazykový slovníček"
    this.apiURL = 'http://62.201.20.71:48058/'
      // this.apiURL = 'http://localhost:8000/'
    this.message = undefined
    this.timeout = undefined
    this.difficulties = []
    this.languages = []
    this.wordClasses = []
    this.indicator = false
  }

  fetchDifficulties() {
    let store = this
    api.get('/difficulties/')
      .then(function(response) {
        store.difficulties = response.data
        console.log('Difficulties successfuly fetched.')
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchLanguages() {
    let store = this
    api.get('/languages/')
      .then(function(response) {
        store.languages = response.data
        console.log('Languages successfuly fetched.')
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  fetchWordClasses() {
    let store = this
    api.get('/word_classes/')
      .then(function(response) {
        store.wordClasses = response.data
        console.log('Word classes successfuly fetched.')
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  addMessage(type, message) {
    clearTimeout(this.timeout)

    this.message = {
      type: type,
      text: message
    }

    this.timeout = setTimeout(() => {
      this.message = undefined
    }, 7500)
  }

  showIndicator() {
    if (!this.indicator) {
      this.indicator = true
      clearTimeout(this.indicatorTimeout)
      this.timeout = setTimeout(() => {
        this.hideIndicator()
      }, 30000)
    }
  }

  hideIndicator() {
    if (this.indicator) {
      this.indicator = false
    }
  }

  soundNotify() {
    const url = this.apiURL + 'static/notification.mp3'
    let a = new Audio(url)
    a.play()
  }

  checkConnection(success, failure) {
    let store = this
    api.get('/').then(response => {
      success()
    }).catch(function(error) {
      console.log(error)
    })
  }
}
