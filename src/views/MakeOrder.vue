<template>
    <div class="make-order">
        <van-nav-bar
            class="header"
            :title="titleRoom"
            left-text="返回"
            left-arrow
            @click-left="goBack()"
            />
          
        <van-row class="kjInfo" v-if='lastIssue'>
            <div class="dzwinningNums">
              <p  class="dztermNum" style="width: 110px;">
              <span>【{{lastIssue.number}}】</span><br>订单匹配结果
              </p> 
              <div class="dzDiceImg" style="">
                <div>{{getResult(lastIssue.result)}}</div>
               </div>
            </div>
            <div  class="dzdeadline">
              <div style="font-size: 13px; padding-left: 3px; text-align: center; width: 130px;">
                <span>【{{issueInfo.number}}】</span>
                <br>订单匹配截止
              </div>
               <p  class="termNum" style="text-align: center; margin-top: 5px; margin-left: 5px;">
                <van-count-down  class="termNum" :time="time" v-if='!noStatus' @finish="updatedtimer">
                    <template #default="timeData">
                     <!-- <span class="block">{{ timeData.hours }}</span>
                      <span class="colon">:</span>
                      <span class="block">{{ timeData.minutes }}</span>
                      <span class="colon">:</span>
                      <span class="block">{{ timeData.seconds }}</span> -->
					  
					   <span class="block" v-if="timeData.hours<10" :key ="hours1">0{{ timeData.hours }}</span>
					   <span class="block" :key ="hours2" v-else>{{ timeData.hours }}</span>
					   <span class="colon">:</span>
					   <span class="block" v-if="timeData.minutes<10" :key ="minutes1">0{{ timeData.minutes }}</span>
					   <span class="block" :key ="minutes2" v-else>{{ timeData.minutes }}</span>
					   <span class="colon">:</span>
					   <span class="block" v-if="timeData.seconds<10" :key ="seconds1">0{{ timeData.seconds }}</span>
					   <span class="block" :key="seconds2" v-else>{{ timeData.seconds }}</span>
					   
                    </template>
                  </van-count-down>
                  <span v-else style='position: relative;top: 6px;'>订单匹配中...</span>
               </p>
            </div>
        </van-row>
        <van-grid :gutter="10" class="topLinks">
            <van-grid-item v-for="(item,index) in topValues" :key="index"  :text="item.title" :class="{'active':item.selected}" @click="selectItem(index)"/>
        </van-grid>
        <van-grid :gutter="10" class="oderList">
            <van-grid-item v-for="(item,index) in list" :key="index" @click="indexSelected = index"  :class="{'active':indexSelected === index}">
                <van-image
                    width="55"
                    height="55"
                    :src="item.img"
                    />
            </van-grid-item>
        </van-grid>
        <van-row class="bottom-order" v-if='lastIssue'>
            <div class="dzK3">
                <div class="dzoperate">
                    <div class="leftbtn">
                        清空
                    </div>
                    <div class="cite">
                        <span class="gray">共 {{selectedTotal}} 件</span>
                        <span>合计</span>
                        <span class="red">¥ {{TotalOrder}}</span>
                        <span>金币</span>
                    </div>
                    <div class="rightbtn" @click='sendBet()'>
                        <span class="handledz">提交订单</span>
                    </div>
                </div>
            </div>
            <div class="dzdialog" v-if="selectedTotal > 0">
                <div class="top">
                    当前余额: <span style="color: rgb(225, 194, 98);">{{userInfoDetails.balance}}</span>
                </div>
                <div class="bottom">
                    <van-stepper v-model="value" @change="updateQuantity"/>
                    <div class="choosemoney">
                        <div class="mr2">金币</div>
                    </div>
                </div>
            </div>
        </van-row>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Toast } from "vant";
import {
  getIssues,
  bet,
  userInfo,
  rooms
} from "@/services";
@Component({
  components: {
  },
})
export default class MakeOrder extends Vue {

    private indexSelected = null;
    private value = 1;
    private selectedTotal = 0;
    private TotalOrder = this.selectedTotal * this.value;
    private lastIssue:any = null;
    private fixed?: boolean = true;
    private titleRoom?: any = '';
    private issueInfo?: any = null;
    private noStatus?: boolean = false;
    private userInfoDetails?: any[] = [];
    
