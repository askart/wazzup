<template>
  <div>
    <base-table-data
      :items="items | sort(sortOptions) | paginate(page.current, page.size)"
      :cols="cols"
      :loading="loading" :load-btn-text="loadBtnText"
      :width="width"
      @row-click="handleRowClick"
      @load="$emit('load')"
      @sort="handleSort"
    />
    <template v-if="pageSize">
      <base-pagination :total-items="items.length" :items-per-page.sync="page.size" :current-page.sync="page.current"/>
    </template>
  </div>
</template>
<script>
import paginate from "@/filters/paginate"
import sort from "@/filters/sort"

export default {
  name: "BaseTable",
  filters: {
    paginate,
    sort,
  },
  props: {
    "items": {
      type: Array,
      default: () => [],
    },
    "cols": {
      type: Array,
      default: () => [],
    },
    "pageSize": {
      type: Number,
      default: 10,
    },
    "loading": {
      type: Boolean,
      default: false,
    },
    "loadBtnText": {
      type: String,
      default: "Load",
    },
    "width": {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      page: {
        current: null,
        size: null,
        total: null,
      },
      sortOptions: {
        key: "",
        order: 1,
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
    handleRowClick({row, rowIndex}) {
      this.$emit("row-click", {row, rowIndex})
    },
    handleSort(key) {
      if (this.sortOptions.key == key) {
        this.sortOptions.order *= -1
      } else {
        this.sortOptions.key = key
        this.sortOptions.order = 1
      }
    }
  },
}
</script>
