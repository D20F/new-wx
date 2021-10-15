<template>
  <view class="view">
    <view class="switch">
      <text> 设为默认地址 </text>
      <u-switch
        @click="form.defaults = !form.defaults"
        v-model="form.defaults"
      ></u-switch>
    </view>
    <view class="form">
      <u-form :model="form" ref="uForm">
        <u-form-item label="收货人" label-width="150">
          <u-input
            placeholder="请输入收货人姓名"
            border
            :customStyle="{ color: '#2D84ED' }"
            v-model="form.name"
          />
        </u-form-item>
        <u-form-item label="联系电话" label-width="150"
          ><u-input
            placeholder="请输入联系人电话"
            border
            :customStyle="{ color: '#2D84ED' }"
            v-model="form.mobile"
          />
        </u-form-item>
        <u-form-item label="所在地区" label-width="150"
          ><u-input
            placeholder="请输入所在地区"
            border
            :customStyle="{ color: '#2D84ED' }"
            v-model="form.area"
          />
        </u-form-item>
        <u-form-item label="详细地址" label-width="150"
          ><u-input
            placeholder="请输入详细地址"
            border
            :customStyle="{ color: '#2D84ED' }"
            v-model="form.address"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="form"> </view>
    <view class="btn" @click="submit">
      <text>确认</text>
    </view>
  </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { regular_phone } from "@/utils/regular.js";
import { setStorage } from "@/utils/storage.js";
import { addAddr } from "@/api/mall";
export default {
  name: "addAddress",
  data() {
    return {
      form: {
        name: "",
        mobile: "",
        area: "",
        address: "",
        defaults: false,
      },
    };
  },
  components: {},
  mixins: [public_mixin],
  onLoad(option) {
    // let d = {
    //   nickname: "zlzl",
    //   avatar:
    //     "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
    //   openId: "oPuSl4ulu5Nuo3fvuQpoes2Vnc5c",
    //   token: "863a27457ca3475ab222e1137fdaf3c1",
    //   userId: "3595314797150208",
    // };
    // setStorage("account", d.nickname);
    // setStorage("avatar", d.avatar);
    // setStorage("openId", d.openId);
    // setStorage("token", d.token);
    // setStorage("userId", d.userId);
    // this.$store.commit("accountFun", d.nickname);
    // this.$store.commit("avatarFun", d.avatar);
    // this.$store.commit("openIdFun", d.openId);
    // this.$store.commit("tokenFun", d.token);
    // this.$store.commit("userIdFun", d.userId);
  },
  onShow() {},
  methods: {
    submit() {
      if (!regular_phone(this.form.mobile)) {
        return uni.showToast({
          icon: "none",
          title: "请填写正确手机号",
        });
      }
      addAddr(this.form).then((res) => {
        this.$u.route({
          url: "pages/my/userInformation/myAddress/index",
          type: "redirectTo",
        });
      });
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.view {
  width: 100%;
  height: inherit;
  position: relative;
  background: #f8fbff;
  padding-top: 30upx;
}
.form {
  /deep/ .input {
    color: red !important;
    .uni-input-input {
      color: red !important;
    }
  }
}
.switch {
  width: 90%;
  height: 90upx;
  border-radius: 15upx;
  margin: 0 auto 40upx auto;
  padding: 0 15upx;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form {
  width: 90%;
  border-radius: 15upx;
  margin: 0 auto;
  padding: 0 15upx;
  background: #ffffff;
}
.btn {
  width: 90%;
  height: 90upx;
  border-radius: 15upx;
  margin: 0 auto;
  text-align: center;
  // background: #dedede;
  background: #2d84ed;
  position: fixed;
  bottom: 100upx;
  left: 5%;
  text {
    color: #ffffff;
    line-height: 90upx;
    font-size: 32upx;
  }
}
</style>