    private time?: any = 30 * 60 * 60 * 1000;
    private topValues?: any = [
      {
        id:1,
        title: "优品Ar+1",
        selected: false,
      },
      {
        id:2,
        title: "统货Ct+1",
        selected: false,
      },
      {
        id:3,
        title: "单/件",
        selected: false,
      },
      {
        id:4,
        title: "双/件",
        selected: false,
      },
    ];
    private getResult(result : any){
        const myArray = result.split(",");
        let val =''
        myArray.forEach((qry:any,index:any)=>{
        if(index != 0){
            val += ', '
        }
        if(qry === '1'){
            val += '优选Ar+1'
        }
        if(qry === '2'){
            val += '统货Ct+1'
        }
        if(qry === '3'){
          val += '单/件'
        }
        if(qry === '4'){
          val += '双/件'
        }
        })
        return val
  }
    private list?: any = [
      {
        img: require("@/assets/lg4.jpeg"),
      },
      {
        img: require("@/assets/lg5.jpeg"),
      },
      {
        img: require("@/assets/lg6.jpeg"),
      },
      {
        img: require("@/assets/lg7.jpeg"),
      },
      {
        img: require("@/assets/lg8.jpeg"),
      },
      {
        img: require("@/assets/lg9.jpeg"),
      },
      {
        img: require("@/assets/lg10.jpeg"),
      },
      {
        img: require("@/assets/lg11.jpeg"),
      },
      {
        img: require("@/assets/lg12.jpeg"),
      },
      {
        img: require("@/assets/lg13.jpeg"),
      },
      {
        img: require("@/assets/lg14.jpeg"),
      },
      {
        img: require("@/assets/lg15.jpeg"),
      },
      {
        img: require("@/assets/lg16.jpeg"),
      },
      {
        img: require("@/assets/lg17.jpeg"),
      },
      {
        img: require("@/assets/lg18.jpeg"),
      },
    ];
  public mounted() {
    window.scrollTo(0, 0);
    localStorage.setItem("room_id", this.$route.params.id)
      this.getUserInfo()
      this.getRooms();
      this.getIssues()
      
    }
    private getRooms() {
      if(!localStorage.getItem("token")){
        this.goPage('/login')
      }
      const post: any = null;
        rooms(post).then((res) => {
         let rooms = res.data.data
         this.titleRoom = rooms.find((qry:any) => qry.id === parseInt(this.$route.params.id)).title
        });
    }
    private updateQuantity() {
      this.TotalOrder = this.selectedTotal * this.value;
    }
    private updatedtimer() {
      console.log('test')
          let that = this
          this.noStatus = true
          setTimeout(function(){
            that.getIssues()
          },1000)      
    }

  private getIssues() {
    const post: any = {
      room_id: parseInt(this.$route.params.id)
    };
    getIssues(post).then((res) => {
      if (res.code === 200) {
        let allIssues = res.data.data
        if(allIssues.length>0){
          this.lastIssue = allIssues[allIssues.length - 1]
          this.issueInfo = allIssues[0]
          let nowDate = new Date().getTime()
          this.time = (this.issueInfo.end_time*1000) - (res.msg*1000)
          this.noStatus = false
        }
        
        
      } else {
        if(res.code === 8888){
           this.goPage('/login')
        }
        Toast.fail(res.msg);
      }
    });
  }
  private getUserInfo() {
    const post: any = null;
    userInfo(post).then((res) => {
      if (res.code === 200) {
        this.userInfoDetails = res.data
      } else {
        if(res.code === 8888){
           this.goPage('/login')
        }
        Toast.fail(res.msg);
      }
    });
  }
  sendBet(){
      let selectedBet = this.topValues.filter((qry:any) => qry.selected === true)
      let betValue = ''
     selectedBet.forEach((item:any,index:any) => {
       if(index === 0){
         betValue = item.id
       }else{
         betValue+=','+item.id
       }
     })
      const post: any = {
        money: this.TotalOrder,
        bet: betValue,
        issue_id:this.issueInfo.id,
        room_id:this.issueInfo.room_id
      };
      this.$dialog.alert({
        title:'是否确认下单',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        showConfirmButton: true,
        showCancelButton: true
    }).then(() => {
        Toast.loading({
          message: '下单中',
          forbidClick: true,
          loadingType: 'spinner',
        });
        
        bet(post).then((res) => {
          if (res.code === 200) {
            Toast.success('下单成功，请等待分销');
            this.getUserInfo()
          } else {
            Toast.fail(res.msg);
          }
        });
      })
    }
    private selectItem(index: any) {
      if (this.topValues[index].selected) {
        this.selectedTotal--;
      } else {
        this.selectedTotal++;
      }
      this.topValues[index].selected = !this.topValues[index].selected;
      this.TotalOrder = this.selectedTotal * this.value;
    }

