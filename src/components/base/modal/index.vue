<template>
  <div v-if="visible" class="base-modal-backdrop" @click.self.once="close">
    <div class="base-modal">
      <base-button type="text" class="base-modal-btn-close" @click.once="close">
        <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <line x1="0" y1="0" x2="15" y2="15" stroke="#000" stroke-width="1"/>
          <line x1="15" y1="0" x2="0" y2="15" stroke="#000" stroke-width="1"/>
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
  watch: {
    visible: {
      handler: function (val) {
        if (val) {
          this.$nextTick(() => {
            window.addEventListener("keydown", this.closeOnEsc)
          })
        } else {
          window.removeEventListener("keydown", this.closeOnEsc)
        }
      },
      immediate: true
    },
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.closeOnEsc)
  },
  methods: {
    close() {
      this.$emit("close")
    },
    closeOnEsc(e) {
      if (e.key === "Escape") {
        this.close()
      }
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
  line-height 2rem
  font-size 1.5rem
  left calc(50% - 400px / 2)
  top 30%
  width 400px
  height fit-content
  background-color #fff
  padding 30px 30px 20px
  box-sizing border-box
  &-btn-close
    position absolute
    border none
    background transparent
    padding 0
    height 15px
    width 15px
    right 15px
    top 15px
    cursor pointer
    &:active, &:focus
      outline none
    & > *
      position absolute
      right 0
      top 0

  &-content
    position relative
    padding-top 5px
    padding-right 5px

</style>
