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
            <view class="mall-status-gray" v-else-if="orderStatus == 4">
              申请售后
            </view>
            <view class="mall-status-orange" v-else-if="orderStatus == 5">
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
            </view>
          </view>
        </view>
        <cartItem
          type="order"
          :dataSource="item"
          :dataIndex="index"
          v-for="(item, index) in cartList"
          :key="index"
        />
      </view>
      <view class="mall-card">
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
      <addrSele :dataSource="addr" type="read" addrTitle="商家收货地址" />
    </view>
    <view class="bottom-fixed">
      <view class="btns">
        <view
          style="width: 100%"
          class="btn btn-red"
          @click="buy"
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
      checkMap: new Map(),
      total: 0,
      addr: {
        name: "收货人昵称",
        phone: "12345678900",
        content: "这里是收货地址这里是收货地址这里是收货地址这里是收货地址",
      },
      receiveSele: false,
      receiveSeleVal: null,
      receiveList: [
        {
          value: "1",
          label: "未收到货",
        },
        {
          value: "2",
          label: "已收到货",
        },
      ],
      reasonSele: false,
      reasonSeleVal: null,
      reasonSeleList: [
        {
          value: "1",
          label: "多拍/拍错/不想要",
        },
        {
          value: "2",
          label: "快递一直未送到",
        },
        {
          value: "3",
          label: "空包裹/少货",
        },
      ],
    };
  },
  methods: {
    receiveSeleOk(e) {
      this.receiveSeleVal = e[0];
    },
    reasonSeleOk(e) {
      this.reasonSeleVal = e[0];
    },
    buy() {},
  },
};
</script>
<style lang="scss" scoped>
@import "@/common/mall.scss";
.main-wrap {
  @include wrap();
  padding: 24rpx 24rpx 0;
  .content {
    padding-bottom: 200rpx;
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
    .mall-card {
      .title {
        font-size: 28rpx;
        color: #666;
        line-height: 46rpx;
        padding-bottom: 16rpx;
      }
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
</style>