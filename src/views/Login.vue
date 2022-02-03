<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="登录"
            left-text="返回"
            left-arrow
            @click-left="goPage('/')"
            />

        <van-image
            width="100"
            height="100"
            class="logo-login"
            :src="require('@/assets/logo.png')"
            />
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="Username"
                label="账号"
                placeholder="请输入账号"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="Password"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '' }]"
            />
            <!-- <van-field
                v-model="code"
                name="code"
                label="验证码"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '' }]"
            /> -->
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                 登录
                </van-button>
            </div>
            <p class="register-button" @click="goPage('/register')">注册新账户</p>
        </van-form>
    </div>
</template>
<script lang="ts">
import {
  login,
  userInfo
} from "@/services";
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class Login extends Vue {

    private username?: string = "";
    private password?: string = "";
    private userInfoDetails?: any = null;
    
    private code?: string = "";
  public mounted() {
    window.scrollTo(0, 0);
  }
    private goPage(url: string) {
      if (this.$route.path === url) {
        return;
      }
      this.$router.push({ path: url });
    }

    /* private getCaptcha() {
      const post: any = null;
      getCaptcha(post).then((res) => {
        console.log(res);
      });
    } */
    private getUserInfo() {
      const post: any = null;
      userInfo(post).then((res) => {
        if (res.code === 200) {
          this.userInfoDetails = res.data
          if(this.userInfoDetails.password == this.userInfoDetails.trade_password){
              this.$dialog.alert({
                  title:'登录成功',
                  message: '您的提现密码与登录密码相同，为保证资金安全，请修改提现密码。',
                  cancelButtonText: '下次吧',
                  confirmButtonText: '去修改',
                  confirmButtonColor: 'green',
                  showConfirmButton: true,
                  showCancelButton: true
                }).then(() => {
                  this.goPage('/txtPassword')
                })
                .catch(() => {
                  // on cancel
                });
          }

        } else {
          Toast.fail(res.msg);
        }
      });
    }
    private onSubmit() {
      const post: any = {
        username: this.username,
        password: this.password,
        invite_code: this.code,
        captcha: "",
      };
      login(post).then((res) => {
        if (res.code === 200) {
          localStorage.setItem("token", res.data.token)
          this.goPage('/')
          Toast.success(res.msg);
          let that = this
          setTimeout(function(){
           that.getUserInfo()

          },200)
          //Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    }
}
</script>
<style lang="scss">
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
  p.register-button {
    text-align: right;
    padding-right: 20px;
    color: #e64340;
    cursor: pointer;
    font-weight: 500;
}
</style>
