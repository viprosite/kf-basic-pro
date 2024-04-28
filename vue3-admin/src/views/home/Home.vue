<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <div class="chart-box" ref="chart"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";

let { proxy } = getCurrentInstance();

let tableData = ref([]);
const getTableList = () => {
  proxy.$api.getTableData().then((res) => {
    // console.log(res.data.data.tableData);
    tableData.value = res.tableData;
  });
};

const renderCharts = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(proxy.$refs.chart);

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "ECharts 示例",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
};

onMounted(() => {
  getTableList();
  renderCharts();
});
</script>

<style lang="less" scoped>
.chart-box {
  height: 300px;
  width: 100%;
}
</style>