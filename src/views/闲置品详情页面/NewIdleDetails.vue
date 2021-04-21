<template>
  <div style="width: 100%;height: 680px">
    <div style="width: 70%;height: 100%;margin:auto;padding: 20px">
      <div style="width: 100%;margin-left: 5%">
        <div class="img-div" style="width: 25%;height: 300px;margin:auto;border: 1px solid lightgray;border-radius: 10px 0px 0px 0px;float: left">
          <el-carousel height="300px" style="width: 100%;margin: auto">
            <el-carousel-item v-for="(item,index) in modelData.picBase64List" :key="index" style="width: 100%;">
              <el-image class="medium" :src="item" style="height: 240px;width: 240px;margin: auto;border-radius: 10px" :preview-src-list="[item]" fit="cover"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="msg-div" style="width: 65%;height: 300px;margin: auto;border: 1px solid lightgray;border-radius: 0px 10px 0px 0px;float: left">
          <div style="width: 100%;height: 100%;">
            <div style="width: 100% ;height: 100%;float: left;">
              <div style="font-size: 19px;width: 100%;height:35px;padding:6px 60px 0px 30px;background-color: #D7DBDD;text-align:  center;border-radius: 0px 10px 0px 0px">{{modelData.title}}</div>
              <div style="width: 100%;height: 30px;margin-top: 20px;text-align: left;margin-left: 30px">
                <span class="iconfont" ><span style="color: red">价格:</span><span style="color: red">￥<span>{{modelData.price}}</span></span></span>
                <span class="iconfont" v-if="modelData.isFree==0" style="margin-left: 40px">&#xe663;<span >不包邮</span></span>
                <span class="iconfont" v-if="modelData.isFree==1" style="margin-left: 40px">&#xe663;<span >包邮</span></span>
              </div>
              <div  style="width: 100%;height: 30px;margin-top: 15px;text-align: left;margin-left: 30px">
                <span class="iconfont">
                  <span class="iconfont" style="color: #2d8cf0">&#xe671;<span>支持:</span></span>
                  <span class="iconfont" style="color: #2d8cf0" v-if="modelData.transWay==0">&#xe823;<span>快递或校内取货</span></span>
                  <span class="iconfont" style="color: #2d8cf0" v-if="modelData.transWay==1">&#xe726;<span>校内取货</span></span>
                  <span class="iconfont" style="color: #2d8cf0;" v-if="modelData.transWay==2">&#xe823;<span>快递邮寄</span></span>
                </span>
              </div>
              <div style="width: 100%;margin-top: 15px;text-align: left;margin-left: 30px">
                <span class="iconfont" style="color:#669933;margin-top: 10px">&#xe651;<span style="color: #669933;font-family: 黑体">校内取货地点:</span><span style="color: #669933">{{modelData.address}}</span></span>
              </div>
              <!--<div style="width: 100%;margin-top: 20px">
               <span class="iconfont"> 购买数量 </span><el-input-number size="mini" style="width: 90px"></el-input-number>
              </div>-->
              <div style="width:100%;height: 30px;margin-top: 15px;font-size: 14px;float: left;padding-top: 15px;margin-left: 30px;text-align: left" class="chatWithOwner">
                <a  @click="connectOwner(modelData.studentAccount)" class="chat-a">
                  ( •̀ ω •́ )✧ 点我和它的主人谈一谈咯
                </a>
              </div>
              <div style="width: 100%;margin-top:75px;text-align: left;margin-left: 30px">
                <div style="width: 35%;float: left;margin: auto">
                  <el-button  @click="addIdleToCart" style="width: 200px;" plain type="danger">加入购物车</el-button>
                </div>
                <div style="width: 35%;float:left;margin: auto">
                  <el-button  @click="goToConfirmPage" style="width: 200px" plain type="primary">立即下单</el-button>
                </div>
              </div>
            </div>
            <div style="width:100px;height:195px;margin: 35px 234px 0px -334px;float:left;" class="swing">
              <div style="width: 1px;height: 75px;background-color: #222222;margin:0px 0px 32px 51px;" ></div>
              <span v-if="modelData.rentAndSellMark===0" style="background-color:rgb(255 248 220); color:#F39C12;margin-top: -34px;opacity: 0.8" class="type-span">出售</span>
              <span v-if="modelData.rentAndSellMark===1" style="background-color:rgb(255 248 220); color:#F39C12;margin-top: -34px;opacity: 0.8" class="type-span">出租</span>
            </div>
