<template>
  <div id="app">
    <div>
      <!--      <img alt="Vue logo" id="logo" src="./assets/communism.jpg" width="50" height="50">-->
      <el-col :span="12" style="float: left">
        <el-button @click="$root.jump('/')" style="width: 100%;text-align: left" icon="el-icon-s-home
          ">回主界面
        </el-button>
        <br>
        <el-button @click="$root.jump('/server')" icon="el-icon-s-custom">预约界面（需要登录）</el-button>
        <br>
        <el-button @click="$root.jump('/admin')" icon="el-icon-s-data">后台管理（需要登录）</el-button>
      </el-col>
      <el-button type="success" style="float: right" plain>{{ this.$root.getNickName }}</el-button>

    </div>
    <div class="clear"></div>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("./assets/background.jpg");

}
h1 {
  color: azure;
  text-shadow:2px 2px #2c3e50;
  margin-bottom: 30px;
}
.clear {
  clear: both;
}

#showUsername {
  float: right;
}

#welcome {
  font-style: italic;
  color: #409EFF;
}
.el-form-item__label{
  color: aliceblue;
}

.el-radio{
  color: #f0f9eb;
}
</style>
