<template>
  <div>
    <input type="text" class="todo-input" placeholder="what need to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
      <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index"
                 :checkAll="!anyRemaining">
      </todo-item>
    </transition-group>
    <div class="extra-container">
      <todo-item-check-all :anyRemaining="anyRemaining"/>
      <todo-item-remaining :remain-active="remainActive" :remain-completed="remainCompleted" :remaining="remaining"
                           :remaining1="remaining1"/>
    </div>
    <div class="extra-container">
      <todo-filtered/>
      <div>
        <transition name="fade">
          <todo-delete-completed :showClearCompletedButton="showClearCompletedButton"/>
        </transition>
      </div>
    </div>

  </div>
</template>
<script>
  import TodoDeleteCompleted from './TodoDeleteCompleted'
  import TodoFiltered from './TodoFiltered'
  import TodoItemCheckAll from './TodoItemCheckAll'
  import TodoItemRemaining from './TodoItemRemaining'
  import TodoItem from './TodoItem'

  export default {
    name: 'todo-list',
    components: {
      TodoDeleteCompleted,
      TodoFiltered,
      TodoItemRemaining,
      TodoItem,
      TodoItemCheckAll
    },
    data() {
      return {
        newTodo: '',
        remainActive: false,
        remainCompleted: false,
        idForTodo: 3,
        beforeEdit: '',
        // filter: '',
        todosSave: [],
        // todos: [{
        //   'id': '1',
        //   'title': 'The War of Warrior',
        //   'completed': false,
        //   'edit': false
        // },
        //   {
        //     'id': '2',
        //     'title': 'The King of Solomon',
        //     'completed': false,
        //     'edit': false
        //   }
        // ]
      }
    },
    created() {
      eventBus.$on('removedTodo', (index) => this.removeTodo(index))
      eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
      eventBus.$on('checkAllChange', (check) => this.checkAllTodo(check))
      eventBus.$on('filterChange', (filter) => this.$store.state.filter = filter)
      eventBus.$on('deleteCompleted', (deleted) => this.clearCompleted(deleted))
    },
    beforeDestroy() {
      eventBus.$off('removedTodo', (index) => this.removeTodo(index))
      eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
      eventBus.$off('checkAllChange', (check) => this.checkAllTodo(check))
      eventBus.$off('filterChange', (filter) => this.$store.state.filter = filter)
      eventBus.$off('deleteCompleted', (deleted) => this.clearCompleted(deleted))
    },
    computed: {
      remaining() {
        return this.$store.state.todos.filter(todo => !todo.completed).length
      },
      remaining1() {
        return this.$store.state.todos.filter(todo => todo.completed).length
      },
      anyRemaining() {
        return this.remaining !== 0
      },
      todosFiltered() {
        if (this.$store.state.filter === 'all') {
          this.remainActive = false;
          this.remainCompleted = false;
          return this.$store.state.todos
        } else if (this.$store.state.filter === 'active') {
          this.remainActive = false;
          this.remainCompleted = true;
          return this.$store.state.todos.filter(todo => !todo.completed)
        } else if (this.$store.state.filter === 'completed') {
          this.remainCompleted = false;
          this.remainActive = true;
          return this.$store.state.todos.filter(todo => todo.completed)
        }
        return this.$store.state.todos
      },
      showClearCompletedButton() {
        return this.$store.state.todos.filter(todo => todo.completed).length > 0
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.length == 0) {
          return
        }
        this.$store.state.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          completed: false,
          edit: false
        });

        this.newTodo = '';
        this.idForTodo++
      },
      removeTodo(index) {
        this.$store.state.todos.splice(index, 1)
      },
      checkAllTodo() {
        this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked)
      },
      clearCompleted() {
        this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
      },
      finishedEdit(data) {
        this.$store.state.todos.splice(data.index, 1, data.todo)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .todo-input {
    width: 100%;
    padding: 10px 10px;
    font-size: 20px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: green;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #0f0d40;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: #60eecd;
    }

    &:focus {
      outline: none;
    }

  }

  .active {
    background: lightgreen;
  }

  //CSS Transition
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
