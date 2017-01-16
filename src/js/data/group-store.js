import { action, observable } from 'mobx'
import api from './_api'

export default class GroupStore {
  @observable ownedGroups
  @observable loggedGroups

  constructor() {
    this.ownedGroups = []
    this.loggedGroups = []
  }

  fetchOwned(success = () => {}, failure = () => {}) {
    let store = this
    api.get('/groups/owned/').then(response => {
      store.ownedGroups = response.data
      console.log('Owned groups were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  fetchLogged(success = () => {}, failure = () => {}) {
    let store = this
    api.get('/groups/logged/').then(response => {
      store.loggedGroups = response.data
      console.log('Logged groups were successfuly fetched.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  add(group, success = () => {}, failure = () => {}) {
    let store = this
    api.post('/groups/owned/', group).then(response => {
      console.log('Group was successfuly created.')
      store.fetchOwned()
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  remove(group, success = () => {}, failure = () => {}) {
    let store = this
    api.delete(`/groups/owned/${group.id}/`).then(response => {
      console.log('Group was successfuly deleted.')
      let i = store.ownedGroups.indexOf(group)
      store.ownedGroups.splice(i, 1)
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  patch(group, data, success = () => {}, failure = () => {}) {
    let store = this
    api.patch('/groups/owned/' + group.id + '/', data).then(response => {
      console.log('Group was successfuly updated.')
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  signIn(data, success = () => {}, failure = () => {}) {
    let store = this
    api.post('/groups/logged/', data).then(response => {
      console.log('Group was successfuly added.')
      store.fetchLogged()
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }

  signOut(group, success = () => {}, failure = () => {}) {
    let store = this
    api.delete(`/groups/logged/${group.id}/`).then(response => {
      console.log('Group was successfuly removed.')
      let i = store.loggedGroups.indexOf(group)
      store.loggedGroups.splice(i, 1)
      success()
    }, errors => {
      console.log(errors, errors.response)
      failure()
    })
  }
}
