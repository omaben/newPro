<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="注册会员"
            left-text="返回"
            left-arrow
            @click-left="goPage('/')"
        >
        <template #right>
            <van-icon name="wap-home" />
        </template>
        </van-nav-bar>

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
                label="会员账号"
                placeholder="5～12位数字和字母"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="Password"
                label="密码"
                placeholder="真实姓名，需与回款卡姓名相同"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="username"
                name="Username"
                label="真实姓名"
                placeholder="真实姓名，需与回款卡姓名相同"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="Password"
                label="资金密码"
                placeholder="请输入6位纯数字组成的资金密码"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="code"
                name="code"
                label="验证码"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                  注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class Register extends Vue {
    private username?: string = ''
    private password?: string = ''
    private code?: string = ''
    private goPage (url: string) {
      if (this.$route.path === url) {
        return
      }
      this.$router.push({ path: url })
    }

    private onSubmit () {
      console.log('submit')
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
    .van-nav-bar__title{
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #fff;
    }
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
