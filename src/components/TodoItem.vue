<script>
export default {
  props: ["title", "checked"],
  emits: ["remove", "check"],
  data() {
    return {
      isChecked: this.checked,
    };
  },
};
</script>

<template>
  <li>
    {{ title }}
    <button @click="$emit('remove')">Remove</button>
    <input
      type="checkbox"
      id="checkbox"
      @click="$emit('check')"
      v-model="this.isChecked"
    />
  </li>
</template>
