<template>
  <div>
    <a class="active" v-if="remainActive === false">{{remaining}} items Active</a> <!--v-if="remainActive === false"-->
    <a>&ensp;&ensp;</a>
    <a class="notactive" v-if="remainCompleted === false" >{{remaining1}} items Completed</a> <!--v-if="remainCompleted === false"-->
  </div>
</template>

<script>
  export default {
    name: "todo-item-remaining",
    computed: {
      remaining() {
        return this.$store.getters.remaining
      },
      remaining1() {
        return this.$store.getters.remaining1
      },
      remainActive() {
        return this.$store.state.remainActive
      },
      remainCompleted() {
        return this.$store.state.remainCompleted
      }
    },
    watch: {

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
