<template>
  <div class="wrapper" id="login">
    <div class="head">
      <ul class="fl">
        <li><img src="../../views/登陆注册页面/image/cat2.jpg"></li>
        <li class="space"></li>
        <li><span class="bigger">登录</span></li>
      </ul>
      <ul class="fr">
        <li><span >还没有账号？马上</span></li>
        <li @click="register" ><label style="cursor: pointer"><a>注册</a></label></li>
      </ul>
    </div>
    <div class="nav"></div>
    <div class="content">
      <div class="mod-reg">
        <div class="reg-content">
          <h1 style="text-align: left" class="plat-title">校园闲置物品交易平台</h1>
          <br/><br/>
          <div class="name" >
           <!-- <span class="tips-login">用户名</span>
            <input type="text" v-model="userName" name="" placeholder="请输入用户名" class="user-input">-->
            <el-input placeholder="请输入账号" v-model="userName" style="width: 280px;border-color: #666666!important;">
              <template slot="prepend"><span style="color: whitesmoke">账号</span></template>
            </el-input>
          </div>
          <div class="code" >
            <!--<span class="tips-login">密码</span>
            <input type="password" v-model="password" name="" placeholder="请输入密码"  class="user-input">-->
            <el-input placeholder="请输入密码" v-model="password" show-password style="width: 280px">
              <template  slot="prepend"><span style="color: whitesmoke">密码</span></template>
            </el-input>
          </div>
          <div class="submit" >
            <el-button @click="login()" class="submitbutton" style="cursor: pointer;width: 280px;background-color: #2c3e50!important;color: whitesmoke!important;">登 录</el-button>
            <!--<input type="submit" id="" name="" value="登    录" @click="login()" class="submitbutton" style="cursor: pointer">-->
          </div>
        </div>
        <div class="picture"></div>
      </div>
    </div>
    <div class="foot">
      <div class="link">
        <p>
          <a href="#">关于我们</a>
          <span>|</span>
          <a href="#">常见问题</a>
          <span>|</span>
          <a href="#">违规投诉</a>
          <span>|</span>
          <a href="#">用户协议</a>
          <span>|</span>
          <a href="#">客服电话：</a>
          <a class="c" href="#">400-8888-6666</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJs from 'crypto-js'
export default {
  data(){
    return{
      userName: "",
      password: ""
    }
  },
  methods:{
    register() {
      this.$router.push({path:"/register"})
    },
    login() {
      let passwordEncry = this.encrypt(this.password)
      console.log(this.userName+' '+passwordEncry)
      const _this = this;
      axios.post('http://localhost:8181/student/login', {
        account: this.userName,
        password: passwordEncry
      }).then(function (res) {
            console.log(res.data);
            _this.resultMsg = res.data;
            if (_this.resultMsg.loginStatus) {//登录成功
              localStorage.setItem('username', _this.resultMsg.student.nickname);
              sessionStorage.setItem('student', JSON.stringify(_this.resultMsg.student));
              console.log("登录成功");
              _this.$message({
                message:"登录成功！",
                type: 'success'
              })
              if (_this.resultMsg.student.infoPerfectionMark!=1){
                _this.$message.warning('请先完善您的个人信息！')
                _this.$router.push('/personalInfo');
              }else {
                _this.$router.push('/goods');
              }
              //console.log(JSON.parse(sessionStorage.getItem("user")))
            } else {
              alert("您的账号或密码不正确！请重试！");
              console.log('error submit!!');
              return false;
            }
          }
      );
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
    }

  },
/*  created() {
    let str1 = this.encrypt("123456")
    console.log("加密后="+str1)
    let str2 = this.decrypt(str1)
    console.log("解密后="+str2)
    /!*this.encrypt("123456")*!/
  }*/
}
</script>

<style scoped>
@import "../../views/登陆注册页面/css/normalize.css";
@import "../../views/登陆注册页面/css/login.css";
</style>