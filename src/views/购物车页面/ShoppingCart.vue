<template>
  <div class="Cart-Page">
    <div class="cartPage-body">
      <h1>购物车</h1>
      <el-table :show-header="false" v-loading="loading" :data="idleInfos" class="el-table" :header-cell-style="{borderColor:'#D0D3D4'}"   style="margin: auto;width: 90%;border-radius: 8px" :row-style="rowStyle" :cell-style="cellStyle" @click="getSum"  @row-click="handleCurrentChange" @selection-change="seleChange" >
        <el-table-column
            class-name="el-table"
            type="selection"
            width="60"
            :selectable="checkSelect">
        </el-table-column>
        <el-table-column prop="pictures" width="140">
          <template slot-scope="scope">
            <el-image :src="scope.row.pictures" :preview-src-list="[scope.row.pictures]" :key="scope.row.id" style="width: 100px;height: 100px">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="560px">
          <template slot-scope="scope">
            <p style="text-align: left">
              <a @click="goToIdleDetails(scope.row.id)" style="cursor: pointer"><span style="font-size: 18px"><B>{{scope.row.title}}</B></span></a>
            </p>
            <p style="text-align: left;color: #999999;font-size: 14px">
              <span style="margin-right: 20px">单价:
                <span style="color: #FC8770">￥
                  <span v-if="scope.row.rentAndSellMark===0">{{scope.row.price}}元</span>
                  <span v-if="scope.row.rentAndSellMark===1">{{scope.row.price}}元/天</span>
                </span>
              </span>
              <span style="margin-right: 20px">购买数量: <span style="color: #FC8770">
                <el-input-number @change="getSum" v-model="scope.row.buyCount"  :min="1" :max="scope.row.remain" size="mini" style="width: 90px"> </el-input-number>
              </span></span>
            </p>
            <p style="text-align: left;color: #999999;font-size: 14px">
              <span>总额：￥
                <span v-if="scope.row.rentAndSellMark===0">{{scope.row.price*scope.row.buyCount}}元</span>
                <span v-if="scope.row.rentAndSellMark===1">{{scope.row.price*scope.row.buyCount}}元/天</span>
              </span>
            </p>
          </template>
        </el-table-column>
       <!-- <el-table-column prop="price" label="价格" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.rentAndSellMark==0">出售价格：￥{{scope.row.price}}元</span>
            <span v-if="scope.row.rentAndSellMark==1">出租价格：￥{{scope.row.price}}元/天</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="购买数量" width="210">
          <template slot-scope="scope">
            <el-input-number @change="getSum" v-model="scope.row.buyCount"  :min="1" :max="scope.row.remain" size="small"></el-input-number>
          </template>
        </el-table-column>-->
        <el-table-column prop="count" label="操作">
          <template slot-scope="scope">
              <el-button slot="reference" type="danger" plain @click="delIdleFromCart(scope.row.id)"><i class="el-icon-delete"> </i> 删除</el-button>
              <span v-if="scope.row.validMark===0 || scope.row.remain===0 || scope.row.passMark!=1" style=" color: #B3B6B7;margin-left: 14px;" >已下架</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 80px;width: 90%;margin: auto">
        <span style="float: left;font-family: 楷体;color: #999999;font-size: 16px">tips:每次结算的商品需同时为出租或出售类型</span>
        <div class="sumOfPrice" style="width: 30%;height: 30px;margin-top: 20px;float: right;margin-right: 20px">
          <span v-if="typeMark===0" style="color: red;font-size: 20px;">总计:￥{{params.allSum}}元</span>
          <span v-if="typeMark===1" style="color: red;font-size: 20px;">总计:￥{{params.allSum}}元/天</span>
          <el-button v-if="params.arrID.length>0" style="margin-left: 20px;" type="primary" plain @click="goToConfirmPage">立即下单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "ShoppingCart",
  data() {
    return {
      loading:true,
      student:{},
      typeMark:0,
     /* IdleID:0,*/
      finalColor:true,
      idleInfos:[],
      params:{
        studentAccount:'',
        num:1,
        allSum:0,
        ownerId:'',
        arrID:[],
        delIdleID:0,
      }
    }
  },
  methods: {
    //跳转订单确认页面
    goToConfirmPage(){
      if (this.student.infoPerfectionMark != 1){
        this.$alert('已下架物品无法加至购物车哦！', '温馨提示', {
          confirmButtonText: '确定',
        });
        this.$router.push({path:'/personalInfo'})
      }else if (null != localStorage.getItem("buyList")||null!=localStorage.getItem("rentList")){
        this.$router.push({path:'/orderConfirm'})
      }else {
        this.$message({
          message:'请先选择要结算的物品',
          type:'error'
        })
      }
    },
    delIdleFromCart(idleId){//从购物车删除闲置品
      let _this = this
      this.params.delIdleID = idleId
      axios.post('http://localhost:8181/cartOperate/delIdleFromCart',{
        params: this.params
      }).then(function (res) {
            console.log(res.data);
            if (res.data != null && res.data.delResult) {//成功
              console.log('移除成功');
              _this.$message({
                message:'该闲置品已成功从购物车移除',
                type:'success'
              })
              setTimeout(function(){
                location.reload();
              },2000);
              //location.reload()
              //_this.$router.push({path:'/shoppingCart'})
            } else {
              _this.$message({
                message:'移除失败，请稍后重试！',
                type:'error'
              })
              console.log('移除失败');
              return '';
            }
          }
      );
    },

    getCartIdle(){
      const _this = this
      axios.post('http://localhost:8181/cartOperate/getAllIdleInCart',{
        params: this.params
      }).then(function (res) {
            console.log(res.data);
            if (res.data != null) {//成功
              console.log('购物车查询成功');
              _this.idleInfos = res.data.idleInfoList;
              _this.loading=false
            } else {
              console.log('购物车查询失败');
              return '';
            }
          }
      );
    },
    // 点击事情
    handleCurrentChange(row){
      let same = false;
      if(this.params.arrID.length > 0){
        for(let i=0; i<this.params.arrID.length ; i++){
          if(this.params.arrID[i]==row.id){
            same=true;
            this.removeByValue(this.params.arrID, row.id);
            break;
          }
        }
        if(same==true){
          this.$refs.multipleTable.toggleRowSelection(row,false);
        }else{
          this.$refs.multipleTable.toggleRowSelection(row,true);
          this.params.arrID.push(row.id);
        }
      }else{
        this.$refs.multipleTable.toggleRowSelection(row,true);
        this.params.arrID.push(row.id);
        this.params.sum = this.params.sum + row.price;
      }
    },
    seleChange(val){
      const valId = [];
      for(let i=0; i<val.length; i++){
        valId.push(val[i].id);
        if (i==0){
          this.typeMark = val[0].rentAndSellMark;
        }
      }
      this.params.arrID=valId;
      this.getSum()
      console.log("arrId="+this.params.arrID)
    },
    cellStyle(row){//根据是否过期显示颜色
      if(row.row.validMark===0 || row.row.passMark!=1){
        return 'color:#BDC3C7;background:#F2F3F4;borderColor:#D0D3D4!important'
      }else {
        if (row.row.rentAndSellMark===0){
          return 'color:#6699CC;borderColor:#D0D3D4!important'
        }else {
          return 'color:#669999;borderColor:#D0D3D4!important'
        }
      }
    },
    checkSelect (row) {
      let isChecked = true;
      //scope.row.validMark!=0 && scope.row.remain!=0 && scope.row.passMark===1
      if (row.remain===0 || row.passMark != 1 || row.validMark===0 || row.rentAndSellMark != this.typeMark && this.params.arrID.length != 0 ) { // 判断里面是否存在某个参数
        isChecked = false
      }
      return isChecked
    },
    //进入详情页
    goToIdleDetails(idleId){
      this.$router.push({path:'/idleDetails',query:{idleId: idleId}});
    },
    getSum(){
      this.params.allSum = 0;
      let list = this.idleInfos.filter(item=>{
        return this.params.arrID.includes(item.id )
      })
      let buyList =[]
      for (let i = 0; i < list.length; i++) {
        this.params.allSum = this.params.allSum + list[i].price * list[i].buyCount
        let idAndCount={id:0,count:0}
        idAndCount.id = list[i].id
        idAndCount.count = list[i].buyCount
        buyList.push(idAndCount)
      }
      if (buyList.length>0){
        if (this.typeMark==0){//出售的
          localStorage.setItem("typeMark",JSON.stringify(this.typeMark))
          localStorage.setItem("buyList",JSON.stringify(buyList))
        }else {//出租的
          localStorage.setItem("typeMark",this.typeMark)
          localStorage.setItem("rentList",JSON.stringify(buyList))
        }
      }
      console.log("sum="+this.params.allSum)
    },

    rowStyle(){
      return "border: 2px solid #B3B6B7";
    },

  },

  created() {
    localStorage.setItem("buyList",null)
    localStorage.setItem("rentList",null)
    let stu = JSON.parse(sessionStorage.getItem('student'));
    if (null == stu){
      this.loginStatus = false;
      alert("尚未登录！即将跳转登录页面...");
      this.$router.push({path:"/login"});
    }else {
      this.student = stu
      this.params.studentAccount = stu.account;
      this.getCartIdle();
    }
  },
}
</script>

<style scoped>
@import "../购物车页面/css/style.css";

.el-table{
  border: 1px solid #D0D3D4;
}

.type-span1{
  width: 48px;
  height: 14px;
  margin-right: 146px;
  margin-top: 0px;
  font-size: 14px;
  padding: 6px 10px 32px 9px;
  border-radius: 50%;
  float: right;
}
</style>