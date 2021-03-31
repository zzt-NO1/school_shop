<template>
  <div id="uploadGood">
    <div class="hello">
      <form ref="upload_form">
        <div class="upload">
          <div class="upload_warp">
            <div class="upload_warp_left" @click="fileClick">
              <img src="../商品上传页面/img/upload.png"><br/>
              <span style="color: #2d8cf0">点击上传图片</span>
            </div>
            <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
              或者将图片拖到此处
            </div>
          </div>
          <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none">
          <div class="upload_warp_img" v-if="params.idle.picBase64List.length!=0">
            <div class="upload_warp_img_div" v-for="(item,index) of params.idle.picBase64List" :key="index">
              <div class="upload_warp_img_div_top">
               <!-- <div class="upload_warp_img_div_text">
                  {{item.file.name}}
                </div>-->
                <img src="../商品上传页面/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
              </div>
              <img :src="item">
            </div>
          </div>
        </div>
        <div class="upload1" >
          <p><span style="font-size: 30px;color: #2c3e50;">闲置品信息修改</span></p>
          <!----------------------------------出售品信息------------------------------------------------------------------->
          <div class="upload-msg" v-if="params.idle.rentAndSellMark===0">
            <div class="form-group">
              <span>标题*</span>
              <input class="in_text form-field" type="text" v-model="params.idle.title" placeholder="填写标题或闲置品名称" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span>类别*</span>
              <!--<input class="in_text form-field" list="typelist" type="text" half placeholder="请选择类别" autocomplete="no" required="required"/>-->
              <select v-model="params.idle.type" class="in_text form-field select" id="typelist" half placeholder="请选择类别" autocomplete="no" required="required">
                <option value="">请选择类别</option>
                <option v-for="item in goodTypes" :key="item.id">{{item.name}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <input class="in_text form-field" type="number" step="0.1" min="0" v-model="params.idle.price" half placeholder="预期价格" autocomplete="no" required="required"/>
              <span v-if="params.idle.rentAndSellMark===0">元</span>
            </div>
            <div class="form-group fleft">
              <span>新旧程度</span>
              <!--<input class="in_text form-field" type="text" v-model="params.qualityValue" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select v-model="params.idle.quality" class="in_text form-field select" half autocomplete="no" required="required">
                <option value="">请选择新旧程度</option>
                <option v-for="(item,index) in qualityValues" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span>数量*</span>
              <input class="in_text form-field" type="number" v-model="params.idle.count" min="1" max="20" half placeholder="库存数量" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span>交易途径*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.transWay" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select v-model="params.idle.transWay" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option v-for="(item,index) in transWays" :key="index" :value="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span>是否包邮*</span>
              <select v-model="params.idle.isFree" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option value=0 >不包邮</option>
                <option value=1 >包邮</option>
              </select>
              <!--<input class="in_text form-field" type="text"  half placeholder="请选择" autocomplete="no" required="required"/>-->
            </div>
            <div class="form-group">
              <span>校内地点*</span>
              <input class="in_text form-field" type="text" v-model="params.idle.address" placeholder="请填写交易地址" autocomplete="no" required="required"/>
            </div>
            <div class="form-group" >
              <textarea class="in_text form-field" type="text" v-model="params.idle.describe" placeholder="闲置品描述信息*" autocomplete="no" style="border-radius: 6px 6px 6px 6px;" required="required"/>
            </div>
            <div class="form-group" >
              <input class="in_text" type="submit" value="提交修改" @click="submitClick">
            </div>
          </div>
          <!------------------------------出租品信息--------------------------------------------------------->
          <div class="rentDiv" v-if="params.idle.rentAndSellMark===1">
            <div class="form-group">
              <span>标题*</span>
              <input class="in_text form-field" type="text" v-model="params.idle.title" placeholder="填写标题或闲置品名称" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span>类别*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.goodType" half placeholder="请选择类别" autocomplete="no" required="required"/>-->
              <select v-model="params.idle.type" class="in_text form-field select" id="typelist1" half autocomplete="no" required="required">
                <option value="">请选择类别</option>
                <option v-for="item in goodTypes" :key="item.id">{{item.name}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <input class="in_text form-field" type="number" step="0.1" min="0" v-model="params.idle.price" half placeholder="预期价格" autocomplete="no" required="required"/>
              <span v-if="params.idle.rentAndSellMark===1">元/天*</span>
            </div>
            <div class="form-group fleft">
              <span>新旧程度*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.qualityValue" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select v-model="params.idle.quality" class="in_text form-field select" half autocomplete="no" required="required">
                <option value="">请选择新旧程度</option>
                <option v-for="(item,index) in qualityValues" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span>数量*</span>
              <input class="in_text form-field" type="number" min="1" max="20" v-model="params.idle.count" half placeholder="库存数量" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span>交易途径*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.transWay" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select v-model="params.idle.transWay" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option v-for="(item,index) in transWays" :key="index" :value="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span>是否包邮*</span>
              <!--<input class="in_text form-field" type="text"  half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select v-model="params.idle.isFree" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option value=0 >不包邮</option>
                <option value=1 >包邮</option>
              </select>
            </div>
            <div class="form-group">
              <span>校内地点*</span>
              <input class="in_text form-field" type="text" v-model="params.idle.address" placeholder="请填写交易地址" autocomplete="no" required="required"/>
            </div>
            <div class="form-group" >
              <textarea class="in_text form-field" type="text" v-model="params.idle.describe" placeholder="闲置品描述信息*" autocomplete="no" style="border-radius: 6px 6px 6px 6px;" required="required"/>
            </div>
            <div class="form-group">
              <span>出租规则*</span>
              <input class="in_text form-field" type="text" placeholder="请填写出租规则" autocomplete="no" v-model="rule" style="color:#1687f3"/>
              <span style="cursor: pointer" @click="addRule(rule)">添加</span>
            </div>
            <div class="form-group" style="border: 2px solid #2196F3;border-radius: 6px;">
              <ul class="task-list">
                <li class="task-list-item" v-for="(item,index) in params.idle.ruleList" :key="index">
                  <label class="task-list-item-label">
                    <span>{{index+1}}、 {{item}}</span>
                  </label>
                  <span @click="delItem(item)" class="delete-btn" title="删除规则">{{item.del}}</span>
                </li>
              </ul>
            </div>
            <div class="form-group" >
              <input class="in_text" type="submit" value="提交修改" @click="submitClick">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="../../views/闲置信息修改页面/js/vue.min.js"></script>
<script src="../../views/闲置信息修改页面/js/jquery.min.js"></script>
<script src="../../views/闲置信息修改页面/js/script.js"></script>

<script>
import axios from "axios";

export default {
  name: "Upload",
  data () {
    return {
      loginStatus:false,
      studentName:'',
      goodTypes:[],
      transWays:["邮寄或线下","校内线下","快递邮寄"],
      qualityValues:["全新","9成新","8成新","7成新","6成新","5成新"],
      params:{
        imgList: [],//图片
        size: 0,
        idle:{},
        idleId:0
      },
      rule:'',
      resultMsg:null,
    }
  },
  created() {
    if (this.judgeLogin()){//已登录
      console.log("进入闲置信息修改页...")
      let idleId = this.$route.query.idleId
      this.params.idleId = parseInt(idleId)
      console.log("idleId=" + idleId)
      this.getIdleInfoById(parseInt(idleId))
      this.getAllGoodType()
    }else {
      window.alert("尚未登录，请前往登录页面进行登录！")
      this.$router.push({path:"/login"})
    }
  },
  methods: {
    submitClick(){//向后端提交数据
      console.log("提交");
      console.log(this.params);
      const _this = this;
      if (this.params.idle.title==''||this.params.idle.describe==''||this.params.idle.type==''||this.params.idle.quality==''||this.params.idle.address==''){
        alert("请填写完整信息再提交！")
      }else {
        this.params.idle.price = parseInt(this.params.idle.price)
        this.params.idle.transWay = parseInt(this.params.idle.transWay)
        this.params.idle.isFree = parseInt(this.params.idle.isFree)
        this.params.idle.rentAndSellMark = parseInt(this.params.idle.rentAndSellMark)
        this.params.idle.count = parseInt(this.params.idle.count)
        console.log("加油")
        axios.post('http://localhost:8181/issueIdle/updateIdleInfo', {
          params: this.params
        }).then(function (res) {
              console.log(res.data);
              _this.resultMsg = res.data;
              if (_this.resultMsg.updateResult) {//登录成功
                console.log("修改成功");
                _this.$message({
                  message:'修改成功！请耐心等待审核结果...',
                  type:'success'
                })
                //alert("修改成功！请耐心等待审核结果......");
                _this.$router.push({path:'/issueRecord'})
              } else {
                console.log('修改失败!!');
                _this.$message({
                  message:'修改失败！请稍后重试！',
                  type:'success'
                })
                //alert("修改失败！请稍后重试！");
                return false;
              }
            }
        );
      }

    },

    getAllGoodType(){//获取全部闲置品类型
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

    addRule(rule){
      this.params.idle.ruleList.push(rule);
      this.rule='';
      console.log("增加后："+this.params.idle.ruleList)
    },
    delItem: function (item) {
      this.params.idle.ruleList.splice(this.params.idle.ruleList.indexOf(item), 1);
      console.log("删减后："+this.params.idle.ruleList)
    },
    fileClick(){
      document.getElementById('upload_file').click()
    },
    fileChange(name){
      if (!name.target.files[0].size) return;
      this.fileList(name.target.files);
      name.target.value = ''
    },
    fileList(files){
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i]);
      }
    },
    fileAdd(file){ //将图片转换成base64
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        file.src = this.result;
        this.vue.params.idle.picBase64List.push(file.src);
      }
    },
    fileDel(index){
      let _this = this
      console.log("index="+index)
      _this.params.idle.picBase64List.splice(index,1);
    },
    bytesToSize(bytes){
      if (bytes === 0) return '0 B';
      let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    dragenter(name){
      name.stopPropagation();
      name.preventDefault();
    },
    dragover(name){
      name.stopPropagation();
      name.preventDefault();
    },
    drop(name){
      name.stopPropagation();
      name.preventDefault();
      this.fileList(name.dataTransfer.files);
    },
    //判断是否已登录
    judgeLogin(){
      let student = JSON.parse(sessionStorage.getItem('student'));
      if (null == student){
        return false;
      }else {
        this.params.idle.studentAccount = student.account;
        return true;
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
              _this.params.idle = res.data.idle;
            } else {
              console.log('闲置品查询失败');
              return '';
            }
          }
      );
    },
  }
}
</script>

