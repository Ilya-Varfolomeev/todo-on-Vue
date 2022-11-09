<script>
import TodoItem from "./TodoItem.vue";
import TodoFilters from "./TodoFilters.vue";

export default {
  components: { TodoItem, TodoFilters },

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
  <form v-on:submit.prevent="handleAddTodo" class="todo-list__form">
    <input
      type="text"
      placeholder="Enter a new todo"
      v-model.trim="newTodoText"
      class="todo-list__add-input"
    />
    <button class="todo-list__button">Add</button>
  </form>
  <ul class="todo-list__todos-wrapper">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :title="todo.title"
      :checked="todo.isDone"
      @remove="handleRemoveTodo(todo.id)"
      @check="handleChangeTodoStatus(todo.id, !todo.isDone)"
    />
  </ul>

  <div v-if="this.todos.length > 0" class="todo-list__buttons-wrapper">
    <TodoFilters @filter="handleFilterTodos" />
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
