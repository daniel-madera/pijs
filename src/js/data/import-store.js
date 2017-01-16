import { computed, observable } from 'mobx'
import api from './_api'
import Papa from 'papaparse'

export default class ImportStore {
  textbookId = undefined

  constructor() {
    window.importStore = this
  }

  importCSV(filename, success) {
    Papa.parse(filename, {
      header: true,
      dynamicTyping: true,
      complete: results => {
        if (results.data.length > 0) {
          this.parsedData = results.data
          let data = this.processPapaObject(results.data)
          api.post(`/textbooks/${this.textbookId}/import/`, data).then(response => {
            console.log('Import byl úspěšný.')
            success()
          }, errors => {
            console.log(errors, errors.response)
          })
        } else {
          console.log("Chyba parsování CSV souboru.", results.error)
        }
      }
    });
  }

  processPapaObject(data) {
    this.data = [{
      'title': "Nový modul 1",
      'words': []
    }]
    let currentModule = this.data[0]

    for (let i = 0; i < data.length; i++) {
      let word = data[i]
        // if is a new module line
      if (!word['value'] || !word['meaning']) {
        let moduleName = word['value'] + word['meaning']
          // add a new module to textbook
        this.data.push({
          'title': moduleName.length > 0 ? moduleName : "Nový modul " + this.data.length,
          'words': []
        })
        currentModule = this.data[this.data.length - 1]
      } else {
        word['difficulty_id'] = word['value'].toString().wordDifficulty(word['meaning'])
        word['word_class_id'] = word['word_class']
        delete word['word_class']
        currentModule.words.push(word)
      }
    }
    return this.data
  }

}
