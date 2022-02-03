<template>
    <van-tabbar  route class="footer">
        <van-tabbar-item replace to="/" :class="{'active':active === 'home'}" icon>
            <template #icon>
                <van-icon name="wap-home" />
            </template>
            首页
        </van-tabbar-item>
        <van-tabbar-item replace :to="token?'/orderList':'/login'" :class="{'active':active === 'orderList'}" icon>
            <template #icon>
                <van-icon name="bars" />
            </template>
            订单
        </van-tabbar-item>
        <van-tabbar-item replace to="/businessList" :class="{'active':active === 'businessList'}" icon>
            <template #icon>
                <van-icon name="cart" />
            </template>
            商家列表
        </van-tabbar-item>
        <van-tabbar-item replace to="/promotionList" :class="{'active':active === 'promotionList'}" icon>
            <template #icon>
               <van-icon name="point-gift" />
            </template>
            活动
        </van-tabbar-item>
        <van-tabbar-item replace to="/user" :class="{'active':active === 'user'}" icon v-if="token">
            <template #icon>
                <van-icon name="manager" />
            </template>
            用户
        </van-tabbar-item>
        <van-tabbar-item replace to="/login" :class="{'active':active === 'user'}" icon v-else>
            <template #icon>
                <van-icon name="manager" />
            </template>
            登陆
        </van-tabbar-item>
    </van-tabbar>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Footer extends Vue {
   @Prop() private active!: string;
   private token: string = localStorage.getItem("token") || '';
}
</script>
<style lang="scss">
.footer.van-tabbar {
    background: #22292c;
    .van-tabbar-item {
        color: #999;
         &.active  {
            color: #e01509;
            background-color: transparent;
        }
        .van-tabbar-item__text{
            font-size: 10px;
        }
    }
}
</style>