<!--------猫-------------------------------------------------------------------------------------------------------------------->
            <div style="width: 200px;height: 220px;float: left;margin-top: -233px;margin-left:445px">
              <div style="width: 163px;height: 75px;border: 1px solid #222222;float: left;margin-left: 50px;margin-top: -5px;margin-bottom:0px;border-radius: 50%;padding: 20px 0px 0px 0px" >
                <div class="cat-word" style="font-size: 14px; color: #666666">
                  <span style="font-size: 17px;color: #FF6600">{{modelData.quality}}</span>好物件,仅剩<span style="color: #FF6600;font-size: 18px">{{modelData.remain}}</span>件了喔！先到先得！
                </div>
              </div>
              <div style="width: 12px;height: 12px;border: 1px solid #222222;float: left;margin-left: 95px;margin-top: 0px;margin-bottom:12px;border-radius: 50%;padding: 0px 0px 0px 18px" > </div>
              <div style="width: 10px;height: 10px;border: 1px solid #222222;float: left;margin-left: 90px;margin-top: -10px;border-radius: 50%;padding: 0px 0px 0px 12px" > </div>
              <img src="../../views/闲置品详情页面/img/cat1.jpg" style="width: 115px;height: 115px;float:left;margin-top: 5px;margin-left: 65px">
            </div>
          </div>

        </div>
      </div>
