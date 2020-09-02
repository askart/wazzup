<template>
  <div>
    <div v-if="items.length">
      <table>
        <thead>
          <tr>
            <th v-for="(col, colIndex) in cols" :key="colIndex">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, itemIndex) in items" :key="itemIndex">
            <td v-for="(col, colIndex) in cols" :key="colIndex">
              {{ item[col.prop] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <base-button @click="handleLoad">
        {{ loadBtnText }}
      </base-button>
    </div>
  </div>
</template>
<script>

export default {
  name: "BaseTableData",
  props: {
    "items": {
      type: Array,
      default: () => [],
    },
    "cols": {
      type: Array,
      default: () => [],
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
  methods: {
    handleLoad() {
      this.$emit("load")
    },
  },
}
</script>
<style lang="stylus" scoped>
table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: left;
}
</style>