<style scoped>
@import "../../views/闲置信息修改页面/css/style.css";

.fleft{
  float: left;
  width: 45%;
}
.fright{
  float: right;
  width: 45%;
}
.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 100px;
  width: 120px;
  border: 1px solid #2196F3;
  margin: 0px 30px 10px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  border-top: 1px solid #D2D2D2;
  padding: 14px 0 0 14px;
  overflow: hidden
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 10px;
  padding-top: 10px;
  text-indent: 14px;
  border-top: 1px solid #2196F3;
  font-size: 14px;
}

.upload_warp_right {
  float: left;
  width: 56%;
  margin-left: 2%;
  height: 100%;
  border: 2px dashed #2196F3;
  border-radius: 4px;
  line-height: 130px;
  color: #2196F3;
}

.upload_warp_left img {
  margin-top: 32px;
}

.upload_warp_left {
  float: left;
  width: 40%;
  height: 100%;
  border: 2px dashed #2196F3;
  border-radius: 4px;
  cursor: pointer;
}

.upload_warp {
  margin: 14px;
  height: 130px;
}

.upload {
  border: 2px solid #2196F3;
  width: 800px;
  border-radius: 14px;
}
.upload1 {
  border: 2px solid #2196F3;
  width: 800px;
  height: auto;
  border-radius: 14px;
}

.hello {
  width: 800px;
  height: 400px;
  margin: auto;
  text-align: center;
}

</style>
