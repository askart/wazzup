<template>
  <input
    v-bind="$attrs"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  >
</template>
<script>

export default {
  name: "BaseInput",
  props: {
    "value": {
      type: [String, Number],
      default: "",
    },
  },
}
</script>
