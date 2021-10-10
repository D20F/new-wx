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
          type="refund"
          :dataSource="item"
          :dataIndex="index"
          @check="itemCheck"
          @countChange="countChange"
          v-for="(item, index) in cartList"
          :key="index"
        />
      </view>
      <view class="reason mall-card">
        <view class="title">选择退款类型</view>
        <view class="item" @click="jump(1)">
          <view class="text">
            <view class="h6">我要退款</view>
            <view class="p">没收到货，或与卖家协商不用退货只退款</view>
          </view>
          <u-icon name="arrow-right" color="#8B8B8B" size="22"/>
        </view>
        <view class="item" @click="jump(2)">
          <view class="text">
            <view class="h6">我要退货退款</view>
            <view class="p">已收到货，需要退还收到的货物</view>
          </view>
          <u-icon name="arrow-right" color="#8B8B8B" size="22"/>
        </view>
      </view>
    </view>
    <view class="bottom-fixed">
      <view class="total">
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
    </view>
  </view>
</template>
<script>
import calculate from "@/utils/mall/calculate";
import cartItem from "@/component/business/mall/cartItem";
import addrSele from "@/component/business/mall/addrSele";
export default {
  components: { cartItem, addrSele },
  data() {
    return {
      orderStatus: 6,
      isDel: false,
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
      allChecked: false,
      checkMap: new Map(),
      total: 0,
      addr: {
        name: "收货人昵称",
        phone: "12345678900",
        content: "这里是收货地址这里是收货地址这里是收货地址这里是收货地址",
      },
      remark: "",
    };
  },
  methods: {
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
          calculate.multiply(this.cartList[i].count, this.cartList[i].price)
        );
      } else {
        this.allChecked = false;
        this.checkMap.delete(i);
        this.total = calculate.subtract(
          this.total,
          calculate.multiply(this.cartList[i].count, this.cartList[i].price)
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
            calculate.multiply(this.cartList[i].count, this.cartList[i].price)
          );
        }
      }
    },
    countChange(e, type, i) {
      this.$set(this.cartList[i], "count", e);
      if (this.cartList[i].checked) {
        if (type > 0) {
          this.total = calculate.add(this.total, this.cartList[i].price);
        } else {
          this.total = calculate.subtract(this.total, this.cartList[i].price);
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
      this.cartList = this.cartList.filter((item) => item.checked != true);
    },
    jump(type) {
      if (this.checkMap.size) {
        this.$u.route({
          url: "mall/refund/reason",
          params: {
            type: type,
          },
        });
      } else {
        uni.showToast({
          title: "请选择商品",
          icon: "error",
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
    .reason {
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