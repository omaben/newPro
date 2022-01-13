<template>
    <van-tabbar  route class="footer">
        <van-tabbar-item replace to="/" :class="{'active':active === 'home'}" icon>
            <template #icon>
                <van-icon name="wap-home" />
            </template>
            首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/" :class="{'active':active === 1}" icon>
            <template #icon>
                <van-icon name="bars" />
            </template>
            订单
        </van-tabbar-item>
        <van-tabbar-item replace to="/" :class="{'active':active === 2}" icon>
            <template #icon>
                <van-icon name="cart" />
            </template>
            商家列表
        </van-tabbar-item>
        <van-tabbar-item replace to="/" :class="{'active':active === 3}" icon>
            <template #icon>
               <van-icon name="point-gift" />
            </template>
            活动
        </van-tabbar-item>
        <van-tabbar-item replace to="/login" :class="{'active':active === 4}" icon>
            <template #icon>
                <van-icon name="manager" />
            </template>
            登录
        </van-tabbar-item>
    </van-tabbar>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
@Component({})
export default class Footer extends Vue {
   @Prop() private active!: string;
}
</script>
<style lang="scss">
.footer.van-tabbar {
    background: #22292c;
    .van-tabbar-item {
        color: #999;
         &.active  {
            color: #e01509;
        }
        .van-tabbar-item__text{
            font-size: 10px;
        }
    }
}
</style>
