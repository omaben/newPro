<template>
    <div class="settings">
        <van-nav-bar
            class="header"
            title=" 关于我们 "
            left-text="返回"
            left-arrow
            @click-left="goPage('/setting')"
            />
            <van-image
            width="150"
            height="150"
            class="logo-login"
            :src="require('@/assets/qr.png')"
            />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class About extends Vue {
  public mounted() {
    window.scrollTo(0, 0);
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
</style>
