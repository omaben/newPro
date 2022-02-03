<template>
    <div class="settings">
        <van-nav-bar
            class="header"
            title=" 下单列表  "
            left-text="返回"
            left-arrow
            @click-left="goPage('/user')"
            />
            <van-grid direction="horizontal" :column-num="3" :gutter="10" class="search">
                <van-grid-item>
                    <van-cell :title="beforedate"  @click="beforedateCalender = true"  />
                </van-grid-item>
                <van-grid-item>
                    <van-cell :title="afterdate"  @click="afterdateCalender = true" />
                </van-grid-item>
                <van-grid-item>
                   <van-button type="danger" @click='bills()'>查询</van-button>
                </van-grid-item>
            </van-grid>
            <van-calendar v-model="beforedateCalender" @confirm="onConfirmBefore" :min-date="minDate" :max-date="maxDateBefore" />
            <van-calendar v-model="afterdateCalender" @confirm="onConfirmAfter" :min-date="minDateAfer" :max-date="maxDate" />
           
            
            <van-row class="grid-white" v-if='billList.length>0'>
            <van-cell-group class='recharge-info' v-for="(item,index) in billList" :key="index">
                <van-cell title="下单时间" :value="item.created_at" />
                <van-cell title="下单商品" :value="item.order_number" />
                <van-cell title="下单金额" :value="item.balance" />
                <van-cell title="已完成" :value="item.type" />
            </van-cell-group>
            </van-row>
             <van-divider v-else>暂无纪录！</van-divider>
    </div>
</template>
<script lang="ts">
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";
import { Toast } from "vant";
import {
  bills,
} from "@/services";
@Component({
  components: {
  },
})
export default class WithdrawList extends Vue {

    private beforedate?: any = '';
    private afterdate?: any = moment(new Date()).format("YYYY-MM-DD");
    private maxDate?: any = new Date();
    private maxDateBefore?: any = new Date();
    private minDate?: any = new Date(2010, 0, 1);
    private minDateAfer?: any = new Date(2010, 0, 1);
    
    private billList?: any = [];

    private beforedateCalender?: any = false;
    private afterdateCalender?: any = false;
  public mounted() {
    window.scrollTo(0, 0);
   // this.withdrawRecord()
  this.beforedate = new Date();
   this.beforedate.setDate(this.beforedate.getDate() - 1)
   this.maxDate.setDate(this.maxDate.getDate() + 1)
   this.beforedate= moment(this.beforedate).format("YYYY-MM-DD")

  }
    private goPage(url: string) {
      if (this.$route.path === url) {
        return;
      }
      this.$router.push({ path: url });
    }

    private bills() {
        console.log('ddd')
        const post: any = {
            start_date :this.beforedate,
            end_date : this.afterdate
        };
        bills(post).then((res) => {
        if (res.code === 200) {
            this.billList = res.data.data
        } else {
            if(res.code === 8888){
                this.goPage('/login')
            }
            Toast.fail(res.msg);
        }
        });
    }

    private onConfirmBefore(date: any) {
      this.beforedateCalender = false;
      this.beforedate = moment(new Date(date)).format("YYYY-MM-DD");
      this.minDateAfer = new Date(date) 
      this.minDateAfer.setDate(date.getDate() + 1);
    }

    private onConfirmAfter(date: any) {
      this.afterdateCalender = false;
      this.afterdate = moment(new Date(date)).format("YYYY-MM-DD");
      this.maxDateBefore=new Date(date) 
      this.maxDateBefore.setDate(date.getDate() - 1);

    }
}
</script>
<style lang="scss">
.settings{
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
  .search{
      margin-top: 15px;
      .van-grid-item__content--horizontal{
          padding: 0;
          .van-cell__title{
              text-align: center;
          }
          .van-button--normal{
              width: 100%;
            border-radius: 10px;
          }
      }
  }
  .settings {
        .grid-white.van-row {
            background: #fff;
            min-height: 100%;
            margin-top: 10px;
        }
    }
    .recharge-info {
    border-bottom: 4px solid #ebedf0;
}

.recharge-info .van-cell::after {
    display: none;
}
</style>
