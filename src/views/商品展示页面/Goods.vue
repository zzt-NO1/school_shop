<template>
  <div class="wrapper">
    <!--头部导航 begin
    <div class="head-div">
       用户头像
      <div class="user-avator">
        <div v-if="loginStatus">
            <span class="user">{{ studentName }}</span>
            <img src="../商品展示页面/image/img.jpg" />
        </div>
        <ul class="user" v-if="!loginStatus">
          <li @click="login"><a>登录/注册</a></li>
        </ul>
      </div>
      导航按钮
      <div class="guide">
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
    头部导航 end-->
    <!--搜索栏 begin-->
    <div class="search-div">
      <div class="key">
        <p>
          关键字搜索：<input type="text" /><button>搜索</button>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label for="sell">
            <input type="radio" id="sell" name="type" v-model="finalType" value="sell">出售
          </label>
          <label for="rent">
            <input type="radio" id="rent" name="type" v-model="finalType" value="rent">出租
          </label>
          <label for="all">
            <input type="radio" id="all" name="type" v-model="finalType" value="all">全部
          </label>
        </p>

      </div>
    </div>
    <!--搜索栏 end-->
    <hr style="width: 80%"/>
    <!--列表展示区 begin-->
    <div class="goodList-div">
      <div class="gallery-wrapper" >
        <div class="white-panel" v-for="(item,index) in goodList" :key="index">
          <a href="#">
          <img v-bind:src="item.image" class="thumb">
          <h1>{{item.title}}</h1>
          <p><i :class="item.icon"></i>{{item.owner}}</p>
          <p class="flag-sell" v-if="item.type==1">出售价格：￥{{item.price}}元</p>
          <p class="flag-rend" v-if="item.type==2">出租价格：￥{{item.price}}元/天</p>
          </a>
        </div>
      </div>
    </div>
    <!--列表展示区 end-->
  </div>
</template>

<script src="../../商品展示页面/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="../../商品展示页面/js/pinterest_grid.js"></script>
<script>
export default {
  name: "Goods",
  data(){
    return {
      studentName:'',
      loginStatus: false,
      finalType:'all',
      delayTime:300,
      goodList:[
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/1.jpg'),
          title:1,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          type:2
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/2.jpg'),
          title:2,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          type:2
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/3.jpg'),
          title:3,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/4.jpg'),
          title:4,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/5.jpg'),
          title:5,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/6.jpg'),
          title:6,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/7.jpg'),
          title:7,
          price:20,
          owner:'阿斯顿',
          goodType:'cloth',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/1.jpg'),
          title:1,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          type:2
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/2.jpg'),
          title:2,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          type:2
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/3.jpg'),
          title:3,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/4.jpg'),
          title:4,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/5.jpg'),
          title:5,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/6.jpg'),
          title:6,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          type:1
        },
        {
          icon:'el-icon-lx-people',
          image: require('../../assets/img/7.jpg'),
          title:7,
          price:20,
          owner:'阿斯顿',
          goodType:'cloth',
          type:1
        },
      ]
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
      if (this.judgeLogin()){
        this.loginStatus = true;
        switch (page){
          case 'postGood': this.$router.push({path:"/login"}); break;
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

<style scoped>
@import "../../views/商品展示页面/css/goods.css";
.flag-rend{
  color: #2d8cf0;
}
.flag-sell{
  color: #5daf34;
}
.gallery-wrapper {
  column-count: 5;
  display: inline-block;
  position: relative;
  margin:20px auto;
  text-align: left;
}
img.thumb {
  width: 100%;
  max-width: 100%;
  height: auto;
}
.white-panel {
  background: white;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  padding: 10px;
  cursor: pointer;
  page-break-inside: avoid;
}
.white-panel h1 {
  font-size: 1em;
}
.white-panel h1 a {
  color: #A92733;
}
.white-panel:hover {
  box-shadow: 5px 5px 50px rgba(0,0,0,0.5);
  margin-top: 0px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  transform: scale(1.003);
}

</style>
