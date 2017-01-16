import { shallow } from 'enzyme'
import React from "react"
import {} from '../src/js/global-functions'

import ExamStore from "../src/js/data/exam-store"
import Questioner from '../src/js/components/exam/questioner.js'

describe("Questioner", function() {
  beforeEach(() => {
    this.store = new ExamStore
    this.store.selectedWord = {}
    this.component = new Questioner
  })

  it("Recall vs recognition", () => {
    const { selectedWord } = this.store
    selectedWord.answers = [{
      answer: 'A'
    }, {
      answer: 'R'
    }]
    selectedWord.repeat = 3
    expect(this.component.isRecall()).toBe(false)

    selectedWord.answers = [{
      answer: 'A'
    }, {
      answer: 'A'
    }, {
      answer: 'R'
    }]
    selectedWord.repeat = 3
    expect(this.component.isRecall()).toBe(true)

    selectedWord.answers = [{
      answer: 'R'
    }]
    selectedWord.repeat = 2
    expect(this.component.isRecall()).toBe(false)
  })


})
