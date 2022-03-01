<template>
  <div class="manage">
    <el-dialog
      :title="operateType == 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <common-form :form="operateForm" :formLabel="operateFormLabel" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click.native="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="form"
        ><el-button type="primary" @click="getList(form.keywords)"
          >搜索</el-button
        ></common-form
      >
    </div>

    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @delete="deleteUser"
    />
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
export default {
  data() {
    return {
      isShow: false,
      operateType: "add",
      config: {
        page: 1,
        total: 30,
        loading: false,
        pageSize: 20, //当前一页表格显示数据数量
      },
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: 1,
      },
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
        },
        {
          model: "addr",
          label: "地址",
        },
        {
          model: "age",
          label: "年龄",
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date-picker",
        },
        {
          model: "sex",
          label: "性别",
          options: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
          type: "select",
        },
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
        },
        {
          prop: "addr",
          label: "地址",
        },
      ],
      form: {
        keywords: "",
      },
      formLabel: [
        {
          model: "keywords",
          label: "",
        },
      ],
    };
  },
  components: {
    CommonForm,
    CommonTable,
  },
  methods: {
    getList(name = "") {
      this.config.loading = true;
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
            limit: this.config.pageSize,
            name,
          },
        })
        .then((res) => {
          this.tableData = res.data.list.map((item) => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          console.log(res.data.count);
          this.config.loading = false;
        });
    },
    editUser(row) {
      (this.operateType = "edit"),
        (this.operateForm = row),
        (this.isShow = true);
    },
    addUser() {
      (this.operateType = "add"), (this.operateForm = {}), (this.isShow = true);
    },
    search() {},
    deleteUser(row) {
      if (confirm("确定要删除吗")) {
        this.$http
          .get("api/user/delete", {
            params: {
              id: row.id,
            },
          })
          .then((res) => {
            console.log(res.data.message);
          });
        this.getList();
      }
    },
    confirm() {
      if (this.operateType == "edit") {
        this.$http.post("/api/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
          console.log(res.data.message);
        });
      } else {
        this.$http.post("/api/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
          console.log(res.data.message);
        });
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
</style>