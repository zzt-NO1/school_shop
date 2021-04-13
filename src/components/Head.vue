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
          <li >
            <label @click="toPage('orderCenter')">
              <span class="iconfont">&#xe645; 订单中心</span>
              <el-badge :value="newsCount" v-if="newsCount!=0"></el-badge>
            </label>
          </li>
        </ul>
        <ul class="guide-ul">
          <li ><label @click="drawer = true"><span class="iconfont">&#xe70a;消息中心</span></label></li>
        </ul>
      </div>
    </div>
    <!--头部导航 end-->
    <el-drawer
        title="在线聊天"
        :visible.sync="drawer"
        :direction="direction"
        style="z-index: -1"
        size="45%">
      <div style="width: 96%;height: 84%;margin: auto;border-radius: 10px">
        <div class="head-chat-div" style="width: 100% ;height: 10%; background-color: #2c3e50;color:whitesmoke;border-radius: 10px 10px 0px 0px">
          <p v-if="student!=null" style="float: left"><span style="margin-left: 20px">{{student.nickname}}</span>
            <span v-if="friendAccounts.includes(params.studentAccount)">在线</span>
            <span v-if="!friendAccounts.includes(params.studentAccount)">离线</span>
            <span v-if="toName!=''" style="margin-left: 200px"><span style="color: #F5F5F5;font-size: 18px">{{toName}}</span></span>
          </p>
        </div>
        <div style="float: left;width: 25%;height: 90%;background-color:#F5F5F5;border: 1px solid #E0E0E0;border-radius: 0px 0px 0px 10px">
          <p v-for="item in friendAccounts" :key="item" style="text-align: left;" v-show="params.studentAccount!==item">
            <a @click="toName=item"><label style="margin-left: 20px">{{item}}</label></a>
          </p>
          <el-divider></el-divider>
        </div>
        <div style="float: left;width: 75%;height: 90%;">
          <div style="float: left;width: 100%;height: 70%;border: 1px solid #E0E0E0">
            <div v-for="(item,index) in messageList" :key="index" style="width: 100%">
              <p v-if="item.userLocation==='l'" style="text-align: left;margin-top: 0px">
                <span style="margin-left: 10px">{{item.mess}}</span>
              </p>
              <p v-if="item.userLocation==='r'" style="text-align: right;margin-top: 0px">
                <span style="margin-right: 10px">{{item.mess}}</span>
              </p>
            </div>
          </div>
          <div style="float: left;width: 100%;height: 30%;border: 1px solid #E0E0E0;border-radius: 0px 0px 10px 0px">
              <textarea v-if="toName!=''" style="border: 0px;width: 100%;height: 80%;margin: auto" v-model="messageValue"></textarea>
              <el-button v-if="toName!=''" size="small" style="width: 15%;height: 22%;margin-top: -10px;float: right;margin-right: 5px;" @click="sendMessage()">发送</el-button>
          </div>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Head",
  data(){
    return {
      studentName:'',
      loginStatus: false,
      finalType:'all',
      delayTime:300,
      rentListNews:[],
      buyListNews:[],
      newsCount:0,
      forRentListNews:[],
      forSellListNews:[],
      params: {
        studentAccount:'',
      },
      websocket: null, // WebSocket对象
      messageList: [], // 消息列表
      messageValue: "", // 消息内容
      drawer: false,
      direction: 'rtl',
      student:null,
      friendAccounts:[],
      toName: '',
    }
  },
  created() {
    let stu = JSON.parse(sessionStorage.getItem('student'));
    if (null == stu){
      this.loginStatus = false;
    }else {
      this.loginStatus = true;
      this.studentName = stu.nickname;
      this.params.studentAccount = stu.account
      this.student = stu
      this.connectWebSocket()
      this.getNewNotice()
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
          case 'messageCenter': this.$router.push({path:"/chatRoom"});this.$router.go(0); break;
          case 'personalInfo': this.$router.push({path:"/personalInfo"}); break;
          case 'orderCenter': this.$router.push({path:"/orderCenter"}); break;
          default: this.$router.push({path:"/login"});
        }
      }else {
        window.alert("尚未登录！请先登录......")
        this.$router.push({path:"/login"});
      }
    },
    //获取最新通知
    getNewNotice(){
      let _this = this
      axios.post('http://localhost:8181/notice/getNewNotice',{
        params: this.params
      }).then(function (res) {
        if (null != res.data && res.data.noticeResult){
          _this.rentListNews = res.data.type4List
          _this.buyListNews = res.data.type3List
          _this.forRentListNews = res.data.type2List
          _this.forSellListNews = res.data.type1List
          _this.newsCount = res.data.newsCount
        }
      })
    },
    //判断是否已登录
    judgeLogin(){
      let student = JSON.parse(sessionStorage.getItem('student'));
      if (null == student){
        return false;
      }else {
        this.studentName = student.nickname;
        this.student = student
        return true;
      }
    },
    loadout(){
        sessionStorage.clear();
        this.$router.push({path:"/login"});
    },
    /*websocket连接服务器*/
    connectWebSocket() {
      if (this.websocket!=null){
        return true
      }
      console.log("建立连接");
      let _this = this;
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(
            "ws://localhost:8181/websocket/" + this.params.studentAccount
        );
      } else {
        alert("不支持建立socket连接");
      }

      //连接发生错误的回调方法
      this.websocket.onerror = function() {

      };

      //连接成功建立的回调方法
      this.websocket.onopen = function(event) {
        console.log(event)
      };

      //接收到消息的回调方法
      this.websocket.onmessage = function(event) {
        //获取服务器端推送过来的消息
        let dataStr = event.data
        //将dataStr转换为json对象
        let res = JSON.parse(dataStr)
        console.log("res="+ JSON.stringify(res))
        //判断是否为系统消息
        if (res.system){
          _this.friendAccounts = res.message
          for (let friend of _this.friendAccounts){
            if (friend==_this.params.studentAccount){
              _this.friendAccounts.remove(friend)
              break
            }
          }
        }else {
          let m = {userLocation:"l",mess:res.message}
          console.log("toName="+res.toName)
          _this.messageList.push(m)
        }
      };

      //连接关闭的回调方法
      this.websocket.onclose = function() {

      };

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        this.websocket.close();
      };
    },
    // 发送消息
    sendMessage: function() {
      let socketMsg = {"message": this.messageValue, "toName": this.toName};
      let m = {userLocation:"r",mess:this.messageValue}
      this.messageList.push(m)
      this.websocket.send(JSON.stringify(socketMsg));
      this.messageValue=''
    },
  },
  mounted(){
    this.getNewNotice();
    this.timer = setInterval(() => {
      setTimeout(this.getNewNotice, 0)
    }, 1000*50)
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

label{
  cursor: pointer
}


</style>