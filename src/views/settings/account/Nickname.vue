<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="修改昵称"
            left-text="返回"
            left-arrow
            @click-left="goPage('/account')"
        >
        </van-nav-bar>
        <van-form @submit="onSubmit" class="card-bank">
            <van-field
                v-model="userInfoDetails.username"
                name="Username"
                label="账号:"
                disabled
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="usernameNew"
                name="Username"
                placeholder="请输入新的昵称"
                label="昵称:"
                :rules="[{ required: true, message: '' }]"
            />
        </van-form>
        <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click='updateUserInfoFun'>
                  提交
                </van-button>
            </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Toast } from "vant";
import {
  userInfo,
  updateUserInfo
} from "@/services";
@Component({
  components: {
  },
})
export default class Nickname extends Vue {

    private username?: string = '';
    private usernameNew?: string = "";
    private userInfoDetails?: string = "";
    private code?: string = "";
    public mounted() {
      window.scrollTo(0, 0);
      this.getUserInfo();
    }
    private getUserInfo() {
      const post: any = null;
      userInfo(post).then((res) => {
        if (res.code === 200) {
          this.userInfoDetails = res.data
        } else {
          if(res.code === 8888){
                this.goPage('/login')
            }
          Toast.fail(res.msg);
        }
      });
    }
     private updateUserInfoFun() {
      const post: any = {
         nickname: this.usernameNew

      };
      updateUserInfo(post).then((res) => {
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
    private goPage(url: string) {
      if (this.$route.path === url) {
        return;
      }
      this.$router.push({ path: url });
    }

    private onSubmit() {
      console.log("submit");
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
