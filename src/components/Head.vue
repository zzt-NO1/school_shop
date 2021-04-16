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
          <li >
            <label @click="toPage('orderCenter')">
              <span class="iconfont">&#xe645; 订单记录</span>
              <el-badge :value="newsCount" v-if="newsCount!=0"></el-badge>
            </label>
          </li>
        </ul>
        <ul class="guide-ul">
          <li ><label @click="getFriendList(true)">
            <span class="iconfont">&#xe70a;消息中心</span>
            <el-badge :value="messageCount" v-if="messageCount!=0"></el-badge>
          </label></li>
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
            <span v-if="friend.account!=''" style="margin-left: 300px">
              <span style="color: #F5F5F5;font-size: 18px">{{friend.nickName}}</span>
            </span>
          </p>
        </div>
        <div style="float: left;width: 25%;height: 90%;background-color:#F5F5F5;border: 1px solid #E0E0E0;border-radius: 0px 0px 0px 10px;overflow: auto">
          <div v-if="friendList.length<=0" style="margin: 80px auto"><span style="color: silver">暂无内容</span></div>
          <div v-for="item in friendList" :key="item.account" style="text-align: left;width: 100%;height: 40px;margin-top: 15px" v-show="params.studentAccount!==item.account">
            <div style="width: 25%;float: left">
              <img src="../views/商品展示页面/image/img.jpg" style="width: 38px;height: 38px;border-radius: 20%;margin-left: 10px" />
            </div>
            <div style="width: 72%;float: left;padding-top: 10px">
              <a @click="changeToName(item)">
                <label style="margin-left: 20px">
                  <span v-if="item.account!==toName">{{item.nickName}}</span>
                  <span v-if="item.account===toName" style="color:#c81623;">{{item.nickName}}</span>
                </label>
              </a>
              <el-badge :value="item.newRecordNum" v-if="item.newRecordNum!=0"></el-badge>
            </div>
           <!-- <el-divider></el-divider>-->
          </div>

        </div>
        <div id="messageShow" style="float: left;width: 75%;height: 90%;">
          <div style="float: left;width: 100%;height: 348px;border: 1px solid #E0E0E0;overflow: auto" >
            <div v-for="(item,index) in messageList" :key="index" style="width: 100%">
              <div v-if="item.fromName===toName" style="text-align: left;margin-top: 20px;width: 100%">
                <div style="float: left;width: 10%;">
                  <img src="../views/商品展示页面/image/img.jpg" style="width: 38px;height: 38px;border-radius: 50%;margin-top: 5px;margin-left: 8px" />
                </div>
                <div style="float: left;width: 90%">
                  <div>
                    <span style="margin-left: 10px;margin-right: 10px;font-size: 10px;color: #999999">{{item.createTime}}</span>
                  </div>
                  <div>
                    <p style="margin-top: 10px">
                      <span style="margin-left: 10px;background: #C0EACC;border-radius: 10px;padding: 5px">
                    <span style="margin-left: 10px;margin-right: 10px">{{item.content}}</span>
                  </span>
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="item.fromName===params.studentAccount" style="text-align: right;margin-top: 20px;width: 100%">
                <div style="float: left;width: 90%">
                  <div>
                    <span style="margin-right: 10px;font-size: 10px;color: #999999">{{item.createTime}}</span>
                  </div>
                  <div>
                    <p style="margin-top: 10px">
                      <span style="background: #A3D0EE;border-radius: 10px;padding: 5px;margin-right: 10px">
                        <span style="margin-left: 10px;margin-right: 10px">{{item.content}}</span>
                      </span>
                    </p>
                  </div>
                </div>
                <div style="float: right;width: 10%">
                  <img src="../views/商品展示页面/image/img.jpg" style="width: 38px;height: 38px;border-radius: 50%;margin-right: 8px;margin-top: 5px" />
                </div>
              </div>
            </div>
          </div>
          <div style="float: left;width: 100%;height: 30%;border: 1px solid #E0E0E0;border-radius: 0px 0px 10px 0px">
              <textarea v-if="toName!=''&&toName!=null" style="border: 0px;width: 100%;height: 80%;margin: auto" v-model="messageValue"></textarea>
              <el-button v-if="toName!=''&&toName!=null" size="small" style="width: 15%;height: 22%;margin-top: -10px;float: right;margin-right: 5px;" @click="sendMessage()" @keyup.enter="sendMessage()">发送</el-button>
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
      friendList:[],
      toName: '',
      nickname:'',
      friend:{},
      messageCount:0,
      requestToName:'',
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
      this.getFriendList(false)
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
          case 'messageCenter': this.$router.go(0); break;
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
    changeToName(item){
      this.friend = item
      this.toName = this.friend.account
      for (let i of this.friendList) {
        if (i.account==this.friend.account){
          this.messageCount = this.messageCount - i.newRecordNum
          i.newRecordNum = 0
        }
      }
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
        if (res.systemMark){
          _this.friendAccounts = res.content
          for (let friend of _this.friendAccounts){
            if (friend==_this.params.studentAccount){
              //_this.friendAccounts.remove(friend)
              break
            }
          }
        }else {
          console.log("res.content="+res.content)
          let msg = res.content
          let msgListStr = sessionStorage.getItem(res.fromName)
          if (msgListStr == null){
            _this.messageList=[]
          }else {
            _this.messageList = JSON.parse(msgListStr)
            let m = {id:'',fromName:res.fromName,toName:res.toName,content:msg,createTime:res.createTime,readMark:res.readMark,systemMark:res.systemMark}
            _this.messageList.push(m)
          }
          let saveStr = JSON.stringify(_this.messageList)
          sessionStorage.setItem(res.fromName,saveStr)
          //console.log("sessionStorage.setItem(res.fromName,saveStr)====="+sessionStorage.getItem(res.fromName))
          for (let friend of _this.friendList) {
            if (friend.account == res.fromName){
              friend.newRecordNum++
              _this.messageCount++
              break
            }
          }
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
      let socketMsg = {"message": this.messageValue, "toName": this.toName}
      let time = this.$moment(new Date).format('YYYY-MM-DD  HH:mm:ss')
      let m = {id:'',fromName:this.params.studentAccount,toName:this.toName,content:this.messageValue,createTime:time,readMark:0,systemMark:false}
      let msgListStr = sessionStorage.getItem(this.toName)
      if (msgListStr == null){
        this.messageList=[]
      }else {
        this.messageList = JSON.parse(msgListStr)
      }
      this.messageList.push(m)
      let saveStr = JSON.stringify(this.messageList)
      sessionStorage.setItem(this.toName,saveStr)
      //this.messageList.push(m)
      this.websocket.send(JSON.stringify(socketMsg));
      this.messageValue=''
    },
    //获取好友列表
    getFriendList(item){
      this.drawer = item
      let _this = this
      axios.post('http://localhost:8181/chat/getAllFriends',{
        params: this.params
      }).then(function (res) {
        if (null != res.data && res.data.getResult){
          _this.friendList = res.data.friendList
          //console.log("friendList="+JSON.stringify(_this.friendList))
          _this.getLeaveMsg()
        }
      })
    },
    //获取留言信息
    getLeaveMsg(){
      for (let f of this.friendList){
        let fromName = f.account
        let contentList = f.chatRecordList
        //console.log("contentList==="+JSON.stringify(contentList))
        if (null != contentList){
          let listStr = JSON.stringify(contentList)
          sessionStorage.setItem(fromName,listStr)
          this.messageCount = this.messageCount + f.newRecordNum
        }else {
          let listStr = []
          sessionStorage.setItem(fromName,listStr)
        }
      }
    },
    //获取是否有人想要联系卖家
    connectWithOwner(){
      let ownerAccount = localStorage.getItem("owner")
      if (null != ownerAccount && ownerAccount != ''){
        /*let b = false
        for (let f of this.friendList){
          if (f.account == ownerAccount){
            b=true
            this.friend = f
            break
          }
        }
        if (!b){
          this.requestToName = ownerAccount
          console.log('ownerAccount==='+ownerAccount)
          let newFriend = {account:ownerAccount,nickName:ownerAccount,chatRecordList:[],newRecordNum:0}
          this.friendList.push(newFriend)
          this.friend=newFriend
        }
        this.drawer = true*/
        for (let i of this.friendList) {
          if (i.account==ownerAccount){
            this.friend = i
            this.toName = i.account
            break
          }
        }
        this.getFriendList(true)
/*
        let friends = this.friendList.filter(item=>{
          return item.account == ownerAccount
        })
        this.friend = friends[0]
        this.toName = this.friend.nickName*/
        console.log("friend---"+JSON.stringify(this.friend))
        console.log("toName---"+this.toName)
        localStorage.removeItem("owner")
      }
    }
  },
  watch:{
    toName:function (){
      if (this.toName==''||this.toName==null){
        this.messageList = []
      }else {
        let chatStr = sessionStorage.getItem(this.toName)
        let msgList = JSON.parse(chatStr)
        this.messageList = msgList
      }
    }
  },
  mounted(){
    this.getNewNotice();
    this.timer = setInterval(() => {
      setTimeout(this.getNewNotice, 0)
    }, 1000*50)
    this.timer = setInterval(() => {
      setTimeout(this.connectWithOwner, 0)
    }, 1000*0.1)
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