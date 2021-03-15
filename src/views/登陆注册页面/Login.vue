<template>
  <div class="wrapper" id="login">
    <div class="head">
      <ul class="fl">
        <li><img src="../../views/登陆注册页面/image/shark.jpg"></li>
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
          <h1 style="text-align: left">校园闲置物品交易平台</h1>
          <br/><br/>
          <div class="name" > 用户名：
            <input type="text" v-model="userName" name="" placeholder="请输入用户名" class="">
          </div>
          <div class="code" > 密码 ：
            <input type="password" v-model="password" name="" placeholder="请输入密码" style="margin-left: 14px" class="">
          </div>
          <div class="submit" >
            <input type="submit" id="" name="" value="登    录" @click="login()" class="submitbutton" style="cursor: pointer">
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
      console.log(this.userName+' '+this.password)
      const _this = this;
      axios.post('http://localhost:8181/user/login', {
        account: this.userName,
        password: this.password
      }).then(function (res) {
            console.log(res.data);
            _this.resultMsg = res.data;
            if (_this.resultMsg.loginStatus) {//登录成功
              localStorage.setItem('username', _this.resultMsg.student.nickname);
              sessionStorage.setItem('student', JSON.stringify(_this.resultMsg.student));
              console.log("登录成功");
              alert("登录成功！");
              _this.$router.push('/goods');
              //console.log(JSON.parse(sessionStorage.getItem("user")))
            } else {
              alert("您的账号或密码不正确！请重试！");
              console.log('error submit!!');
              return false;
            }
          }
      );
    }
  }
}
</script>

<style scoped>
@import "../../views/登陆注册页面/css/normalize.css";
@import "../../views/登陆注册页面/css/login.css";
</style>