<template>
  <div>
    <input type="text" class="todo-input" placeholder="what need to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
      <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining"/>
    </transition-group>

    <div class="extra-container">
      <todo-item-check-all/>
      <todo-item-remaining/>
    </div>

    <div class="extra-container">
      <todo-filtered/>

      <div>
        <transition name="fade">
          <todo-delete-completed/>
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
      }
    },
    computed: {
      anyRemaining() {
        return this.$store.getters.anyRemaining
      },
      todosFiltered() {
        return this.$store.getters.todosFiltered
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.length == 0) {
          return
        }

        this.$store.dispatch('addTodo',{
          id: this.idForTodo,
          title: this.newTodo
        });

        this.newTodo = '';
        this.idForTodo++
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
