<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["remove", "check"],
  data() {
    return {
      isChecked: this.checked,
    };
  },
};
</script>

<template>
  <li class="todo-item">
    <p class="todo-item__title">{{ title }}</p>
    <button @click="$emit('remove')" class="todo-item__remove-button">X</button>
    <input
      type="checkbox"
      id="checkbox"
      @click="$emit('check')"
      v-model="this.isChecked"
      class="todo-item__checkbox"
    />
  </li>
</template>

<style scoped>
.todo-item {
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr repeat(2, min-content);
  padding: 15px;
  border: 1px solid #ececec;
  border-radius: 15px;
  margin-bottom: 7px;
}

.todo-item__title {
  font-weight: normal;
  letter-spacing: 0.4px;
  color: black;
}

.todo-item__remove-button {
  border: 1px solid #ececec;
  border-radius: 5px;
  margin-right: 10px;
  justify-self: end;
  background: white;
  cursor: pointer;
}

.todo-item__checkbox {
  cursor: pointer;
  width: 22px;
  height: 24px;
}
</style>
