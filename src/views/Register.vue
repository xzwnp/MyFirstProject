<template>
  <div id="total">
    <h1>注 册</h1>
    <div>
      <br style="clear:both">
      <el-form
          ref="ruleForm"
          :model="userInformation"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          status-icon
          id="form"
          style="margin-bottom: 30px"
      >
        <el-form-item label="账号" prop="username" class="input">
          <el-input v-model="userInformation.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName" class="input">
          <el-input v-model="userInformation.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="input">
          <el-input type="password" v-model="userInformation.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="password2" class="input">
          <el-input type="password" v-model="userInformation.password2" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" style="text-align: left" class="input">
          <el-radio-group v-model="userInformation.sex">
            <el-radio id="register" label=true>男</el-radio>
            <el-radio id="register" label=false>女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" prop="age" class="input" style="width: 200px">
          <el-input v-model="userInformation.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" size="large" @click="submitForm()"
        >注册
        </el-button
        >
        <el-button size="large" @click="resetForm('ruleForm')">重置</el-button>
        <br>
      </el-form>
      <el-button size="small" @click="jump('/login')" label-position="left">返回登录</el-button>
      <el-button size="small" @click="jump('/findPassword')">忘记密码?点击这里</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  //自定义校验规则实现确认密码
  data() {
    let confirmPassword = (rule, value, callback) => {
      if (value !== this.userInformation.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      postAPI: this.$root.userAPI + "register",
      userInformation: {
        username: "",
        nickName: '',
        password: "",
        password2: "",
        sex: null,
        age: null,
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用于登录的账号！',
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
        nickName: [
          {
            required: true,
            message: '昵称不能为空',
            //触发：模糊（对应的还有change改变),blur适用于需要手动输入的文本框，change适合选择框
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: '昵称长度为3-10位!',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码！',
            trie: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: '密码长度为6至20位！',
            trigger: 'blur',
          },
        ],
        password2: [
          {
            required: true,
            message: '请再次输入密码！',
            trie: 'blur',
          },
          {
            validator: confirmPassword,
            trigger: 'blur',
          },
        ],

      },
    }
  },
  methods: {
    submitForm() {
      console.log(this.userInformation);
      if (!confirm("确定提交吗？")) {
        return;
      }
      axios({
        method: 'post',
        url: this.postAPI,
        data: this.userInformation
      })
          .then(function (response) {
            console.log(response.data);
            if (response.data === "success") {
              alert("注册成功！即将为您跳转到登录界面");
            } else if (response.data === "registered") {
              alert("该账号已被注册");
            } else {
              alert("注册失败!");
            }
          })
          .catch(function (error) {
            alert("注册失败！");
            console.log(error);
          });
      this.jump('/login');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    jump(routerPath) {
      this.$router.push({path: routerPath})
    },
  },
  components: {
    // Register,
  }
}
</script>
<style scoped>


#total {
  width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;

  /*ElementUI提供的大圆角和浅色投影*/
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.input {
  width: 400px;
  margin-left: 50px;
}


</style>