<template>
  <div class="home">
    <van-nav-bar
      title="商家列表"
      class="header"
    />
    <van-row class="top-listbusiness">
        <van-col span="8" class="orange">全部商家</van-col>
        <van-col span="8" class="blue">热门商家</van-col>
        <van-col span="8" class="blueClear">商家列表</van-col>
    </van-row>
    <van-grid  :column-num="2">
      <van-grid-item v-for="(item,index) in homeInfo" :key="index" class="business-list" @click="goPage('/makeOrder/'+item.id)">
            <van-card
                num="2"
                :title="item.title"
                :thumb="'http://zzyinchat.com/uploads/'+item.image"
                class="business-list"
                >
                <template #desc>
                  <p>全天{{item.issue_number.toString()+'单'}}</p>
                   <van-count-down   class="termNum" v-if='times[index]>0'  :time="times[index]"  @finish="getIssues(item.id,index)">
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
                </template>
            </van-card>
      </van-grid-item>
    </van-grid>
    <Footer active='businessList' />
  </div>
</template>

<script lang="ts">
import { Toast } from "vant";
import Footer from "@/components/common/Footer.vue"; // @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import {
  rooms,
  getIssues

} from "@/services";

@Component({
  components: {
    Footer,
  },
})
export default class BusinessList extends Vue {

  private fixed?: boolean = true;
  private homeInfo?: any = [];
  private times?: any = [];
  private componentKey?: any = 0;
  private noStatus?: boolean = false;
  public mounted() {
    window.scrollTo(0, 0);
    this.getRooms();
  }
  private goPage(url: string) {
    if (this.$route.path === url) {
      return;
    }
    this.$router.push({ path: url });
  }
  
  private getRooms() {
     const post: any = null;
      rooms(post).then((res) => {
        this.homeInfo = res.data.data
        this.homeInfo.forEach((qry:any,index:any)=>{
          this.times[index]=0
          this.getIssues(qry.id,index)
        })
      });

  }
  private getIssues(id : any, index:any) {
    let time = 0
   
    const post: any = {
      room_id: id
    };
    getIssues(post).then((res) => {
      if (res.code === 200) {
        let allIssues = res.data.data
        if(allIssues.length>0){
          let issueInfo = allIssues[0]
          let nowDate = new Date().getTime()
          time =((issueInfo.end_time*1000) - (res.msg*1000))
          this.noStatus = false
        }
        this.$set(this.times,index,time)
         
      } else {
        if(res.code === 8888){
                this.goPage('/login')
         }
        Toast.fail(res.msg);
      }
    });
   }
}
</script>
<style lang="scss" >
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
  .business-list{
      .van-grid-item__content--center{
        padding: 1px;
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
  .business-list.van-card{
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
</style>
