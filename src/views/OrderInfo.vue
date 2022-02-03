<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="订单详情"
            left-text="返回"
            left-arrow
            @click-left="goBack()"
        >
        </van-nav-bar>
        <van-row class='order-info' v-if='orderInfoItem'>
            <div class='title'>
                <h6> 
                    <span v-if="orderInfoItem.room_id===1">天猫</span>
                    <span v-if="orderInfoItem.room_id===2">淘宝</span>
                    <span v-if="orderInfoItem.room_id===3">蘑菇街</span>
                    <span v-if="orderInfoItem.room_id===4">唯品会</span>
                    <span v-if="orderInfoItem.room_id===5">苏宁易购</span>
                    <span v-if="orderInfoItem.room_id===6">寺库</span>
                    <span v-if="orderInfoItem.room_id===7">拼多多</span>
                    <span v-if="orderInfoItem.room_id===8">网易考拉</span>
                    <span v-if="orderInfoItem.room_id===9">亚马逊</span>
                </h6>
                <p>{{orderInfoItem.issue}}</p>
            </div>
            <p class='info'> 匹配状态
                <span v-if="orderInfoItem.status === 1">匹配中</span>
                <span v-if="orderInfoItem.status === 2" style="color:red">匹配成功</span>
                <span v-if="orderInfoItem.status === 3" style="color:green">匹配失败</span>
            </p>
            <p class='info'>匹配数据 <span>{{orderInfoItem.issues && getResult(orderInfoItem.issues.result)}}</span></p>
            <p class='info'>下单数据<span>{{getResult(orderInfoItem.bet)}}</span></p>
            <p class='info'>订单单号<span>{{orderInfoItem.order_number}}</span></p>
            <p class='info'>匹配时间<span>{{orderInfoItem.created_at}}</span></p>
            <p class='info'>下单金额<span>{{orderInfoItem.money}}</span></p>
        </van-row>
    </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
import {
  orders,
} from "@/services";
@Component({
  components: {
  },
})
export default class orderInfo extends Vue {
    private orderInfoItem?: any = []
    private page?: any = 1;
    private goBack() {
      history.back();
    }
    public mounted() {
        window.scrollTo(0, 0);
        this.getOrders()
    }
    private getResult(result : any){
        if(!result){
            return
        }
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
    private getOrders() {
        const post: any = {
        page:this.page
        };
    orders(post).then((res) => {

      if (res.code === 200) {
       let data = res.data.data
       if(data){
           
           this.orderInfoItem = data.find((qry:any) => qry.id === parseInt(this.$route.params.id))
           if(!this.orderInfoItem){
               
               if(res.data.last_page>this.page){
                 this.page +=1 
                 this.getOrders()
               }
           }
           else{
               return
           }
       }
      }
     else {
         if(res.code === 8888){
           this.goPage('/login')
        }
        Toast.fail(res.msg);
      }
    });
  }
   private goPage(url: string) {
      if (this.$route.path === url) {
        return;
      }
      this.$router.push({ path: url });
    }
   
}
</script>
<style lang="scss">
.van-nav-bar__right{
    i{
        font-size: 24px;
        color: #fff !important;
    }
}
.logo-login{
    margin: 4rem auto 0.8334rem;
}
.van-nav-bar.header{
    padding: 3px 0;
    background-color: #e01509;
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
  .van-form{
    .van-cell{
        background-color: transparent;
    }
    .van-field__control{
        background-color: transparent !important;
    }
  }
  .van-button--info{
      background-color: #e64340 !important;
      border-radius: 5px !important;
      border : none !important
  }
  p.recharge-desc {
    margin-top: 50px;
    text-align: center;
    margin-top: 100px;
    color: #888;
}
.order-info .title h6 {
    margin: 0;
    color: rgb(51, 51, 51);
    font-size: 16px;
}

.order-info {
    margin:  50px;
}

.order-info .title p {
    margin: 0;
    color: rgb(204, 204, 204);
    font-size: 12px;
}

.order-info p.info {
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    color: #333;
    width: 250px;
    text-align: left;
    margin-top: 20px;
}

.order-info p.info span {
    margin-left: 10px;
    color: #999;
}
.headerc {
    width: 180vw;
    height: 100vw;
    left: -40vw;
    background-color: #e01509;
    top: -50%;
    position: absolute;
    border-radius: 50%;
}
</style>
