<template>
  <view class="main-wrap">
    <view class="content">
      <view class="goods">
        <view class="status">
          <view class="left">订单编号：1234567890123456</view>
          <view class="right">
            <view class="mall-status-red" v-if="orderStatus == 1">待付款</view>
            <view class="mall-status-yellow" v-else-if="orderStatus == 2">
              待发货
            </view>
            <view class="mall-status-blue" v-else-if="orderStatus == 3">
              待收货
            </view>
            <view class="mall-status-gray" v-else-if="orderStatus == 5">
              申请售后
            </view>
            <view class="mall-status-orange" v-else-if="orderStatus == 6">
              退款中
            </view>
            <!-- <view class="mall-status-orange" v-else-if="orderStatus == 5">
              请完善信息
            </view>
            <view class="mall-status-orange" v-else-if="orderStatus == 6">
              退款中
            </view>
            <view class="mall-status-green" v-else-if="orderStatus == 7">
              退款成功
            </view>
            <view class="mall-status-orange" v-else-if="orderStatus == 8">
              退款失败
            </view> -->
          </view>
        </view>
        <cartItem
          :type="cartItemType"
          :dataSource="item"
          :dataIndex="index"
          @check="itemCheck"
          v-for="(item, index) in order.ordersProductList"
          :key="index"
        />
      </view>
      <view class="reason-1 mall-card" v-if="resultType == 0">
        <view class="title">选择退款类型</view>
        <view class="item" @click="resultTypeSele(1)">
          <view class="text">
            <view class="h6">我要退款</view>
            <view class="p">没收到货，或与卖家协商不用退货只退款</view>
          </view>
          <u-icon name="arrow-right" color="#8B8B8B" size="22" />
        </view>
        <view class="item" @click="resultTypeSele(2)">
          <view class="text">
            <view class="h6">我要退货退款</view>
            <view class="p">已收到货，需要退还收到的货物</view>
          </view>
          <u-icon name="arrow-right" color="#8B8B8B" size="22" />
        </view>
      </view>
      <template v-else>
        <view class="reason-2 mall-card">
          <view class="title">退款信息</view>
          <view class="row-item">
            <view class="label">货物状态</view>
            <view class="value" @click="receiveSele = true">
              {{ receiveSeleVal ? receiveSeleVal.label : "请选择" }}
              <u-icon
                name="arrow-right"
                color="#8B8B8B"
                size="22"
                style="padding-left: 10rpx"
              />
            </view>
          </view>
          <view class="row-item">
            <view class="label">退款原因</view>
            <view class="value" @click="reasonSele = true">
              {{ reasonSeleVal ? reasonSeleVal.label : "请选择" }}
              <u-icon
                name="arrow-right"
                color="#8B8B8B"
                size="22"
                style="padding-left: 10rpx"
              />
            </view>
          </view>
          <view class="row-item">
            <view class="label">退款金额</view>
            <view class="value red">¥ {{ total }}</view>
          </view>
        </view>
        <addrSele :dataSource="goodsAddr" type="read" addrTitle="商家收货地址" />
      </template>
    </view>
    <view class="bottom-fixed">
      <view class="total" v-if="resultType == 0">
        <view class="select" @click="allCheck">
          <view class="radio-icon">
            <view class="round" :class="{ ed: allChecked }"></view>
          </view>
          <view>全选</view>
        </view>
        <view class="price" v-show="!isDel">
          总价
          <view class="unit">¥</view>
          {{ total }}
        </view>
      </view>
      <view class="btns" v-else>
        <view style="width: 100%" class="btn btn-red" @click="refund"
          >提交</view
        >
      </view>
    </view>
    <u-select
      title="货物状态"
      v-model="receiveSele"
      :list="receiveList"
      @confirm="receiveSeleOk"
    />
    <u-select
      title="退款原因"
      v-model="reasonSele"
      :list="reasonSeleList"
      @confirm="reasonSeleOk"
    />
  </view>
