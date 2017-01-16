import { action, computed, observable } from 'mobx'
import api from './_api'

export default class ExamStore {
  @observable words
  @observable test
  @observable done
  @observable selectedWord
  @observable hintLevel
  @observable lastAnswer
  @observable testPhase
  @observable leitnerCats

  constructor() {
    this.reset()
  }

  reset() {
    this.words = []
    this.done = []
    this.test = undefined
    this.selectedWord = undefined
    this.hintLevel = 0
    this.testPhase = 0
    this.lastAnswer = undefined
  }

  startTest(words, test) {
    this.test = test
    this.words = words
    this.checkAdaptiveDifficulty()
    this.sortWordsToMotivate()
    this.selectWord(this.words[0])
  }

  selectWord(word) {
    if (!word.answers)
      word.answers = []

    if (!word.repeat)
      word.repeat = undefined

    this.selectedWord = word
  }

  checkAdaptiveDifficulty() {
    this.words.forEach(w => {
      if (w.word_users && w.word_users.length === 1) {
        w.difficulty = w.word_users[0].adaptive_difficulty
      }
    })
  }

  sortWordsToMotivate() {
    // sorts words the easiest, the most difficult, 
    // second easiest, second most difficult...
    var tmp = this.words.slice()
    var i

    this.words = []
    var easiest = true

    while (tmp.length > 0) {
      if (easiest) {
        i = this.findMinDifficulty(tmp)
        easiest = false
      } else {
        i = this.findMaxDifficulty(tmp)
        easiest = true
      }
      this.words.push(tmp[i])
      tmp.splice(i, 1)
    }
  }

  findMaxDifficulty(words) {
    var difficulties = []
    words.forEach(w => difficulties.push(w.difficulty))
    return difficulties.indexOf(difficulties.max())
  }

  findMinDifficulty(words) {
    var difficulties = []
    words.forEach(w => difficulties.push(w.difficulty))
    return difficulties.indexOf(difficulties.min())
  }

  @action
  answer(text, isRecall) {
    var rightAnswer = isRecall ? this.selectedWord.value : this.selectedWord.meaning
    var dist = rightAnswer.levenshtein(text)
    var answerType = this.answeredWithHint(this.answerType(dist, rightAnswer.length), this.hintLevel)

    if (!this.selectedWord.repeat) {
      this.selectedWord.repeat = this.repeat(answerType, this.selectedWord.difficulty)
    }

    let answ = {
      isRecall: isRecall,
      answer: answerType,
      hintLevel: this.hintLevel
    }

    this.lastAnswer = answ

    this.selectedWord.answers.push(answ)

    if (this.isDone(this.selectedWord)) {
      this.selectedWord.done = true
      this.done.push(this.selectedWord)
      this.words = this.words.filter(w => w != this.selectedWord)
      console.log('Word is done!')
      this.saveWord(this.selectedWord)
      if (this.words.length === 0) {
        console.log('Test is done!')
        return this.reset()
      }
    }
  }

  @action
  nextWord() {
    this.lastAnswer = undefined
    this.hintLevel = 0

    if (this.testPhase === 0) {
      var currentI = this.words.indexOf(this.selectedWord)
      if (currentI + 1 === this.words.length) {
        this.testPhase = 1
        this.splitToLeitnerCats()
        this.selectWord(this.words[0])
        return true
      } else {
        this.selectWord(this.words[currentI + 1])
        return true
      }
    }

    if (!this.done.includes(this.selectedWord)) {
      this.selectedWord.leitnerCat = this.newLeitnerCat()
    }

    if (!this.done.includes(this.selectedWord)) {
      this.placeCurrentQuestion()
    }

    this.selectedWord.flag = true
    this.selectedWord = this.words.find(w => w.leitnerCat <= this.testPhase && !w.flag)

    if (!this.selectedWord) {
      this.words.forEach(w => w.flag = false)
      this.selectedWord = this.words[0]
      this.testPhase = (this.testPhase + 1) % 4
    }
  }

  placeCurrentQuestion() {
    const questionsLeitnerCat = this.words.filter(w => w.leitnerCat === this.selectedWord.leitnerCat && !w.done)
    const lastInLeitnerCat = questionsLeitnerCat[questionsLeitnerCat.length - 1]
    const iCurrent = this.words.indexOf(this.selectedWord)
    const iLastInLeitnerCat = this.words.indexOf(lastInLeitnerCat)

    for (let i = iCurrent; i < iLastInLeitnerCat; i++) {
      this.words[i] = this.words[i + 1]
    }

    this.words[iLastInLeitnerCat] = this.selectedWord
  }

