<script setup>
import TodoList from "./components/TodoList.vue";
</script>

<template>
  <div class="app__wrapper">
    <p class="app__title">Make your TODO List</p>

    <main class="app__main">
      <TodoList />
    </main>
  </div>
</template>

<style scoped>
.app__title {
  line-height: 15px;
  letter-spacing: 2px;
  margin-bottom: 15px;
  color: black;
  text-align: center;
  margin: 25px 0;
}

.app__wrapper {
  width: 100vh;
  height: 100vh;
  grid-column: 1 / -1;
  background: white;
}
.app__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  max-width: 450px;
  margin: 0 auto;
}
</style>
