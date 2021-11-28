<template>
<div>
  <login :suffix="suffix">
    <template v-slot:welcome><h1>欢迎，尊贵的管理员</h1></template>
  </login>
</div>
</template>

<script>
import login from "@/components/login";

export default {
  name: "AdminLogin",
  data() {
    return {
      suffix:"admin"
    }
  },
  components:{
    login
  },
  methods: {

  }
}
</script>

<style scoped>
#window {
  width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;

  /*ElementUI提供的大圆角和浅色投影*/
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}



</style>