<template>
  <div id="window">
    <slot name="welcome" id="welcome">在此输入欢迎信息</slot>
    <el-form
        ref="ruleForm"
        :model="userInformation"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
        id="form"
    >
      <el-form-item label="账号" prop="username" id="inputItem">
        <el-input v-model="userInformation.username" ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" id="inputItem" @keyup.enter="login">
        <el-input type="password" v-model="userInformation.password" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <el-button type="primary" size="" @click="login">登录</el-button>
    <br>
    <el-button type="text" @click="jump('/register')">没有账号？点击注册</el-button>
    |
    <el-button type="text" @click="jump('/findPassword')">忘记密码？点击这里</el-button>
    <!--不用router-link，因为长得不好看-->
    <!--    <router-link to="/findPassword">忘记密码？点击这里</router-link>-->
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "login",
  props: ["suffix"],
  data() {
    return {
      userInformation: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号！',
            //触发：模糊（对应的还有change改变),blur适用于需要手动输入的文本框，change适合选择框
            trigger: 'blur',
          },
          {
            min: 3,
            max: 15,
            message: '账号长度为3-15位',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码！',
            trie: 'blur',
          },
        ],
      }
    }
  },

  methods: {
    async login() {
      let data;
      let postAPI = this.$root.baseAPI + this.suffix + "/login"
      if (this.userInformation.username === "") {
        alert("用户名为空！");
        return;
      }
      if (this.userInformation.password === "") {
        alert("密码为空！");
        return;
      }
      //有个很蛋疼的坑，axios的请求是异步的，也就是说还在执行请求的时候就已经开始执行下面的代码了（如判断是否跳转）
      //所以需要加入关键字await,要求程序必须先执行完post才开始判断是否跳转！
      await axios.post(postAPI, {
            username: this.userInformation.username,
            password: this.userInformation.password,
          }
      )
          .then((response) => {
                if (response.data === null) {
                  this.$message({
                    message: "用户名与密码不匹配",
                    type: "warning",
                  })
                  return;
                } else {
                  //回调函数里面识别不了全局变量this.$isLogin
                  data = response.data
                  this.$message({
                    message: "登录成功！已为您自动跳转",
                    type: "success",
                  })
                }
              }
          )
          .catch(function (error) {
            alert("登录失败！\n" + error);
            console.log(error);
          });
      if (data) {
        if (this.suffix === "user") {
          this.$root.isLogin = 1;
          this.$root.user = data;
          console.log(this.$root.user);
          this.jump('/server');
        } else if (this.suffix === "admin") {
          this.$root.isLogin = 666;
          this.$root.user = data;
          console.log(this.$root.user);
          this.jump('/admin');
        } else {
          alert("出bug了")
        }


      }
    }
    ,
    jump(routerPath) {
      this.$router.push({path: routerPath})
    }
    ,

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


#inputItem{
  width: 400px;
  margin-left: 50px;
}

</style>