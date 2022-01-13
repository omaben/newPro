<template>
  <div class="home">
    <van-nav-bar
      title="创新科技 "
      class="header"
      :fixed ='fixed'
    />
    <van-swipe>
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell icon="volume" title="" is-link value="更多"  class="left-red" />
      <van-cell title="热门商家" is-link  value="全部" class="right-red" />
    </van-cell-group>
    <van-grid :column-num="3">
      <van-grid-item v-for="(item,index) in homeInfo" :key="index" class="home-info">
        <van-image
          width="55"
          height="55"
          :src="item.img"
        />
        <h5>{{item.title}}</h5>
        <p>{{item.desc}}</p>
      </van-grid-item>
    </van-grid>
    <Footer active='home' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Footer from '@/components/common/Footer.vue' // @ is an alias to /src
import { Lazyload } from 'vant'

Vue.use(Lazyload)

@Component({
  components: {
    Footer
  }
})
export default class Home extends Vue {
  private fixed?: boolean = true
  private images?: any = [
    require('@/assets/slider1.jpeg'),
    require('@/assets/slider2.jpeg'),
    require('@/assets/slider3.jpeg'),
    require('@/assets/slider4.jpeg')
  ]

  private homeInfo?: any = [
    {
      img: require('@/assets/pic1.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic2.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic3.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic4.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic5.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic6.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic7.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic8.png'),
      title: '唯品会',
      desc: '全天共288单'
    },
    {
      img: require('@/assets/pic9.png'),
      title: '唯品会',
      desc: '全天共288单'
    }
  ]
}
</script>
<style lang="scss">
body{
      background: #f5f5f5;
}
.home{
  padding-top: 50px;
}
  .van-nav-bar.header{
    padding: 3px 0;
    background-color: #e01509;
    .van-nav-bar__title{
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #fff;
    }
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
