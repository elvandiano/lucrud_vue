<template>
  <div id="app" class="container">
    <img src="./assets/logo.png">
    <todoList></todoList>
  </div>
</template>

<script>
  import todoList from './components/TodoList'

export default {
  name: 'App',
  components:{
    todoList : todoList
  }
}
</script>

<style>

  * {
    box-sizing: border-box;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

  img {
    display: block;
    margin: 20px auto;
    height: 75px;
  }
</style>
