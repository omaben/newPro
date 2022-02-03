<template>
    <div class="settings">
        <van-nav-bar
            class="header"
            title="个人信息"
            left-text="返回"
            left-arrow
            @click-left="goPage('/setting')"
            />
        <van-cell-group>
            <van-cell title="修改昵称" is-link @click="goPage('/nickname')">
                <template #icon>
                    <van-icon name="edit" />
                </template>
            </van-cell>
            <van-cell title="修改联系方式" is-link @click="goPage('/info')">
                <template #icon>
                   <van-icon name="records" />
                </template>
            </van-cell>
            <van-cell title="登录密码" is-link @click="goPage('/password')">
                <template #icon>
                    <van-icon name="lock" />
                </template>
            </van-cell>
            <van-cell title="资金密码" is-link @click="goPage('txtPassword')">
                <template #icon>
                    <van-icon name="lock" />
                </template>
            </van-cell>
             <van-cell title="我的银行卡" is-link @click="goPage('bankCard')">
                <template #icon>
                    <van-icon name="credit-pay" />
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class Setting extends Vue {
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
