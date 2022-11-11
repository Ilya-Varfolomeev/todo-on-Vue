import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => {
    return { todos: [], activeFilter: "all" };
  },
  getters: {},
  actions: {},
});
