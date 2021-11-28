<template>
  <login :suffix="suffix">
        <template v-slot:welcome><h1>欢迎使用本系统</h1></template>
  </login>
</template>

<script>
import login from "@/components/login";
export default {
  name: "NormalLogin",
  data(){
    return{
      suffix: "user",
    }
  },
  components:{login},
}
</script>

<style scoped>

</style>