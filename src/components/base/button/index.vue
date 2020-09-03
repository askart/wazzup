<template>
  <button type="button"
          :class="type == 'default' ? 'base-btn' : ''"
          v-on="$listeners"
  >
    <slot/>
  </button>
</template>
<script>

export default {
  name: "BaseButton",
  props: {
    "type": {
      type: String,
      default: "default",
    },
  },
}
</script>
<style lang="stylus" scoped>
button.base-btn {
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid darken(#0cc, 5%);
    padding: 0.75rem 1.5rem;
    margin: 0;
    text-decoration: none;
    background: #0cc;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    user-select: none;
}

button.base-btn:hover,
button.base-btn:focus {
    background: darken(#0cc, 10%);
}

button.base-btn:focus {
    outline: none;
}

button.base-btn:active {
    transform: scale(0.99);
}

button.base-btn:disabled,
button.base-btn[disabled]{
  border: 1px solid darken(#ccc, 10%);
  background-color: #ccc;
  color: #555;
  cursor: not-allowed;
}
</style>
