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

  watch: {
    todos: function () {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },

  methods: {
    handleAddTodo() {
      if (this.newTodoText.length < 1) {
        return;
      }

      const newTodo = {
        title: this.newTodoText,
        isDone: false,
        id: Math.floor(Math.random() * 100),
      };
      this.todos = [...this.todos, newTodo];
      this.newTodoText = "";
    },

    handleRemoveTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },

    handleChangeTodoStatus(todoId, value) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isDone: value };
        }
        return todo;
      });
    },

    getTodos() {
      this.todos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    },

    handleFilterTodos(filter) {
      const todos = JSON.parse(localStorage.getItem("todos"));
      console.log("filter", filter);
      switch (filter) {
        case "all":
          return todos;
        case "completed":
          return todos.filter((todo) => todo.isDone);
        case "left":
          return todos.filter((todo) => !todo.isDone);
        default:
          return this.todos;
      }
    },
  },

  mounted() {
    this.getTodos();
  },
  // TODO fix filtering todos
  computed: {
    filteredTodos() {
      return this.todos;
      // return this.handleFilterTodos();
    },
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
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @remove="handleRemoveTodo"
      @check="handleChangeTodoStatus"
    />
  </ul>

  <div v-if="filteredTodos.length > 0" class="todo-list__buttons-wrapper">
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
