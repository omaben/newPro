<template>
    <div class="login">
        <van-nav-bar
            class="header"
            title="新增银行卡"
            left-text="返回"
            left-arrow
            @click-left="goBack()"
        >
        </van-nav-bar>
        <van-form  class="card-bank">
            <van-field
                v-model="username"
                name="Username"
                placeholder="请确保真实有效,否则影响提现"
                label="开户姓名"
                :rules="[{ required: true, message: '' }]"
            />
            <van-cell class="select-card" is-link title="银行名称" :value="cardName" @click="show = true" />
            <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
            <van-cell class="select-card" is-link title="省份" :value="province" @click="showProvince = true" />
            <van-action-sheet v-model="showProvince" :actions="privinces" @select="onSelectProvince" />
             <van-cell class="select-card"  is-link title="城市" :value="city" @click="showCity = true" />
            <van-action-sheet v-model="showCity" :actions="cities" @select="onSelectCity" />
            <van-field
                v-model="branchName"
                name="Username"
                placeholder="请输入银行卡开户地址"
                label="开户行网点"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="cardNumber"
                name="Username"
                placeholder="输入银行卡号"
                label="银行卡号"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="tradePassword"
                name="Username"
                placeholder="输入资金密码"
                label="资金密码"
                :rules="[{ required: true, message: '' }]"
            />
        </van-form>
        <p class="info-input"> <van-icon name="info" /> 设为默认绑定银行卡</p>
        <p class="info-input">提示:请正确选定银行卡，结算时将直接转入此银行卡，为了您的资金安全，绑定后不可随意更改，如需修改，请联系客服人员</p>
        <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click='addNewCard()'>
                  提交
                </van-button>
            </div>
    </div>
</template>
<script lang="ts">
import {
  addCard,
} from "@/services";
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
import { area } from '@/services/area.ts';
import {privincesValue} from '@/services/province.ts';
import  {citiesValue}  from '@/services/city.ts';
@Component({
  components: {
  },
})
export default class Info extends Vue {

    private privinces?: any = privincesValue;
    private allCities?: any = citiesValue;
    private username?: string = "";
    private branchName?: string = "";
    private cardName?: any = "";
    private cardNumber?: string = "";
    private tradePassword?: string = "";
    private city?: string = "";
    private province?: string = "";
    private showCity?: any = false;
    private showProvince?:any = false;
    private show?: any = false;
    private cities?: any = [];

    private actions: any = [
      { name: "中国工商银行" },
      { name: "中国银行" },
      { name: "中国农业银行" },
      { name: "中国招商银行" },
      { name: "中国建设银行" },
      { name: "中国农业银行" },
      { name: "中国农业银行" },
      { name: "中国工商银行" },
      { name: "中国银行" },
      { name: "中国农业银行" },
      { name: "中国工商银行" },
      { name: "中国银行" },
      { name: "中国农业银行" },
    ];
  private getCities(){
    let id = this.privinces.find((qry:any) => qry.name === this.province).id
    this.cities = this.allCities[id]
  }
  private goBack() {
      history.back();
    }
  public mounted() {
    window.scrollTo(0, 0);
  }
  private addNewCard() {
      console.log("submit");
      const post: any = {
        start_bank: this.cardName,
        branch_name: this.branchName,
        card_name:this.username,
        card_number:this.cardNumber,
        trade_password: this.tradePassword,
        province: this.province,
        city: this.city
      };
      console.log(post)
      addCard(post).then((res) => {
        if (res.code === 200) {
          Toast.success(res.msg);
          this.goPage('/bankCard');
        } else {
          if(res.code === 8888){
                this.goPage('/login')
            }
          Toast.fail(res.msg);
        }
      });
    }
    private onSelect(item: any) {
      this.show = false;
      this.cardName = item.name;
    }
    onSelectProvince(item: any){
      this.showProvince = false;
      this.province = item.name;
      this.getCities()
    }
    onSelectCity(item: any){
      this.showCity = false;
      this.city = item.name;
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
  .select-card{
      text-align: left;
  }
</style>
