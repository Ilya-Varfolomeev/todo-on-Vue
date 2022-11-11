import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [],
    activeFilter: "all",
  }),
  getters: {
    getTodos: (state) => state.todos,
  },
  actions: {
    setTodos(value) {
      (this.todos = value),
        localStorage.setItem("todos", JSON.stringify(value));
    },
    setActiveFilter(value) {
      this.activeFilter = value;
    },
  },
});
