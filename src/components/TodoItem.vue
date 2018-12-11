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
      <span class="remove-item" @click="removeTodo(index)">
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
      index: {
        type: Number,
        required: true
      },
      checkAll: {
        type: Boolean,
        required: true
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
    watch: {
      checkAll() {
        // if(this.checkAll) {
        //   this.completed = true
        // } else {
        //   this.completed = this.todo.completed
        // }
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
    created() {
      eventBus.$on('pluralize', this.handlePluralize)
    },
    beforeDestroy() {
      eventBus.$off('pluralize', this.handlePluralize)
    },
    methods: {
      removeTodo(index) {
        eventBus.$emit('removedTodo', index)
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
        eventBus.$emit('finishedEdit', {
          'index': this.index,
          'todo': {
            'id': this.id,
            'title': this.title,
            'completed': this.completed,
            'edit': this.edit
          }
        })
      },
      cancelEdit() {
        this.edit = false;
        this.title = this.beforeEdit
      },
      pluralize() {
        eventBus.$emit('pluralize')
      },
      handlePluralize(){
        this.title = 'Neo ' + this.title
        eventBus.$emit('finishedEdit', {
          'index': this.index,
          'todo': {
            'id': this.id,
            'title': this.title,
            'completed': this.completed,
            'edit': this.edit
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
