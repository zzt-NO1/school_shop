<template>
  <div class="detailsPage">
    <!-- BUTTONS (input/labels) -->
    <div class="page-body">
      <!-- SLIDES -->
      <div class="slide-wrapper">
        <div id="slide-role">
            <img :src="pic" class="imgs">
        </div>
      </div>
      <div class="label-wrapper">
        <button  class="face-button trigger" v-for="(item,index) in pictures" :key="index" @click="btnClick(index)">
          <div class="face-container">
            <span class="eye left"></span>
          </div>
        </button>
      </div>
      <div class="msg-wrapper">
        <h2>
          <p class="title-p">{{modelData.title}}</p>
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
                <span style="font-size: 17px;color: #FF6600">{{modelData.quality}}</span>好物件,仅剩<span style="color: #FF6600;font-size: 18px">{{modelData.count}}</span>件了喔！先到先得！
              </div>
            </div>
            <span class="stand" style="font-size: 14px;">类型:{{modelData.goodType}}</span>
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
            详情:<div>{{modelData.description}}</div>
          </div>
          <div v-if="modelData.rentAndSellMark==1" class="div-xia">
            <hr/>
            租赁要求:<div><li v-for="(item,index) in modelData.rules" :key="index">{{item}}</li></div>
          </div>
        </div>
        <!--<div>
          <p><span>商品描述：{{modelData.description}}</span></p>
          <span>租赁规则：</span>
          <div >
            <li v-for="(item,index) in modelData.rules" :key="index">{{item}}</li>
          </div>
        </div>
        <div>
          <p><input type="button" class="p-btn" value="加入购物车"><span class="iconfont">&#xe7d8; </span><input type="button" class="p-btn" value="立即下单"></p>
        </div>-->
      </div>
    </div>
    <div class="page-body1">
      hh
    </div>
  </div>
</template>
<!--<script src="../闲置品详情页面/js/index.js"></script>-->
<script>
export default {
  name: "IdleDetails",

  data() {
    return{
      val: '50%',
      slip:'',
      active: true,
      btnValue:0,
      mood:null,
      pic: require('../闲置品详情页面/img/5.jpg'),
      pictures:[
        /*{
          imgSrc:require('../闲置品详情页面/img/5.jpg')
        },*/
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
        goodType: '其他',
        price:50,
        quality:'8成新',
        count:1,
        transWay: 0,
        isFree: 0,
        address:'南校区六公寓',
        description:'手感不错',
        rules:[
          '完整归还',
          '弄丢赔钱'
        ]
      },
      params:{

      }
    }

  },
  methods: {
    btnClick(index){
     /* let btn = document.getElementsByClassName('face-button')*/
      console.log("index="+index)
      /*btn[this.btnValue].style.backgroundColor='#678efe'*/
      for (let i=0 ;i<this.pictures.length;i++){
        if (i==index){
          this.pic = this.pictures[i].imgSrc
          console.log("curr.pic="+this.pic)
        }
      }
    },
    getHappiness: function(){
      if(this.modelData.quality == '5成新'){
        this.val='50%'
      } else if(this.modelData.quality == '6成新'){
        this.val='60%'
      } else if(this.modelData.quality == '7成新'){
        this.val='70%'
      } else if(this.modelData.quality == '8成新'){
        this.val='80%'
      } else if(this.modelData.quality == '9成新'){
        this.val='90%'
      } else if(this.modelData.quality == '全新'){
        this.val='100%'
      }
    },
  },
  created() {
    console.log("进入详情页...")
    this.getHappiness()
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

</style>