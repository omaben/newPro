<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="提现密码"
            left-text="返回"
            left-arrow
            @click-left="goPage('/account')"
        >
        </van-nav-bar>
        <van-form class="card-bank">
            <van-field
                v-model="trade_password"
                name="oldPassword"
                type="password"
                placeholder="请输入旧资金密码"
                label=""
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="new_trade_password"
                name="oldPassword"
                type="password"
                placeholder="请输入6位纯数字组成的新资金密码"
                label=""
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="confirmPassword"
                name="oldPassword"
                type="password"
                placeholder="请确认新资金密码"
                label=""
                :rules="[{ required: true, message: '' }]"
            />
        </van-form>
        <p class="info-input"> <van-icon name="info" />新资金密码需由6位纯数字组成</p>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="updateTradePassword()">
                  提交
                </van-button>
            </div>
    </div>
</template>
<script lang="ts">
import {
  updateTradePassword,
} from "@/services";
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class TxtPassword extends Vue {

    private trade_password?: string = "";
    private confirmPassword?: string = "";
    private new_trade_password?: string = "";
  public mounted() {
    window.scrollTo(0, 0);
  }
    private goPage(url: string) {
      if (this.$route.path === url) {
        return;
      }
      this.$router.push({ path: url });
    }

    private updateTradePassword() {
      const post: any = {
        trade_password: this.trade_password,
        new_trade_password: this.new_trade_password,
      };
      console.log(post)
      updateTradePassword(post).then((res) => {
        if (res.code === 200) {
          Toast.success(res.msg);
          this.goPage('/account');

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
</style>
