<template>
  <div>
      <h1>请选择您的登录方式</h1>
      <el-button type="primary" @click="jump('/login')">点我跳转到用户登录界面</el-button>
      <el-button type="primary" @click="jump('/adminLogin')">请我跳转到管理员登录界面</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    jump(routerPath) {
      //$router里存储了一些路由的相关信息
      this.$router.push({path: routerPath})
    },
  },
}
</script>

<style scoped>

</style>