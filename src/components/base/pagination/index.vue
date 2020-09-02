<template>
  <div>
    <base-button :disabled="currentPage <= 1" @click="goToStart">
      start
    </base-button>
    <base-button :disabled="!(currentPage > 1)" @click="goToPrev">
      prev
    </base-button>
    <base-input
      v-model.number="currentPage"
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
      this.currentPage = 1
      this.handleChange()
    },
    goToPrev() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.handleChange()
      }
    },
    goToNext() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++
        this.handleChange()
      }
    },
    goToEnd() {
      this.currentPage = this.lastPage
      this.handleChange()
    },
    handleChange() {
      this.$emit("update:currentPage", this.currentPage)
    },
  },
}
</script>