    private goPage(url: string) {
      if (this.$route.path === url) {
        return;
      }
      this.$router.push({ path: url });
    }

    private goBack() {
      history.back();
    }
}
</script>
<style lang="scss">
.make-order{
    .logout{
        margin-top: 15px;
    }
    .van-cell{
        padding: 10px 7px;
    }
        .van-icon{
            margin-right: 10px;
            font-size: 22px;
            color: #e41c1c;
            &.van-cell__right-icon{
                color: #c8c8cd;
                font-size: 10px;
            }
        }
    .van-cell__title{
        text-align: left;
    }
}
.van-nav-bar.header{
    padding: 3px 0;
    background-color: #e01509;
    z-index: 1000;
    .van-nav-bar__left{
        padding: 0;
        i{
            color: #fff;
        }
        span{
            color: #fff;
        }
    }
  }
.topLinks.van-grid {
    margin-top: 15px;
    .van-grid-item__content {
        border-radius: 25px;
        padding: 20px 0;
        &:after {
            display: none;
        }
        span{
            font-size: 14px;
            font-weight: 500;
        }
    }
    .active .van-grid-item__content {
        background: #e11509;
        color: #fff;
        span{
            color: #fff;
        }
    }
 }
 .oderList.van-grid {
    margin-top: 15px;
    .van-grid-item .van-grid-item__content {
        border: 1px solid rgb(236, 183, 183);
        cursor: pointer;
    }
}
.bottom-order{
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index:1000;
    .dzK3 {
        width: 100%;
        background: #fefefe;
        padding: 0 20px;
        border-top: 1px solid #bbb;
        height: 44px;
        .dzoperate {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            line-height: 44px;
                padding-right: 5px;
            .leftbtn{
                flex: 1 1 0%;
                font-size: 18px;
                font-weight: bold;
                color: black;
            }
            .rightbtn{
                flex: 2 1 0%;
                .handledz {
                    background: #fe0a07;
                    color: #fff;
                    border-radius: 25px;
                    padding: 6px 14px;
                    font-size: 16px;
                    width: 110px;
                    text-align: center;
                }
            }
            .cite{
                flex: 3 1 0%;
                span{
                    margin-left: 5px;
                    font-weight: bold;
                    &.gray{
                        font-weight: initial;
                        margin-left: 0;
                        color: #939298;
                        font-size: 15px;
                    }
                    &.red{
                        color: red;
                    }
                }
            }
        }
    }
}
.dzdialog {
    width: 100%;
    height: 100px;
    background: #fff;
    position: absolute;
    bottom: 45px;
    text-align: left;
    z-index: 1000;
    .top {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        font-size: 16px;
        color: #3d4145;
        border-top: 1px solid #d6d6d6;
    }
     .bottom {
           height: 50px;
            border-top: 1px solid #d6d6d6;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            position: relative;
            .van-stepper{
                position: relative;
                top: 9px;
                left: 15px;
            }
       .choosemoney {
            position: absolute;
            right: 10px;
            top: 8px;
            .mr2 {
                width: 50px;
                background: #dc5551;
                color: #fff;
                text-align: center;
                height: 30px;
                line-height: 30px;
                border-radius: 6px;
                position: relative;
                z-index: 100;
                border: 0;
                margin-top: 2px;
            }
        }
    }
}
.oderList.van-grid .van-grid-item.active .van-grid-item__content {
    border-width: 3px;
}
.kjInfo{
    position: relative;
    z-index: 1;
    min-height: 70px;
    padding: 8px 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background:#fff;
    .dzwinningNums {
      float: inherit;
      border: none;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      
  }
  .dztermNum {
        text-align: center;
        background-image: url('../assets/backGround.png');
        font-size: 13px;
        background-size: 88% 100%;
        padding: 3px 25px 3px 11px;
        color: #fff;
        background-position: 50%;
        background-repeat: no-repeat;
        margin-left: 2px;
       
    }
     .dzdeadline, .dzDiceImg{
          font-size: 13px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          color: #000;
      }
      .dzDiceImg {
        text-align: center;
        font-weight: 700;
    }
}
.colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #000;
    font-size: 12px;
    text-align: center;
    background-color: #f5f5f5;
    border: 1px solid #959595;
}
.van-stepper__input {
    box-sizing: border-box;
    width: 100px !important;
}
</style>
