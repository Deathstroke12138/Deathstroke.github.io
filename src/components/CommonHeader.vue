<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" @click="HANDLECOLLAPSE"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current"
          >{{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"
          ><img :src="userImg" class="userImg"
        /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      userImg: require("../assets/img/user.png"),
    };
  },
  computed: {
    ...mapState("tab", ["currentMenu"]),
    current() {
      return this.currentMenu;
    },
  },
  methods: {
    ...mapMutations("tab", ["HANDLECOLLAPSE"]),
    logOut() {
      this.$store.commit("tab/clearMenu"),
        this.$store.commit("user/clearToken"),
        location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  .el-breadcrumb {
    height: 100%;
  }
}
.r-content {
  .userImg {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
}
</style>
<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link:first-child {
  color: #fff;
  font-weight: 700;
}
.el-tabs__new-tab {
  display: none;
}
</style>