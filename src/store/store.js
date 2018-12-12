// Try to push other branch
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter:'',
    todos: [{
      'id': '1',
      'title': 'The War of Warrior',
      'completed': false,
      'edit': false
    }, {
      'id': '2',
      'title': 'The King of Solomon',
      'completed': false,
      'edit': false
    }]
  },
  getters: {
    // todo gettersss
  },
  mutations: {
    // todo mutation
  },
  actions: {
    // todo action
  }
})
