<template>
<div>
  <div class="OrderCenter-body">
    <h2>订单中心</h2>
    <div class="top_tap">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane name="second">
            <template slot="label">
              我出售的
              <el-badge :value="forSellListNews.length" style="margin-top: 10px" v-if="forSellListNews!=null && forSellListNews.length!=0">
              </el-badge>
            </template>
          <el-card shadow="hover" class="el-card-item"  v-for="(item,index) in forSellList" :key="index">
            <div style="height: 110px;margin: auto" >
              <div style="width: 13%;height: 100%;float: left">
                <el-image :src="item.idle.pictures" :preview-src-list="[item.idle.pictures]" :key="item.orderId" style="width: 100%;height: 100%"></el-image>
              </div>
              <div style="width: 55%;height: 100%;float: left;margin-left: 20px">
                <p style="text-align: left">
                  <span style="font-size: 18px"><B>{{item.idle.title}}</B></span>
                </p>
                <p style="text-align: left;color: #999999;font-size: 14px">
                  <span style="margin-right: 20px">单价: <span style="color: #FC8770">￥<span>{{item.idle.price}}元</span></span></span>
                  <span style="margin-right: 20px">购买数量: <span style="color: #FC8770">{{item.buyCount}}</span></span>
                  <span style="margin-right: 20px">总额: <span style="color: #FC8770">￥<span>{{item.price}}元</span></span></span>
                </p>
                <p style="color: #999999;text-align: left;font-size: 14px">订单状态:
                  <span v-if="item.statusCode===0">等待买家付款</span>
                  <span v-if="item.statusCode===1">对方已付款，等待发货</span>
                  <span v-if="item.statusCode===2">等待买家确认收货</span>
                  <span v-if="item.statusCode===5">等待系统退款给买家</span>
                  <span v-if="item.statusCode===6">订单结束</span>
                </p>
              </div>
              <div style="width: 13%;height: 100%;float: right;margin-left: 10px" v-if="item.statusCode===1">
                <el-button type="primary" plain style="margin:auto">确认发货</el-button>
                <el-button type="danger" plain style="margin: 10px auto">拒绝订单</el-button>
              </div>
            </div>
            <el-collapse>
              <el-collapse-item name="1" >
                <template slot="title">
                  <span style="color: #409EFF;font-size: 14px">订单详情({{item.orderId}})</span>
                </template>
                <div style="text-align: left;color: #999999">
                  <div v-if="item.receivingInfo!=null">收件人信息:<span style="margin-left: 20px">{{item.receivingInfo}}</span></div>
                  <div v-if="item.tradeRecordId!=null">钱包交易号:<span style="margin-left: 20px">{{item.tradeRecordId}}</span></div>
                  <div v-if="item.orderId!=null">订单编号:<span style="margin-left: 20px">{{item.orderId}}</span></div>
                  <div v-if="item.createTime!=null">创建时间:<span style="margin-left: 20px">{{item.createTime}}</span></div>
                  <div v-if="item.payTime!=null">付款时间:<span style="margin-left: 20px">{{item.payTime}}</span></div>
                  <div v-if="item.transTime!=null">发货时间:<span style="margin-left: 20px">{{item.transTime}}</span></div>
                  <div v-if="item.receiveTime!=null">收货时间:<span style="margin-left: 20px">{{item.receiveTime}}</span></div>
                  <div v-if="item.refundTime!=null">退款时间:<span style="margin-left: 20px">{{item.refundTime}}</span></div>
                  <div v-if="item.transWay!=0">取货方式:<span style="margin-left: 20px" v-if="item.transWay===1">校内自取({{item.idle.address}})</span>
                    <span style="margin-left: 20px" v-if="item.transWay===2">快递邮寄</span></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-tab-pane>
