import { shallow } from 'enzyme'
import React from "react"
import {} from '../src/js/global-functions'

import ImportStore from "../src/js/data/import-store"

describe("ImportStore", function() {
  beforeEach(() => {
    this.store = new ImportStore
    this.csv = `value,meaning,definition,usage,difficulty,word_class
      "family","rodina","Group of related people.",,,1
      "run","běhat","Moving faster than walk.","Lucie and Jana run to school.",,5
      "freak","zrůda",,,,1
      "Modul 2",,,,,
      "lift","vlek",,,,1`
    this.parsedData = [{
      "value": "family",
      "meaning": "rodina",
      "definition": "Group of related people.",
      "usage": "",
      "difficulty": "",
      "word_class": 1
    }, {
      "value": "run",
      "meaning": "běhat",
      "definition": "Moving faster than walk.",
      "usage": "Lucie and Jana run to school.",
      "difficulty": "",
      "word_class": 5
    }, {
      "value": "freak",
      "meaning": "zrůda",
      "definition": "",
      "usage": "",
      "difficulty": "",
      "word_class": 1
    }, {
      "value": "Modul 2",
      "meaning": "",
      "definition": "",
      "usage": "",
      "difficulty": "",
      "word_class": ""
    }, {
      "value": "lift",
      "meaning": "vlek",
      "definition": "",
      "usage": "",
      "difficulty": "",
      "word_class": 1
    }]
    this.modules = [{
      "id": 2,
      "created": "2016-11-29T20:45:38.285000Z",
      "modified": "2016-11-29T20:45:38.285000Z",
      "title": "Lekce 1",
      "textbook": 1
    }, {
      "id": 3,
      "created": "2016-11-29T20:45:38.289000Z",
      "modified": "2016-11-29T20:45:38.289000Z",
      "title": "Lekce 2",
      "textbook": 1
    }, {
      "id": 4,
      "created": "2016-11-29T20:45:38.291000Z",
      "modified": "2016-11-29T20:45:38.291000Z",
      "title": "Lekce 3",
      "textbook": 1
    }, {
      "id": 5,
      "created": "2016-11-29T20:45:38.293000Z",
      "modified": "2016-11-29T20:45:38.293000Z",
      "title": "Lekce 4",
      "textbook": 1
    }, {
      "id": 16,
      "created": "2016-12-10T11:13:07.995029Z",
      "modified": "2016-12-10T11:13:07.995052Z",
      "title": "Test lekce",
      "textbook": 1
    }]
  })

  it("Parsing data from CSV", () => {
    this.store.importCSV(this.csv)
    expect(this.store.parsedData.length).toBe(5)
  })

  it("Creating textbook object", () => {
    let textbook = this.store.processPapaObject(this.parsedData)
    expect(textbook.length).toBe(2)
    expect(textbook[1].words[0]['value']).toBe('lift')
  })

})
