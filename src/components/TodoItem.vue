<script>
export default {
  props: {
    todo: {
      id: Number,
      title: String,
      isDone: Boolean,
    },
  },
  emits: ["remove", "check"],
  data() {
    return {
      isChecked: this.checked,
    };
  },
  watch: {
    isChecked: function () {
      this.$emit("check", this.todo.id, !this.todo.isDone);
    },
  },
};
</script>

<template>
  <li class="todo-item">
    <p class="todo-item__title">{{ this.props.todo.title }}</p>
    <button
      @click="$emit('remove', this.props.todo.id)"
      class="todo-item__remove-button"
    >
      X
    </button>
    <input
      type="checkbox"
      id="checkbox"
      v-model="isChecked"
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
