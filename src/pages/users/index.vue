<template>
  <div>
    <div class="search-bar">
      <users-search @apply="applySearch"/>
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
<style lang="stylus" scoped>
.search-bar
  display flex
  flex 0 0 auto
  flex-flow row nowrap
  align-items center
  margin 0 0 10px
</style>
