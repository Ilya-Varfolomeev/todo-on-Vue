<script setup lang="ts">
import { defineEmits } from "vue";

type Emits = {
  (e: "filter", settings: String): void;
};

const emit = defineEmits<Emits>();

function handleFilter(settings: String) {
  emit("filter", settings);
}
</script>

<template>
  <button @click="handleFilter('all')" class="todo-filters__button">All</button>
  <button @click="handleFilter('completed')" class="todo-filters__button">
    Completed
  </button>
  <button @click="handleFilter('left')" class="todo-filters__button">
    Left
  </button>
</template>

<style scoped>
.todo-filters__button {
  border: 1px solid #ececec;
  border-radius: 5px;
  justify-self: end;
  background: white;
  padding: 10px;
  cursor: pointer;
}
</style>
