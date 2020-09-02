<template>
  <div>
    <base-table
      :items="tableData"
      :loading="loading" load-btn-text="Показать пользователей"
      :page-size="20"
      :exclusive-height="60 + 10 + 38 + 10 + 32 + 10"
      @load="getItems"
      @row-click="handleRowClick"
    >
      <base-table-column v-for="col in cols" :key="col.prop" :prop="col.prop" :label="col.label"/>
    </base-table>
    <base-modal :visible="visible" @close="visible = false">
      <div>
        {{ item.fullname }}
      </div>
      <div>
        {{ item.address.streetAddress }}
      </div>
      <div>
        {{ item.address.city }}, {{ item.address.state }}, {{ item.address.zip }}
      </div>
    </base-modal>
  </div>
</template>
<script>
import {get} from "@/api/users"
import {deepClone} from "@/lib/utils"

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
        {prop: "id", label: "ID"},
        {prop: "fullname", label: "Имя пользователя"},
        {prop: "uname", label: "Юзернейм"},
        {prop: "company", label: "Компания"},
        {prop: "email", label: "Почта"},
        {prop: "state", label: "Штат"},
      ],
      items: [],
      tableData: [],
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
      this.items = deepClone(items)
      this.foundItems = this.searchItems(this.items)
    },
    searchItems(items) {
      let keys = ["fullname", "uname", "company", "email", "state"]
      return items
        .filter(item => {
          return this.searchOptions.every(keyword => {
            let regex = new RegExp(keyword, "i")
            return keys.some(key => {
              return regex.test(item[key])
            })
          })
        })
    },
    handleRowClick({id}) {
      this.item = this.tableData.find(item => item.id == id)
      this.visible = true
    },
  },
}
</script>
