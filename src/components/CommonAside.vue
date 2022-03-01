<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="false"
    :collapse="isCollapse"
  >
    <h3 v-show="!isCollapse">小滴后台管理系统</h3>
    <h3 v-show="isCollapse">小滴</h3>
    <el-menu-item
      v-for="item in noChild"
      :key="item.path"
      :index="item.path"
      @click="clickItem(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChild" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        v-for="subitem in item.children"
        :key="subitem.path"
        :index="subitem.path"
        @click="clickItem(subitem)"
      >
        {{ subitem.label }}
      </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      menuLabel: [
        {
          path: "/",
          label: "主页",
          name: "home",
          icon: "s-home",
        },
        {
          path: "/video",
          label: "视频管理",
          name: "video",
          icon: "video-play",
        },
        {
          path: "/user",
          label: "用户管理",
          name: "user",
          icon: "user",
        },
        {
          path: "/setting",
          label: "设置",
          name: "setting",
          icon: "setting",
          children: [
            {
              path: "/setting1",
              label: "选项1",
              name: "setting1",
            },
            {
              path: "/setting2",
              label: "选项2",
              name: "setting2",
            },
            {
              path: "/setting3",
              label: "选项3",
              name: "setting3",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChild() {
      return this.menu.filter((item) => !item.children);
    },
    hasChild() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    menu() {
      return this.$store.state.tab.menu;
    },
    defaultActive() {
      let cur = this.$store.state.tab.currentMenu;
      return cur ? cur.path : "/";
    },
  },
  methods: {
    clickItem(item) {
      // const cur = this.$store.state.tab.currentMenu;
      // let isPushRoute = null;
      // if (cur) {
      //   cur.name == item.name ? (isPushRoute = false) : (isPushRoute = true);
      // } else {
      //   item.name == "home" ? (isPushRoute = false) : (isPushRoute = true);
      // }
      // if (isPushRoute) {
      //   this.$router.push({ name: item.name });
      // }
      const data = {
        router: this.$router,
        item,
      };
      this.$store.commit("tab/pushRoute", data);
      this.$store.commit("tab/SELECT", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
h3 {
  margin: 10px 0;
  color: #fff;
  text-align: center;
}
</style>