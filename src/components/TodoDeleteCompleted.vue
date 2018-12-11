<template>
  <button v-if="showClearCompletedButton" @click="clearCompleted">Delete</button>
</template>

<script>
  export default {
    name: "todo-delete-completed",
    props: {
      showClearCompletedButton: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      clearCompleted() {
        eventBus.$emit('deleteCompleted')
      }
    }
  }
</script>

<style scoped>

</style>
