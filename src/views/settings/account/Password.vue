<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="修改登录密码"
            left-text="返回"
            left-arrow
            @click-left="goPage('/account')"
        >
        </van-nav-bar>
        <van-form  class="card-bank">
            <van-field
                v-model="oldPassword"
                name="oldPassword"
                type="password"
                placeholder="请输入旧密码"
                label=""
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="newPassword"
                name="oldPassword"
                type="password"
                placeholder="请输入新密码"
                label=""
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="confirmPassword"
                name="oldPassword"
                type="password"
                placeholder="确认新密码"
                label=""
                :rules="[{ required: true, message: '' }]"
            />
        </van-form>
        <p class="info-input"> <van-icon name="info" /> 新密码需由6-16个字母或数字组成</p>
            <div style="margin: 16px;">
                <van-button @click="updatePassword" round block type="info" native-type="submit">
                 提交
                </van-button>
            </div>
    </div>
</template>
<script lang="ts">
import {
  updatePassword,
} from "@/services";
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})

export default class Password extends Vue {

    private oldPassword?: string = "";
    private newPassword?: string = "";
    private confirmPassword?: string = "";
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

    private updatePassword() {
      const post: any = {
        new_password: this.newPassword,
        password: this.oldPassword,
      };
      updatePassword(post).then((res) => {
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
