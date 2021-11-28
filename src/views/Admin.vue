<template>
  <div id="admin">
    <h1>这是后台管理系统</h1>
    <el-button @click="getUserList" style="float: left" type="primary" plain>点我刷新所有信息</el-button>
    <el-button @click="handleCreate" style="float:right" type="primary" plain>新建</el-button>
    <el-table
        :data="userList"
        border
        height="450">
      <!--      关于prop：vue会自动寻找列表中每个对象的id属性-->
      <el-table-column
          fixed
          prop="id"
          label="id"
          width="170">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="170">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="昵称"
          width="170">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="170">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
          width="170">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          width="170">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="170">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="info" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--显示编辑信息的对话框-->
    <el-dialog
        title="更改"
        :visible.sync="dialogVisible"
        width="70%">
      <div>
        ID:&nbsp;{{ updateInfo.id }} &nbsp;&nbsp;&nbsp;&nbsp;
        用户名&nbsp;
        <el-input type="text" class="updateInput" v-model="updateInfo.username"></el-input>
        昵称&nbsp;
        <el-input type="text" class="updateInput" v-model="updateInfo.nickName"></el-input>
        密码&nbsp;
        <el-input type="text" class="updateInput" v-model="updateInfo.password"></el-input>
        年龄&nbsp;
        <el-input type="text" class="updateInput" v-model="updateInfo.age"></el-input>
        性别&nbsp;
        <el-radio-group v-model="updateInfo.sex">
          <el-radio label="男" value="男">男</el-radio>
          <el-radio label="女" value="女">女</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="新建"
        :visible.sync="createDialogVisible"
        width="70%">
      <div>
        ID: 系统自动生成 &nbsp;&nbsp;&nbsp;&nbsp;
        用户名&nbsp;
        <el-input type="text" class="updateInput" v-model="createInfo.username"></el-input>
        昵称&nbsp;
        <el-input type="text" class="updateInput" v-model="createInfo.nickName"></el-input>
        密码&nbsp;
        <el-input type="text" class="updateInput" v-model="createInfo.password"></el-input>
        年龄&nbsp;
        <el-input type="text" class="updateInput" v-model="createInfo.age"></el-input>
        性别&nbsp;
        <el-radio-group v-model="createInfo.sex">
          <el-radio label="true" value="男">男</el-radio>
          <el-radio label="false" value="女">女</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCreate">确 定</el-button>
        <el-button @click="createDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      userList: [],
      dialogVisible: false,//控制对话框是否显示
      createDialogVisible: false,//控制新建对话框是否显示
      updateInfo: {},
      createInfo: {}
    }
  }
  ,
  methods: {
    getUserList() {
      axios.get(this.$root.adminAPI + "getAll")
          .then(
              response => {
                console.log(response.data);
                this.userList = [];
                let result = response.data;

                function User(id, username, nickName, password, age, sex) {
                  this.id = id;
                  this.username = username;
                  this.nickName = nickName;
                  this.password = password;
                  this.age = age;
                  if (sex === true) {
                    this.sex = "男"
                  } else {
                    this.sex = "女"
                  }
                }

                //i是索引值，并不是元素
                for (let i in result) {
                  this.userList.push(new User(result[i].id, result[i].username, result[i].nickName, result[i].password, result[i].age, result[i].sex))
                }
              }
          )
    },
    handleDelete(row) {
      if (!confirm("确认删除吗")) {
        return;
      }
      axios({
        method: 'post',
        url: this.$root.adminAPI + 'delete',
        params: {
          id: row.id
        }
      }).then(
          Response => {
            if (Response.data === "success") {
              this.$message({
                message: "删除成功！",
                type: "success",
              })
              this.getUserList();
            } else {
              this.$message({
                message: "删除失败",
                type: "warning",
              })
            }
          }
      )
    },
    //借助
    handleEdit(row) {
      this.dialogVisible = true;
      this.updateInfo = row;
    },
    handleCreate() {
      this.createDialogVisible = true;
      this.createInfo = {
        username: "",
        password: "",
        nickName: "",
        age: "",
        sex: "",
      }
    },
    submitUpdate() {
      if (!confirm("确认提交吗")) {
        return;
      }
      this.dialogVisible = false;
      this.updateInfo.sex = (this.updateInfo.sex === "男");
      axios({
        method: 'post',
        url: this.$root.adminAPI + 'update',
        data: this.updateInfo,
      }).then(
          Response => {
            if (Response.data === "success") {
              this.$message({
                message: "修改成功",
                type: "success",
              })
              this.getUserList();
            } else {
              this.$message({
                message: "修改失败",
                type: "warning",
              })
            }
          }
      )
    },
    submitCreate() {
      axios({
        method: 'post',
        url: this.$root.userAPI + 'register',
        data: this.createInfo,
      }).then(
          Response => {
            if (Response.data === "success") {
              this.createDialogVisible = false;
              this.$message({
                message: "创建成功",
                type: "success",
              })
              this.getUserList();
            } else if (Response.data === "registered") {
              this.$message({
                message: "该账号已被注册",
                type: "warning",
              })
            } else {
              alert("注册失败")
            }

          })
    }

  }
  ,
  mounted() {
    if (this.$root.isLogin === 0) {
      this.$message("您还未登录，自动为您跳转到登录界面")
      this.$root.jump("/")
    } else if (this.$root.isLogin === 1) {
      alert("您当前登录的是普通账号，无法进入管理员界面！")
      this.$root.jump("/Server")
    } else {
      this.getUserList();
    }
  }

}
</script>

<style scoped>
#admin {
  width: 80%;
  margin-left: auto;
  margin-right: auto
}


.updateInput {
  width: 10%;
  margin-right: 1%;
}
</style>