  newLeitnerCat() {
    var cat = this.selectedWord.leitnerCat
    const a = this.selectedWord.answers[this.selectedWord.answers.length - 1].answer !== 'W'

    if (this.testPhase === 1 || this.testPhase === 2) {
      return a ? 2 : 1
    } else if (this.testPhase === 3) {
      return !a ? 1 : (cat === 3 ? 3 : cat + 1)
    }

    return cat
  }

  isDone(word) {
    // checks last anwers of passed word
    // returns true if last n answers are A or R and last answer is not A
    // otherwise returns false
    let answers = word.answers.concat()
    answers = answers.slice(1)
    if (answers.length < word.repeat) {
      return false
    }
    answers = answers.slice(-1 * word.repeat)
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].answer === 'W') {
        return false
      }
    }

    if (answers[answers.length - 1].answer === 'A') {
      return false
    }

    return true
  }

  splitToLeitnerCats() {
    this.words = this.words.sort(this.sortByLastAnswerDifficulty)

    const int = Math.floor(this.words.length / 3)
    let setLeitnerCat = (i) => {
      return (q) => { q.leitnerCat = i }
    }
    for (var i = 1; i < 3; i++) {
      this.words.slice((i - 1) * int, i * int).forEach(setLeitnerCat(i))
    }
    this.words.slice(2 * int).forEach(setLeitnerCat(3))
  }

  sortByLastAnswerDifficulty(a, b) {
    let answers = { 'W': 1, 'A': 2, 'R': 3 }
    let numA = answers[a.answers.slice(-1)[0]['answer']]
    let numB = answers[b.answers.slice(-1)[0]['answer']]
    if (numA > numB) return 1
    if (numB > numA) return -1
    if (a.difficulty > b.difficulty) return -1
    if (a.difficulty < b.difficulty) return 1
    return 0
  }


  repeat(answer, difficulty) {
    // returns number of required successful answers
    // based on answer and global difficulty

    if (answer === 'W' && difficulty >= 3) {
      return 3
    }

    if (answer !== 'W' && difficulty <= 2) {
      return 1
    }

    if (difficulty <= 3) {
      return 2
    }

    return 3
  }

  answeredWithHint(answer, hintLevel) {
    // if student used more than one hint, 
    // answer level is lowered
    if (hintLevel >= 1 && answer === 'R') {
      return 'A'
    }

    return answer
  }

  answerType(levenDist, answerLength) {
    // 1/6 wrong letter == spelling mistake
    var l = Math.floor(answerLength / 6)
    if (levenDist === 0) {
      return 'R'
    }
    if (levenDist <= l) {
      return 'A'
    }

    return 'W'
  }

  fetchTestWords(test, success = () => {}, failure = () => {}) {
    let store = this
    api.get(`/tests/${test.id}/words/exam/`).then(response => {
      store.startTest(response.data, test)
      console.log('Words were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  saveWord(word, success = () => {}, failure = () => {}) {
    let data = {
      words: [{
        id: word.id,
        difficulty: this.getLeitnerDifficulty(word.leitnerCat),
        done: word.done ? 'True' : '',
        test: this.test.id
      }]
    }
    this.saveUserWords(data, success, failure)
  }

  getLeitnerDifficulty(leitnerCat) {
    if (leitnerCat === 1)
      return 3
    else if (leitnerCat === 3)
      return 1

    return 2
  }

  saveWords(success = () => {}, failure = () => {}) {
    if (this.testPhase === 0) {
      return success()
    }

    let data = {
      words: []
    }

    this.words.forEach(w => {
      data.words.push({
        id: w.id,
        difficulty: this.getLeitnerDifficulty(w.leitnerCat),
        done: w.done ? 'True' : '',
        test: this.test.id
      })
    })

    this.done.forEach(w => {
      data.words.push({
        id: w.id,
        difficulty: this.getLeitnerDifficulty(w.leitnerCat),
        done: w.done ? 'True' : '',
        test: this.test.id
      })
    })

    this.saveUserWords(data, success, failure)
  }

  saveUserWords(data, success = () => {}, failure = () => {}) {
    let store = this
    api.post(`/words/user/`, data).then(response => {
      console.log('User\'s words are successfuly saved.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }
}
