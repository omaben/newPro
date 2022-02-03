<template>
  <div class="user">
    <van-cell class="user-top">
        <template #icon>
            <van-image
                round
                width="50"
                height="50"
                :src="require('@/assets/head_50.jpeg')"
                />
        </template>
        <template #title>
            <p>{{userInfoDetails.username}}</p>
            <p>昵称: {{userInfoDetails.nickname}}</p>
        </template>
        <template #right-icon>
            <van-image
                round
                width="24"
                height="24"
                @click="goPage('/setting')"
                :src="require('@/assets/i_set.png')"
                />
        </template>
    </van-cell>
    <van-row class="kingkongBox">
        <van-grid direction="horizontal" :column-num="2" class="blance">
            <van-grid-item>
                <van-cell title="余额" :label="userInfoDetails.balance" is-link>
                    <template #right-icon>
                        <van-tag type="danger" @click='getUserInfo()'>一键回收</van-tag>
                       <!--  <van-icon name="arrow" /> -->
                    </template>
                </van-cell>
            </van-grid-item>
            <van-grid-item>
                <van-cell title="当前等级"   label="0 / 571" >
                    <template #right-icon>
                        <van-tag type="danger">VIP1</van-tag>
                    </template>
                </van-cell>
            </van-grid-item>
        </van-grid>
        <van-grid direction="horizontal" :column-num="2" class="headtab">
            <van-grid-item  text="购单" @click="goPage('/recharge')">
                <template #icon>
                    <van-image
                        round
                        width="24"
                        height="24"
                        :src="require('@/assets/cz.png')"
                        />
                </template>
            </van-grid-item>
            <van-grid-item text="回款" @click="goPage('/withdraw')">
                <template #icon>
                    <van-image
                        round
                        width="24"
                        height="24"
                        :src="require('@/assets/tx.png')"
                        
                        />
                </template>
            </van-grid-item>
        </van-grid>
    </van-row>
    <van-row class="user-details">
        <h2 class="title">资金记录</h2>
        <van-grid>
            <van-grid-item text="购单记录" @click="goPage('/acctDetail')">
                <template #icon>
                    <van-image
                        round
                        width="24"
                        height="24"
                        :src="require('@/assets/czjl.png')"
                        />
                </template>
            </van-grid-item>
            <van-grid-item text="回款记录" @click="goPage('/withdrawList')">
                <template #icon>
                    <van-image
                        round
                        width="24"
                        height="24"
                        :src="require('@/assets/txjl.png')"
                        />
                </template>
            </van-grid-item>
            <van-grid-item text="购单列表" @click="goPage('/orderList')">
                <template #icon>
                    <van-image
                        round
                        width="24"
                        height="24"
                        :src="require('@/assets/tzjl.png')"
                        />
                </template>
            </van-grid-item>
            <van-grid-item text="下单记录" @click="goPage('/worderlist')">
                <template #icon>
                    <van-image
                        round
                        width="24"
                        height="24"
                        :src="require('@/assets/tzjl.png')"
                        />
                </template>
            </van-grid-item>
        </van-grid>
    </van-row>
    <Footer active='user' />
  </div>
</template>

<script lang="ts">
import Footer from "@/components/common/Footer.vue"; // @ is an alias to /src
import {
  userInfo,
} from "@/services";
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Footer,
  },
})
export default class User extends Vue {

  private fixed?: boolean = true;
  private userInfoDetails?: any[] = [];
  public mounted() {
    window.scrollTo(0, 0);
    this.getUserInfo();
  }
  private goPage(url: string) {
    if (this.$route.path === url) {
      return;
    }
    this.$router.push({ path: url });
  }

  private getUserInfo() {
    const post: any = null;
    userInfo(post).then((res) => {
      if (res.code === 200) {
        this.userInfoDetails = res.data
         Toast.success(res.msg);
      } else {

        this.goPage('/login')
        Toast.fail(res.msg);
      }
    });
  }
}
</script>
<style lang="scss">
   .van-cell.user-top{
        background: linear-gradient(180deg,#dc3b40 2%,#dc3b40 50%,#db3b40 51%,#d7363b)!important;
        padding: 10px 10px 100px;
        padding-top: 15px;
        color: #fff;
        p{
            margin: 0;
            padding-left: 10px;
            font-size: 16px;
            font-weight: 600;
            text-align: left;
        }
    }
    .kingkongBox.van-row {
        width: calc(100% - 20px);
        position: relative;
        border-radius: 10px;
        margin: 0 auto;
         margin-top: -70px;
        background: #fff;
        padding: 15px 10px 0;
        box-sizing: border-box;
        box-shadow: 0 4px 4px #bbb;
        padding-bottom: 10px;
        .blance.van-grid{
            .van-grid-item__content--horizontal{
                padding-top: 0;
                padding-bottom: 0;
            }
            &:after{
                display: none;
            }
            .van-cell{
                text-align: left;
                padding: 0;
                background:#fff !important;
            }
            .van-cell__label{
                color: red;
            }
            span.van-tag.van-tag--danger{
                height: 24px;
            }
        }
        .headtab.van-grid{
            .van-grid-item__text{
                color: #000;
                font-weight: 700;
            }
            .van-grid-item__content--horizontal{
                padding: 0;
                padding-top: 10px;
                 &:after{
                    display: none;
                }
                .van-grid-item__icon-wrapper{
                    margin-right: 3px;
                    margin-top: 4px;
                }
            }
            &:after{
                display: none;
            }
        }
    }
    .user-details.van-row {
            background: #fff;
            border-radius: 10px;
            -webkit-box-shadow: #bbb 0 4px 4px;
            box-shadow: 0 4px 4px #bbb;
            margin: 0 6px;
            padding-bottom: 10px;
            margin-top: 15px;
            h2.title{
                text-align: left;
                margin: 0;
                padding: 8px;
                font-weight: 700;
                font-size: 14px;
                border-bottom: 1px solid #eee;
            }
            .van-grid{
                &:after{
                    display: none;
                }
                .van-grid-item__content{
                   &:after{
                        display: none;
                    }
                }
            }
        }
</style>