<!------------------------------------------------------------------------------------------------------------------------->
        <el-tab-pane  name="third">
          <template slot="label">
            我出租的
            <el-badge :value="forRentListNews.length" style="margin-top: 10px" v-if="forRentListNews!=null && forRentListNews.length!=0">
            </el-badge>
          </template>
          <el-card shadow="hover" class="el-card-item"  v-for="(item,index) in forRentList" :key="index">
            <div style="height: 110px;margin: auto" >
              <div style="width: 13%;height: 100%;float: left">
                <el-image :src="item.idle.pictures" :preview-src-list="[item.idle.pictures]" :key="item.orderId" style="width: 100%;height: 100%"></el-image>
              </div>
              <div style="width: 55%;height: 100%;float: left;margin-left: 20px">
                <p style="text-align: left">
                  <span style="font-size: 18px"><B>{{item.idle.title}}</B></span>
                </p>
                <p style="text-align: left;color: #999999;font-size: 14px">
                  <span style="margin-right: 20px">单价: <span style="color: #FC8770">￥<span>{{item.idle.price}}元/天</span></span></span>
                  <span style="margin-right: 20px">购买数量: <span style="color: #FC8770">{{item.buyCount}}</span></span>
                  <span style="margin-right: 20px">租用天数: <span style="color: #FC8770">{{item.dayCount}}</span></span>
                  <span style="margin-right: 20px">总额: <span style="color: #FC8770">￥<span>{{item.price}}元</span></span></span>
                </p>
                <p style="color: #999999;text-align: left;font-size: 14px">订单状态:
                  <span v-if="item.statusCode===0">等待对方付款</span>
                  <span v-if="item.statusCode===1">对方已付款，等待发货</span>
                  <span v-if="item.statusCode===2">等待对方确认收货</span>
                  <span v-if="item.statusCode===3">等待对方归还</span>
                  <span v-if="item.statusCode===4">等待主人确认收回</span>
                  <span v-if="item.statusCode===5">等待系统退款给买家</span>
                  <span v-if="item.statusCode===6">订单结束</span>
                </p>
              </div>
              <div style="width: 13%;height: 100%;float: right;margin-left: 10px" v-if="item.statusCode===1">
                <el-button type="primary" plain style="margin:auto">确认发货</el-button>
                <el-button type="danger" plain style="margin: 10px auto">拒绝订单</el-button>
              </div>
            </div>
            <el-collapse>
              <el-collapse-item name="1" >
                <template slot="title">
                  <span style="color: #409EFF;font-size: 14px">订单详情({{item.orderId}})</span>
                </template>
                <div style="text-align: left;color: #999999">
                  <div v-if="item.receivingInfo!=null">收件人信息:<span style="margin-left: 20px">{{item.receivingInfo}}</span></div>
                  <div v-if="item.tradeRecordId!=null">钱包交易号:<span style="margin-left: 20px">{{item.tradeRecordId}}</span></div>
                  <div v-if="item.orderId!=null">订单编号:<span style="margin-left: 20px">{{item.orderId}}</span></div>
                  <div v-if="item.createTime!=null">创建时间:<span style="margin-left: 20px">{{item.createTime}}</span></div>
                  <div v-if="item.payTime!=null">付款时间:<span style="margin-left: 20px">{{item.payTime}}</span></div>
                  <div v-if="item.transTime!=null">发货时间:<span style="margin-left: 20px">{{item.transTime}}</span></div>
                  <div v-if="item.receiveTime!=null">收货时间:<span style="margin-left: 20px">{{item.receiveTime}}</span></div>
                  <div v-if="item.returnTime!=null">对方归还时间:<span style="margin-left: 20px">{{item.returnTime}}</span></div>
                  <div v-if="item.takeBackTime!=null">主人确认收回时间:<span style="margin-left: 20px">{{item.takeBackTime}}</span></div>
                  <div v-if="item.refundTime!=null">退款时间:<span style="margin-left: 20px">{{item.refundTime}}</span></div>
                  <div v-if="item.transWay!=0">取货方式:<span style="margin-left: 20px" v-if="item.transWay===1">校内自取({{item.idle.address}})</span>
                    <span style="margin-left: 20px" v-if="item.transWay===2">快递邮寄</span></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-tab-pane>
