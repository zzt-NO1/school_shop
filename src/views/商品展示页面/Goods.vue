<template>
  <div class="wrapper">
    <!--搜索栏 begin-->
    <div class="search-div">
      <div class="key">
        <p>
          <span class="iconfont school" style="width: 300px" v-if="this.loginStatus">&#xe651;{{schoolName}}</span>
          <span class="search-box">
            <input type="search" placeholder="关键字" v-model="keyWord"  style="width: 200px;height: 40px;border: 1px solid #2196F3;border-radius: 4px 0px 0px 4px;"/>
            <button type="submit" class="search-btn" @click="filterIdleList"><span class="iconfont search-icon">&#xe65c;</span></button>
          </span>
          <!--<el-input placeholder="请输入关键字" v-model="keyWord"  style="width: 230px;border-radius: 2px 0px 0px 2px!important;margin-right: 30px"  class="input-with-select" >
            <el-button slot="append" icon="el-icon-search" @click="this.filterIdleList"></el-button>
          </el-input>-->
          <label>类型：</label>
          <span class="good-type">
            <select class="good-type-select" v-model="goodType" style="width: 200px;height: 40px;border: 1px solid #2196F3;border-radius: 4px;color:#2d8cf0;font-size: 14px" half autocomplete="no" @click="filterIdleList">
              <option value="">全部类型</option>
              <option v-for="item in goodTypes" :key="item.id">{{item.name}}</option>
            </select>
          </span>
          <label for="sell" class="choose-type" @change="this.filterIdleList">
            <input type="radio" id="sell" name="type" v-model="finalType" value=0 >出售
          </label>
          <label for="rent" class="choose-type" @change="this.filterIdleList">
            <input type="radio" id="rent" name="type" v-model="finalType" value=1 >出租
          </label>
          <label for="all" class="choose-type" @change="this.filterIdleList">
            <input type="radio" id="all" name="type" v-model="finalType" value=2 >全部
          </label>
        </p>
      </div>
    </div>
    <!--搜索栏 end-->
    <hr style="width: 80%"/>
    <!--列表展示区 begin-->
    <div style="width: 80%;height:auto;margin: auto;text-align: center;" v-loading="loading">
      <el-col :span="5" v-for="(item,index) in idleList" :key="index" :offset="index > 0 ? 1 : 0" style="margin-left: 3.3%;margin-bottom: 10px;margin-top: 10px">
        <a @click="goToIdleDetails(item.id)" style="cursor: pointer">
          <el-card :body-style="{ padding: '0px' }" class="idle-card">
            <el-image v-if="item.pictures===null || item.pictures===''" src="../../assets/img/noPics.png" style="width: 240px;height: 240px" fit="cover"></el-image>
            <el-image :src="item.pictures" class="image" style="width: 240px;height: 240px" fit="cover"></el-image>
            <label v-if="item.rentAndSellMark===0" class="tag-tag" style="background-color: #6666FF">出售</label>
            <label v-if="item.rentAndSellMark===1" class="tag-tag" style="background-color: #669999">出租</label>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <p class="idle-p card-title"><span class="iconfont" style="font-size: 16px">&#xe719;</span> {{item.title}}</p>
                <p class="idle-p p-price" v-if="item.rentAndSellMark===0"><span class="iconfont" style="font-size: 13px">&#xe7d1;</span>价格:<span class="card-price flag-sell" >￥{{item.price}} </span>元</p>
                <p class="idle-p p-price" v-if="item.rentAndSellMark===1"><span class="iconfont" style="font-size: 13px">&#xe7d1;</span>价格:<span class="card-price flag-rent">￥{{item.price}} </span>元/天</p>
                <p class="idle-p"><span class="iconfont location">&#xe651;{{item.address}}</span></p>
              </div>
            </div>
          </el-card>
        </a>
      </el-col>
    </div>
  </div>
</template>

