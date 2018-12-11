<template>
  <div>
    <a class="active" v-if="remainActive === false">{{remaining}} items Active</a>
    <a>&ensp;&ensp;</a>
    <a class="notactive" v-if="remainCompleted === false">{{remaining1}} items Completed</a>
  </div>
</template>

<script>
  export default {
    name: "todo-item-remaining",
    props: {
      remaining: {
        type: Number,
        required: true
      },
      remaining1: {
        type: Number,
        required: true
      },
      remainActive: {
        type: Boolean,
        required: true
      },
      remainCompleted: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style scoped>
  .active{
    border-radius: 3px;
    padding: 0 6px 0 6px;
    background-color: #7ec3de;
  }
  .notactive{
    border-radius: 3px;
    padding: 0 6px 0 6px;
    background-color: #b6deac;
  }

</style>
