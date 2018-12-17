<template>
  <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodo"> check all </label></div>
</template>

<script>
  export default {
    name: "todo-item-check-all",
    computed: {
      anyRemaining() {
        return this.$store.getters.anyRemaining
      }
    },
    methods: {
      checkAllTodo() {
        return this.$store.dispatch('checkAll', event,target.checked)
      }
    }
  }
</script>

<style scoped>

</style>
