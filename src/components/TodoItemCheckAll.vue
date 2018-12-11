<template>
  <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodo"> check all </label></div>
</template>

<script>
  export default {
    name: "todo-item-check-all",
    props: {
      anyRemaining: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      checkAllTodo() {
        eventBus.$emit('checkAllChange', this.anyRemaining)
      },
    }
  }
</script>

<style scoped>

</style>
