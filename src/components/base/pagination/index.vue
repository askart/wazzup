<template>
  <div v-if="totalItems" class="base-pagination">
    <base-button :disabled="currentPage <= 1" @click="goToStart">
      start
    </base-button>
    <base-button :disabled="!(currentPage > 1)" @click="goToPrev">
      prev
    </base-button>
    <base-input
      :value="currentPage"
      width="55px"
      pattern="[0-9]+"
      @change="handleChange"
    />
    <base-button :disabled="!(currentPage < lastPage)" @click="goToNext">
      next
    </base-button>
    <base-button :disabled="currentPage >= lastPage" @click="goToEnd">
      end
    </base-button>
  </div>
</template>
<script>

export default {
  name: "BasePagination",
  props: {
    "currentPage": {
      type: Number,
      default: 1,
    },
    "itemsPerPage": {
      type: Number,
      default: null,
    },
    "totalItems": {
      type: Number,
      default: null,
    },
  },
  computed: {
    lastPage() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
  },
  methods: {
    goToStart() {
      this.handleChange(1)
    },
    goToPrev() {
      if (this.currentPage > 1) {
        this.handleChange(this.currentPage - 1)
      }
    },
    goToNext() {
      if (this.currentPage < this.lastPage) {
        this.handleChange(this.currentPage + 1)
      }
    },
    goToEnd() {
      this.handleChange(this.lastPage)
    },
    handleChange(page) {
      let newPage = isNaN(page) ? 1 : +page
      newPage = newPage < 1 ? 1 : newPage > this.lastPage ? this.lastPage : newPage
      this.$emit("update:currentPage", newPage)
    },
  },
}
</script>
<style lang="stylus" scoped>
.base-pagination
  display flex
  flex-flow row nowrap
  align-items center
  justify-content center
  & > *:not(:first-child)
    margin-left 3px

</style>
