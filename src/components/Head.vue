<template>
  <div class="wrapper">
    <!--头部导航 begin-->
    <div class="head-div">
      <!-- 用户头像 -->
      <div class="user-avator">
        <ul class="main" v-if="loginStatus">
            <li class="li1" >
              <a class="main-a" href="#">
                <el-dropdown>
                  <span class="user">{{ studentName }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><a @click="toPage('personalInfo')">个人中心</a></el-dropdown-item>
                    <el-dropdown-item ><a @click="loadout">退出登录</a></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <img src="../views/商品展示页面/image/img.jpg" />
              </a>
              <!--<ul class="drop menu1 ull">
                <li class="li2"><a class="menu1-a" href="#">个人资料</a></li>
                <li class="li2"><a class="menu1-a" href="#" @click="loadout">退出登录</a></li>
              </ul>-->
            </li>
          </ul>
        <ul class="user" v-if="!loginStatus">
          <li @click="login"><label><a>登录/注册</a></label></li>
        </ul>
      </div>
      <!--导航按钮-->
      <div class="guide">
        <ul class="guide-ul">
          <li><label @click="toPage('goods')"><span class="iconfont">&#xe6b8; 首页</span></label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('postGood')"><span class="iconfont">&#xe6a0; 我要发布</span></label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('shoppingCart')"><span class="iconfont">&#xe6af; 购物车</span></label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('postRecord')"><span class="iconfont">&#xe800; 发布记录</span></label></li>
        </ul>
        <ul class="guide-ul">
          <li><label @click="toPage('buyGood')"><span class="iconfont">&#xe699; 购买记录</span></label></li>
        </ul>
        <ul class="guide-ul">
          <li ><label @click="toPage('messageCenter')"><span class="iconfont">&#xe70a; 消息中心</span></label></li>
        </ul>
        <ul class="guide-ul">
          <li ><label @click="toPage('orderCenter')"><span class="iconfont">&#xe645; 订单中心</span></label></li>
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
          case 'shoppingCart': this.$router.push({path:"/shoppingCart"}); break;
          case 'postRecord': this.$router.push({path:"/issueRecord"}); break;
          case 'buyRecord': this.$router.push({path:"/login"}); break;
          case 'messageCenter': this.$router.push({path:"/login"}); break;
          case 'personalInfo': this.$router.push({path:"/personalInfo"}); break;
          case 'orderCenter': this.$router.push({path:"/orderCenter"}); break;
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
  loadout(){
      sessionStorage.clear();
      this.$router.push({path:"/login"});
  }
  },
  mounted() {
  },
}
</script>

<style>

@import "../assets/iconfont/iconfont.css";
.li1 {
  margin: -15px 0 0 0;
  width: 180px;
}
.li1:hover {
  color: #2d8cf0;
}
.li2 .menu1-a{
  border-left:0px solid rgb(23, 23, 50);
  margin-top: 10px;
}
.menu1-a {
  text-decoration: none;

  text-transform: capitalize;
  font-family: monospace;
  display: flex;
  font-size: 14px;
  transition: background-color 0.5s ease-in-out;
  font-family: "Raleway", sans-serif;
}

.drop .li2 {
  opacity: 0;
  transform-origin: top center;
}

.drop .li2 .menu1-a:hover{
  color: #2d8cf0;
  font-size: 16px;
}
.main .li1:hover .menu1 .li2:first-of-type {
  animation: menu1 0.3s ease-in-out forwards;
  animation-delay: 0.1s;
}

.main .li1:hover .menu1 .li2:nth-of-type(2) {
  animation: menu1 0.3s ease-in-out forwards;
  animation-delay: 0.3s;
}

.main .li1:hover .menu1 .li2:nth-of-type(3) {
  animation: menu1 0.3s ease-in-out forwards;
  animation-delay: 0.2s;
}


@keyframes menu1 {
  from {
    opacity: 0;
    transform: translateX(30px) rotateY(90deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotateY(0);
  }
}

.ull {
  list-style: none;
}


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
.guide-ul:hover{
  color: #2d8cf0;
  font-size: 18px;
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
  color: white;
  font-size: 18px;
}
.user:hover{
  color: #2d8cf0;
  font-size: 20px;
}
.guide-ul{
  width: 7%;
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