<script src="../../商品展示页面/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="../../商品展示页面/js/pinterest_grid.js"></script>
<script>
import axios from "axios";
export default {
  name: "Goods",
  data(){
    return {
      loading:true,
      goodTypes:[],
      finalType:2,//租售类型
      goodType: '',//闲置品类型
      keyWord:'',//关键字
      studentName:'',
      loginStatus: false,
      delayTime:300,
      schoolName:'',
      idleList:[],
      allIdleList:[],
      idleListMap:null,
      params: {
        idleId:'',
        schoolId:0,
        idleMsg:null,
      }
    }
  },
  created() {
    this.loading=true
    this.goodTypes = this.getAllGoodType();
    let stu = JSON.parse(sessionStorage.getItem('student'));
    if (null == stu){
      setTimeout(this.loading=false,1000*20)
      this.loginStatus = false;
    }else {
      this.loginStatus = true;
      this.studentName = stu.nickname;
      this.schoolName = stu.schoolName;
      this.params.schoolId = stu.schoolId;
      console.log("this.params.schoolId="+this.params.schoolId)
      this.idleListMap = this.getIdleListBySchoolId(this.params.schoolId);
      //this.loading=false
      return true;
    }
  },
  methods:{
    //跳转登录页面
    login() {
      this.$router.push({path:"/login"})
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
    //获取全部闲置品类型
    getAllGoodType(){
      const _this = this;
      axios.post('http://localhost:8181/issueIdle/getAllGoodType').then(function (res) {
            console.log(res.data);
            if (res.data != null) {//成功
              console.log("类型查询成功");
              _this.goodTypes = res.data;
            } else {
              console.log('类型查询失败');
              return '';
            }
          }
      );
    },
    //获取产品列表
    getIdleListBySchoolId(schoolId){
      const _this = this;
      _this.params.schoolId = schoolId;
      console.log("schoolId="+_this.params.schoolId)
      axios.post('http://localhost:8181/idleInfo/getIdleListBySchoolId',{
        params: this.params
      }).then(function (res) {
            console.log(res.data);
            if (res.data != null && res.data.searchResult) {//成功
              console.log('闲置品查询成功');
              _this.idleList = res.data.idleList;
              _this.allIdleList = res.data.idleList;
              _this.loading = false
            } else {
              console.log('闲置品查询失败');
              return '';
            }
          }
      );
    },
    //筛选闲置品
    filterIdleList(){
      let res = this.allIdleList
      //租售类型筛选
      if (this.finalType != 2){//出租//出售
        console.log("finalType="+this.finalType)
        res = this.allIdleList.filter(item=>{
          return item.rentAndSellMark == this.finalType
        })
      }
      //类型筛选
      if (this.goodType != null && this.goodType != ''){
        res = res.filter(item=>{
          return item.type == this.goodType
        })
      }
      //关键字筛选
      if (this.keyWord != null && this.keyWord != ''){
        res = res.filter(item=>{
          return item.title.includes(this.keyWord)||item.type.includes(this.keyWord)||item.describe.includes(this.keyWord)
        })
      }
      this.idleList = res
    },
    //进入详情页
    goToIdleDetails(idleId){
      this.$router.push({path:'/idleDetails',query:{idleId: idleId}});
    }
  },
  mounted() {
  },
}

</script>



<style scoped>
@import "../../views/商品展示页面/css/goods.css";
.search-icon:hover{
  font-size: 18px;
}
.school{
  margin-left: 20px;
  margin-right:50px;
}
.search-box{
  margin-right: 50px;
}
.choose-type{
  margin-right: 10px;
}
.good-type{
  margin-right: 50px;
}
input[type=search] {
  /*box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.4);*/
  background: #ffffff;
  border: 1px solid #2d8cf0;
  outline: none;
  width: 180px;
  height: 34px;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
  font-weight: 300;
  padding: 0px 10px;
  font-family: "Lato", sans-serif;
  letter-spacing: 0px;
  color: #2d8cf0;
}
.select-type{
  background: #ffffff;
  border: 1px solid #2d8cf0;
  outline: none;
  width: 130px;
  height: 34px;
  border-radius: 8px 0px 0px 8px;
  font-size: 14px;
  font-weight: 300;
  padding: 0px 10px;
  font-family: "Lato", sans-serif;
  letter-spacing: 0px;
  color: #999999;

}
::placeholder {
  color: #999999;
  font-size: 14px;
}

.search-btn {
  height: 40px;
  width: 45px;
  outline: none;
  border-radius: 0 4px 4px 0;
  background: #2d8cf0;
  color: #ffffff;
  border: 1px solid #2d8cf0;
  transition: all 0.3s ease;
  margin-top: -2px;
}
.search-btn:hover{
  background-color: #275efe;
}
.search-btn1 {
  height: 35px;
  width: 45px;
  outline: none;
  border-radius: 0px 8px 8px 0px;
  background: #2d8cf0;
  color: #ffffff;
  border: 1px solid #2d8cf0;
  transition: all 0.3s ease;
  font-size: 14px;
}

.search-btn:hover {
  transition: all 0.3s ease;
}
.search-btn:hover i {
  font-size: 2.5em;
}
.search-btn i {
  font-size: 2.3em;
}

.white-panel h1 {
  font-size: 1em;
}
.white-panel h1 a {
  color: #A92733;
}
.card-title{
  color: #003472;
  font-size: 14px;
}

.flag-rent{
  color: #669999;
  font-size: 13px;
}
.flag-sell{
  color: #6666FF;
  font-size: 13px;
}
.card-price{
  font-size: 16px;
}
.p-price{
  font-size: 13px;
  color: #666666;
}
.idle-p{
  text-align: center;
  margin-top: 5px;
  margin-bottom: 2px;
}
.location{
  color: #999999;
  font-size: 13px;
}
.idle-card:hover{
  box-shadow: 0px 0px 40px #999999;
}
.tag-tag{
  position: absolute;
  color: whitesmoke;
  width: 55px;
  height: 30px;
  margin: 5px 0px 0px -40px;
  transform: rotate(
      -30deg
  );
  padding-top: 5px;
  padding-left: 10px;
  clip-path: polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0px 50%);
}
.good-type-select:focus{
  border-color: #2196F3;
}
</style>
