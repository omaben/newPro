<template>
    <div class="settings">
        <van-nav-bar
            class="header"
            title=" 信息中心 "
            left-text="返回"
            left-arrow
            @click-left="goPage('/setting')"
            />
        <van-tabs v-model="active">
            <van-tab v-for="(item,index) in values" :key="index" :title="item.name">
                <div v-if="index === 0" class='feed-back'>
                    <h3>未读信封 <span>0/0</span> 消息最多保存7天</h3>
                </div>
                 <div v-if="index === 1" class='feed-back'>
                   <van-field
                        style="margin-top:10px"
                        v-model="message"
                        rows="4"
                        autosize
                        label=""
                        type="textarea"
                        maxlength="150"
                        placeholder="请输入您的问题，我们会第一时间回复，谢谢"
                        show-word-limit
                        />
                </div>
                <div v-if="index === 3" class='feed-back'>
                    <h3>未读消息 <span>0/0</span></h3>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class Comment extends Vue {

    private active?: any = 0;
    private values?: any = [
      {
        name: "收件箱 ",
      },
      {
        name: "问题反馈  ",
      },
      {
        name: "系统公告  ",
      },
      {
        name: "我的消息  ",
      },

    ];

    private message?: any = "";
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
  .van-tab.van-tab--active {
    color: #e11509;
}
.van-tabs__line {
    display: none;
}
.feed-back{
    h3{
        padding: 10px;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        span{
            margin-left: 10px;
            margin-right: 10px;
            color: #facc25;
        }
    }
}
</style>
