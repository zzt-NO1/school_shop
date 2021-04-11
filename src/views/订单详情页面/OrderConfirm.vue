<template>
  <div class="OrderDetail">
    <div class="OrderDetail-body" v-loading="loading">
      <h1 style="color:#123D64;">订单确认</h1>
      <div class="ReciInfo">
        <el-divider></el-divider>
        <p style="text-align: left">
          <span style="color: #123D64;font-size: 18px"><B>收件人信息</B></span>
          <span style="float: right;color: #2468A5;cursor: pointer"><a @click="modifyMsg">修改收件信息</a></span>
        </p>
        <!--联系方式、校内线下交易地址/快递收件地址、新增地址按钮-->
        <el-form>
          <el-form-item label="" style="text-align: left;margin-left: 25px" size="small">
            <span >收件人：<span style="color: #409EFF;font-size:16px">{{buyerName}}</span></span>
            <span style="margin-left: 20px;">联系方式：<span style="color: #409EFF;font-size: 16px">{{phone}}</span></span>
          </el-form-item>
          <el-form-item label="" style="text-align: left;margin-left: 25px" size="small">
            <span >快递收件地址：<span style="color: #409EFF;font-size: 16px">{{address}}</span></span>
          </el-form-item>
          <el-dialog title="收件信息修改" :visible.sync="dialogFormVisible" >
              <el-form>
                <el-form-item label="收件人姓名" style="margin-left: 150px">
                  <el-input v-model="buyerName" type="text" autocomplete="off" style="width: 300px;float: left"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" style="margin-left: 150px">
                  <el-input v-model="phone" type="text" autocomplete="off" style="width: 300px;float: left;margin-left: 12px"></el-input>
                </el-form-item>
                <el-form-item label="快递收件地址" style="margin-left: 150px">
                  <el-input v-model="address" type="text" autocomplete="off" style="width: 300px;float: left;margin-left: 12px"></el-input>
                </el-form-item>
                <span style="font-size: 14px;color: #c4c4c4">tips: 请按省/区(直辖市)-市-县-镇(地区)-街道等顺序填写详细地址</span>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" type="primary" plain>取 消</el-button>
                <el-button @click="dialogFormVisible = false" type="primary" plain>确 定</el-button>
              </div>
            </el-dialog>
        </el-form>
      </div>
      <div class="PayInfo">
        <el-divider></el-divider>
        <p style="text-align: left"><span style="color: #123D64;font-size: 18px"><B>支付方式</B></span></p>
        <el-form>
          <el-form-item>
            <p>
              <el-radio-group v-model="payWay" style="float:left;margin-left: 25px;">
               <!-- <el-radio :label="0" :disabled="params.transWay===2">校内线下支付</el-radio>-->
                <el-radio :label="1" >线上支付</el-radio>
              </el-radio-group>
            </p>
          </el-form-item>
        </el-form>
      </div>
      <div class="IdleInfo">
        <el-form>
          <el-divider></el-divider>
          <p style="text-align: left"><span style="color: #123D64;font-size: 18px"><B>闲置品信息</B></span></p>
          <!--闲置品标题、图片、价格、数量、 订单总额、付款按钮、取消按钮-->
          <el-table :data="idles" class="el-table"   style="margin: auto;margin-bottom: 30px"  >
            <el-table-column prop="pictures" width="140">
              <template slot-scope="scope">
                <el-image :src="scope.row.pictures" :preview-src-list="[scope.row.pictures]" :key="scope.row.id" style="width: 100px;height: 100px">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="title" width="160">
              <template slot-scope="scope">
                <label style="cursor: pointer"><b>{{scope.row.title}}</b></label>
              </template>
            </el-table-column>
            <el-table-column prop="price" width="280">
              <template slot-scope="scope">
                <span v-if="scope.row.rentAndSellMark==0">出售价格：<span style="color: #FF4F2C">￥<span style="color: #FF4F2C;font-size: 18px">{{scope.row.price}}</span>元</span></span>
                <span v-if="scope.row.rentAndSellMark==1">出租价格：<span style="color: #FF4F2C">￥<span style="color: #FF4F2C;font-size: 18px">{{scope.row.price}}</span>元/天</span></span>
                <span style="margin-left: 16px"><span style="font-size: 18px;color:#FF4F2C;">×{{scope.row.buyCount}}</span>(数量)</span>
                <p style="text-align: left"><span style="float: left;margin-left: 1px;margin-bottom: 10px;margin-top: -10px;color: #669999">
                  <i class="el-icon-location-information"></i>{{scope.row.address}}</span>
                </p>
                <el-radio-group v-model="scope.row.selectTransWay" style="float:left;">
                  <el-radio :label="1" :disabled="scope.row.transWay===2">校内自取</el-radio>
                  <el-radio :label="2" :disabled="scope.row.transWay===1">快递物流</el-radio>
                </el-radio-group><br/>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="备注信息">
              <template slot-scope="scope">
                <textarea v-model="scope.row.remarks" placeholder="备注信息..."></textarea>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item>
              <el-input-number v-if="rentAndSellMark===1"  v-model="dayCount" :min="1" :max="30" size="small" style="float: left;width: 100px"></el-input-number>
            <span v-if="rentAndSellMark===1" style="float: left;margin-left: 8px"> 共租用<span style="color: #409EFF;font-size: 20px"> {{dayCount}} </span>天</span>
            <span style="float: right">订单总额:<span style="color: #FF4F2C">￥<span style="font-size: 24px">{{sum}}</span>元</span></span>
          </el-form-item>
          <el-form-item style="margin-bottom:60px">
            <el-button style="float: right" type="primary" @click.once="submitOrder">提交订单</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "OrderDetail",
  data(){
    return{
      loading:true,
      dialogFormVisible:false,
      ownerAccount:'',//
      buyerName:'zzt',//
      phone:'18897881725',//
      address:'钦州市长安街',//

      idles:[{}],//
      student:{},//
      addressList:[
          '长安街',
          '南山街'
      ],
      dayCount:1,
      buyerAccount:'',//账号主人
      buyerMsg:'',//收件人信息：姓名、联系方式、地址
      payWay:1,//默认1 0校内线下支付，1线上支付
      transWay:1,//1校内线下交易，2快递
      rentAndSellMark: 0,
      params:{
        idAndCountList:[],//闲置品id以及购买数量
        orderInfoList:[]
      },
      oldName:'',
      oldPhone:'',
      oldAddress:''
    }
  },
  methods:{
    modifyMsg(){
      this.dialogFormVisible = true;
      this.oldName = this.buyerName;
      this.oldPhone = this.phone;
      this.oldAddress = this.address;
    },
    cancel(){
      this.dialogFormVisible = false;
      this.buyerName = this.oldName;
      this.phone = this.oldPhone;
      this.address = this.oldAddress;
    },
    //判断是否已登录
    judgeLogin(){
      let student = JSON.parse(sessionStorage.getItem('student'));
      if (null == student){
        return false;
      }else {
        this.student = student;
        return true;
      }
    },
    //获取要下单的闲置品信息
    getIdleList(){
      const _this = this
      axios.post('http://localhost:8181/idleInfo/getIdleListByIdleId',{
        params: this.params
      }).then(function (res) {
            console.log(res.data);
            if (res.data != null) {//成功
              console.log('查询成功');
              _this.idles = res.data.idleList;
              _this.loading=false
              console.log("_this.idles="+res.data)
            } else {
              console.log('查询失败');
              return '';
            }
          }
      );
    },
    //向后端提交订单
    submitOrder(){
      if (this.buyerName==''||this.buyerName==null||this.phone==''||this.phone==null||this.address==''||this.address==null){
        this.$message({
          message:'请先完善收件人信息',
          type:'error'
        })
      }else {
        this.buyerMsg = this.buyerName+' '+this.phone+' '+this.address
        for (let i = 0; i < this.idles.length; i++) {
          let orderInfo = {idle:{},buyerAccount:'',receivingMsg:'',dayCount:1,rentAndSellMark:0,}
          orderInfo.idle = this.idles[i]
          orderInfo.buyerAccount = this.buyerAccount
          orderInfo.receivingMsg = this.buyerMsg
          orderInfo.dayCount = this.dayCount
          orderInfo.rentAndSellMark = this.rentAndSellMark
          this.params.orderInfoList.push(orderInfo)
        }
        const _this = this
        axios.post('http://localhost:8181/orderOperate/createNewOrder',{
          params: this.params
        }).then(function (res) {
              console.log(res.data);
              if (res.data != null && res.data.createResult) {//成功
                _this.$message({
                  message:'订单提交成功！',
                  type:'success'
                })
                console.log('订单提交成功');
                let orderIdList = res.data.orderIdList
                console.log("orderIdList="+JSON.stringify(orderIdList))
                _this.$router.push({path:'/orderPay',query:{orderIdList:JSON.stringify(orderIdList)}})
              } else {
                _this.$message({
                  message:'订单提交失败！请稍后重试！',
                  type:'error'
                })
                console.log('订单提交失败')
                _this.$router.go(0)
                return '';
              }
            }
        );
      }

    }
  },
  created() {
    if (this.judgeLogin()){//登录成功的
      this.student = JSON.parse(sessionStorage.getItem("student"));
      this.buyerAccount = this.student.account
      this.buyerName = this.student.realName
      this.phone = this.student.phone
      this.address = this.student.addressList[0]
      let typeMark = JSON.parse(localStorage.getItem("typeMark"));
      this.rentAndSellMark = typeMark
      if (typeMark == 0){//出售
        this.params.idAndCountList = JSON.parse(localStorage.getItem("buyList"));
        localStorage.setItem("buyList",null)
      }else {//出租
        this.params.idAndCountList = JSON.parse(localStorage.getItem("rentList"));
        localStorage.setItem("rentList",null)
      }
      console.log("list="+JSON.stringify(this.params.idAndCountList))
      this.getIdleList()
    }else {
      alert("尚未登录！即将跳转登录页面...");
      this.$router.push({path:"/login"});
    }
  },
  computed:{
    sum:function (){
      if (this.rentAndSellMark==1){//出租的
        let s=0
        for (let i = 0; i < this.idles.length; i++) {
          s+=this.dayCount*this.idles[i].price*this.idles[i].buyCount
          //console.log("s+="+this.dayCount+","+this.idles[i].price+","+this.idles[i].buyCount)
        }
        //console.log("s="+s)
        return s
      }else {
        let s=0
        for (let i = 0; i < this.idles.length; i++) {
          s+=this.idles[i].price*this.idles[i].buyCount
        }
        return s
      }
    }
  }
}
</script>

<style scoped>
.OrderDetail-body{
  width:70%;
  height: auto;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
}
.ReciInfo,.PayInfo,.IdleInfo{
  width: 80%;
  margin: auto;
}

</style>