<!-----详情描述------------------------------------------------------------------------------------------------------------------>
        <div  style="width: 90%;border: 1px solid #d9d9d9;border-radius:0px 0px 10px 10px;float: left;margin-left: 5%;">
          <div style="background-color: #D7DBDD;text-align: center;height: 45px;width: 100%;border-radius: 0px 0px 0px 0px;padding-top: 10px">
            <span class="iconfont" style="float: left;font-size: 35px;margin-top: -10px">&#xe719;</span>
            <span style="font-size: 18px">闲置品详情</span>
          </div>
          <div style="width: 100%;height: 100%;margin-top: 0px">
            <div style="width: 100%;height: 100%;margin-bottom: 50px;border-top: 1px solid #d9d9d9">
              <div style="text-align: left">
                <el-divider style="width: 80%" >
                  <span>详情</span>
                </el-divider>
                <div  style="width: 100%;margin-left: 20px"><span style="font-size: 16px">{{modelData.describe}}</span></div>
              </div>
              <div v-if="modelData.rentAndSellMark==1">
                <el-divider style="width: 80%">
                  <span>租赁要求</span>
                </el-divider>
                <div style="width: 100%;margin-left: 20px;text-align: left">
                  <li v-for="(item,index) in modelData.ruleList" :key="index">{{item}}</li>
                </div>
              </div>
            </div>
            <div style="width: 100%;height: 100%;margin-bottom: 50px;border: 1px solid #d9d9d9">
              <div v-for="(item,index) in modelData.picBase64List" :key="index" style="width: 100%;">
                <el-image class="medium" :src="item" style="height: 100%;width:auto;margin: auto" :preview-src-list="[item]" fit="cover"></el-image>
              </div>
            </div>

          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "testDetails",

  data() {
    return{
      loading:true,
      val: '50%',
      slip:'',
      active: true,
      btnValue:0,
      student:[],
      pic: require('../闲置品详情页面/img/5.jpg'),
      picBase64List:[
        {
          imgSrc:require('../闲置品详情页面/img/5.jpg')
        },
        {
          imgSrc:require('../闲置品详情页面/img/3.jpg')
        },
        {
          imgSrc:require('../闲置品详情页面/img/2.jpg')
        },
        {
          imgSrc:require('../闲置品详情页面/img/1.jpg')
        },
      ],
      modelData:{
        title: '大松鼠玩偶',
        rentAndSellMark: 1,
        type: '其他',
        price:50,
        quality:'8成新',
        count:2,
        transWay: 0,
        isFree: 0,
        studentAccount:'',
        address:'南校区六公寓',
        describe:'手感不错',
        ruleList:[
          '完整归还',
          '弄丢赔钱'
        ],
        remain:0,
      },
      params:{
        studentAccount: null,
        idleId:null,
        ownerAccount:'',
      }
    }

  },
  methods: {
    //与主人联系
    connectOwner(ownerAccount){
      if (this.judgeLogin()){
        console.log("studentAccount=="+this.params.studentAccount)
        console.log("ownerAccount="+ownerAccount)
        this.addRelatedIdle(ownerAccount)
        localStorage.setItem("owner",ownerAccount);
      }else {
        window.alert("尚未登录，请前往登录页面进行登录！")
        this.$router.push({path:"/login"})
      }
    },
    //为双方添加关联闲置品
    addRelatedIdle(ownerAccount){
      this.params.ownerAccount = ownerAccount;
      axios.post('http://localhost:8181/chat/addIdleIdBetweenStudents',{
        params: this.params
      }).then(function (res) {
            console.log(res.data)
          }
      );
    },
    //跳转订单确认页面
    goToConfirmPage(){
      if (!this.judgeLogin()){//t没登录
        window.alert("尚未登录，请前往登录页面进行登录！")
        this.$router.push({path:"/login"})
      }else {
        if (this.modelData.validMark===0 || this.modelData.remain===0 || this.modelData.passMark!=1){//下架商品
          this.$alert('已下架物品无法加至购物车哦！', '提示信息', {
            confirmButtonText: '确定',
          });
        }else if (this.student.infoPerfectionMark != 1){
          this.$alert('请先到个人中心完善个人信息哦！', '温馨提示', {
            confirmButtonText: '确定',
          });
          this.$router.push({path:'/personalInfo'})
        }else {
          let buyList=[]
          let idAndCount={id:0,count:0}
          if (this.modelData.rentAndSellMark==0){//出售的
            idAndCount.id = this.modelData.id
            idAndCount.count = 1
            buyList.push(idAndCount)
            localStorage.setItem("typeMark",JSON.stringify(this.modelData.rentAndSellMark))
            localStorage.setItem("buyList",JSON.stringify(buyList))
          }else {//出租的
            idAndCount.id = this.modelData.id
            idAndCount.count = 1
            buyList.push(idAndCount)
            localStorage.setItem("typeMark",this.modelData.rentAndSellMark)
            localStorage.setItem("rentList",JSON.stringify(buyList))
          }
          console.log("idAndCount"+JSON.stringify(idAndCount))
          if (null != localStorage.getItem("buyList")||null!=localStorage.getItem("rentList")){
            this.$router.push({path:'/orderConfirm'})
          }
        }
      }
    },

    btnClick(index){
      /* let btn = document.getElementsByClassName('face-button')*/
      console.log("index="+index)

      this.modelData.pictures = this.modelData.picBase64List[index]
    },
    // 检查内容
    commentFocus(){
      document.getElementsByClassName('commentWar')[0].style.display = 'none';
      this.comment = 0;
    },
    commentBlur(){
      if(document.getElementById('comment').value==''){
        document.getElementsByClassName('commentWar')[0].style.display = 'block';
      }else{
        this.comment = 1;
        if(this.title==1 && this.comment==1 && this.code==1){
          document.getElementById('postBtn').disabled = false;
          document.getElementById('postBtn').style.background = '#00bfff';
          document.getElementById('postBtn').style.cursor = 'pointer';
        }
      }
    },
    getIdleInfoById(id){
      const _this = this
      this.params.idleId = id;
      axios.post('http://localhost:8181/idleInfo/getIdleInfoByIdleId',{
        params: this.params
      }).then(function (res) {
            console.log(res.data);
            if (res.data != null && res.data.searchStatus) {//成功
              console.log('闲置品查询成功');
              _this.modelData = res.data.idle;
              _this.loading=false
            } else {
              console.log('闲置品查询失败');
              return '';
            }
          }
      );
    },
    addIdleToCart(){
      let _this = this
      console.log("studentAccount="+this.params.studentAccount)
      console.log("idleId="+this.params.idleId)
      if (this.judgeLogin()){//已登录
        if (this.modelData.validMark===0 || this.modelData.remain===0 || this.modelData.passMark!=1){//下架商品
          this.$alert('已下架物品无法加至购物车哦！', '提示信息', {
            confirmButtonText: '确定',
          });
        }else {
          axios.post('http://localhost:8181/cartOperate/addIdleToCart',{
            params: this.params
          }).then(function (res) {
                console.log(res.data);
                if (res.data != null && res.data.addResult) {//成功
                  _this.$message({
                    message: '闲置品已成功添加至购物车',
                    type: 'success',
                    showClose:true
                  });
                  console.log('成功添加至购物车');
                  //window.alert("已添加至购物车！")
                } else {
                  _this.$message({
                    message: '添加至购物车失败,请稍后重试！',
                    type: 'error',
                    showClose:true
                  });
                  console.log('添加至购物车失败');
                  return false;
                }
              }
          );
        }
      }else {
        window.alert("尚未登录，请前往登录页面进行登录！")
        this.$router.push({path:"/login"})
      }
    },
    //判断是否已登录
    judgeLogin(){
      let student = JSON.parse(sessionStorage.getItem('student'));
      if (null == student){
        return false;
      }else {
        this.student= student
        this.studentName = student.nickname;
        this.params.studentAccount = student.account;
        return true;
      }
    },
  },
  watch:{
    '$route'(){
      this.loading = true
      let idleId = this.$route.query.idleId
      if (idleId!=null&&idleId!=''){
        this.params.idleId = parseInt(idleId)
        this.getIdleInfoById(this.params.idleId)
      }

    }
  },
  created() {
    console.log("进入详情页...")
    let idleId = this.$route.query.idleId
    this.params.idleId = parseInt(idleId)
    console.log("idleId=" + idleId)
    this.getIdleInfoById(parseInt(idleId))
  },
  mounted(){
    /*this.val = Math.floor(Math.random() * 101)*/
  },

}
</script>


<style scoped>
@import "../闲置品详情页面/css/style.css";
.swing {
  margin: 0 auto;
  width: 0;
  height: 0;
  animation: move infinite;
  animation-duration: 20s;
  -webkit-animation: move infinite;
  -webkit-animation-duration: 20s;
  transform-origin: top;
  -webkit-transform-origin: top;
  animation-delay:1s;
  -webkit-animation-delay:1s;
}
@keyframes move {
  0%,
  65% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  70% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  75% {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  80% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  85% {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  90% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  95% {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  100% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
}
.chat-a:hover{
  color: #FF4F2C;
  cursor: pointer;
}
</style>