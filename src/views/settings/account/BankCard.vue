<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="我的银行卡"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        >
        </van-nav-bar>
        <van-form class="card-bank" v-if='cardinfo.length>0'>
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell clickable  v-for="(item,index) in cardinfo" :key="index">
                        <template #title>
                            <p class="title">{{item.start_bank}}</p>
                            <p>{{item.card_number}}</p>
                            <p>持卡人：{{item.card_name}}</p>
                        </template>
                        <template #right-icon>
                            <van-radio :name="item.id" @click="setDefaultCard(item.id)" />
                            <van-icon name="delete-o" @click='deleteCard(item.id)'class="delete-cards" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-form>
        <p class="info-input"> <van-icon name="info" /> 标记的为默认银行卡，点击银行卡可修改为默认银行卡！</p>
        <div style="margin: 16px;">
                <van-button round block type="info" @click="goPage('/newCard')">
                   新增银行卡
                </van-button>
            </div>
    </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import {
  cards,
  delCard
} from "@/services";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class BankCard extends Vue {

    private oldPassword?: string = "";
    private newPassword?: string = "";
    private cardinfo?: any = [];
    private radio?: any = 0;
    private confirmPassword?: string = "";
    private code?: string = "";
    
  public mounted() {
    window.scrollTo(0, 0);
    this.getCards()
  }
    private goPage(url: string) {
      if (this.$route.path === url) {
        return;
      }
      this.$router.push({ path: url });
    }
    setDefaultCard(id : any){
        this.radio = id
        localStorage.setItem('defaultCard',id)
    }
    deleteCard(id : any){
        const post: any = {
            card_id: id
        };
        delCard(post).then((res) => {
            if(res.code === 200){
                Toast.success(res.msg);
                this.getCards()
            }else{
                if(res.code === 8888){
                    this.goPage('/login')
                }
                Toast.fail(res.msg);
            }
        });
    }
    private getCards() {
        const post: any = null;
        cards(post).then((res) => {
            this.cardinfo = res.data.data
            if(this.cardinfo && this.cardinfo.length>0){
                let defaultCard = localStorage.getItem('defaultCard')
                let findCard = this.cardinfo.find((qry:any)=>qry.id == defaultCard)
                if(!defaultCard || defaultCard=== '' || !findCard){
                    localStorage.setItem('defaultCard',this.cardinfo[0].id)
                }
                this.radio =parseInt(localStorage.getItem('defaultCard') || '0')
            }else{
                localStorage.setItem('defaultCard','')
            }
        })
    }
    private goBack() {
      history.back();
    }
}
</script>
<style lang="scss">
.card-bank{
    background-color: #fff;
}
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
  form.card-bank.van-form p {
    text-align: left;
    margin: 0;
}

form.card-bank.van-form p.title {
    font-weight: 500;
    color: #000;
}
.delete-cards{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    color: red;
    font-size: 22px;
    margin-left: 7px;
}
</style>
