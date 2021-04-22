<template>
<div class="personalInfo">
  <div class="personalInfo-body" style="background-color: white">
    <h1>个人中心</h1>
    <p>当前信用积分:100</p>
    <el-form label-position="left" :model="params.student" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="text-align: left">
      <el-form-item label="昵称">
        <el-input v-model="params.student.nickname" style="width: 300px;" :disabled="modify"></el-input>
      </el-form-item>
      <el-form-item label="手机号(账号)" prop="phone">
        <el-input v-model="params.student.phone" style="width: 300px" disabled></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="studentNum">
        <el-input v-model="params.student.studentNum" style="width: 300px" :disabled="modify" ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="params.student.realName" style="width: 300px" :disabled="modify" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="params.student.email" style="width: 300px" :disabled="modify"></el-input>
      </el-form-item>
      <el-form-item label="学校名称">
        <el-input v-model="params.student.schoolName" style="width: 300px" disabled ></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="params.student.birthday" style="width: 100%;" :disabled="modify"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="params.student.sex" label="性别" >
        <template prop="sex">
          <el-radio-group v-model="params.student.sex" :disabled="modify">
            <el-radio  :label="0">男生</el-radio>
            <el-radio  :label="1">女生</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="收件地址" v-for="(address,index) in params.student.addressList" :key="index">
        <el-input v-model="params.student.addressList[index]" style="width: 300px" :disabled="modify" required></el-input> <el-button v-if="!modify" @click="removeDomain(address)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!modify" @click="addDomain">添加收件地址</el-button>
      </el-form-item>
      <el-form-item >
        <el-button v-if="modify" type="primary" @click="changeModify">修改信息</el-button>
        <el-button v-if="modify" type="primary" @click="dialogFormVisible = true">修改密码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!modify" type="primary" @click="updateStudentInfo">保存</el-button>
      </el-form-item>

      <el-dialog title="密码修改" :visible.sync="dialogFormVisible" >
        <el-form>
          <el-form-item label="原密码" style="margin-left: 150px">
            <el-input v-model="oldPassword" type="password" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="新密码" style="margin-left: 150px">
            <el-input v-model="newPassword" type="password" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePassword">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</div>
</template>

<script>
import axios from "axios";
import CryptoJs from "crypto-js";

export default {
name: "PersonalInfo",
  data() {
    return {
      oldPassword:'',
      newPassword:'',
      dialogFormVisible:false,
      t:[],
      modify:true,
      addressList:['1','2','3'],
      params:{
        student:{}
      },
    }
  },
  methods: {
    updateStudentInfo(){
      if (this.params.student.nickname==null || this.params.student.nickname==''){
        this.$alert('请先填写昵称！', '提示信息', {
          confirmButtonText: '确定',
        });
      }else if (this.params.student.studentNum==null || this.params.student.studentNum==''){
        this.$alert('请先填写学号！', '提示信息', {
          confirmButtonText: '确定',
        });
      }else if ( this.params.student.realName==null|| this.params.student.realName==''){
        this.$alert('请先填写真实姓名！', '提示信息', {
          confirmButtonText: '确定',
        });
      }else if (this.params.student.email==null|| this.params.student.email==''){
        this.$alert('请先填写邮箱！', '提示信息', {
          confirmButtonText: '确定',
        });
      }else if (this.params.student.addressList==null || this.params.student.addressList.length<=0)
      {
        this.$alert('请先填写收件地址！', '提示信息', {
          confirmButtonText: '确定',
        });
      }else {
        let _this = this
        axios.post('http://localhost:8181/student/updateStudentInfo',{
          params: this.params
        }).then(function (res) {
              console.log(res.data);
              if (res.data != null && res.data.updateResult) {//成功
                console.log('修改成功');
                _this.$message({
                  message:'信息保存成功',
                  type:'success'
                })
                _this.params.student = res.data.student
                sessionStorage.setItem('student',JSON.stringify(_this.params.student))
                _this.modify = !_this.modify
                setTimeout(function(){
                  location.reload();
                },1000);
              } else {
                _this.$message({
                  message:'更新失败，请稍后重试！',
                  type:'error'
                })
                console.log('信息更新失败');
                return '';
              }
            }
        );
      }
    },
    /**
     * 加密
     */
    encrypt(word) {
      let key = CryptoJs.enc.Utf8.parse("4E7FF1C1F04F4B36");
      let srcs = CryptoJs.enc.Utf8.parse(word);
      let encrypted = CryptoJs.AES.encrypt(srcs, key, {
        mode: CryptoJs.mode.ECB,
        padding: CryptoJs.pad.Pkcs7
      });
      return encrypted.toString();
    },
    /**
     * 解密
     */
    decrypt(word) {
      let key = CryptoJs.enc.Utf8.parse("4E7FF1C1F04F4B36");
      let decrypt = CryptoJs.AES.decrypt(word, key, {
        mode: CryptoJs.mode.ECB,
        padding: CryptoJs.pad.Pkcs7
      });
      return CryptoJs.enc.Utf8.stringify(decrypt).toString();
    },
    changePassword(){
      if (this.encrypt(this.oldPassword)!=this.params.student.password){
        _this.$message({
          message:"原密码不正确！",
          type: 'warn'
        })
        return false
      }
      if (this.newPassword==null || this.newPassword==''){
        _this.$message({
          message:"新密码不能为空！",
          type: 'warn'
        })
        return false
      }
      let encryptStr = this.encrypt(this.newPassword);
      let _this = this
      console.log("原密码："+this.params.student.password)
      console.log("原密码#："+this.oldPassword)
      console.log("新密码："+this.newPassword)
      axios.post('http://localhost:8181/student/updatePassword', {
        account: this.params.student.account,
        password: encryptStr //加密过后的密码
      }).then(function (res) {
            console.log(res.data)
            if (res.data!=null && res.data.changeResult) {//修改成功
              console.log("修改密码成功");
              _this.$message({
                message:"密码修改成功！",
                type: 'success'
              })
              _this.oldPassword = ''
              _this.newPassword = ''
              _this.dialogFormVisible = false
              _this.$alert('修改密码后请重新登录', '提示信息', {
                confirmButtonText: '确定',
              });
              _this.$router.push({path:'/login'})
            } else {
              _this.$message({
                message:"密码修改失败！",
                type: 'error'
              })
              _this.oldPassword = ''
              _this.newPassword = ''
              _this.dialogFormVisible = false
              return false
            }
          }
      );
    },
    changeModify(){
      this.modify = !this.modify
    },
    removeDomain(item) {
      let index = this.params.student.addressList.indexOf(item);
      if (index !== -1) {
        this.params.student.addressList.splice(index, 1)
      }
    },
    addDomain(address) {
      this.params.student.addressList.push(address);
    }
  },
  created() {
    let student = JSON.parse(sessionStorage.getItem('student'));
    if (null == student){
      this.$message({
        message:'尚未登录，即将跳转登录页面！',
        type:'error'
      })
    }else {
      this.params.student = student;
      console.log(this.params.student.adderssList)
    }
  }
}
</script>

<style scoped>
.personalInfo-body{
  width: 60%;
  height: 750px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #2196F3;
  border-radius: 10px;
  opacity: 0.9;
}
.demo-ruleForm{
  margin-left: 210px;
}

</style>