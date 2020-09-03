<template>
  <div>
    <base-table
      :items="tableData"
      :cols="cols"
      :loading="loading" load-btn-text="Load users data"
      :data-loaded="dataLoaded"
      :page-size="10"
      width="960px"
      @load="getItems"
      @row-click="handleRowClick"
    />
    <base-modal :visible="visible" @close="visible = false">
      <div>
        {{ item.fullname }}
      </div>
      <template v-if="item.address">
        <div>
          {{ item.address.streetAddress }}
        </div>
        <div>
          {{ item.address.city }}, {{ item.address.state }}, {{ item.address.zip }}
        </div>
      </template>
    </base-modal>
  </div>
</template>
<script>
import {get} from "@/api/users"

export default {
  name: "UsersTable",
  props: {
    "searchOptions": {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cols: [
        {prop: "fullname", label: "Full name", width: "22%"},
        {prop: "uname", label: "Username", width: "20%"},
        {prop: "company", label: "Company", width: "23%"},
        {prop: "email", label: "Email", width: "25%"},
        {prop: "addressState", label: "State", width: "10%"},
      ],
      items: [],
      tableData: [],
      dataLoaded: false,
      loading: false,
      visible: false,
      item: {},
    }
  },
  watch: {
    searchOptions() {
      this.searchItems()
    },
  },
  methods: {
    getItems() {
      this.loading = true
      get()
        .then(data => {
          this.setItems(data)
          this.dataLoaded = true
          this.$emit("load")
        })
        .catch((e) => {
          this.setItems()
          throw e
        })
        .finally(() => {
          this.loading = false
        })
    },
    setItems(items = []) {
      this.items = this.formatItems(items)
      this.searchItems()
    },
    formatItems(items) {
      return items.map(item => {
        item.addressState = item.address.state
        return item
      })
    },
    searchItems(items) {
      let keys = ["fullname", "uname", "company", "email", "addressState"]
      this.tableData = this.items
        .filter(item => {
          return this.searchOptions.every(keyword => {
            let regex = new RegExp(keyword, "i")
            return keys.some(key => {
              return regex.test(item[key])
            })
          })
        })
    },
    handleRowClick({row}) {
      this.item = row
      this.visible = true
    },
  },
}
</script>
