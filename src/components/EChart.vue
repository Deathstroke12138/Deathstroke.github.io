<template>
  <div class="echart" ref="echart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      echart: null,
      // axisOption: {},
      // normalOption: {
      //   series: [],
      // },
      option: {},
    };
  },
  computed: {
    // options() {
    //   return this.isAxisChart ? this.axisOption : this.normalOption;
    // },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  watch: {
    echartData: {
      deep: true,
      handler: function () {
        this.initChart();
      },
    },
    isCollapse() {
      setTimeout(() => {
        this.echartResize();
      }, 300);
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.option);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.option);
      }
    },
    initChartData() {
      // if (this.isAxisChart) {
      //   // this.axisOption.xAxis.data = this.echartData.xData;
      //   // this.axisOption.series = this.echartData.series;
      //   this.axisOption = { ...this.echartData };
      // } else {
      //   this.normalOption.series = this.echartData.series;
      // }
      this.option = { ...this.echartData };
    },
    echartResize() {
      this.echart && this.echart.resize();
    },
  },
  props: {
    echartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    window.addEventListener("resize", this.echartResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.echartResize);
  },
};
</script>

<style lang='scss' scoped>
</style>