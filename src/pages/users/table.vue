<template>
  <base-table
    :items="tableData"
    :loading="loading" load-btn-text="Показать пользователей"
    :page-size="20"
    :exclusive-height="60 + 10 + 38 + 10 + 32 + 10"
    @load="getItems"
  >
    <base-table-column v-for="col in cols" :key="col.prop" :prop="col.prop" :label="col.label"/>
  </base-table>
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
        {prop: "fullname", label: "Имя пользователя"},
        {prop: "uname", label: "Юзернейм"},
        {prop: "company", label: "Компания"},
        {prop: "email", label: "Почта"},
        {prop: "state", label: "Штат"},
      ],
      items: [],
      tableData: [],
      loading: false,
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
      this.items = items
      this.searchItems()
    },
    searchItems() {
      let keys = ["fullname", "uname", "company", "email", "state"]
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
  },
}
</script>
