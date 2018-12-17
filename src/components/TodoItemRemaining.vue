<template>
  <div>
    <a class="active" >{{remaining}} items Active</a>
    <a>&ensp;&ensp;</a>
    <a class="notactive" >{{remaining1}} items Completed</a>
  </div>
</template>

<script>

  // v-if="remainActive === false" // v-if="remainCompleted === false"
  export default {
    name: "todo-item-remaining",
    props: {
      // remainActive: {
      //   type: Boolean,
      //   required: true
      // },
      // remainCompleted: {
      //   type: Boolean,
      //   required: true
      // }
    },
    computed: {
      remaining() {
        return this.$store.getters.remaining
      },
      remaining1() {
        return this.$store.getters.remaining1
      },

    }
  }
</script>

<style scoped>
  .active {
    border-radius: 3px;
    padding: 0 6px 0 6px;
    background-color: #7ec3de;
  }

  .notactive {
    border-radius: 3px;
    padding: 0 6px 0 6px;
    background-color: #b6deac;
  }


</style>
