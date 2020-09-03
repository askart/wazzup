<template>
  <base-input
    v-model="searchStr"
    :minlength="searchMin" :maxlength="searchMax"
    width="960px"
    placeholder="Search"
    :disabled="disabled"
    @input="applySearch"
  />
</template>
<script>
import {escapeStringRegexp} from "@/lib/utils"

export default {
  name: "UsersSearch",
  props: {
    "disabled": {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchStr: "",
      searchMin: 1,
      searchMax: 50,
    }
  },
  methods: {
    applySearch(str) {
      let keywords = (escapeStringRegexp(str)).split(" ").filter(item => item)
      this.$emit("apply", keywords)
    },
  }
}
</script>
