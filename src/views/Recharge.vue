<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="购单"
            left-text="返回"
            left-arrow
            @click-left="goBack()"
        >
        <template #right>
           <span style="color: #fff;" @click='goPage("/acctDetail")'>  账户明细 </span>
        </template>
        </van-nav-bar>
        <p class='recharge-desc'>请联系订单员索取购単方式 </p>
    </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class Register extends Vue {
    private goBack() {
      history.back();
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

</style>
