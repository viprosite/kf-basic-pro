<template>
  <el-header>
    <div class="l-content">
      <el-button @click="handleCollapse">
        <el-icon>
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item @click="toHome" :to="{ path: '/' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item v-if="currentMenu" :to="currentMenu.path">{{
          currentMenu.name
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link user">
          <el-icon :size="20"><User /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const currentMenu = computed(() => {
  return store.state.currentMenu;
});

let toHome = () => {
  store.commit("selectMenu", { name: "home" });
};

let handleCollapse = () => {
  store.commit("updateIsCollapse");
};
let handleLogout = () => {
  store.commit("logout");
  router.push("/login");
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 10px;
    }
    .el-breadcrumb {
      :deep(span) {
        color: #fff;
      }
    }
  }
  .r-content {
    .user {
      // width: 40px;
      // height: 40px;
      // border-radius: 50%;
    }
  }
}
</style>