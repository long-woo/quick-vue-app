import * as types from '../mutation-types'

const state = {
  userName: ''
}

const getters = {
  userName: state => state.userName
}

const mutations = {
  [types.SET_USERNAME] (state, name) {
    state.userName = name
  }
}

const actions = {
  setUserName ({commit, state}, name) {
    commit(SET_USERNAME, name)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
