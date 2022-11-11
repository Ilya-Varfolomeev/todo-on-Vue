import { storeToRefs } from "pinia";
import { useTodoStore } from "./stores/todoStore";

export const rootStore = {
  setup() {
    const store = useTodoStore();
    const { todos, activeFilter } = storeToRefs(store);

    return {
      todos,
      activeFilter,
    };
  },
};
