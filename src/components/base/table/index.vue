<template>
  <div>
    <base-button @click="handleLoad">
      {{ loadBtnText }}
    </base-button>
  </div>
</template>
<script>

export default {
  name: "BaseTable",
  props: {
    "items": {
      type: Array,
      default: () => [],
    },
    "loading": {
      type: Boolean,
      default: false,
    },
    "loadBtnText": {
      type: String,
      default: "Загрузить",
    },
  },
  methods: {
    handleLoad() {
      this.$emit("load")
    },
  },
}
</script>
