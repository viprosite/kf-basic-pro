<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tabsList"
      :closable="item.name == 'home' ? false : true"
      :disable-transitions="false"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
      :key="item.name"
      @click="handleClickTag(item)"
      @close="handleCloseTag(item, index)"
      >{{ item.label }}</el-tag
    >
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();
const tabsList = store.state.tabsList;

const handleClickTag = (item) => {
  router.push({
    name: item.name,
  });
  store.commit("selectMenu", item);
};

const handleCloseTag = (item, index) => {
  let tagLength = tabsList.length - 1; // tag总长度
  let clickTagIndex = index;
  store.commit("removeTag", item);
  //   如果在当前页关闭的是其他页面的tag则关闭tag后不用管
  if (item.name != route.name) return;
  //   关闭的是最后一个时
  if (clickTagIndex == tagLength) {
    handleClickTag(tabsList[tagLength - 1]);
  } else {
    handleClickTag(tabsList[clickTagIndex]);
  }
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>