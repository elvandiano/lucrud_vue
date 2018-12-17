// Try to push other branch
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//state is like data return
//getters is like computed


export const store = new Vuex.Store({
  state: {
    filter: '',
    remainActive: false,
    remainCompleted: false,
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
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    remaining1(state) {
      return state.todos.filter(todo => todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0
    },
    todosFiltered(state) {
      if (state.filter == 'all') {
        state.remainActive = false;
        state.remainCompleted = false;
        return state.todos
      } else if (state.filter == 'active') {
        state.remainActive = false;
        state.remainCompleted = true;
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        state.remainCompleted = false;
        state.remainActive = true;
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        edit: false
      })
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => todo.completed = checked)
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'edit': todo.edit
      })
    }
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(() => {
        context.commit('addTodo', todo)
      },50)
    },
    clearCompleted(context) {
      context.commit('clearCompleted')
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    checkAll(context, checked) {
      context.commit('checkAll', checked)
    },
    deleteTodo(context, id) {
      context.commit('deleteTodo', id)
    },
    updateTodo(context, todo) {
      context.commit('updateTodo', todo)
    }
  }
})
