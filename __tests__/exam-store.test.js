import { shallow } from 'enzyme'
import React from "react"
import {} from '../src/js/global-functions'

import ExamStore from "../src/js/data/exam-store"

describe("ExamStore", function() {
  beforeEach(() => {
    this.store = new ExamStore
  })

  it("Leitner cat REPEAT", () => {
    expect(this.store.repeat('A', 2)).toBe(1)
    expect(this.store.repeat('W', 2)).toBe(2)
    expect(this.store.repeat('W', 3)).toBe(3)
    expect(this.store.repeat('A', 2)).toBe(1)
  })

  it("Answering", () => {
    expect(this.store.answerType(1, 6)).toBe('A')
    expect(this.store.answerType(0, 2)).toBe('R')
    expect(this.store.answerType(2, 5)).toBe('W')
  })

  it("Done", () => {
    let word = {
      repeat: 3,
      answers: [{ answer: 'W' }, { answer: 'R' }, { answer: 'R' }]
    }
    expect(this.store.isDone(word)).toBe(false)
    word = {
      repeat: 2,
      answers: [{ answer: 'W' }, { answer: 'A' }, { answer: 'R' }]
    }
    expect(this.store.isDone(word)).toBe(true)
    word = {
      repeat: 2,
      answers: [{ answer: 'W' }, { answer: 'R' }, { answer: 'A' }]
    }
    expect(this.store.isDone(word)).toBe(false)
  })

})
