<template>
  <div class="Record-Page">
    <div class="RecordPage-body" style="background-color: white;border-radius: 10px;padding-top: 15px">
      <h1>发布记录</h1>
      <p>
          <el-radio v-model="selectType"  label="2" border @change="filterIdle">全部</el-radio>
          <el-radio v-model="selectType"  label="0" border @change="filterIdle">出售</el-radio>
          <el-radio v-model="selectType"  label="1" border @change="filterIdle">出租</el-radio>
      </p>
      <el-table v-loading="loading" :data="filIdleList" class="el-table" :header-cell-style="{borderColor:'#D0D3D4'}" style="margin: auto;width: 90%;border-radius: 8px" :row-style="rowStyle" :cell-style="cellStyle">
        <el-table-column prop="pictures" width="160">
          <template slot-scope="scope">
            <el-image :src="scope.row.pictures" :preview-src-list="[scope.row.pictures]" :key="scope.row.id" style="width: 100px;height: 100px;margin-left: 30px">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="260">
          <!--<template slot-scope="scope">
            <a @click="goToIdleDetails(scope.row.id)" ><label style="cursor: pointer">{{scope.row.title}}</label></a>
          </template>-->
        </el-table-column>
        <el-table-column prop="price" label="价格" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.rentAndSellMark==0">出售价格：￥{{scope.row.price}}元</span>
            <span v-if="scope.row.rentAndSellMark==1">出租价格：￥{{scope.row.price}}元/天</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="闲置品总量" width="100">
          <!--<template slot-scope="scope">
            <el-input-number @change="getSum" v-model="scope.row.buyCount"  :min="1" :max="scope.row.count" size="small"></el-input-number>
          </template>-->
        </el-table-column>
        <el-table-column prop="count" label="售(租)出数量" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.count - scope.row.remain}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remain" label="当前余量" width="100">
        </el-table-column>
        <el-table-column prop="passMark" label="审批状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.passMark==0&&scope.row.validMark!=0">审批中</span>
            <span v-if="scope.row.passMark==0&&scope.row.validMark==0">审批中断</span>
            <span v-if="scope.row.passMark==1">审批通过</span>
            <span v-if="scope.row.passMark==2">审批不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="validMark" label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.validMark===0 || scope.row.remain===0 || scope.row.passMark===2">已下架</span>
            <span v-if="scope.row.validMark!=0 && scope.row.remain!=0 && scope.row.passMark===1">架上</span>
            <span v-if="scope.row.validMark!=0 && scope.row.remain!=0 && scope.row.passMark===0">等待上架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.validMark===0 || scope.row.remain===0" type="primary" disabled plain><i class="el-icon-edit"></i>修改</el-button>
            <el-button v-if="scope.row.validMark!=0 && scope.row.remain!=0" type="primary" plain @click="goToModifyPage(scope.row.id)"><i class="el-icon-edit"></i>修改</el-button>
            <el-button v-if="scope.row.validMark===0 || scope.row.remain===0 || scope.row.passMark===2" type="danger" disabled plain><i class="el-icon-sold-out"></i>下架</el-button>
            <el-button v-if="scope.row.validMark!=0 && scope.row.remain!=0 && scope.row.passMark!=2" type="danger" plain @click="offShelfIdleByIdleId(scope.row.id)"><i class="el-icon-sold-out"></i>下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 40px;width: 100%;margin: auto">

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "IssueRecord",
  data(){
    return{
      loading:true,
      selectType:"2",
      idleList:[],
      filIdleList:[],
      idleId: 0,//测试用
      params:{
        studentAccount:'',
        idleId:0,
      }
    }
  },
  methods:{
    getIdleListByStudentAccount(){
      const _this = this
      axios.post('http://localhost:8181/idleInfo/getIdleListByStudentAccount',{
        params: this.params
      }).then(function (res) {
            console.log(res.data);
            if (res.data != null && res.data.searchResult) {//成功
              console.log('发布记录查询成功');
              _this.idleList = res.data.idleList;
              _this.filIdleList = _this.idleList;
              _this.loading=false
            } else {
              console.log('发布记录查询失败');
              return '';
            }
          }
      );
    },
    cellStyle(row){//根据是否过期显示颜色
      if(row.row.validMark===0 || row.row.remain===0 || row.row.passMark === 2){//下架或余量为0或审批不通过
        return 'color:#909497;background:#F2F3F4;borderColor:#D0D3D4!important'
      }else if (row.row.passMark === 0){ //待审批  黄色
        if (row.row.rentAndSellMark===0){//出售
          return 'color:#6699CC;background:#FFFAE9;borderColor:#D0D3D4!important'
        }else {//出租
          return 'color:#669999;background:#FFFAE9;borderColor:#D0D3D4!important'
        }
      }else if (row.row.passMark === 1){ //审批通过  绿色
        if (row.row.rentAndSellMark===0){//出售
          return 'color:#6699CC;background:#F1FFEA;borderColor:#D0D3D4!important'
        }else {//出租
          return 'color:#669999;background:#F1FFEA;borderColor:#D0D3D4!important'
        }
      }
    },
    rowStyle(){
      return "border: 2px solid #B3B6B7";
    },
    filterIdle(){
      this.filIdleList = this.idleList;
      if (parseInt(this.selectType)!=2){
        this.filIdleList = this.idleList.filter(item=>{
          return item.rentAndSellMark == parseInt(this.selectType)
        })
      }
    },
    //跳转到闲置信息修改页
    goToModifyPage(idleId){
      console.log("modify-idleId="+idleId)
      this.$router.push({path:'/modifyIdleInfo',query:{idleId:idleId}})
    },
    //下架闲置品
    offShelfIdleByIdleId(idleId){
      const _this = this
      _this.params.idleId = idleId
      axios.post('http://localhost:8181/idleInfo/offShelfIdle',{
        params: this.params
      }).then(function (res) {
            console.log(res.data);
            if (res.data != null && res.data.dealResult) {//成功
              console.log(idleId+'下架成功');
              _this.$message({
                message:'闲置品下架成功！',
                type:'success'
              })
              setTimeout(function(){
                location.reload();
              },1000);
            } else {
              console.log(idleId+'下架失败');
              _this.$message({
                message:'下架失败，请稍后重试！',
                type:'error'
              })
              return '';
            }
          }
      );
    }
  },
  created() {
    let stu = JSON.parse(sessionStorage.getItem('student'));
    if (null == stu){
      this.loginStatus = false;
      alert("尚未登录！即将跳转登录页面...");
      this.$router.push({path:"/login"});
    }else {
      this.params.studentAccount = stu.account;
      this.getIdleListByStudentAccount();
    }

  }
}
</script>

<style scoped>
.RecordPage-body{
  width: 80%;
  height: 100%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
.el-table{
  border: 1px solid #D0D3D4;
}


</style>