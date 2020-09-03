<template>
  <div :style="width ? `width: ${width}` : ''">
    <div v-if="items.length" class="base-table-container">
      <table class="base-table">
        <thead>
          <tr>
            <th v-for="(col, colIndex) in cols" :key="colIndex" @click="handleSort(col)">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, itemIndex) in items" :key="itemIndex" @click="handleRowClick(item, itemIndex)">
            <td v-for="(col, colIndex) in cols" :key="colIndex">
              {{ item[col.prop] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else style="width: 100%">
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
    "width": {
      type: String,
      default: "",
    },
  },
  methods: {
    handleLoad() {
      this.$emit("load")
    },
    handleSort({prop}) {
      this.$emit("sort", prop)
    },
    handleRowClick(row, rowIndex) {
      this.$emit("row-click", {row, rowIndex})
    },
  },
}
</script>
<style lang="stylus" scoped>
.base-table-container
  width 100%
  overflow auto

table.base-table {
  width: 100%;
  font-family: 'Arial';
  margin: 25px auto;
  border-collapse: collapse;
  border: 1px solid #eee;
  border-bottom: 2px solid #00cccc;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
     0px 10px 20px rgba(0,0,0,0.05),
     0px 20px 20px rgba(0,0,0,0.05),
     0px 30px 20px rgba(0,0,0,0.05);
  tr {
     &:hover {
      background: #f4f4f4;

      td {
        color: #555;
      }
    }
  }
  th, td {
    color: #999;
    border: 1px solid #eee;
    padding: 12px 35px;
    border-collapse: collapse;
  }
  th {
    background: #00cccc;
    color: #fff;
    text-transform: uppercase;
    text-align left
    font-size: 12px;
    &.last {
      border-right: none;
    }
  }
}
</style>
