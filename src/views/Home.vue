<template>
  <div class="home">
    <van-nav-bar
      title="创新科技 "
      class="header"
    />
    <van-swipe>
      <van-swipe-item v-for="(image, index) in images" :autoplay="3000" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <!--van-cell icon="volume" title="" is-link value="更多"  class="left-red" /-->
      <van-cell title="热门商家" is-link  value="全部" class="right-red" @click="goPage('/businessList')" />
    </van-cell-group>
    <van-grid :column-num="3">
      <van-grid-item v-for="(item,index) in homeInfo" :key="index" class="home-info" @click="goPage('/makeOrder/'+item.id)">
        <van-image
          width="55"
          height="55"
          :src="domain+item.image"
        />
        <h5>{{item.title}}</h5>
        <p>全天共{{item.issue_number}}单</p>
      </van-grid-item>
    </van-grid>
    <Footer active='home' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Footer from "@/components/common/Footer.vue"; // @ is an alias to /src
import {
  configs,
  getCarousels,
  rooms

} from "@/services";
import { Lazyload } from "vant";
Vue.use(Lazyload);

@Component({
  components: {
    Footer,
  },
})
export default class Home extends Vue {

  private fixed?: boolean = true;
  private images?: any = [];
  private domain?: any = '';

  private homeInfo?: any = [];
  public mounted() {
     this.configs();
    window.scrollTo(0, 0);
     this.getRooms();
    //this.getCarousels();
   
   
  }

  private goPage(url: string) {
    if (this.$route.path === url) {
      return;
    }
    this.$router.push({ path: url });
  }

  private getCarousels() {
    const post: any = null;
    getCarousels(post).then((res) => {
      let data = res.data
      if(data)
      data.forEach((item: any) => {
        let url = this.domain + item.image
        this.images.push(url)
      })
    });
  }

  private getRooms() {
     const post: any = null;
      rooms(post).then((res) => {
        this.homeInfo = res.data.data
      });
  }

  private configs() {
    const post: any = null;
    configs(post).then((res) => {
      if(res.code === 200){
        this.domain = res.data.domain
        this.getCarousels()
      }
    });
  }
}
</script>
<style lang="scss">
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
  .home-info{
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
</style>
