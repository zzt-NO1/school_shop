<template>
  <div class="wrapper">
    <!--头部导航 begin-->
    <div class="head-div">
      <!-- 用户头像 -->
      <div class="user-avator">
        <div v-if="loginStatus">
          <span class="user">{{ studentName }}</span>
          <img src="../views/商品展示页面/image/img.jpg" />
        </div>
        <ul class="user" v-if="!loginStatus">
          <li @click="login"><label><a>登录/注册</a></label></li>
        </ul>
      </div>
      <!--导航按钮-->
      <div class="guide">
        <ul class="guide-ul">
          <li><label @click="toPage('goods')">首页</label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('postGood')">我要发布</label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('shoppingCar')">购物车</label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('postRecord')">发布记录</label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('buyGood')">购买记录</label></li>
        </ul>
        <ul class="guide-ul">
          <li ><label @click="toPage('messageCenter')">消息中心</label></li>
        </ul>
      </div>
    </div>
    <!--头部导航 end-->
  </div>
</template>

<script>
export default {
  name: "Head",
  data(){
    return {
      studentName:'',
      loginStatus: false,
      finalType:'all',
      delayTime:300,
    }
  },
  created() {
    let stu = JSON.parse(sessionStorage.getItem('student'));
    if (null == stu){
      this.loginStatus = false;
    }else {
      this.loginStatus = true;
      this.studentName = stu.nickname;
      return true;
    }
  },
  methods:{
    //跳转登录页面
    login() {
      this.$router.push({path:"/login"})
    },
    //
    toPage(page){
      console.log(page);
      if (page==='goods'){
        this.$router.push({path:"/goods"});
      }
      else if (this.judgeLogin()){
        this.loginStatus = true;
        switch (page){
          case 'postGood': this.$router.push({path:"/postGood"}); break;
          case 'shoppingCar': this.$router.push({path:"/login"}); break;
          case 'postRecord': this.$router.push({path:"/login"}); break;
          case 'buyRecord': this.$router.push({path:"/login"}); break;
          case 'messageCenter': this.$router.push({path:"/login"}); break;
          case 'personal': this.$router.push({path:"/login"}); break;
          default: this.$router.push({path:"/login"});
        }
      }else {
        window.alert("尚未登录！请先登录......")
        this.$router.push({path:"/login"});
      }
    },

    //判断是否已登录
    judgeLogin(){
      let student = JSON.parse(sessionStorage.getItem('student'));
      if (null == student){
        return false;
      }else {
        this.studentName = student.nickname;
        return true;
      }
    },

  },
  mounted() {
  },
}
</script>

<style>
.wrapper{
  width: 100%;
  height: 100%;
  margin: auto;
}

.head-div{
  height: 50px;
  background-color: #2c3e50;
  color: white;
}

.user-avator {
  margin-right: 20px;
  float: right;
  top: 5px;
  display: inline-block;
}
.user-avator img {
  width: 47px;
  height: 47px;
  border-radius: 50%;
}
.user{
  margin-right: 20px;
}
.guide-ul{
  width: 5%;
  height: 20px;
  float: left;
}
.search-div{
  width: 80%;
  height: 40px;
  margin: auto;
}
label{
  cursor: pointer
}
.key{
  height: 50px;
  margin-left: fill;
  text-align: left;
  position: relative;
}
</style>