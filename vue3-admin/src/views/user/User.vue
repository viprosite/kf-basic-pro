<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script  setup>
import { ref, getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();

let tableData = ref([]);
onMounted(() => {
  proxy.$api.getUserData().then((res) => {
    console.log(res);
    tableData.value = res.list;
  });
});
</script>
