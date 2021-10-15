<template>
  <view class="main-wrap">
    <view class="status">
      <view v-if="!isDel" @click="toDel(1)">管理</view>
      <view v-else @click="toDel(0)">完成</view>
    </view>
    <view class="content">
      <cartItem
        :dataSource="item"
        :dataIndex="index"
        @check="itemCheck"
        @countChange="countChange"
        v-for="(item, index) in cartList"
        :key="index"
      />
    </view>
    <view class="bottom-fixed">
      <view class="total">
        <view class="select" @click="allCheck">
          <view class="radio-icon">
            <view class="round" :class="{ ed: allChecked }"></view>
          </view>
          <view>全选</view>
        </view>
        <view class="price" v-if="!isDel">
          总价
          <view class="unit">¥</view>
          {{ total }}
        </view>
      </view>
      <view class="btns">
        <view
          style="width: 276rpx"
          v-if="!isDel"
          class="btn btn-red"
          @click="checkMap.size && buy()"
          >购买</view
        >
        <view
          style="width: 276rpx"
          v-else
          class="btn btn-red"
          @click="checkMap.size && del()"
          >删除</view
        >
      </view>
    </view>
  </view>
</template>
<script>
import calculate from "@/utils/mall/calculate";
import cartItem from "@/component/business/mall/cartItem";
import { setStorage } from "@/utils/storage.js";
import { myCart, delCart, editCart } from "@/api/mall";
export default {
  components: { cartItem },
  data() {
    return {
      isDel: false,
      cartList: [],
      allChecked: false,
      checkMap: new Map(),
      total: 0,
    };
  },
  onLoad() {
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
    this.getMyCart();
  },
  onHide() {
    this.editSave();
  },
  onUnload() {
    this.editSave();
  },
  methods: {
    getMyCart() {
      myCart().then((res) => {
        this.cartList = res.data || [];
      });
    },
    toDel(flag) {
      this.isDel = !!flag;
      this.total = 0;
      this.allChecked = false;
      this.checkMap.clear();
      for (let i = 0; i < this.cartList.length; i++) {
        this.$set(this.cartList[i], "checked", false);
      }
    },
    itemCheck(checked, i) {
      if (checked) {
        this.checkMap.set(i, this.cartList[i]);
        if (this.checkMap.size == this.cartList.length) this.allChecked = true;
        this.total = calculate.add(
          this.total,
          calculate.multiply(
            this.cartList[i].number,
            this.cartList[i].specification.price
          )
        );
      } else {
        this.allChecked = false;
        this.checkMap.delete(i);
        this.total = calculate.subtract(
          this.total,
          calculate.multiply(
            this.cartList[i].number,
            this.cartList[i].specification.price
          )
        );
      }
      this.$set(this.cartList[i], "checked", checked);
    },
    allCheck() {
      if (this.allChecked) {
        this.allChecked = false;
        this.total = 0;
        this.checkMap.clear();
        for (let i = 0; i < this.cartList.length; i++) {
          this.$set(this.cartList[i], "checked", false);
        }
      } else {
        this.allChecked = true;
        this.total = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          this.$set(this.cartList[i], "checked", true);
          this.checkMap.set(i, this.cartList[i]);
          this.total = calculate.add(
            this.total,
            calculate.multiply(
              this.cartList[i].number,
              this.cartList[i].specification.price
            )
          );
        }
      }
    },
    countChange(e, type, i) {
      this.$set(this.cartList[i], "number", e);
      if (this.cartList[i].checked) {
        if (type > 0) {
          this.total = calculate.add(
            this.total,
            this.cartList[i].specification.price
          );
        } else {
          this.total = calculate.subtract(
            this.total,
            this.cartList[i].specification.price
          );
        }
      }
    },
    buy() {
      this.$store.commit("setBuys", {
        goods: this.checkMap.values(),
        price: this.total,
      });
      this.$u.route({
        url: "mall/buys/index",
      });
    },
    del() {
      let ids = [],
        list = this.cartList.filter((item) => {
          if (item.checked != true) {
            return item;
          } else {
            ids.push(item.id);
          }
        });
      this.cartList = list;
      delCart(ids).then((res) => {
        this.cartList = list;
      });
    },
    editSave() {
      editCart(this.cartList)
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/common/mall.scss";
.main-wrap {
  @include wrap();
  .status {
    @include flex(space-between);
    flex-direction: row-reverse;
    padding: 24rpx;
    line-height: 52rpx;
    color: $mall-blue;
  }
  .content {
    padding-bottom: 200rpx;
  }
  .bottom-fixed {
    @include flex(space-between, center);
    .total {
      width: calc(100% - 340rpx);
      @include flex(space-between);
      .select {
        color: #666;
        font-size: 28rpx;
        @include flex(space-between, center);
        width: 100rpx;
        .radio-icon {
          width: 40rpx;
        }
      }
      .price {
        color: $mall-red;
        font-size: 30rpx;
        @include flex();
        .unit {
          padding: 0 12rpx;
        }
      }
    }
  }
}
</style>