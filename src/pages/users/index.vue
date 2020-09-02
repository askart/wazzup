<template>
  <div>
    <div class="headline-func-bar">
      <div class="func-bar" style="width: 100%">
        <users-search @apply="applySearch"/>
      </div>
    </div>
    <users-table :search-options="searchOptions"/>
  </div>
</template>

<script>
import UsersSearch from "./search"
import UsersTable from "./table"

export default {
  name: "Users",
  components: {
    UsersSearch,
    UsersTable,
  },
  data() {
    return {
      searchOptions: [],
    }
  },
  methods: {
    applySearch(searchOptions) {
      this.searchOptions = searchOptions
    },
  },
}
</script>
