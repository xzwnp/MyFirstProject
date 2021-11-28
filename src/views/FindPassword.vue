<template>
  <div>

    <router-link to="/">返回登录界面</router-link>
    <hr>
    <router-link to="/register">点击这里重开</router-link>
  </div>
</template>

<script>
export default {
  name: "FindPassword",
  methods:{
    tips(){
      alert("请联系管理员。本界面只是为了好看")
    }
  },
  mounted:function(){
    this.tips()
}
}
</script>

<style scoped>

</style>