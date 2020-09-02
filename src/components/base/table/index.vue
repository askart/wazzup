<template>
  <div>
    <base-table-data
      :data="items | paginate(page.current, page.size)"
      :size="size"
      @row-click="handleRowClick"
      @load="$emit('load')"
    >
      <slot/>
    </base-table-data>
    <base-pagination :total-items="items.length" :items-per-page.sync="page.size" :current-page.sync="page.current"/>
  </div>
</template>
<script>
import paginate from "@/filters/paginate"

export default {
  name: "BaseTable",
  filters: {
    paginate,
  },
  props: {
    "items": {
      type: Array,
      default: () => [],
    },
    "pageSize": {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      page: {
        current: null,
        size: null,
        total: null,
      },
    }
  },
  watch: {
    items: {
      handler: function (val) {
        this.page.current = 1
        this.page.total = val.length
      },
      immediate: true
    },
    pageSize: {
      handler: function (val) {
        this.page.size = val
      },
      immediate: true
    },
  },
  methods: {
    handleRowClick(row) {
      this.$emit("row-click", row)
    }
  },
}
</script>
