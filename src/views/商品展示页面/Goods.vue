<template>
  <div class="wrapper" >
    <!--搜索栏 begin-->
    <div class="search-div">
      <div class="key">
        <p>
          <span class="iconfont school" style="width: 300px" v-if="loginStatus">&#xe651;{{schoolName}}</span>
          <span class="search-box">
            <input type="search" placeholder="关键字" v-model="keyWord" />
            <button type="submit" class="search-btn" @click="filterIdleList"><span class="iconfont search-icon">&#xe65c;</span></button>
          </span>
          <span class="good-type">
            <select v-model="goodType" class="select-type" half autocomplete="no" @click="filterIdleList">
              <option value="">全部类型</option>
              <option v-for="item in goodTypes" :key="item.id">{{item.name}}</option>
            </select>
            <button type="submit" class="search-btn1"><span>类型</span></button>
          </span>
          <label for="sell" class="choose-type" @change="filterIdleList">
            <input type="radio" id="sell" name="type" v-model="finalType" value=0 >出售
          </label>
          <label for="rent" class="choose-type" @change="filterIdleList">
            <input type="radio" id="rent" name="type" v-model="finalType" value=1 >出租
          </label>
          <label for="all" class="choose-type" @change="filterIdleList">
            <input type="radio" id="all" name="type" v-model="finalType" value=2 >全部
          </label>
        </p>
      </div>
    </div>
    <!--搜索栏 end-->
    <hr style="width: 80%"/>
    <!--列表展示区 begin-->
    <div class="goodList-div" style="margin-top: 40px" >
      <div class="gallery-wrapper" >
          <el-form v-loading="loading">
            <div class="white-panel" v-for="(item,index) in idleList" :key="index">
              <a href="#" @click="goToIdleDetails(item.id)">
                <div style="position: relative;">
                  <img v-if="item.pictures===null || item.pictures===''" src="../../assets/img/noPics.png" class="thumb">
                  <img v-bind:src="item.pictures" class="thumb">
                  <span v-if="item.rentAndSellMark===0" style="background-color: #6666FF; color: whitesmoke" class="tag tag-wrap card-tag">出售</span>
                  <span v-if="item.rentAndSellMark===1" style="background-color: #669999; color: whitesmoke" class="tag tag-wrap card-tag">出租</span>
                </div>
                <p class="idle-p card-title"><span class="iconfont" style="font-size: 16px">&#xe719;</span> {{item.title}}</p>
                <p class="idle-p p-price" v-if="item.rentAndSellMark===0"><span class="iconfont" style="font-size: 13px">&#xe7d1;</span>价格:<span class="card-price flag-sell" >￥{{item.price}} </span>元</p>
                <p class="idle-p p-price" v-if="item.rentAndSellMark===1"><span class="iconfont" style="font-size: 13px">&#xe7d1;</span>价格:<span class="card-price flag-rent">￥{{item.price}} </span>元/天</p>
                <p class="idle-p"><span class="iconfont location">&#xe651;{{item.address}}</span></p>
              </a>
            </div>
          </el-form>
        </div>
    </div>
    <!--列表展示区 end-->
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
      idleList:[
        /*{
          icon:'el-icon-lx-people',
          pictures: require('../../assets/img/1.jpg'),
          title:1,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          rentAndSellMark:1
        },
        {
          icon:'el-icon-lx-people',
          pictures: require('../../assets/img/2.jpg'),
          title:2,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          rentAndSellMark:1
        },
        {
          icon:'el-icon-lx-people',
          pictures: require('../../assets/img/3.jpg'),
          title:3,
          price:20,
          owner:'阿斯顿',
          goodType:'book',
          rentAndSellMark:0
        },
        {
          icon:'el-icon-lx-people',
          pictures: require('../../assets/img/4.jpg'),
          title:4,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          rentAndSellMark:0
        },
        {
          icon:'el-icon-lx-people',
          pictures: require('../../assets/img/5.jpg'),
          title:5,
          price:20,
          owner:'阿斯顿',
          goodType:'food',
          rentAndSellMark:0
        },
*/
      ],
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
  height: 34px;
  width: 45px;
  outline: none;
  border-radius: 0 8px 8px 0;
  background: #2d8cf0;
  color: #ffffff;
  border: 1px solid #2d8cf0;
  transition: all 0.3s ease;
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
.card-tag{
  width: 50px;
  max-width: 100%;
  position: absolute;
  margin: 0px 0px 0px 165px;
  left: 5px;
  font-size: 14px;
  border-radius: 2px;
}
.tag-wrap {
  -webkit-filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
}

.tag {
  background: #FB8C00;
  color: #222;
  padding: 5px 8px 5px 14px;
  /* font: bold 14px system-ui; */
  -webkit-clip-path: polygon(30px 0%, 100% 0%, 100% 100%, 10px 100%, 0 50%);
  clip-path: polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0 50%);
  transform:rotate(-30deg);
}


.gallery-wrapper {
  column-count: 5;
  display: inline-block;
  position: relative;
  margin:20px auto;
  text-align: left;
}
img.thumb {
  width: 100%;
  max-width: 100%;
  height: auto;
}
.white-panel {
  background: white;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  padding: 10px;
  cursor: pointer;
  page-break-inside: avoid;
}
.white-panel h1 {
  font-size: 1em;
}
.white-panel h1 a {
  color: #A92733;
}
.white-panel:hover {
  box-shadow: 5px 5px 50px rgba(0,0,0,0.5);
  margin-top: 0px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  transform: scale(1.003);
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
</style>
