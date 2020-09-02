<template>
  <button type="button"
          v-on="$listeners"
  >
    <slot/>
  </button>
</template>
<script>

export default {
  name: "BaseButton",
}
</script>
