<template>
  <div class="home home-order">
    <van-nav-bar
      title="订单列表"
      class="header"
    />
    <van-row class='list-ord'>
      <van-row v-if='ordersList.length>0'>
       <van-cell-group  v-for="(item,index) in ordersList" :key="index" class="order-list" @click="goPage('/orderInfo/'+item.id)" >
            <div class="left-business">
                <p>{{getTime(item.created_at)}}</p>
                <p>{{getDate(item.created_at)}}</p>
            </div>
            <van-cell
                size="large"
                :label="getResult(item.bet)"
                is-link
            >
             <template #title>
              <span v-if="item.room_id===1">天猫</span>
              <span v-if="item.room_id===2">淘宝</span>
              <span v-if="item.room_id===3">蘑菇街</span>
              <span v-if="item.room_id===4">唯品会</span>
              <span v-if="item.room_id===5">苏宁易购</span>
              <span v-if="item.room_id===6">寺库</span>
              <span v-if="item.room_id===7">拼多多</span>
              <span v-if="item.room_id===8">网易考拉</span>
              <span v-if="item.room_id===9">亚马逊</span>
             </template>
            <template #right-icon>
              <span v-if="item.status === 1">匹配中</span>
              <span v-if="item.status === 2" style="color:red">匹配成功</span>
              <span v-if="item.status === 3" style="color:green">匹配失败</span>
              <van-icon name="arrow" style="margin-top: 5px;"/>
            </template>
            </van-cell>
      </van-cell-group>
      </van-row>
       <van-divider v-else> 暂无记录！</van-divider>
      <van-row class='load-data'v-if='page'  @click='loadData'>
        <van-icon name="todo-list-o" />
        点击加载更多
      </van-row>
    </van-row>
         
    <Footer active='orderList' />
  </div>
</template>

<script lang="ts">
import Footer from "@/components/common/Footer.vue"; // @ is an alias to /src
import { Lazyload } from "vant";
import { Component, Vue } from "vue-property-decorator";
import { Toast } from "vant";
import {
  orders,
} from "@/services";
Vue.use(Lazyload);

@Component({
  components: {
    Footer,
  },
})
export default class OrderList extends Vue {

  private fixed?: boolean = true;
  private page?: any = 1;

 private ordersList?: any = []
  
  public mounted() {
    window.scrollTo(0, 0);
    this.getOrders()
  }
  private goPage(url: string) {
    if (this.$route.path === url) {
      return;
    }
    this.$router.push({ path: url });
  }

  private loadData() {
      this.getOrders()
      window.scrollTo(0,document.body.scrollHeight);

  }
  
  private getResult(result :any){
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
        if(this.page === res.data.last_page){
            this.page = null
        }else{
          this.page += 1
        }
        let arr = this.ordersList.concat(res.data.data)
        this.ordersList = arr
        console.log(this.ordersList)
      } else {
        Toast.fail(res.msg);
        if(res.code === 8888){
           this.goPage('/login')
        }
      }
    });
  }

  private getDate(date : any){
    if(date){
       const myArray = date.split(" ");
       let dateValue = myArray[0].split("-")
       let yearArray = dateValue[0].split("");
       let year = yearArray[2]+yearArray[3]
       return dateValue[1]+'/'+dateValue[2]
    }
   
  }
  private getTime(date : any){
    if(date){
      const myArray = date.split(" ");
      let time = myArray[1].split(":")

      return time[0]+':'+time[1]
    }
    
  }
  private goBack() {
    history.go(-1);
  }
}
</script>
<style lang="scss" >
.home-order {
    padding-bottom: 83px;
}
body{
      background: #f5f5f5;
}
  .van-nav-bar.header{
    padding: 3px 0;
    background-color: #e01509;
  }
  .van-swipe{
    height: 150px;
        padding: 3px;
    img{
      width: 100%;
      height: 100%;
    }
    .van-swipe__indicators{
      right: 0;
      left: initial;
      .van-swipe__indicator{
        background-color: #d0cdd1;
      }
      .van-swipe__indicator--active{
        background-color: #fff;
      }
    }
  }
  .van-nav-bar{
    .van-nav-bar__left{
      .van-icon{
        color: #dc3b40;
        font-size: 25px;
      }
    }
    .van-nav-bar__right{
      color: #818181;
      .van-icon{
        color: #818181;
      }
    }
    &.right-red{
      .van-nav-bar__right{
        color: rgb(220, 59, 64);
        .van-icon{
          color: rgb(220, 59, 64);
        }
      }
    }
  }
  .left-red{
    .van-cell__title{
      text-align: left;
    }
    .van-cell__left-icon{
      color: #dc3b40;
      font-size: 25px;
    }
  }
  .right-red{
    .van-cell__title{
      text-align: left;
    }
    .van-cell__value, i{
      color: #dc3b40;
    }
  }
  .order-list{
      .van-grid-item__content--center{
        padding: 2px;
        background: transparent;
      }
    h5{
      font-size: 14px;
      margin: 0;
      color: #000;
      font-weight: initial;
      margin-top: 6px;
    }
    p{
      font-size: 12px;
      color: rgb(152, 152, 152);
      margin: 0;
    }
  }
  .orange{
      background: #fc7051!important;
  }
  .blue{
      background: rgb(74, 150, 239)!important;
  }
  .blueClear{
      background: rgb(69, 200, 251)!important
  }
  .top-listbusiness{
      line-height: 40px;
    color: #fff;
  }
  .order-list.van-card{
      padding: 0;
      width: 100%;
      .van-card__thumb{
          width: 66px;
          height: 66px;
        margin-top: 8px;
        margin-left: 7px;
      }
      .van-card__content{
          text-align: left;
        padding-top: 14px;
        min-height: 74px;
      }
      .van-card__bottom{
          display: none;
      }
  }
  .order-list {
        display: inline-flex;
        width: 100%;
    }

    .order-list .left-business {
       width: 50px;
      padding-top: 20px;
    }

    .order-list .van-cell.van-cell--large {
        width: calc(100% - 60px);
        text-align: left;
        padding-left: 0;
    }
    @keyframes fingerHandle{
      0% {
          -webkit-transform: none;
          transform: none;
      }
      70% {
          -webkit-transform: scale3d(.8,.8,.8);
          transform: scale3d(.8,.8,.8);
      }
      100% {
          -webkit-transform: none;
          transform: none;
      }
    }
    .load-data.van-row {
      position: fixed;
      bottom: 50px;
      background: #f5f5f5;
      width: 100%;
      padding: 5px;
      color: #000;
      cursor: pointer;
  }
  .van-divider {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    margin: 16px 0;
    color: #969799;
    font-size: 14px;
    line-height: 24px;
    border-color: #969799;
    border-style: solid;
    border-width: 0;
}
</style>