<!------------------------------------------------------------------------------------------------------------------------->
        <el-tab-pane  name="fourth">
          <template slot="label">
            我购买的
            <el-badge :value="buyListNews.length" style="margin-top: 10px" v-if="buyListNews!=null && buyListNews.length!=0">
            </el-badge>
          </template>
          <el-card shadow="hover" class="el-card-item"  v-for="(item,index) in forSellList" :key="index">
            <div style="height: 110px;margin: auto" >
              <div style="width: 13%;height: 100%;float: left">
                <el-image :src="item.idle.pictures" :preview-src-list="[item.idle.pictures]" :key="item.orderId" style="width: 100%;height: 100%"></el-image>
              </div>
              <div style="width: 55%;height: 100%;float: left;margin-left: 20px">
                <p style="text-align: left">
                  <span style="font-size: 18px"><B>{{item.idle.title}}</B></span>
                </p>
                <p style="text-align: left;color: #999999;font-size: 14px">
                  <span style="margin-right: 20px">单价: <span style="color: #FC8770">￥<span>{{item.idle.price}}元</span></span></span>
                  <span style="margin-right: 20px">购买数量: <span style="color: #FC8770">{{item.buyCount}}</span></span>
                  <span style="margin-right: 20px">总额: <span style="color: #FC8770">￥<span>{{item.price}}元</span></span></span>
                </p>
                <p style="color: #999999;text-align: left;font-size: 14px">订单状态:
                  <span v-if="item.statusCode===0">等待付款</span>
                  <span v-if="item.statusCode===1">已付款，等待对方发货</span>
                  <span v-if="item.statusCode===2">等待确认收货</span>
                  <span v-if="item.statusCode===5">等待系统退款</span>
                  <span v-if="item.statusCode===6">订单结束</span>
                </p>
              </div>
              <div style="width: 13%;height: 100%;float: right;margin-left: 10px" v-if="item.statusCode===2">
                <el-button type="primary" plain style="margin:auto">确认收货</el-button>
              </div>
            </div>
            <el-collapse>
              <el-collapse-item name="1" >
                <template slot="title">
                  <span style="color: #409EFF;font-size: 14px">订单详情({{item.orderId}})</span>
                </template>
                <div style="text-align: left;color: #999999">
                  <div v-if="item.receivingInfo!=null">收件人信息:<span style="margin-left: 20px">{{item.receivingInfo}}</span></div>
                  <div v-if="item.tradeRecordId!=null">钱包交易号:<span style="margin-left: 20px">{{item.tradeRecordId}}</span></div>
                  <div v-if="item.orderId!=null">订单编号:<span style="margin-left: 20px">{{item.orderId}}</span></div>
                  <div v-if="item.createTime!=null">创建时间:<span style="margin-left: 20px">{{item.createTime}}</span></div>
                  <div v-if="item.payTime!=null">付款时间:<span style="margin-left: 20px">{{item.payTime}}</span></div>
                  <div v-if="item.transTime!=null">发货时间:<span style="margin-left: 20px">{{item.transTime}}</span></div>
                  <div v-if="item.receiveTime!=null">收货时间:<span style="margin-left: 20px">{{item.receiveTime}}</span></div>
                  <div v-if="item.refundTime!=null">退款时间:<span style="margin-left: 20px">{{item.refundTime}}</span></div>
                  <div v-if="item.transWay!=0">取货方式:<span style="margin-left: 20px" v-if="item.transWay===1">校内自取({{item.idle.address}})</span>
                    <span style="margin-left: 20px" v-if="item.transWay===2">快递邮寄</span></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-tab-pane>
