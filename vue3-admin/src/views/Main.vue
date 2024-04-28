<template>
  <el-container class="common-layout">
    <CommonAside />
    <el-container class="main-container">
      <CommonHeader />
      <CommonTab />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab.vue";

export default defineComponent({
  component: {
    CommonHeader,
    CommonAside,
    CommonTab,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  .main-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
