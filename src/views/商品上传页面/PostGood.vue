<template>
  <div id="uploadGood">
<!------------------------背景---------------------------------------------------->
    <!--<div id="background" class="wall"></div>
    <div id="midground" class="wall"></div>
    <div id="foreground" class="wall"></div>
    <div id="top" class="wall"></div>-->
    <div class="hello" style="background-color: white;height: 100%;border-radius: 10px;opacity: 0.85">
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
          <div class="upload_warp_text">
            选中{{params.imgList.length}}个图片，共{{bytesToSize(this.params.size)}}
            <span class="ml20 c-red">[单个图片附件的最大尺寸为10MB]</span>
          </div>
          <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none">
          <div class="upload_warp_img" v-show="params.imgList.length!=0">
            <div class="upload_warp_img_div" v-for="(item,index) of params.imgList" :key="index">
              <div class="upload_warp_img_div_top">
                <div class="upload_warp_img_div_text">
                  {{item.file.name}}
                </div>
                <img src="../商品上传页面/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
              </div>
              <img :src="item.file.src">
            </div>
          </div>
        </div>
        <div class="upload1" >
          <span style="font-size: 30px;color: #2c3e50;margin-top: 20px">请完善闲置品信息</span>
          <p style="margin: auto;height: 40px;margin-top: 15px">
            <label style="margin-right: 15px;color: #2c3e50"><input type="radio" name="radioType" value="0" @click="selectUploadType(0)" checked="checked" />出售</label>
            <label style="margin-right: 15px;color: #2c3e50"><input type="radio" name="radioType" value="1" @click="selectUploadType(1)"/>出租</label>
          </p>
          <!----------------------------------出售品信息------------------------------------------------------------------->
          <div class="upload-msg" v-if="params.rentOrSellMark===0">
            <div class="form-group">
              <span style="border: 1px solid #1687f3;background-color: #1687f3;color: white" class="append-span">标题*</span>
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="text" v-model="params.title" placeholder="填写标题或闲置品名称" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span class="append-span">类别*</span>
              <!--<input class="in_text form-field" list="typelist" type="text" half placeholder="请选择类别" autocomplete="no" required="required"/>-->
              <select style="border: 1px solid #1687f3;" v-model="params.goodType" class="in_text form-field select" id="typelist" half placeholder="请选择类别" autocomplete="no" required="required">
                <option value="">请选择类别</option>
                <option v-for="item in goodTypes" :key="item.id">{{item.name}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="number" step="0.1" min="0" v-model="params.price" half placeholder="预期价格" autocomplete="no" required="required"/>
              <span class="append-span" style="border: 1px solid #1687f3;" v-if="params.rentOrSellMark===0">元*</span>
            </div>
            <div class="form-group fleft">
              <span class="append-span">新旧程度*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.qualityValue" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select style="border: 1px solid #1687f3;" v-model="params.qualityValue" class="in_text form-field select" half autocomplete="no" required="required">
                <option value="">请选择新旧程度</option>
                <option v-for="(item,index) in qualityValues" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span class="append-span">数量*</span>
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="number" v-model="params.count" min="1" max="20" half placeholder="库存数量" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span class="append-span">交易途径*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.transWay" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select style="border: 1px solid #1687f3;" v-model="params.transWay" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option v-for="(item,index) in transWays" :key="index" :value="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span class="append-span">是否包邮*</span>
              <select style="border: 1px solid #1687f3;" v-model="params.isFree" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option value=0 >不包邮</option>
                <option value=1 >包邮</option>
              </select>
              <!--<input class="in_text form-field" type="text"  half placeholder="请选择" autocomplete="no" required="required"/>-->
            </div>
            <div class="form-group">
              <span class="append-span">校内地点*</span>
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="text" v-model="params.address" placeholder="请填写交易地址" autocomplete="no" required="required"/>
            </div>
            <div class="form-group" >
              <textarea style="border: 1px solid #1687f3;border-radius: 6px 6px 6px 6px;" class="in_text form-field" type="text" v-model="params.description" placeholder="闲置品描述信息*" autocomplete="no" required="required"/>
            </div>
            <div class="form-group" >
              <input style="border: 1px solid #1687f3;background-color: #2196F3;color: white" class="in_text" type="submit" value="提交发布申请" @click="submitClick">
            </div>
          </div>
          <!------------------------------出租品信息--------------------------------------------------------->
          <div class="rentDiv" v-if="params.rentOrSellMark===1">
            <div class="form-group">
              <span class="append-span">标题*</span>
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="text" v-model="params.title" placeholder="填写标题或闲置品名称" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span class="append-span">类别*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.goodType" half placeholder="请选择类别" autocomplete="no" required="required"/>-->
              <select style="border: 1px solid #1687f3;" v-model="params.goodType" class="in_text form-field select" id="typelist1" half autocomplete="no" required="required">
                <option value="">请选择类别</option>
                <option v-for="item in goodTypes" :key="item.id">{{item.name}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="number" step="0.1" min="0" v-model="params.price" half placeholder="预期价格" autocomplete="no" required="required"/>
              <span class="append-span" v-if="params.rentOrSellMark===1">元/天*</span>
            </div>
            <div class="form-group fleft">
              <span class="append-span">新旧程度*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.qualityValue" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select style="border: 1px solid #1687f3;" v-model="params.qualityValue" class="in_text form-field select" half autocomplete="no" required="required">
                <option value="">请选择新旧程度</option>
                <option v-for="(item,index) in qualityValues" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span class="append-span">数量*</span>
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="number" min="1" max="20" v-model="params.count" half placeholder="库存数量" autocomplete="no" required="required"/>
            </div>
            <div class="form-group fleft">
              <span class="append-span">交易途径*</span>
              <!--<input class="in_text form-field" type="text" v-model="params.transWay" half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select style="border: 1px solid #1687f3;" v-model="params.transWay" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option v-for="(item,index) in transWays" :key="index" :value="index">{{item}}</option>
              </select>
            </div>
            <div class="form-group fright">
              <span class="append-span">是否包邮*</span>
              <!--<input class="in_text form-field" type="text"  half placeholder="请选择" autocomplete="no" required="required"/>-->
              <select style="border: 1px solid #1687f3;" v-model="params.isFree" class="in_text form-field select" half autocomplete="no" required="required">
                <!--<option value="">请选择交易途径 </option>-->
                <option value=0 >不包邮</option>
                <option value=1 >包邮</option>
              </select>
            </div>
            <div class="form-group">
              <span class="append-span">校内地点*</span>
              <input style="border: 1px solid #1687f3;" class="in_text form-field" type="text" v-model="params.address" placeholder="请填写交易地址" autocomplete="no" required="required"/>
            </div>
            <div class="form-group" >
              <textarea style="border: 1px solid #1687f3;border-radius: 6px 6px 6px 6px;" class="in_text form-field" type="text" v-model="params.description" placeholder="闲置品描述信息*" autocomplete="no"  required="required"/>
            </div>
            <div class="form-group">
              <span class="append-span">出租规则*</span>
              <input style="border: 1px solid #1687f3;color:#1687f3;border-radius: 0" class="in_text form-field" type="text" placeholder="请填写出租规则" autocomplete="no" v-model="rule" />
              <span class="append-span" style="cursor: pointer" @click="addRule(rule)">添加</span>
            </div>
            <div class="form-group" style="border: 1px solid #2196F3;border-radius: 6px;">
              <ul class="task-list">
                <li class="task-list-item" v-for="(item,index) in params.rent_rules" :key="index" style="background-color: #2196F3">
                  <label class="task-list-item-label" >
                    <span >{{index+1}}、 {{item}}</span>
                  </label>
                  <span @click="delItem(item)" class="delete-btn" title="删除规则" >{{item.del}}</span>
                </li>
              </ul>
            </div>
            <div class="form-group" >
              <input style="border: 1px solid #1687f3;background-color: #2196F3;color:white" class="in_text" type="submit" value="提交发布申请" @click="submitClick">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="../../views/商品上传页面/js/vue.min.js"></script>
<script src="../../views/商品上传页面/js/jquery.min.js"></script>
<script src="../../views/商品上传页面/js/script.js"></script>

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
        rentOrSellMark: 0,//0:出售 ,1:出租
        title: '',//标题
        description: '',//详细描述
        count: 1,//可售数量
        goodType: '',//闲置品类型
        qualityValue: '',//新旧程度
        studentAccount: '',//用户账号
        price: 0,//价格
        size: 0,
        transWay:0,//默认全部 0全部，1校内线下交易，2快递
        isFree: 0,// 默认不包邮， 0不包邮 ，1包邮
        address:'',//校内线下交易地址
        rent_rules: [],//租赁规则
        schoolId:'',//学校编号
      },
      /*rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        veriCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },*/
      rule:'',
      resultMsg:null,
    }
  },
  created() {
    let stu = JSON.parse(sessionStorage.getItem('student'));
    if (null == stu){
      this.loginStatus = false;
      alert("尚未登录！即将跳转登录页面...");
      this.$router.push({path:"/login"});
    }else {
      this.loginStatus = true;
      this.studentName = stu.nickname;
      this.params.studentAccount = stu.account;
      this.params.schoolId = stu.schoolId;
      this.goodTypes = this.getAllGoodType();
    }
  },
  methods: {
    submitClick(){//向后端提交数据
      console.log("提交");
      console.log(this.params);
      const _this = this;
      if (this.params.title==''||this.params.description==''||this.params.goodType==''||this.params.qualityValue==''||this.params.address==''){
        alert("请填写完整信息再提交！")
      }else {
        this.params.price = parseInt(this.params.price)
        this.params.transWay = parseInt(this.params.transWay)
        this.params.isFree = parseInt(this.params.isFree)
        this.params.rentOrSellMark = parseInt(this.params.rentOrSellMark)
        this.params.count = parseInt(this.params.count)
        axios.post('http://localhost:8181/issueIdle/addIdle', {
          params: this.params
        }).then(function (res) {
              console.log(res.data);
              _this.resultMsg = res.data;
              if (_this.resultMsg.postResult) {//登录成功
                console.log("发布成功");
                alert("发布成功！请耐心等待审核结果......");
                _this.$router.go(0);
                //_this.$router.push('/postGood');
              } else {
                console.log('发布失败!!');
                alert("发布失败！请稍后重试！");
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

    selectUploadType(typeValue){//选择出租或出售类型
      if(typeValue==1){
        this.params.rentOrSellMark=1;
      }else {
        this.params.rentOrSellMark=0;
      }
    },
    addRule(rule){
      this.params.rent_rules.push(rule);
      this.rule='';
      console.log("增加后："+this.params.rent_rules)
    },
    delItem: function (item) {
      this.params.rent_rules.splice(this.params.rent_rules.indexOf(item), 1);
      console.log("删减后："+this.params.rent_rules)
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
      this.params.size = this.params.size + file.size;//总大小
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        file.src = this.result;
        this.vue.params.imgList.push({
          file
        });
      }
    },
    fileDel(index){
      this.params.size = this.params.size - this.params.imgList[index].file.size;//总大小
      this.params.imgList.splice(index, 1);
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
  }
}
</script>

<style scoped>
@import "../../views/商品上传页面/css/style.css";

/*.upload-msg{
  text-align: left;
  margin-left: 40px;
}*/
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
  border: 1px dashed #2196F3;
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
  border: 1px dashed #2196F3;
  border-radius: 4px;
  cursor: pointer;
}

.upload_warp {
  margin: 14px;
  height: 130px;
}

.upload {
  border: 1px solid #2196F3;
  width: 800px;
  border-radius: 14px;
}
.upload1 {
  border: 1px solid #2196F3;
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
.ml20{
  margin-left: 20px;
}
.c-red{
  color: red;
}
.append-span{
  border: 1px solid #2196F3;
  background-color: #2196F3;
  color: white
}

</style>