<!------------------------------------------------------------------------------------------------------------------------->
        <el-tab-pane name="fifth">
          <template slot="label">
            我租用的
            <el-badge :value="rentListNews.length" style="margin-top: 10px" v-if="rentListNews!=null && rentListNews.length!=0">
            </el-badge>
          </template>
          <el-card shadow="hover" class="el-card-item"  v-for="(item,index) in forRentList" :key="index">
            <div style="height: 110px;margin: auto" >
              <div style="width: 13%;height: 100%;float: left">
                <el-image :src="item.idle.pictures" :preview-src-list="[item.idle.pictures]" :key="item.orderId" style="width: 100%;height: 100%"></el-image>
              </div>
              <div style="width: 55%;height: 100%;float: left;margin-left: 20px">
                <p style="text-align: left">
                  <span style="font-size: 18px"><B>{{item.idle.title}}</B></span>
                </p>
                <p style="text-align: left;color: #999999;font-size: 14px">
                  <span style="margin-right: 20px">单价: <span style="color: #FC8770">￥<span>{{item.idle.price}}元/天</span></span></span>
                  <span style="margin-right: 20px">购买数量: <span style="color: #FC8770">{{item.buyCount}}</span></span>
                  <span style="margin-right: 20px">租用天数: <span style="color: #FC8770">{{item.dayCount}}</span></span>
                  <span style="margin-right: 20px">总额: <span style="color: #FC8770">￥<span>{{item.price}}元</span></span></span>
                </p>
                <p style="color: #999999;text-align: left;font-size: 14px">订单状态:
                  <span v-if="item.statusCode===0">等待付款</span>
                  <span v-if="item.statusCode===1">已付款，等待对方发货</span>
                  <span v-if="item.statusCode===2">等待确认收货</span>
                  <span v-if="item.statusCode===3">等待归还</span>
                  <span v-if="item.statusCode===4">等待主人确认收回</span>
                  <span v-if="item.statusCode===5">等待系统退款</span>
                  <span v-if="item.statusCode===6">订单结束</span>
                </p>
              </div>
              <div style="width: 13%;height: 100%;float: right;margin-left: 10px" v-if="item.statusCode===2">
                <el-button type="primary" plain style="margin:auto">确认收货</el-button>
              </div>
              <div style="width: 13%;height: 100%;float: right;margin-left: 10px" v-if="item.statusCode===3">
                <el-button type="primary" plain style="margin:auto">确认归还</el-button>
              </div>
            </div>
            <el-collapse>
              <el-collapse-item name="1" >
                <template slot="title">
                  <span style="color: #409EFF;font-size: 14px">订单详情({{item.orderId}})</span>
                </template>
                <div style="text-align: left;color: #999999">
                  <div v-if="item.receivingInfo!=null">收件人信息:<span style="margin-left: 20px">{{item.receivingInfo}}</span></div>
                  <div v-if="item.tradeRecordId!=null">钱包交易号:<span style="margin-left: 20px">{{item.tradeRecordId}}</span></div>
                  <div v-if="item.orderId!=null">订单编号:<span style="margin-left: 20px">{{item.orderId}}</span></div>
                  <div v-if="item.createTime!=null">创建时间:<span style="margin-left: 20px">{{item.createTime}}</span></div>
                  <div v-if="item.payTime!=null">付款时间:<span style="margin-left: 20px">{{item.payTime}}</span></div>
                  <div v-if="item.transTime!=null">发货时间:<span style="margin-left: 20px">{{item.transTime}}</span></div>
                  <div v-if="item.receiveTime!=null">收货时间:<span style="margin-left: 20px">{{item.receiveTime}}</span></div>
                  <div v-if="item.returnTime!=null">对方归还时间:<span style="margin-left: 20px">{{item.returnTime}}</span></div>
                  <div v-if="item.takeBackTime!=null">主人确认收回时间:<span style="margin-left: 20px">{{item.takeBackTime}}</span></div>
                  <div v-if="item.refundTime!=null">退款时间:<span style="margin-left: 20px">{{item.refundTime}}</span></div>
                  <div v-if="item.transWay!=0">取货方式:<span style="margin-left: 20px" v-if="item.transWay===1">校内自取({{item.idle.address}})</span>
                    <span style="margin-left: 20px" v-if="item.transWay===2">快递邮寄</span></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
name: "OrderCenter",
  data(){
    return{
      activeName:'second',
      rentList:[],
      buyList:[],
      forRentList:[],
      forSellList:[],
      allOrderList:[],
      rentListNews:[],
      buyListNews:[],
      newsCount:0,
      forRentListNews:[],
      forSellListNews:[],
      student:{},
      params:{
        studentAccount:'',
      }
    }
  },
  methods:{
    getOrderRecordList(){
      let _this = this
      axios.post('http://localhost:8181/orderOperate/getOrderListByStudentAccount',{
        params: this.params
      }).then(function (res) {
         if (null != res.data && res.data.searchResult){
           _this.rentList = res.data.rentOrderList
           _this.buyList = res.data.buyOrderList
           _this.forRentList = res.data.forRentOrderList
           _this.forSellList = res.data.forSellOrderList
           _this.allOrderList = res.data.allOrderList
           //console.log("??"+JSON.stringify(res.data))
         } else{
           _this.$message.error("暂未查询到数据！")
         }
      })
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
      let student = JSON.parse(sessionStorage.getItem('student'))
      if (null == student){
        return false
      }else {
        this.student = student
        return true
      }
    },
  },
  created() {
    if (!this.judgeLogin()){//没登录
      alert("尚未登录！即将跳转登录页面...")
      this.$router.push({path:"/login"})
      return false
    }
    this.params.studentAccount = this.student.account
    this.getOrderRecordList()
    this.getNewNotice()
  }
}
</script>

<style scoped>
.OrderCenter-body{
  width: 70%;
  margin: auto;
  margin-top: 20px;
}
.top_tap{
  width: 100%;
  margin: auto;

}
/*.order-detail-div{
  width: 80%;
  height: 60px;
  border-radius: 6px;
  margin: 10px auto;
  border: 2px #FF4F2C;
}
.order-detail-div:hover{
  box-shadow: 0px 2px 5px #999999;
}*/
.el-card-item{
  width: 80%;
  margin: 10px auto;
  border-color: #D7D7D7;
}
.el-card-item:hover{
  box-shadow: 0px 0px 10px #BDC3C7!important;
}
</style>