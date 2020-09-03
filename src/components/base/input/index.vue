<template>
  <input
    v-bind="$attrs"
    :value="value"
    :class="type == 'default' ? 'base-input' : ''"
    :style="width ? `width: ${width}` : ''"
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
    "type": {
      type: String,
      default: "default",
    },
    "width": {
      type: String,
      default: "",
    },
  },
}
</script>
<style lang="stylus" scoped>
input.base-input
  border 1px solid #0cc
  box-sizing border-box
  padding 1.25rem 0.75rem
  height 14px
  background rgba(255,255,255,0.5)
  margin 0
  &:focus
    outline none
  &:disabled, &[disabled]
    border 1px solid darken(#ccc, 10%)
    background-color #ccc
    color #555
    cursor not-allowed

</style>
