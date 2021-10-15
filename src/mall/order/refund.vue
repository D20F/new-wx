<template>
  <view class="main-wrap">
    <view class="content">
      <view class="goods">
        <view class="status">
          <view class="left">订单编号：{{ order.ordersId }}</view>
          <view class="right">
            <view class="mall-status-orange" v-if="orderStatus == 1">
              {{ order.expressNo ? '待审核' : '完善信息' }}
            </view>
            <view class="mall-status-green" v-else-if="orderStatus == 2">
              已完成
            </view>
            <view class="mall-status-red" v-else-if="orderStatus == 3">
              已拒绝
            </view>
          </view>
        </view>
        <view>
          <cartItem
            type="order"
            :dataSource="item"
            :dataIndex="index"
            v-for="(item, index) in order.ordersProductList"
            :key="index"
          />
        </view>
      </view>
      <view class="mall-card row-item" v-if="order.note">
        <view class="label">订单备注</view>
        <view class="value">{{ order.note }}</view>
      </view>
      <view class="mall-card row-item" v-if="order.payTime">
        <view class="label">交易时间</view>
        <view class="value">{{ order.payTime }}</view>
      </view>
      <addrSele :dataSource="goodsAddr" type="read" addrTitle="商家收货地址" />
      <view class="mall-card">
        <view class="row-item" v-if="order.reason">
          <view class="label">退款原因</view>
          <view class="value">{{ order.reason }}</view>
        </view>
        <view class="row-item">
          <view class="label">退款编号</view>
          <view class="value">{{ order.id }}</view>
        </view>
        <view class="row-item">
          <view class="label">申请时间</view>
          <view class="value">{{ order.createTime }}</view>
        </view>
      </view>
      <view class="remark mall-card" v-if="orderStatus == 1">
        <u-field
          v-if="!order.expressNo"
          v-model="expressNo"
          label="物流单号"
          placeholder="请填写单号"
          :border-bottom="false"
          :clearable="false"
        >
        </u-field>
        <view class="row-item" v-else>
          <view class="label">物流单号</view>
          <view class="value">{{ order.expressNo }}</view>
        </view>
      </view>
      <view class="tips" v-if="orderStatus == 1">
        请按照商家提供的收货地址寄回货物，并提供物流单号，以便商家处理退款订单。
      </view>
      <view class="tips" v-if="orderStatus == 3 && order.checkRemark">
        失败原因：{{ order.checkRemark }}
      </view>
    </view>
    <view class="bottom-fixed">
      <view class="btns" v-if="!order.expressNo">
        <view style="width: 100%" class="btn btn-red" @click="express"
          >提交</view
        >
      </view>
      <view class="total" v-else>
        <view>退款总金额</view>
        <view class="price">
          <view class="unit">¥</view>
          {{ order.refundAmount }}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import cartItem from "@/component/business/mall/cartItem";
import addrSele from "@/component/business/mall/addrSele";
import { refundInfo, getMallAddr, express } from "@/api/mall";
import { setStorage } from "@/utils/storage.js";
export default {
  components: { cartItem, addrSele },
  data() {
    return {
      orderId: 0,
      order: {},
      orderStatus: 0,
      refundIndexs: [],
      expressNo: "",
      goodsAddr: {},
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
      refundInfo(this.orderId).then((res) => {
        let d = res.data;
        this.order = d;
      });
    },
    express() {
      if (this.expressNo.trim() == "") {
        uni.showToast({
          icon: "none",
          title: "请填写物流单号",
        });
      } else {
        express({
          id: this.orderId,
          expressNo: this.expressNo,
        }).then((res) => {
          this.order.expressNo = this.expressNo;
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
      color: $mall-red;
      font-size: 30rpx;
      .price {
        @include flex();
        .unit {
          padding: 0 12rpx;
        }
      }
    }
  }
}
</style>