<template>
  <div id="server">
    <h1>图书馆座位预约系统</h1>
    <br>
    <div style="float: left;color: gainsboro" >
      请选择你的时间:
      <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
      start: '8:30',
      step: '0:30',
      end: '22:00',
    }">
      </el-time-select>
      <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
          start: '09:00',
          step: '00:30',
          end: '22:30',
          minTime: startTime
        }">
      </el-time-select>
    </div>
    <el-button type="primary" @click="submit"  style="float: right">提 交</el-button>
    <br class="clear">
    <h2>请选择你的座位:</h2>
    <el-button @click="getSeatList" style="float: left" type="primary" plain>点我刷新所有信息</el-button>
    <el-table
        :data="seatList"
        height="350"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
    >
      <!--      关于prop：vue会自动寻找列表中每个对象的id属性-->
      <el-table-column
          fixed
          prop="id"
          label="id"
          width="200">
      </el-table-column>
      <el-table-column
          prop="location"
          label="区域"
          width="200">
      </el-table-column>
      <el-table-column
          prop="free"
          label="是否可用"
          :formatter="formatter"
          width="200">

      </el-table-column>
      <el-table-column
          prop="startTime"
          label="起始时间"
          width="200">
      </el-table-column>
      <el-table-column
          prop="endTime"
          label="结束时间"
          width="200">
      </el-table-column>
      <el-table-column>
        <el-button style="width:100%;">选择</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Normal",
  data() {
    return {
      seatList: [],
      startTime: "",
      endTime: "",
      currentRow: {
        id: '',
        location: "",
        free: '',
        startTime: '',
        endTime: '',
        userId: ''
      },
    }
  },
  methods: {
    formatter(row) {
      //不要用===，==能自动转换
      if (row.free == true) {
        row.Registrationstate = "可用"
      }
      if (row.free == false) {
        row.Registrationstate = "被占用"
      }
      return row.Registrationstate
    },
    getSeatList() {
      axios.get(this.$root.userAPI + "getSeats")
          .then(
              response => {
                this.seatList = response.data;
              })
    },
    submit() {
      if (!confirm("确定提交吗？")){
        return;
      }
      this.currentRow.free = false;
      this.currentRow.userId = this.$root.user.id;
      this.currentRow.startTime = this.startTime;
      this.currentRow.endTime = this.endTime;
      axios({
        method: 'post',
        url: this.$root.userAPI + 'update',
        data: this.currentRow,
      }).then(
          Response => {
            if (Response.data === "success") {
              this.$message({
                message: "预定成功！",
                type: "success",
              });
              this.getSeatList();
            } else {
              this.$message({
                message: "预定失败",
                type: "warning",
              })
            }
          })
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
  ,
  mounted() {
    if (this.$root.isLogin === 0) {
      this.$message("您还未登录，自动为您跳转到登录界面")
      this.$root.jump("/")
    }
    this.getSeatList();
  }
}
</script>

<style scoped>
#server {
  width: 80%;
  margin-right: auto;
  margin-left: auto;
}

.el-table .danger-row {
  background: #F56C6C
}

.el-table .normal-row {
  background: #f0f9eb;
}

.el-table .primary-row {
  background: #409EFF;
}


.clear {
  clear: both;
}
</style>