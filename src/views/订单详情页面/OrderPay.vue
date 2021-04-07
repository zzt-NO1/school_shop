<template>
  <div class="OrderPay">
    <div class="OrderPay-body">
      <h2 style="color:#123D64;">订单支付</h2>
      <el-form>
        <p style="text-align: right;width: 70%;margin: auto;color: #666666">剩余支付时间:<span style="color: red;font-size: 20px"> {{minutes}} 分 {{second}} 秒</span></p>
        <el-form-item v-for="(item,index) in orderInfoList" :key="index">
          <el-card class="box-card" style="width: 70%;margin: auto;text-align: left">
              <div style="width: 110px">
                <el-image :src="item.idle.pictures" :preview-src-list="[item.idle.pictures]" :key="item.orderId" style="width: 80px;height: 80px"></el-image>
              </div>

              <div class="card-head-div">
                <p style="margin:-105px 0px 65px 0px;width: 600px">
                  <span><B>{{item.idle.title}}</B></span>
                  <span style="float: right; font-size: 13px;color: #ABABAB" type="text">订单编号:{{item.orderId}}</span>
                </p>
                <p style="width: 600px;margin: -75px 0px 35px 0px">
                  <span v-if="item.transWay===1" style="color:#409EFF;">校内自取 <span><i class="el-icon-location-information"></i>{{item.idle.address}}</span></span>
                  <span v-if="item.transWay===2" style="color:#409EFF;" class="iconfont">&#xe671;快递邮寄</span>
                </p>
                <p style="width: 600px;margin: -45px 0px 5px 0px">
                  <span v-if="item.rentAndSellMark===0" style="color: #FF4F2C">￥<span style="font-size: 16px">{{item.idle.price}}</span>元 <span style="font-size: 16px">×{{item.buyCount}}</span></span>
                  <span v-if="item.rentAndSellMark===1" style="color: #FF4F2C">￥<span style="font-size: 16px">{{item.idle.price}}</span>元/天 <span  style="font-size: 16px">×{{item.buyCount}}</span></span>
                  <span v-if="item.rentAndSellMark===1" style="margin-left: 20px;color: #666666">租用: <span style="color: #FF4F2C;font-size: 16px">{{item.dayCount}}</span> 天</span>
                </p>
              </div>
              <el-collapse>
                <el-collapse-item name="1" >
                  <template slot="title">
                    <span style="color: #409EFF;font-size: 14px">订单详情</span>
                  </template>
                  <div style="color: #666666">收货信息:
                    <span style="margin-left: 20px;">{{item.receivingInfo}}</span>
                  </div>
                  <div style="color: #666666">订单编号:<span style="margin-left: 20px">{{item.orderId}}</span></div>
                  <div style="color: #666666">创建时间:<span style="margin-left: 20px">{{item.createTime}}</span></div>
                </el-collapse-item>
              </el-collapse>
          </el-card>
        </el-form-item>
        <el-form-item>
          <p style="text-align: right;width: 70%;margin: auto">
            <span style="float: left;color: #666666">温馨提示：请尽快完成支付，离开该页面将自动结束订单哟！</span>
            <span style="margin-right: 15px;">总计:<span style="color: #FF4F2C">￥<span style="font-size: 19px">{{sum}}</span>元</span></span>
            <el-button type="primary" @click="paySubmit" :disabled="payBtn">立即支付</el-button>
          </p>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
name: "OrderPay",
  data(){
    return{
      payBtn:false,
      student:{},
      orderInfoList: [],
      params: {
        timeOut:false,
        orderIdList:[],
      },
      minutes: 14, //分
      seconds: 59, //秒
    }
  },
  methods:{
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
    //确认支付
    paySubmit(){
      for (let i = 0; i < this.orderInfoList.length; i++) {
        this.params.orderIdList.push(this.orderInfoList[i].orderId)
      }
      this.payBtn = true
      const _this = this
      axios.post('http://localhost:8181/orderOperate/orderPay',{
        params: this.params
      }).then(function (res) {
            console.log(JSON.stringify(res.data));
            if (res.data != null ) {//成功
              if (res.data.payResult){
                _this.$alert('支付成功，请耐心等待处理结果！', '结果', {
                  confirmButtonText: '确定',
                })
                _this.$router.push({path:'/goods'})
              }else if (res.data.statusCode==7){
                _this.$alert('支付超时，订单失效！', '结果', {
                  confirmButtonText: '确定',
                })
                _this.$router.push({path:'/goods'})
              }

            } else {
              console.log('支付失败');
              _this.$message({
                message:'数据出错，请联系管理员！',
                type:'error'
              })
            }
          }
      );
    },
    // 倒计时
    num(n) {
      // 倒计时结束重新刷新页面
      if (this.minutes === 0 && this.seconds === 2) {
        this.$message.warning('支付倒计时结束!即将刷新页面!');
        this.payBtn = true
        this.params.timeOut = true
      }
      if (this.minutes === 0 && this.seconds === 0) {
        this.paySubmit();
      }
      return n < 10 ? '0' + n : '' + n;
    },
    // 倒计时
    timer() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
    beforeunloadHandler(e) {
      e = e || window.event;
      if (e) {
        e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
      }
      return "您是否确认离开此页面-您输入的数据可能不会被保存";
    },
  },
  created() {
    if (!this.judgeLogin()){
      alert("尚未登录！即将跳转登录页面...")
      this.$router.push({path:"/login"})
      return false
    }
    let orderList = JSON.parse(this.$route.query.orderIdList)
    this.params.orderIdList = orderList
    const _this = this
    axios.post('http://localhost:8181/orderOperate/getOrderListByOrderIdList',{
      params: this.params
    }).then(function (res) {
          console.log(res.data);
          if (res.data != null && res.data.searchResult) {//成功
            _this.orderInfoList = res.data.orderRecordList;
          } else {
            console.log('查询失败');
            _this.$message({
              message:'数据出错，请联系管理员！',
              type:'error'
            })
          }
        }
    );

  },
  computed:{
    sum:function (){
      let s = 0
      for (let i = 0; i < this.orderInfoList.length; i++) {
        if (this.orderInfoList[i].rentAndSellMark==0){
          s += this.orderInfoList[i].price*this.orderInfoList[i].buyCount
        }else {
          s += this.orderInfoList[i].price*this.orderInfoList[i].buyCount*this.orderInfoList[i].dayCount
        }
      }
      return s
    },
    // 倒计时
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    },
  },
  mounted() {
    // 倒计时
    this.timer();
    window.addEventListener("beforeunload", e => {
      this.beforeunloadHandler(e);
    });
  },
  destroyed() {
    window.removeEventListener("beforeunload", e => {
      this.beforeunloadHandler(e);
    });
  },
  watch: {
    // 倒计时
    second: {
      handler(newVal) {
        this.num(newVal);
      },
    },
    // 倒计时
    minute: {
      handler(newVal) {
        this.num(newVal);
      },
    },
  },
}
</script>

<style scoped>
.OrderPay-body{
  width:70%;
  height: auto;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
}
.card-head-div{
  width: 600px;
  margin: 0px 0px 0px 110px;
}
</style>