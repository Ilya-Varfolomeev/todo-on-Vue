<script>
import TodoItem from "./TodoItem.vue";

export default {
  components: { TodoItem },

  data() {
    return {
      newTodoText: "",
      todos: [],
    };
  },

  methods: {
    changeTodosArr(todosArr) {
      this.todos = todosArr;
      localStorage.setItem("todos", JSON.stringify(todosArr));
    },

    handleAddTodo() {
      if (this.newTodoText.length < 1) {
        return;
      }

      const newTodo = {
        title: this.newTodoText,
        isDone: false,
        id: Math.floor(Math.random() * 100),
      };
      const allTodos = [...this.todos, newTodo];
      this.changeTodosArr(allTodos);
      this.newTodoText = "";
    },

    handleRemoveTodo(todoId) {
      const filteredTodos = this.todos.filter((todo) => todo.id !== todoId);
      this.changeTodosArr(filteredTodos);
    },

    handleChangeTodoStatus(todoId, value) {
      const filteredTodos = this.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isDone: value };
        }
        return todo;
      });
      this.changeTodosArr(filteredTodos);
    },

    handleFilterTodos(filter) {
      const todos = JSON.parse(localStorage.getItem("todos"));
      switch (filter) {
        case "all":
          return (this.todos = todos);
        case "completed":
          return (this.todos = todos.filter((todo) => todo.isDone));
        case "left":
          return (this.todos = todos.filter((todo) => !todo.isDone));
      }
    },

    getTodos() {
      this.todos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    },
  },

  mounted() {
    this.getTodos();
  },
};
</script>
<template>
  <form v-on:submit.prevent="handleAddTodo">
    <input
      type="text"
      placeholder="Enter a new todo"
      v-model.trim="newTodoText"
    />
    <button>Add</button>
  </form>
  <ul>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :title="todo.title"
      :checked="todo.isDone"
      @remove="handleRemoveTodo(todo.id)"
      @check="handleChangeTodoStatus(todo.id, !todo.isDone)"
    />
  </ul>
  <template v-if="this.todos.length > 0">
    <button @click="handleFilterTodos('all')">All</button>
    <button @click="handleFilterTodos('completed')">Completed</button>
    <button @click="handleFilterTodos('left')">Left</button>
  </template>
</template>
