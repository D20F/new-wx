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
            <view class="mall-status-green" v-else-if="orderStatus == 5">
              已完成
            </view>
            <view class="mall-status-orange" v-else-if="orderStatus == 6">
              退款
            </view>
          </view>
        </view>
        <cartItem
          type="order"
          :dataSource="item"
          :dataIndex="index"
          @check="itemCheck"
          @countChange="countChange"
          v-for="(item, index) in cartList"
          :key="index"
        />
      </view>
      <addrSele :dataSource="addr" type="read" />
      <view class="mall-card row-item">
        <view class="label">订单备注</view>
        <view class="value">
          备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注
        </view>
      </view>
      <view class="mall-card row-item">
        <view class="label">交易时间</view>
        <view class="value">2021-09-01 12:00:00</view>
      </view>
      <template
        v-if="
          orderStatus == 5 ||
          orderStatus == 6 ||
          orderStatus == 7 ||
          orderStatus == 8
        "
      >
        <addrSele :dataSource="addr" type="read" addrTitle="商家收货地址" />
      </template>
      <view class="mall-card">
        <view class="row-item">
          <view class="label">退款原因</view>
          <view class="value">不想要或多拍了</view>
        </view>
        <view class="row-item">
          <view class="label">退款编号</view>
          <view class="value">111111111111111111</view>
        </view>
        <view class="row-item">
          <view class="label">申请时间</view>
          <view class="value">2021-09-01 12:00:00</view>
        </view>
      </view>
      <view class="remark mall-card">
        <u-field
          v-model="remark"
          label="物流单号"
          placeholder="请填写单号"
          :border-bottom="false"
          :clearable="false"
        >
        </u-field>
      </view>
      <view class="tips">
        请按照商家提供的收货地址寄回货物，并提供物流单号，以便商家处理退款订单。
      </view>
    </view>
    <view class="bottom-fixed">
      <view
        class="total"
        v-if="
          orderStatus == 1 ||
          orderStatus == 2 ||
          orderStatus == 3 ||
          orderStatus == 4
        "
      >
        <view class="price">
          总价
          <view class="unit">¥</view>
          {{ total }}
        </view>
      </view>
      <view
        class="total"
        v-if="
          orderStatus == 5 ||
          orderStatus == 6 ||
          orderStatus == 7 ||
          orderStatus == 8
        "
      >
        <view class="price">
          退款总金额
          <view class="unit">¥</view>
          {{ total }}
        </view>
      </view>
      <view class="btns">
        <template v-if="orderStatus == 1">
          <u-button :hair-line="false" class="btn btn-yellow" @click="buy"
            >取消订单</u-button
          >
          <u-button :hair-line="false" class="btn btn-red" @click="del"
            >去支付</u-button
          >
        </template>
        <template v-else-if="orderStatus == 2">
          <u-button
            style="width: 100%"
            :hair-line="false"
            class="btn btn-yellow"
            @click="buy"
            >取消订单</u-button
          >
        </template>
        <template v-else-if="orderStatus == 3">
          <u-button :hair-line="false" class="btn btn-yellow" @click="buy"
            >申请退款</u-button
          >
          <u-button :hair-line="false" class="btn btn-red" @click="del"
            >确认收货</u-button
          >
        </template>
        <template v-else-if="orderStatus == 4">
          <u-button
            style="width: 100%"
            :hair-line="false"
            class="btn btn-red"
            @click="del"
            >申请售后</u-button
          >
        </template>
        <template v-else-if="orderStatus == 5">
          <u-button
            style="width: 100%"
            :hair-line="false"
            class="btn btn-red"
            @click="del"
            >提交</u-button
          >
        </template>
      </view>
    </view>
  </view>
</template>
<script>
import cartItem from "@/component/business/mall/cartItem";
import addrSele from "@/component/business/mall/addrSele";
export default {
  components: { cartItem, addrSele },
  data() {
    return {
      orderStatus: 6,
      cartList: [
        {
          price: 35,
          count: 1,
          stock: 10,
          sku: "白色",
          title: "北国风光，千里冰封，万里雪飘",
          image:
            "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
        },
        {
          price: 135,
          count: 3,
          stock: 1000,
          sku: "黑色无线充电",
          title: "北国风光，千里冰封，万里雪飘",
          image:
            "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
        },
        {
          price: 3.3,
          count: 1,
          stock: 5,
          sku: "白色",
          title: "北国风光，千里冰封，万里雪飘",
          image:
            "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
        },
      ],
      total: 0,
      addr: {
        name: "收货人昵称",
        phone: "12345678900",
        content: "这里是收货地址这里是收货地址这里是收货地址这里是收货地址",
      },
      remark: "",
    };
  },
  methods: {},
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