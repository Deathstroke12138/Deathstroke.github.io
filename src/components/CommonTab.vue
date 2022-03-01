<template>
  <el-tabs type="card" editable @tab-remove="deleteTab" @tab-click="changeMenu">
    <el-tab-pane
      :key="item.name"
      v-for="item in editableTabs"
      :label="item.label"
      :name="item.name"
    >
      <!-- {{ item.content }} -->
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      editableTabs: (state) => state.tab.tabs,
    }),
  },
  data() {
    return {
      // editableTabs: this.$store.state.tab.tabs,
      editableTabsValue: "0",
      tabIndex: 2,
    };
  },
  methods: {
    deleteTab(name) {
      const data = {
        name,
        router: this.$router,
      };
      this.$store.commit("tab/DELETETAB", data);
      console.log(data.router);
    },
    changeMenu(item) {
      const data = {
        router: this.$router,
        item,
      };
      this.$store.commit("tab/pushRoute", data);
      // console.log(item);
      this.$store.commit("tab/SELECT", item);
      this.$store.commit("tab/changeActive", item.$route);
    },
  },
};
</script>

<style>
</style>