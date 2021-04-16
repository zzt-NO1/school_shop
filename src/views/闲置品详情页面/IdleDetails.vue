<template>
  <div class="detailsPage">
    <!-- BUTTONS (input/labels) -->
    <div class="page-body" v-loading="loading">
      <!-- SLIDES -->
      <div class="slide-wrapper">
        <div id="slide-role">
            <img v-bind:src="modelData.pictures" class="imgs">
            <img v-if="modelData.pictures===null || modelData.pictures===''" src="../../assets/img/noPics.png" class="imgs">
        </div>
      </div>
      <div class="label-wrapper">
        <button  class="face-button trigger" v-for="(item,index) in modelData.picBase64List" :key="index" @click="btnClick(index)">
          <div class="face-container">
            <span class="eye left"></span>
          </div>
        </button>
      </div>
      <div class="msg-wrapper">
        <div style="width: 110px;float: left;margin-top: 10px">
          <label style="font-size: 14px" class="chatWithOwner" @click="connectOwner(modelData.studentAccount)">
            联系主人 <i class="el-icon-chat-dot-square"></i>
          </label>
        </div>
        <h2>
          <p class="title-p">{{modelData.title}}<span v-if="modelData.validMark===0 || modelData.remain===0 || modelData.passMark!=1" style="font-family: 仿宋">(下架)</span></p>
          <span v-if="modelData.rentAndSellMark===0" style="background-color: #6699CC; color: whitesmoke" class="type-span">出售</span>
          <span v-if="modelData.rentAndSellMark===1" style="background-color: #669999; color: whitesmoke" class="type-span">出租</span></h2>
        <div>
          <p class="p-pft">
            <span class="p-pft-span iconfont" ><span class="priceSpan" style="font-size: 16px;color: red">价格:</span><span style="font-size: 19px; color: red">￥<span style="font-size: 24px;" class="priceSpan">{{modelData.price}}</span></span></span>
            <span class="p-pft-span iconfont isFreeSpan" v-if="modelData.isFree==0">&#xe663;<span class="isFreeSpan">不包邮</span></span>
            <span class="p-pft-span iconfont isFreeSpan" v-if="modelData.isFree==1">&#xe663;<span class="isFreeSpan">包邮</span></span>
            <span class="p-pft-span iconfont">
              <span class="iconfont" style="font-size: 16px;color: #2d8cf0">&#xe671;<span class="transSpan" style="font-size: 16px">支持:</span></span>
              <span class="iconfont" style="font-size: 18px;color: #2d8cf0" v-if="modelData.transWay==0">&#xe823;<span class="transSpan">快递或校内取货</span></span>
              <span class="iconfont" style="font-size: 18px;color: #2d8cf0" v-if="modelData.transWay==1">&#xe726;<span class="transSpan">校内取货</span></span>
              <span class="iconfont" style="font-size: 18px;color: #2d8cf0;" v-if="modelData.transWay==2">&#xe823;<span class="transSpan">快递邮寄</span></span>
            </span>
          </p>
        </div>
        <div>
          <div class="main">
            <div class="quan1"></div>
            <div class="quan2"></div>
            <div class="quan3">
              <div class="cat-word" style="font-size: 14px; color: #666666">
                <span style="font-size: 17px;color: #FF6600">{{modelData.quality}}</span>好物件,仅剩<span style="color: #FF6600;font-size: 18px">{{modelData.remain}}</span>件了喔！先到先得！
              </div>
            </div>
            <span class="stand" style="font-size: 14px;">类型:{{modelData.type}}</span>
            <div class="cat">
              <div class="body"></div>
              <div class="head">
                <div class="ear"></div>
                <div class="ear"></div>
              </div>
              <div class="face">
                <div class="nose"></div>
                <div class="whisker-container">
                  <div class="whisker"></div>
                  <div class="whisker"></div>
                </div>
                <div class="whisker-container">
                  <div class="whisker"></div>
                  <div class="whisker"></div>
                </div>
              </div>
              <div class="tail-container">
                <div class="tail">
                  <div class="tail">
                    <div class="tail">
                      <div class="tail">
                        <div class="tail">
                          <div class="tail">
                            <div class="tail"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="p-address"><span class="iconfont" style="color:#669933;">&#xe651;<span style="font-size: 16px;color: #669933;font-family: 仿宋">校内取货地点:</span><span style="color: #669933;font-size: 20px;font-family: 仿宋">{{modelData.address}}</span></span></p>
        </div>
        <div class="other-msg">
          <span class="iconfont focus-span1">&#xe719;</span>
          <div class="div-shang">
            详情:<div class="div-description">{{modelData.describe}}</div>
          </div>
          <div v-if="modelData.rentAndSellMark==1" class="div-xia">
            <hr/>
            租赁要求:<div><li class="rule-li" v-for="(item,index) in modelData.ruleList" :key="index">{{item}}</li></div>
          </div>
        </div>
        <div>
          <!--<div class="owner">某某人:某某联系方式</div>-->
          <div class="btn-div1 ">
            <input type="button" class="p-btn" value="加入购物车" @click="addIdleToCart">
          </div>
          <div class="btn-div2 ">
            <input type="button" class="p-btn" value="立即下单" @click="goToConfirmPage">
          </div>
        </div>
      </div>
    </div>
    <div class="page-body1">
      <div class="board_panel">
        <h2>留言信息</h2>
        <div class="input">
          <textarea class="textarea-panel" id="comment" placeholder="请输入留言..." minlength="1" @blur="commentBlur" @focus="commentFocus"></textarea>
          <!--<em class="commentWar">内容不能是空的</em>-->
          <div class="post_button">
            <button class="el-button" id="postBtn" disabled>提交</button>
          </div>
        </div>
      </div>
      <div class="out">
        <hr/>
        暂无留言
      </div>
    </div>
  </div>
</template>
<!--<script src="../闲置品详情页面/js/index.js"></script>-->
<script>
import axios from "axios";

export default {
  name: "IdleDetails",

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
      }
    }

  },
  methods: {
    //与主人联系
    connectOwner(ownerAccount){
      console.log("ownerAccount="+ownerAccount)
      localStorage.setItem("owner",ownerAccount);
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
    '$route':'getParams'
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

/*@keyframes progressAnimationStrike {
  from {
    width: 0;
  }
  to {
    width: ;
  }
}*/
.chatWithOwner{
  color: #669999;
}
.chatWithOwner:hover{
  color: #2d8cf0;
}
</style>