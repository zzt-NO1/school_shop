<template>
  <div class="wrapper">
    <div class="head">
      <ul class="fl">
        <li><img src="../../views/登陆注册页面/image/cat2.jpg"></li>
        <li class="space"></li>
        <li><span class="bigger">注册账号</span></li>
      </ul>
      <ul class="fr">
        <li><span >我已注册，现在就</span></li>
        <li @click="login"><label style="cursor: pointer"><a>登录</a></label></li>
      </ul>
    </div>
    <div class="nav"></div>
    <div class="content">
      <div class="mod-reg">
        <div class="reg-content2">
          <h1 style="text-align: left" class="plat-title">校园闲置物品交易平台</h1>
     <!--     <div class="name" >
            <span class="tips-register">用户名</span>
            <input type="text"  name="" placeholder="请设置用户名" class="user-input">
          </div>
-->
          <div class="nickname" >
            <!--<span class="tips-register">昵称</span>
            <input type="text"  name="" placeholder="请设置昵称" class="user-input">-->
            <el-input placeholder="请设置昵称" style="width: 320px">
              <template  slot="prepend"><span style="color: whitesmoke">昵称</span></template>
            </el-input>
          </div>

          <div class="phone" >
            <!--<span class="tips-register">手机号</span>
            <input type="text"  name="" placeholder="请输入有效手机号" class="user-input">-->
            <el-input placeholder="请输入手机号" style="width: 320px">
              <template  slot="prepend"><span style="color: whitesmoke">手机</span></template>
            </el-input>
          </div>

          <div class="code" >
            <!--<span class="tips-register">密码</span>
            <input type="password"  name="" placeholder="请设置密码" class="user-input">-->
            <el-input placeholder="请输入密码" show-password style="width: 320px">
              <template  slot="prepend"><span style="color: whitesmoke;;">密码</span></template>
            </el-input>
          </div>

          <div class="recode" >
            <!--<span class="tips-register">确认密码</span>
            <input type="password"  name="" placeholder="请再次输入密码" class="user-input">-->
            <el-input placeholder="请输入密码" show-password style="width: 320px">
              <template  slot="prepend"><span style="color: whitesmoke">确认密码</span></template>
            </el-input>
          </div>
          <div class="recode" >
            <!--<span class="tips-register">学校</span>
            <input type="text"  name="" placeholder="请选择学校" class="user-input">-->
            <el-select placeholder="请选择学校"  style="width: 320px">
             <!--     <template  slot="prepend">学校名称</template>-->
            </el-select>
          </div>

          <div class="submit" >
            <el-button  class="submitbutton" style="cursor: pointer;width: 320px;background-color: #2c3e50!important;color: whitesmoke!important;">注册</el-button>
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
export default {
  name: "Register",
  methods:{
    login() {
      this.$router.push({path:"/login"})
    },
  }
}
</script>

<style scoped>
@import "../../views/登陆注册页面/css/normalize.css";
@import "../../views/登陆注册页面/css/register.css";
</style>