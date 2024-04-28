<template>
  <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      class="el-menu-vertical-demo"
      default-active="/"
      :router="false"
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
      @open="handleOpen"
      @close="handleClose"
    >
      <h3 v-show="!$store.state.isCollapse">后台管理</h3>
      <h3 v-show="$store.state.isCollapse">后台</h3>
      <el-menu-item
        :index="item.path"
        :key="item.path"
        v-for="item in noChildren()"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.path"
        :key="item.path"
        v-for="item in hasChildren()"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="son in item.children"
            :key="son.path"
            :index="son.path"
            @click="clickMenu(son)"
          >
            <component class="icons" :is="son.icon"></component>
            <span>{{ son.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    let list = store.state.menus;
    if (list.length == 0) {
      list = JSON.parse(localStorage.getItem("menus"));
    }
    const noChildren = () => {
      return list.filter((item) => !item.children);
    };
    const hasChildren = () => {
      return list.filter((item) => item.children);
    };

    const router = useRouter();
    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });
      store.commit("selectMenu", item);
    };

    const handleOpen = () => {};
    const handleClose = () => {};

    return {
      noChildren,
      hasChildren,
      clickMenu,
      handleOpen,
      handleClose,
    };
  },
});
</script>

<style lang="less" scoped>
aside {
  transition: all 0.3s;
  background-color: #545c64;
  .el-menu {
    height: 100%;
    border-right: none;
    h3 {
      line-height: 48px;
      text-align: center;
      color: #fff;
    }
  }
}
.icons {
  width: 18px;
  height: 18px;
}
</style>