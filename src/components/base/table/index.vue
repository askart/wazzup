<template>
  <div>
    <base-table-data
      :items="items | paginate(page.current, page.size)"
      :cols="cols"
      :loading="loading" load-btn-text="Показать пользователей"
      @row-click="handleRowClick"
      @load="$emit('load')"
    />
    <template v-if="pageSize">
      <base-pagination :total-items="items.length" :items-per-page.sync="page.size" :current-page.sync="page.current"/>
    </template>
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
      default: "Загрузить",
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
