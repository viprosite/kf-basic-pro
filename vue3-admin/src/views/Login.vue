<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="pwd">
      <el-input v-model="form.pwd" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();
// do not use same name with ref
const form = reactive({
  name: "",
  pwd: "",
});

const onSubmit = () => {
  proxy.$api.login(form).then((res) => {
    console.log(res);
    if (res) {
      let { menus, token } = res;
      store.commit("updateMenus", menus);
      store.commit("refreshMenus", router);
      store.commit("setToken", token);
      router.push("/");
    }
  });
};
</script>
