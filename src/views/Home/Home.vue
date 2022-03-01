<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" style="height: 242px">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userinfo">
            <p class="name">Nick</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022/2/17</span></p>
          <p>上次登录地点：<span>济南</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 455px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(colInf, key) in tableLabel"
            show-overflow-tooltip
            :key="key"
            :prop="key"
            :label="colInf"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          shadow="hover"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <span class="money">{{ item.value }}</span>
            <span class="text">{{ item.name }}</span>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px" :v-loading="true">
        <EChart
          style="height: 240px; width: 100%"
          :echartData="echartData.order"
        />
      </el-card>
      <div class="gragh">
        <el-card shadow="hover" :v-loading="echartData.userLoading">
          <EChart style="height: 240px" :echartData="echartData.user" />
        </el-card>
        <el-card shadow="hover" :v-loading="echartData.videoLoading">
          <EChart style="height: 240px" :echartData="echartData.video" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import EChart from "../../components/EChart.vue";
export default {
  data() {
    return {
      userImg: require("../../assets/img/user.png"),
      config: {
        loading: false,
      },
      countData: [
        {
          name: "今日支付订单",
          value: "￥1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: "￥1234",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: "￥1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: "￥1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: "￥1234",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: "￥1234",
          icon: "success",
          color: "#5ab1ef",
        },
      ],
      tableData: [],
      tableLabel: {
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
        name: "课程",
      },
      echartData: {
        order: {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
          },
          legend: {
            data: [],
          },
          series: [],
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          yAxis: {
            type: "value",
          },
        },
        orderLoading: false,
        user: {
          legend: {
            data: [],
          },
          xAxis: {
            type: "category",
            data: [],
            axisTick: { show: false },
          },
          yAxis: {
            type: "value",
          },
          series: [],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
        },
        userLoading: false,
        video: {
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [],
        },
        videoLoading: false,
      },
    };
  },
  methods: {
    getTableData() {
      this.$http("/home/getData").then((res) => {
        this.config.loading = true;
        res = res.data;
        this.tableData = res.data.tableData;
        console.log(res.data);
        this.config.loading = false;
        // 订单折线图
        this.echartData.orderLoading = true;
        const order = res.data.orderData;
        this.echartData.order.xAxis.data = order.date;
        let keyArr = Object.keys(order.data[0]);
        this.echartData.order.legend.data = keyArr;
        keyArr.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        this.echartData.orderLoading = false;
        //柱状图
        this.echartData.userLoading = true;
        const user = res.data.userData;
        this.echartData.user.xAxis.data = user.map((item) => item.date);
        keyArr = Object.keys(user[0]).filter((item) => item !== "date");
        this.echartData.user.legend.data = keyArr;
        keyArr.forEach((key) => {
          this.echartData.user.series.push({
            name: key,
            data: user.map((item) => item[key]),
            type: "bar",
          });
        });
        this.echartData.userLoading = false;
        //饼状图
        this.echartData.videoLoading = true;
        this.echartData.video.series.push({
          name: "video",
          data: res.data.videoData,
          type: "pie",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        });
        this.echartData.videoLoading = false;
        // console.log(this.echartData.video.series);
      });
    },
  },
  created() {
    this.getTableData();
  },
  components: {
    EChart,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
</style>