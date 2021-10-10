<template>
  <view class="main-wrap">
    <view class="banner">
      <u-swiper
        :list="productData.carouseList"
        height="360"
        border-radius="0"
      ></u-swiper>
    </view>
    <view class="content">
      <view class="info">
        <view class="title">{{ productData.name }}</view>
        <view class="flex">
          <view class="sold">已售：{{ productData.salesCount }}</view>
          <view class="price">
            <!-- <view class="old">¥ {{ productData.carouseList }}</view> -->
            <view class="now">¥ {{ productData.minPrice }}</view>
          </view>
        </view>
      </view>
      <view class="detail">
        <view class="title">商品详情</view>
        <view
          class="pics"
          v-for="(item, index) in productData.detailList"
          :key="index"
        >
          <image :src="item" mode="widthFix" />
        </view>
      </view>
    </view>
    <view class="bottom-fixed">
      <view class="btns">
        <view class="btn btn-yellow" @click="popupOpen('cart')">
          <image
            src="../../static/mall/package.png"
            mode="heightFix"
          />加入购物车
        </view>
        <view :hair-line="false" class="btn btn-red" @click="popupOpen('buy')">
          <image src="../../static/mall/package.png" mode="heightFix" />前往购买
        </view>
      </view>
    </view>
    <u-popup v-model="popupShow" mode="bottom" closeable border-radius="22">
      <view class="popup-content" v-if="productData.specificationList">
        <view class="info">
          <view class="pic">
            <image :src="productData.cover" />
          </view>
          <view class="num">
            <view class="price"
              >¥ {{ productData.specificationList[skuIndex].price }}</view
            >
            <view class="stock"
              >库存：{{ productData.specificationList[skuIndex].stock }}</view
            >
          </view>
        </view>
        <view class="sku">
          <u-tag
            :text="item.name"
            type="info"
            shape="circle"
            :mode="skuIndex == index ? 'dark' : 'light'"
            v-for="(item, index) in productData.specificationList"
            :key="index"
            @click="
              skuIndex = index;
              buyCount = productData.specificationList[index].minSale;
            "
          />
        </view>
        <view class="ctrl">
          <view>购买数量</view>
          <view class="num-input">
            <u-number-box
              :disabled-input="true"
              v-model="buyCount"
              :min="productData.specificationList[skuIndex].minSale"
              :max="productData.specificationList[skuIndex].stock"
              @change="buyCountChange"
            />
          </view>
        </view>
        <view class="btns">
          <view :hair-line="false" class="btn btn-red" @click="popConfirm"
            >确定</view
          >
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import calculate from "@/utils/mall/calculate";
import { getProduct, addCart } from "@/api/mall";
export default {
  data() {
    return {
      productId: null,
      productData: {},
      popupShow: false,
      popupType: "cart",
      skuIndex: 0,
      buyCount: 1,
    };
  },
  onLoad(options) {
    this.productId = options.id;
    this.getProduct();
  },
  methods: {
    getProduct() {
      getProduct(this.productId).then((res) => {
        this.productData = res.data;
        this.buyCount = res.data.specificationList[0].minSale;
      });
    },
    popupOpen(type) {
      this.popupType = type;
      this.popupShow = true;
    },
    buyCountChange(e) {
      console.log(e);
    },
    popConfirm() {
      if (this.popupType == "cart") {
        addCart({
          productId: this.productId,
          specificationId: this.productData.specificationList[this.skuIndex].id,
          number: this.buyCount,
        }).then((res) => {
          this.$u.route({
            url: "mall/cart/index",
          });
        });
      } else if (this.popupType == "buy") {
        let sku = this.productData.specificationList;
        this.$store.commit("setBuys", {
          goods: [
            {
              checked: true,
              product: {
                id: this.productData.id,
                cover: this.productData.cover,
                name: this.productData.name,
              },
              specification: {
                id: sku[this.skuIndex].id,
                name: sku[this.skuIndex].name,
                minSale: sku[this.skuIndex].minSale,
                number: this.buyCount,
                price: sku[this.skuIndex].price,
              },
            },
          ],
          price: calculate.multiply(this.buyCount, sku[this.skuIndex].price),
        });
        this.$u.route({
          url: "mall/buys/index",
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
  background-color: #fff;
  .content {
    padding: 26rpx 26rpx 160rpx;
    box-sizing: border-box;
    .info {
      .title {
        font-size: 32rpx;
        color: #333;
        line-height: 1.4;
      }
      .flex {
        @include flex(space-between);
        padding: 12rpx 0 20rpx;
        border-bottom: 2rpx solid #eeeeee;
        .sold {
          color: #666;
          font-size: 26rpx;
          padding-top: 18rpx;
        }
        .price {
          @include flex(space-between);
          .old {
            color: #999;
            font-size: 24rpx;
            padding-top: 20rpx;
          }
          .now {
            color: $mall-red;
            font-size: 46rpx;
            margin-left: 16rpx;
          }
        }
      }
    }
    .detail {
      .title {
        font-size: 32rpx;
        color: #333;
        padding: 24rpx 0;
      }
      .pics {
        font-size: 0;
        image {
          width: 100%;
        }
      }
    }
  }
}
/deep/ .u-drawer-content {
  overflow: initial !important;
  .uni-scroll-view {
    overflow: initial !important;
  }
}
.popup-content {
  padding: 0 24rpx;
  .info {
    @include flex(space-between, center);
    padding-top: 20rpx;
    .pic {
      // position: absolute;
      // top: -48rpx;
      width: 190rpx;
      height: 190rpx;
      padding: 4rpx;
      background-color: #fff;
      border-radius: 16rpx;
      image {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
      }
    }
    .num {
      width: calc(100% - 220rpx);
      height: 140rpx;
      // padding-left: 220rpx;
      line-height: 1.6;
      @include flex(center, flex-start, column);
      .price {
        color: $mall-red;
        font-size: 36rpx;
      }
      .stock {
        color: #818181;
        font-size: 26rpx;
      }
    }
  }
  .sku {
    padding: 36rpx 0;
    border-bottom: 2rpx solid #eeeeee;
    /deep/ .u-tag {
      margin: 0 28rpx 12rpx 0;
      min-width: 100rpx;
      text-align: center;
      &.u-mode-dark-info {
        background-color: $mall-red;
      }
    }
  }
  .ctrl {
    @include flex(space-between, center);
    padding: 30rpx 0;
  }
  .btns {
    padding: 24rpx 0;
    .btn {
      width: 100%;
    }
  }
}
</style>