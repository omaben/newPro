<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="回款申请"
            left-text="返回"
            left-arrow
            @click-left="goBack()"
        >
        </van-nav-bar>
        <van-form class="card-bank">
                <van-cell-group v-if="cardinfo">
                    <van-cell>
                        <template #left-icon>
                            <van-icon name="checked" class="delete-cards" />
                        </template>
                        <template #title>
                            <p class="title">{{cardinfo.start_bank}}</p>
                            <p>{{numberOfCard}}</p>
                            <p>持卡人：{{nameOfCard}}</p>
                        </template>
                        <template #right-icon>
                            <div class="right-withdraw">
                             <p class="info-edit-card"></p>
                                <van-button round block type="info" @click="goPage('/bankCard')">
                                    更改银行卡
                                </van-button>
                            </div>
                            
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-cell-group v-else>
                    <van-cell>
                        <template #title>
                            您暂未绑定任何银行卡，请前往绑定！
                        </template>
                        <template #right-icon>
                            <div class="right-withdraw">
                                <van-button round block type="info" @click="goPage('/newCard')">
                                    绑定银行卡
                                </van-button>
                            </div>
                            
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-form>
             <van-form class="card-bank" style="margin-top:5px">
                <van-cell-group class='withdraw-group' >
                    <van-cell>
                        <template #title>
                            <van-field
                                v-model="userInfoDetails.balance"
                                label="可回款金额"
                                type="text"
                                class="disable-balance"
                                readonly
                                :rules="[{ required: true, message: '' }]"
                            />
                        </template>
                        <template #right-icon>
                            <div class="right-withdraw" @click='withdrawMoney = userInfoDetails.balance'>
                                <p class="info-edit-card" style='color:red;padding-top: 10px;'>全提</p>
                            </div>
                        </template>
                    </van-cell>
                    <van-cell>
                        <template #title>
                            <van-field
                                v-model="withdrawMoney"
                                label="回款金额"
                                type="number"
                               :placeholder="'单笔最低'+minWithdrawMoney+'金币最高999999金币'"
                                :rules="[{ required: true, message: '单笔最低'+minWithdrawMoney+'金币最高999999金币'}]"
                               
                            />
                        </template>
                        <template #right-icon>
                            <div class="right-withdraw" v-if="withdrawMoney>0">
                                <p class="info-edit-card" :class="{'redColor':withdrawMoney<minWithdrawMoney}" style='color:green;padding-top: 10px;'>({{withdrawMoney}}CNY)</p>
                            </div>
                        </template>
                    </van-cell>
                    <van-cell>
                        <template #title>
                            <van-field
                                v-model="password"
                                label="资金密码"
                                type="password"
                                placeholder="默认资金密码为注册时的登陆密码"
                                :rules="[{ required: true, message: '' }]"
                            />
                        </template>
                    </van-cell>
                 </van-cell-group >
                  <van-field
                                v-model="withdrawMoney"
                                label="可回款金额"
                                type="text"
                                class="disable-balance"
                                readonly
                                :rules="[{ required: true, message: '' }]"
                            />
        </van-form>
        <div style="margin: 16px;">
                <van-button round block type="info" @click="withdraw()">
                    确认回款
                </van-button>
            </div>
    </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import {
  cards,
  userInfo,
  configs,
  withdraw
} from "@/services";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class BankCard extends Vue {

    private password?: string = "";
    private cardinfo?: any = [];
    private userInfoDetails?: any = [];
    private withdrawMoney?: any =  0;
    private minWithdrawMoney?: any =  0;
    private numberOfCard?:any = ''
    private nameOfCard?:any = ''

    
  public mounted() {
    window.scrollTo(0, 0);
    this.getDefaultCards()
    this.getUserInfo()
    this.configs()
  }
  private configs() {
    const post: any = null;
    configs(post).then((res) => {
        if(res.code === 200){
            this.minWithdrawMoney = parseFloat(res.data.min_withdraw)
        }
    });
  }
  private withdraw() {
    const post: any = {
        card_id: this.cardinfo.id,
        branch_name: this.cardinfo.branch_name,
        card_number : this.cardinfo.card_number,
        name: this.cardinfo.card_name,
        money: this.withdrawMoney,
        trade_password: this.password,
    };
    withdraw(post).then((res) => {
        if(res.code === 200){
            Toast.success(res.msg);
        }else{
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
    
    private getDefaultCards() {
        const post: any = null;
        cards(post).then((res) => {
            let cards = res.data.data
            if(cards){
             let defaultId = localStorage.getItem('defaultCard');
             if(!defaultId){
                 defaultId = cards[0].id
                 localStorage.setItem('defaultCard',cards[0].id)
             }
             this.cardinfo = cards.find((qry : any) => qry.id == defaultId);
             let cardNumber = this.cardinfo.card_number.split("");
             let nameCard = this.cardinfo.card_name.split("");
             if(cardNumber.length>2){
                 cardNumber.forEach((item:any,index:any) => {
                    if(index === 0 || index === cardNumber.length - 1){
                        this.numberOfCard+= item
                    }
                    else{
                        this.numberOfCard+='*'
                    }

                })
             }else{
                 this.numberOfCard = cardNumber + '*'
             }
            if(nameCard.length>2){
                nameCard.forEach((item:any,index:any) => {
                    if(index === 0 || index === nameCard.length - 1){
                        this.nameOfCard+= item
                    }
                    else{
                        this.nameOfCard+='*'
                    }

                })
            }else{
                 this.numberOfCard = nameCard + '*'
            }
                
            }
        });
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
.right-withdraw p {
    text-align: right !important;
}
.withdraw-group .van-cell::after{
    display: none !important;
}
.redColor{
    color:red !important
}
</style>
