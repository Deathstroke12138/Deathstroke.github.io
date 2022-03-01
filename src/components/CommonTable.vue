<template>
  <div class="common-table">
    <el-table :data="tableData" stripe height="90%" v-loading="config.loading">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * config.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
      >
        <template v-slot="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      :page-size="config.pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete", row);
    },
    changePage() {
      this.$emit("changePage");
    },
  },
  props: ["tableData", "tableLabel", "config"],
};
</script>

<style lang='scss' scoped>
.common-table {
  height: 90%;
  position: relative;
  .el-pagination {
    position: absolute;
    right: 20px;
    bottom: 0;
  }
}
</style>