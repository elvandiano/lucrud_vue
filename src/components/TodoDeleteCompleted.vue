<template>
  <button v-if="showClearCompletedButton" @click="clearCompleted">Delete</button>
</template>

<script>
  export default {
    name: "todo-delete-completed",
    computed: {
      showClearCompletedButton() {
        return this.$store.getters.showClearCompletedButton
      }
    },
    methods: {
      clearCompleted() {
        return this.$store.dispatch('clearCompleted')
      }
    }
  }
</script>

<style scoped>

</style>
