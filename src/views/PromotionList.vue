<template>
  <div class="home">
    <van-nav-bar
      title="活动"
      class="header"
    />
    <van-grid :column-num="1">
      <van-grid-item v-for="(item,index) in homeInfo" :key="index" class="business-list">
          <van-image
            :src="item.img"
            />
      </van-grid-item>
    </van-grid>
    <Footer active='promotionList' />
  </div>
</template>

<script lang="ts">
import Footer from "@/components/common/Footer.vue"; // @ is an alias to /src
import { Lazyload } from "vant";
import { Component, Vue } from "vue-property-decorator";

Vue.use(Lazyload);

@Component({
  components: {
    Footer,
  },
})
export default class PromotionList extends Vue {

  private fixed?: boolean = true;
  private homeInfo?: any = [
    {
      img: require("@/assets/promo1.png"),
    },
    {
      img: require("@/assets/promo1.png"),
    },
  ];
  public mounted() {
    window.scrollTo(0, 0);
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
