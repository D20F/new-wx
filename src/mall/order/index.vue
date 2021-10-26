<template>
  <view class="main-wrap">
    <view class="content">
      <view class="goods">
        <view class="status">
          <view class="left">订单编号：{{ order.id }}</view>
          <view class="right">
            <view class="mall-status-red" v-if="orderStatus == 1">待付款</view>
            <view class="mall-status-yellow" v-else-if="orderStatus == 2">
              待发货
            </view>
            <view class="mall-status-blue" v-else-if="orderStatus == 3">
              待收货
            </view>
            <view class="mall-status-green" v-else-if="orderStatus == 5">
              已完成
            </view>
            <view class="mall-status-orange" v-else-if="orderStatus == 6">
              退款
            </view>
          </view>
        </view>
        <view v-if="orderStatus == 2">
          <cartItem
            type="refund"
            :dataSource="item"
            :dataIndex="index"
            @check="itemCheck"
            @countChange="countChange"
            v-for="(item, index) in order.ordersProductList"
            :key="index"
          />
        </view>
        <view v-else>
          <cartItem
            type="order"
            :dataSource="item"
            :dataIndex="index"
            :orderStatus="order.status"
            v-for="(item, index) in order.ordersProductList"
            :key="index"
          />
        </view>
      </view>
      <addrSele :dataSource="addr" type="read" />
      <view class="mall-card row-item" v-if="order.note">
        <view class="label">订单备注</view>
        <view class="value">{{ order.note }}</view>
      </view>
      <view class="mall-card row-item" v-if="orderStatus != 1">
        <view class="label">交易时间</view>
        <view class="value">{{ order.payTime }}</view>
      </view>
    </view>
    <view class="bottom-fixed">
      <view
        class="total"
        v-if="
          orderStatus == 1 ||
          orderStatus == 2 ||
          orderStatus == 3 ||
          orderStatus == 5
        "
      >
        <view class="price">
          总价
          <view class="unit">¥</view>
          {{ order.payAmount }}
        </view>
      </view>
      <view
        class="total"
        v-if="orderStatus == 6 || orderStatus == 7 || orderStatus == 8"
      >
        <view class="price">
          退款总金额
          <view class="unit">¥</view>
          {{ order.payAmount }}
        </view>
      </view>
      <view class="btns">
        <template v-if="orderStatus == 1">
          <view
            :hair-line="false"
            class="btn btn-yellow"
            @click="cancelOrder"
            >取消订单</view
          >
          <view :hair-line="false" class="btn btn-red" @click="buy"
            >去支付</view
          >
        </template>
        <template v-else-if="orderStatus == 2">
          <view
            style="width: 100%"
            :hair-line="false"
            class="btn btn-yellow"
            @click="refund"
            >申请退款</view
          >
        </template>
        <template v-else-if="orderStatus == 3">
          <view
            :hair-line="false"
            class="btn btn-yellow"
            @click="
              jumpTo('mall/refund/index', {
                orderId: orderId,
                status: orderStatus,
              })
            "
            >申请退款</view
          >
          <view :hair-line="false" class="btn btn-red" @click="receive"
            >确认收货</view
          >
        </template>
        <template v-else-if="orderStatus == 5">
          <view
            style="width: 100%"
            :hair-line="false"
            class="btn btn-red"
            @click="
              jumpTo('mall/refund/index', {
                orderId: orderId,
                status: orderStatus,
              })
            "
            >申请售后</view
          >
        </template>
        <!-- <template v-else-if="orderStatus == 5">
          <view
            style="width: 100%"
            :hair-line="false"
            class="btn btn-red"
            @click="del"
            >提交</view
          >
        </template> -->
      </view>
    </view>
  </view>
</template>
<script>
import cartItem from "@/component/business/mall/cartItem";
import addrSele from "@/component/business/mall/addrSele";
import { orderInfo, editOrder, wxPay, refundOrder } from "@/api/mall";
export default {
  components: { cartItem, addrSele },
  data() {
    return {
      orderId: 0,
      order: {},
      orderStatus: 0,
      addr: {},
      refundIndexs: [],
      remark: "",
    };
  },
  onLoad(options) {
    this.orderId = options.orderId;
    this.orderStatus = options.status;
    this.getOrders();
  },
  methods: {
    getOrders() {
      orderInfo(this.orderId).then((res) => {
        let d = res.data;
        this.order = d;
        this.addr = {
          name: d.addressName,
          mobile: d.addressMobile,
          area: "",
          address: d.address,
        };
      });
    },
    cancelOrder() {
      editOrder({
        id: this.orderId,
        status: -1,
      }).then((res) => {
        uni.showToast({
          title: "取消成功",
        });
        setTimeout(() => {
          this.$u.route({
            url: "mall/commodity/index",
            type: "redirectTo",
          });
        }, 1500);
      });
    },
    buy() {
      let that = this;
      wxPay({
        orderId: this.orderId,
      }).then((res) => {
        uni.requestPayment({
          provider: "wxpay",
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.packageValue,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res2) {
            that.$u.route({
              url: "mall/commodity/index",
              params: {
                status: 1,
              },
              type: "redirectTo",
            });
          },
          fail: function (err) {
            that.$u.route({
              url: "mall/commodity/index",
              params: {
                status: 0,
              },
              type: "redirectTo",
            });
          },
        });
      });
    },
    itemCheck(checked, i) {
      if (checked) {
        this.refundIndexs.push(i);
      } else {
        let index = this.refundIndexs.findIndex((item) => item === i);
        this.refundIndexs.splice(index, 1);
      }
    },
    refund() {
      if (!this.refundIndexs.length) {
        uni.showToast({
          icon: "error",
          title: "请选择商品",
        });
      } else {
        let ids = [];
        for (let i = 0; i < this.refundIndexs.length; i++) {
          ids.push(this.order.ordersProductList[this.refundIndexs[i]].id);
        }
        refundOrder({
          ordersId: this.orderId,
          ordersProductId: ids,
          resultType: 1,
          goods: 1,
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
    receive() {
      editOrder({
        id: this.orderId,
        status: 5,
      }).then((res) => {
        this.orderStatus = 5;
        uni.showToast({
          title: "操作成功",
        });
      });
    },
    jumpTo(url, params) {
      this.$u.route({
        url: url,
        params: params,
        type: "redirectTo",
      });
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
    .row-item {
      @include flex(space-between);
      font-size: 30rpx;
      line-height: 1.4;
      .label {
        width: 140rpx;
      }
      .value {
        width: calc(100% - 140rpx);
        color: #999;
      }
    }
    .row-item + .row-item {
      margin-top: 10rpx;
    }
    .remark {
      .u-field {
        padding: 0;
      }
    }
    .tips {
      padding: 20rpx;
      font-size: 26rpx;
      color: $mall-red;
      line-height: 1.6;
    }
  }
  .bottom-fixed {
    .total {
      @include flex(space-between);
      line-height: 90rpx;
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