</template>
<script>
import calculate from "@/utils/mall/calculate";
import cartItem from "@/component/business/mall/cartItem";
import addrSele from "@/component/business/mall/addrSele";
import { setStorage } from "@/utils/storage.js";
import { orderInfo, refundOrder, getMallAddr } from "@/api/mall";
export default {
  components: { cartItem, addrSele },
  data() {
    return {
      cartItemType: "refund",
      orderId: 0,
      order: {},
      orderStatus: 0,
      cartList: [],
      isDel: false,
      allChecked: false,
      checkMap: new Map(),
      total: 0,
      remark: "",
      goodsAddr: {},
      resultType: 0,
      receiveSele: false,
      receiveSeleVal: null,
      receiveList: [
        {
          value: 1,
          label: "未收到货",
        },
        {
          value: 2,
          label: "已收到货",
        },
      ],
      reasonSele: false,
      reasonSeleVal: null,
      reasonSeleList: [
        {
          value: 1,
          label: "多拍/拍错/不想要",
        },
        {
          value: 2,
          label: "快递一直未送到",
        },
        {
          value: 3,
          label: "空包裹/少货",
        },
      ],
    };
  },
  onLoad(options) {
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
    this.orderId = options.orderId;
    this.orderStatus = options.status;
    this.getOrders();
    this.mallAddr();
  },
  methods: {
    mallAddr() {
      getMallAddr().then((res) => {
        this.goodsAddr = res.data;
      });
    },
    getOrders() {
      orderInfo(this.orderId).then((res) => {
        let d = res.data;
        this.order = d;
        this.cartList = d.ordersProductList;
      });
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
    resultTypeSele(type) {
      if (this.checkMap.size) {
        this.cartItemType = "order";
        this.resultType = type;
      } else {
        uni.showToast({
          title: "请选择商品",
          icon: "error",
        });
      }
    },
    receiveSeleOk(e) {
      this.receiveSeleVal = e[0];
    },
    reasonSeleOk(e) {
      this.reasonSeleVal = e[0];
    },
    refund() {
      if (!this.receiveSeleVal) {
        uni.showToast({
          icon: "none",
          title: "请选择货物状态",
        });
      } else if (!this.reasonSeleVal) {
        uni.showToast({
          icon: "none",
          title: "请选择退款原因",
        });
      } else {
        let ids = [];
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked) {
            ids.push(this.cartList[i].id);
          }
        }
        refundOrder({
          ordersId: this.orderId,
          ordersProductId: ids,
          resultType: this.resultType,
          goods: this.receiveSeleVal.value,
          reason: this.reasonSeleVal.label,
        }).then((res) => {
          uni.showToast({
            title: "申请成功",
          });
          setTimeout(() => {
            this.$u.route({
              url: "mall/commodity/index",
              type: "redirectTo",
            });
          }, 1500);
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/common/mall.scss";
.main-wrap {
  @include wrap();
  padding: 24rpx 24rpx 0;
  .content {
    padding-bottom: 260rpx;
    .goods {
      border-radius: 22rpx;
      padding: 0 16rpx;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 4rpx;
      .status {
        @include flex(space-between);
        font-size: 26rpx;
        line-height: 76rpx;
        border-bottom: 2rpx solid #eeeeee;
        .left {
          color: #333;
        }
      }
      .card.mall-card {
        border-bottom: 2rpx solid #eeeeee;
        margin-bottom: 0;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        &:last-child {
          border-bottom: 0;
        }
      }
    }
    .reason-1 {
      line-height: 46rpx;
      .title {
        font-size: 28rpx;
        color: #666666;
      }
      .item {
        padding-top: 16rpx;
        @include flex(space-between, center);
        .h6 {
          font-size: 30rpx;
          color: #333;
        }
        .p {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
    .reason-2 {
      .title {
        font-size: 28rpx;
        color: #666;
        line-height: 46rpx;
        padding-bottom: 16rpx;
      }
      .row-item {
        @include flex(space-between, center);
        font-size: 30rpx;
        line-height: 1.4;
        .label {
          width: 140rpx;
        }
        .value {
          width: calc(100% - 140rpx);
          color: #999;
          text-align: right;
          &.red {
            color: $mall-red;
          }
        }
      }
      .row-item + .row-item {
        margin-top: 10rpx;
      }
    }
  }
  .bottom-fixed {
    .total {
      @include flex(space-between);
      line-height: 90rpx;
      padding: 0 22rpx;
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