<template>
  <div v-if="visible" class="base-modal-backdrop" @click="close">
    <div class="base-modal" @keyup.esc="close">
      <base-button type="text" class="base-modal-btn-close" @click="close">
        <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <line x1="0" y1="0" x2="10" y2="10" stroke="#000" stroke-width="1"/>
          <line x1="10" y1="0" x2="0" y2="10" stroke="#000" stroke-width="1"/>
        </svg>
      </base-button>
      <div class="base-modal-content">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "BaseModal",
  props: {
    "visible": {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close")
    },
  },
}
</script>
<style lang="stylus" scoped>
.base-modal-backdrop
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  width 100%
  height 100%
  z-index 10000
  background-color rgba(0,0,0,0.5)

.base-modal
  position absolute
  left calc(50% - 200px / 2)
  top calc(40% - 200px / 2)
  width 200px
  height fit-content
  background-color #fff
  padding 10px 10px 10px
  &-btn-close
    position absolute
    border none
    background transparent
    padding 0
    height 10px
    width 10px
    right 10px
    top 10px
    &:active, &:focus
      outline none
  &-content
    position relative
    margin-top 10px
</style>
