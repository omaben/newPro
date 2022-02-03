<template>
    <div class="settings">
        <van-nav-bar
            class="header"
            title="设置"
            left-text="返回"
            left-arrow
            @click-left="goPage('/user')"
            />
        <van-cell-group>
            <van-cell title="账号与安全" is-link @click="goPage('/account')">
                <template #icon>
                    <van-icon name="lock" />
                </template>
            </van-cell>
            <van-cell title="关于我们" is-link @click="goPage('/about')">
                <template #icon>
                    <van-icon name="info" />
                </template>
            </van-cell>
            <van-cell title="建议反馈" is-link @click="goPage('/comment')">
                <template #icon>
                    <van-icon name="comment" />
                </template>
            </van-cell>
            <van-cell title="版本号" value="V1.0.0">
                <template #icon>
                    <van-icon name="setting" />
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group class="logout"  @click="logout()">
            <van-cell title="退出" is-link>
                <template #icon>
                    <van-icon name="lock" />
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script lang="ts">
import {
  logout,
} from "@/services";
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class Setting extends Vue {
  public mounted() {
    window.scrollTo(0, 0);
  }

  public logout() {
    const post: any = null;
    this.$dialog.alert({
        title:'提示',
        message: '确定要退出登录吗？',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        showConfirmButton: true,
        showCancelButton: true
    }).then(() => {
        logout(post).then((res) => {
            if (res.code === 200) {
                localStorage.setItem("token", "");
                this.goPage("/login");
            } else {
                Toast.fail(res.msg);
                this.goPage("/login");
            }
        });
    })
    .catch(() => {
    });   
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
