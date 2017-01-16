import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'mobx-react'
import { syncHistoryWithStore, RouterStore } from 'mobx-react-router'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Authentication from './pages/authentication'
import Groups from './pages/groups'
import Exam from './pages/exam'
import Reminder from './pages/reminder'
import Register from './pages/register'
import TestEditor from './pages/test-editor'
import Tests from './pages/tests'
import Textbooks from './pages/textbooks'
import TextbookEditor from './pages/textbook-editor'
import Layout from './pages/layout'
import Welcome from './pages/welcome'

import {} from './global-functions'

import '../css/bootstrap.min.css'
import '../css/bootstrap-tweaks.css'
import '../css/test.css'
import '../css/forms.css'
import '../css/exam.css'

import AppStore from './data/app-store'
import GroupStore from './data/group-store'
import ExamStore from './data/exam-store'
import ImportStore from './data/import-store'
import ReminderStore from './data/reminder-store'
import TestSelectorStore from './data/test-selector-store'
import TestEditorStore from './data/test-editor-store'
import TestStore from './data/test-store'
import TextbookPublicStore from './data/textbook-public-store'
import TextbookEditorStore from './data/textbook-editor-store'
import TextbookStore from './data/textbook-store'
import UserStore from './data/user-store'

const app = document.getElementById('app')

const stores = {}
stores.userStore = new UserStore()
stores.routerStore = new RouterStore()
stores.groupStore = new GroupStore()
stores.appStore = new AppStore()
stores.examStore = new ExamStore()
stores.reminderStore = new ReminderStore()
stores.importStore = new ImportStore()
stores.testSelectorStore = new TestSelectorStore()
stores.testStore = new TestStore()
stores.testEditorStore = new TestEditorStore()
stores.textbookPublicStore = new TextbookPublicStore()
stores.textbookEditorStore = new TextbookEditorStore()
stores.textbookStore = new TextbookStore()

const history = syncHistoryWithStore(browserHistory, stores.routerStore)

stores.appStore.checkConnection(function() {}, function() {
  alert('Omlouváme se, ale server je dočasně nedostupný. Zkuste to prosím později.')
})

window.onbeforeunload = function(e) {}

// AUTOLOGIN for testing purpose
// stores.userStore.login('novak', 'password123')

const requireAuth = (nextState, replace) => {
  if (!stores.userStore.user) {
    stores.routerStore.replace({ pathname: '/auth' })
  }
}

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Welcome} />
        <Route path='/auth' component={Authentication}></Route>
        <Route path='/exam' component={Exam} onEnter={requireAuth}></Route>
        <Route path='/groups' component={Groups} onEnter={requireAuth}></Route>
        <Route path='/reminder' component={Reminder} onEnter={requireAuth}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/tests/:testId' component={TestEditor} onEnter={requireAuth}></Route>
        <Route path='/tests' component={Tests} onEnter={requireAuth}></Route>
        <Route path='/textbooks/:textbookId' component={TextbookEditor} onEnter={requireAuth}></Route>
        <Route path='/textbooks' component={Textbooks} onEnter={requireAuth}></Route>
      </Route>
    </Router>
  </Provider>,
  app);
