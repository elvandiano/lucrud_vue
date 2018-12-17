<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div v-if="!edit" @dblclick="editTodo" class="todo-item-label" :class="{completed : completed}">
        {{title}}
      </div>
      <input v-else class="todo-item-edit" type="text" v-focus v-model="title" @blur="doneEdit"
             @keyup.enter="doneEdit" @keyup.esc="cancelEdit"/>
    </div>
    <div>
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="removeTodo(todo.id)">
        &times;
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "todo-item",
    props: {
      todo: {
        type: Object,
        required: true
      },
      checkAll: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        'id': this.todo.id,
        'title': this.todo.title,
        'completed': this.todo.completed,
        'edit': this.todo.edit,
        'beforeEdit': ''
      }
    },
    created() {
      eventBus.$on('pluralize', this.handlePluralize)
    },
    beforeDestroy() {
      eventBus.$off('pluralize', this.handlePluralize)
    },
    watch: {
      checkAll() {
        this.completed = this.checkAll ? true : this.todo.completed
      }
    },
    directives: {
      focus: {
        inserted: (el) => {
          el.focus();
        }
      }
    },
    methods: {
      removeTodo(id) {
        this.$store.dispatch('deleteTodo', id)
      },
      editTodo() {
        this.beforeEdit = this.title
        this.edit = true
      },
      doneEdit() {
        if (this.title.length == 0) {
          this.title = this.beforeEdit
        }
        this.edit = false

        this.$store.dispatch('updateTodo', {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'edit': this.edit
        })
      },
      cancelEdit() {
        this.edit = false;
        this.title = this.beforeEdit
      },
      pluralize() {
        eventBus.$emit('pluralize')
      },
      handlePluralize() {
        this.title = 'Neo ' + this.title
        const index = this.$store.state.todos.findIndex(item => item.id === this.id)
        this.$store.state.todos.splice(index, 1,
          {
            'id': this.id,
            'title': this.title,
            'completed': this.completed,
            'edit': this.edit
          })
      }
    }
  }
</script>

<style scoped>

</style>
