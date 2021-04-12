<template>
  <div style="width: 99%;">
    <el-button @click="drawer = true" type="primary" >
      点我打开
    </el-button>
    <el-drawer
        title="在线聊天"
        :visible.sync="drawer"
        :direction="direction"
        size="42%">
      <div style="width: 99%;height: 90%;background: #FB8C00">
        <div class="left-chat" >
          <p v-if="student!=null">{{student.nickname}} 在线</p>
          <p v-for="item in friendAccounts" :key="item" style="border: 1px solid #c81623"><a @click="toName=item"><label>{{item}}</label></a></p>
        </div>
        <div class="right-chat">
          <div class="head-box">
            昵称{{toName}}
          </div>
          <div class="message-record">
            <div v-for="(item,index) in messageList" :key="index" style="width: 100%">
              <p v-if="item.userLocation==='l'" style="text-align: left;margin-top: 0px">{{item.mess}}</p>
              <p v-if="item.userLocation==='r'" style="text-align: right;margin-top: 0px">{{item.mess}}</p>
            </div>
          </div>
          <div class="message-input">
            <textarea style="width: 100%;height: 100%;border-radius: 0px 0px 0px 0px" v-model="messageValue"></textarea>
            <el-button style="margin: -16% 0% 0% 80%" @click="sendMessage()">发送</el-button>
          </div>
        </div>
      </div>
      <!--<div class="chat-box" style="background: #669999;width: 600px;height: 600px;margin: 30px auto">
        <div class="left-chat"></div>
        <div class="right-chat">
          <div class="head-box">
            昵称
            <i class="el-icon-close" style="float: right;font-size: 30px" ></i>
          </div>
          <div class="message-record"></div>
          <div class="message-input">
            <textarea style="width: 100%;height: 100%;border-radius: 0px 0px 10px 0px"></textarea>
            <el-button style="margin: -16% 0% 0% 85%" size="small" >发送</el-button>
          </div>
        </div>
      </div>-->
    </el-drawer>
    <div class="message" style="background: #999999">
      <div v-for="(value,key,index) in messageList" :key="index">
        <el-tag v-if="value.name==name" type="success" style="float:right">我：{{value.msg}}</el-tag>
        <br />
        <el-tag v-if="value.name!=name" style="float:left">{{value.name}}：{{value.msg}}</el-tag>
        <br />
        {{aisle}}
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="main">
          <el-row>
            <el-input
                placeholder="请输入自己的昵称"
                prefix-icon="el-icon-user-solid"
                v-model="name"
                style="width:50%"
            ></el-input>
            <el-button type="primary" @click="connectWebSocket()">建立连接</el-button>
            <el-button type="danger">断开连接</el-button>
          </el-row>
          <el-row>
            <el-input
                placeholder="请输入对方频道号"
                prefix-icon="el-icon-phone"
                v-model="aisle"
                style="width:40%"
            ></el-input>
          </el-row>
          <el-row>
            <el-input
                placeholder="请输入要发送的消息"
                prefix-icon="el-icon-s-promotion"
                v-model="messageValue"
                style="width:50%"
            ></el-input>
            <el-button type="primary" @click="sendMessage()">发送</el-button>
          </el-row>

        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name:'ChatRoom',
  data() {
    return {
      name: "", // 昵称
      websocket: null, // WebSocket对象
      aisle: "", // 对方频道号
      messageList: [], // 消息列表
      messageValue: "", // 消息内容
      drawer: false,
      direction: 'rtl',
      student:[],
      params:{
        studentAccount:'',
      },
      friendAccounts:[],
      toName: '',
    };
  },
  methods: {
    //判断是否已登录
    judgeLogin(){
      let student = JSON.parse(sessionStorage.getItem('student'))
      if (null == student){
        return false
      }else {
        this.student = student
        return true
      }
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(
            done()
          )
          .catch({});
    },
    connectWebSocket: function() {
      console.log("建立连接");
      if (this.params.studentAccount === "") {
        this.$alert("请输入自己的昵称", "提示", {
          confirmButtonText: "确定",
         /* callback: action => {}*/
        });
      } else {
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
        let _this = this;
        this.websocket.onmessage = function(event) {
          //获取服务器端推送过来的消息
          let dataStr = event.data
          //将dataStr转换为json对象
          let res = JSON.parse(dataStr)
          console.log("res="+ JSON.stringify(res))
          //判断是否为系统消息
          if (res.system){
            _this.friendAccounts = res.message
          }else {
            let m = {userLocation:"l",mess:res.message}
            _this.messageList.push(m)
          }
         /* let object = eval("(" + event.data + ")");
          console.log(object);
          if (object.type == 0) {
            // 提示连接成功
            console.log("连接成功");
            _this.friendAccounts = object.onlineUserList
            _this.showInfo(object.people, object.aisle);
          }
          if (object.type == 1) {
            //显示消息
            console.log("接受消息");
            _this.messageList.push(object);
          }*/
        };

        //连接关闭的回调方法
        this.websocket.onclose = function() {};
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
          this.websocket.close();
        };
      }
    },
    // 发送消息
    sendMessage: function() {
      let socketMsg = {"message": this.messageValue, "toName": this.toName};
      let m = {userLocation:"r",mess:this.messageValue}
      this.messageList.push(m)
      this.websocket.send(JSON.stringify(socketMsg));
      this.messageValue=''
    },
    showInfo: function(people, aisle) {
      this.$notify({
        title: "当前在线人数：" + people,
        message: "您的频道号：" + aisle,
        duration: 0
      });
    }
  },
  created() {
    if (!this.judgeLogin()){//没登录
      alert("尚未登录！即将跳转登录页面...")
      this.$router.push({path:"/login"})
      return false
    }
    this.params.studentAccount = this.student.account
  }
};
</script>

<style scoped>
.main {
  position: relative;
  top: 20px;
}
.message {
  position: relative;
  overflow:auto;
  width: 100%;
  height: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 5px;
}
.chat-box{
  background: #669999;
  width: 600px;
  height: 600px;
  margin: 30px auto;

}
.left-chat{
  background: #9caf44;
  width: 28%;
  height: 100%;
  float: left;
/*  border-radius: 10px 0px 0px 10px;*/
}
.right-chat{
  background: #FB8C00;
  width: 72%;
  height: 100%;
  float: left;
/*  border-radius: 0px 10px 10px 0px;*/
}
.head-box{
  background: #666666;
  height: 5%;
/*  border-radius: 0px 10px 0px 0px;*/
 }
.message-record{
  background: #999999;
  width: 100%;
  height: 70%;
/*  border-radius: 0px 0px 0px 0px;*/
}
.message-input{
  background: #2196F3;
  width: 100%;
  height: 25%;
/*  border-radius: 0px 0px 10px 0px;*/
}
</style>