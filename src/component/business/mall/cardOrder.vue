<template>
  <view class="mall-card">
    <view class="card-container">
      <view class="order-label">
        <view>订单编号：{{ cardInfo.id }}</view>
        <view v-if="cardInfo.status == 1" class="mall-status-red">
          待付款
        </view>
        <view v-else-if="cardInfo.status == 2" class="mall-status-yellow">
          待发货
        </view>
        <view v-else-if="cardInfo.status == 3" class="mall-status-blue">
          待收货
        </view>
        <view v-else-if="cardInfo.status == 5" class="mall-status-green">
          已完成
        </view>
        <view v-else-if="cardInfo.status == 6" class="mall-status-orange">
          退款
        </view>
      </view>
      <view class="divier"></view>
      <view
        class="order-wrapper"
        v-if="
          cardInfo.ordersProductList &&
          Array.isArray(cardInfo.ordersProductList)
        "
      >
        <scroll-view
          class="scroll-view_H"
          scroll-x="true"
          @scrolltolower="scrolltolower"
          lower-threshold="50"
        >
          <view class="orders-view">
            <view
              class="view-item"
              v-for="item in cardInfo.ordersProductList"
              :key="item.id"
            >
              <image class="cover" :src="item.product.cover" />
            </view>
          </view>
        </scroll-view>
        <view class="view-more">
          <u-icon class="arrow-up" name="arrow-right" size="30" color="#ccc" />
        </view>
      </view>
      <view class="divier"></view>
      <view class="order-controller">
        <view>共{{ cardInfo.ordersProductList.length }}件商品</view>
        <view class="btn" v-if="cardInfo.status == 0">去支付</view>
        <view class="btn" v-else-if="cardInfo.status == 1">提醒发货</view>
        <view class="btn" v-else-if="cardInfo.status == 2">确认收货</view>
        <view class="btn" v-else-if="cardInfo.status == 3">申请售后</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    datasource: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      cardInfo: {},
      customStyle: {
        background: "#FFF!important",
        padding: "0 30rpx",
        height: "54rpx",
        lineHeight: "54rpx",
        fontSize: "28rpx",
        margin: "0 20rpx 0 0",
      },
      orderType: {
        paid: "代付款",
        completed: "已完成",
        delivered: "待发货",
        taken: "待收货",
        Refunding: "退款中",
        Refund: "退款成功",
        RefundFailed: "退款失败",
        infomationLack: "请完善信息",
      },
      operationType: {
        paid: "去支付",
        completed: "申请售后",
        delivered: "提醒发货",
        taken: "确认收货",
      },
    };
  },
  methods: {
    scrolltolower() {
      console.log(11111);
    },
  },
  watch: {
    datasource: {
      handler(val, oldval) {
        // debugger
        this.cardInfo = JSON.parse(JSON.stringify(val));
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/mall.scss";
.mall-card {
  margin: 20rpx 25rpx;
  padding: 0 20rpx;
  background: #fff;
  border-radius: 22rpx;
  overflow: hidden;
  box-sizing: border-box;
  .order-label {
    @include flex(space-between, center);
    padding: 26rpx 0;
    font-size: 26rpx;
    color: #333;
  }
  .order-wrapper {
    @include flex(space-between, center);
    flex-wrap: wrap;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 50rpx;
      background: linear-gradient(to right, transparent, rgb(255, 255, 255));
      top: 0;
      right: 40rpx;
    }
    .scroll-view_H {
      white-space: nowrap;
      width: calc(100% - 40rpx);
      .orders-view {
        padding: 16rpx 0;
        .view-item {
          margin-right: 15rpx;
          border-radius: 22rpx;
          overflow: hidden;
          display: inline-block;
        }
      }
    }
    .view-more {
      height: 70rpx;
      line-height: 70rpx;
    }
  }
  .order-controller {
    @include flex(space-between, center);
    padding: 38rpx 0 30rpx;
    font-size: 26rpx;
    color: #818181;
    .btn {
        height: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #2D84ED;
        border: 2rpx solid #2D84ED;
        font-size: 28rpx;
        border-radius: 24rpx;
        padding: 0 14rpx;
    }
  }
}
.divier {
  width: 100%;
  height: 2rpx;
  background: #e0e0e0;
}
.cover {
  width: 107rpx;
  height: 107rpx;
}
</style>