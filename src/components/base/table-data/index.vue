<template>
  <div :style="width ? `width: ${width}` : ''">
    <div v-if="items.length" class="base-table-container">
      <table class="base-table">
        <thead>
          <tr>
            <th v-for="(col, colIndex) in cols" :key="colIndex" :style="`width: ${col.width}`" @click="handleSort(col)">
              {{ col.label }}
              <i v-if="sortOptions.key == col.prop" class="base-table__sort-icon">
                {{ sortOptions.order === 1 ? "&#9650;" : "&#9660;" }}
              </i>
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
    <div v-else style="width: 100%;">
      <table class="base-table">
        <thead>
          <tr>
            <th style="width: 100%;"/>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="height: 450px; text-align: center; box-sizing: border-box;">
              <template v-if="dataLoaded">
                No data
              </template>
              <template v-else>
                <base-button :disabled="loading" @click="handleLoad">
                  {{ loadBtnText }}
                </base-button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
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
    "dataLoaded": {
      type: Boolean,
      default: false,
    },
    "width": {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      sortOptions: {
        key: "",
        order: 1,
      },
    }
  },
  methods: {
    handleLoad() {
      this.$emit("load")
    },
    handleSort({prop}) {
      if (this.sortOptions.key == prop) {
        this.sortOptions.order *= -1
      } else {
        this.sortOptions.key = prop
        this.sortOptions.order = 1
      }
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
  table-layout: fixed;
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
        cursor: help;
      }
    }
  }
  th, td {
    color: #999;
    border: 1px solid #eee;
    padding: 1rem 1.5rem;
    border-collapse: collapse;
  }
  th {
    background: #00cccc;
    color: #fff;
    text-transform: uppercase;
    text-align: left;
    font-size: 1rem;
    &.last {
      border-right: none;
    }
  }
}
.base-table
  th
    position relative
    user-select none
    cursor pointer
  &__sort-icon
    position absolute
    top 1rem
    right 0.5rem
    font-size 1rem
    color #fff

</style>
