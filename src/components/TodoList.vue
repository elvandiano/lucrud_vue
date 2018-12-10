<template>
  <div>
    <input type="text" class="todo-input" placeholder="what need to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
    <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index"
               @removedTodo="removeTodo" @finishedEdit="finishedEdit" :checkAll="!anyRemaining">
    </todo-item>
    </transition-group>
    <div class="extra-container">
      <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodo"> check all </label></div>
      <div v-if="remainActive === false">{{remaining}} items Active</div>
      <div v-if="remainCompleted === false">{{remaining1}} items Completed</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{active: filter === 'all'}" @click="filter = 'all'">All</button>
        <button :class="{active: filter === 'active'}" @click="filter = 'active'">Active</button>
        <button :class="{active: filter === 'completed'}" @click="filter = 'completed'">Completed</button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Delete</button>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
  import TodoItem from './TodoItem'

  export default {
    components: {TodoItem},
    name: 'todo-list',
    component: {
      TodoItem
    },
    data() {
      return {
        newTodo: '',
        remainActive: false,
        remainCompleted: false,
        idForTodo: 3,
        beforeEdit: '',
        filter: 'all',
        todosSave: [],
        todos: [{
          'id': '1',
          'title': 'The War of Warrior',
          'completed': false,
          'edit': false
        },
          {
            'id': '2',
            'title': 'The King of Solomon',
            'completed': false,
            'edit': false
          }
        ]
      }
    },
    computed: {
      remaining() {
        return this.todos.filter(todo => !todo.completed).length
      },
      remaining1() {
        return this.todos.filter(todo => todo.completed).length
      },
      anyRemaining() {
        return this.remaining !== 0
      },
      todosFiltered() {
        if (this.filter === 'all') {
          this.remainActive = false;
          this.remainCompleted = false;
          return this.todos
        } else if (this.filter === 'active') {
          this.remainActive = false;
          this.remainCompleted = true;
          return this.todos.filter(todo => !todo.completed)
        } else if (this.filter === 'completed') {
          this.remainCompleted = false;
          this.remainActive = true;
          return this.todos.filter(todo => todo.completed)
        }
        return this.todos
      },
      showClearCompletedButton() {
        return this.todos.filter(todo => todo.completed).length > 0
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.length == 0) {
          return
        }
        this.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          completed: false,
          edit: false
        });

        this.newTodo = '';
        this.idForTodo++
      },
      removeTodo(index) {
        this.todos.splice(index, 1)
      },
      checkAllTodo() {
        this.todos.forEach((todo) => todo.completed = event.target.checked)
      },
      clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed)
      },
      finishedEdit(data) {
        this.todos.splice(data.index, 1 , data.todo)
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
