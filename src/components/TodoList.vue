<script setup>
import CustomInput from "./CustomInput.vue";
import TodoItem from "./TodoItem.vue";
import TodoFilters from "./TodoFilters.vue";
import { useTodoStore } from "../store/stores/todoStore";
import { ref, computed, watchEffect } from "vue";

const todoStore = useTodoStore();
const newTodoText = ref("");
const todos = ref([todoStore.todos]);

watchEffect(() => {
  todoStore.setTodos(todos.value);
});

function handleAddTodo() {
  if (newTodoText.value.length < 1) {
    return;
  }

  const newTodo = {
    title: newTodoText.value,
    isDone: false,
    id: Math.floor(Math.random() * 100),
  };
  todos.value = [...todos.value, newTodo];
  newTodoText.value = "";
}

function handleRemoveTodo(todoId) {
  todos.value = todos.value.filter((todo) => todo.id !== todoId);
}

function handleChangeTodoStatus(todoId, value) {
  todos.value = todos.value.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, isDone: value };
    }
    return todo;
  });
}

function handleSetActiveFilter(filter) {
  todoStore.setActiveFilter(filter);
}

const filteredTodos = computed(() => {
  switch (todoStore.activeFilter) {
    case "all":
      return todos.value;
    case "completed":
      return todos.value.filter((todo) => todo.isDone);
    case "left":
      return todos.value.filter((todo) => !todo.isDone);
    default:
      return todos.value;
  }
});
</script>

<template>
  <form v-on:submit.prevent="handleAddTodo" class="todo-list__form">
    <CustomInput
      v-model.trim="newTodoText"
      class="todo-list__add-input"
      placeholder="Enter a new todo"
    />
    <button class="todo-list__button">Add</button>
  </form>
  <ul class="todo-list__todos-wrapper">
    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @remove="handleRemoveTodo"
      @check="handleChangeTodoStatus"
    />
  </ul>

  <div class="todo-list__buttons-wrapper">
    <TodoFilters @filter="handleSetActiveFilter" />
  </div>
</template>

<style scoped>
.todo-list__form {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.todo-list__add-input {
  padding: 10px;
  border: 1px solid #ececec;
  border-radius: 7px;
  margin-right: 5px;
  width: 100%;
}
.todo-list__todos-wrapper {
  padding: 0;
  width: 100%;
  margin-bottom: 20px;
}
.todo-list__button {
  border: 1px solid #ececec;
  border-radius: 7px;
  cursor: pointer;
  padding: 10px;
}

.todo-list__buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
