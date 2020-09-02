<template>
  <div v-if="visible" class="modal-backdrop" @click="close">
    <div class="modal" @keyup.esc="close">
      <base-button class="modal-btn-close" @click="close">
        Close
      </base-button>
      <div class="modal-content">
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
.modal-backdrop
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  width 100%
  height 100%
  z-index 10000
  background-color rgba(0,0,0,0.5)

.modal
  position fixed
  left 50%
  top 50%
  width 250px
  height 250px
  padding 10px
  &-btn-close
    position absolute
    right 10px
    top 10px
  &-content
    position relative
    margin-top 10px

</style>
