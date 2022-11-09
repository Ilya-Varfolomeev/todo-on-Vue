<script setup>
import TodoList from "./components/TodoList.vue";
</script>

<template>
  <header>
    <p>Make your TODO List</p>
  </header>

  <main>
    <TodoList />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
