<template>
  <view class="card mall-card">
    <view class="radio-icon" @click="check" v-if="type != 'order'">
      <view class="round" :class="{ ed: projectData.checked }"></view>
    </view>
    <view class="right" :class="{ calc: type != 'order' }">
      <image class="cover" :src="projectData.product.cover" />
      <view class="info">
        <view class="title">{{ projectData.product.name }}</view>
        <view class="sku">{{ projectData.specification.name }}</view>
        <view class="bottom">
          <view class="price">
            <view class="unit">¥</view>
            {{ projectData.specification.price }}
          </view>
          <view class="num-input" v-if="type == 'cart'">
            <u-number-box
              :disabled-input="true"
              v-model="projectData.specification.number"
              :min="projectData.specification.minSale"
              :max="projectData.specification.stock"
              @minus="countChange($event, -1)"
              @plus="countChange($event, 1)"
            />
          </view>
          <view class="total" v-else>×{{ projectData.specification.number }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dataIndex: {
      type: Number,
      default: 0,
    },
    type: {
      type: String, // refund order
      default: "cart",
    },
  },
  data() {
    return {
      projectData: this.$u.deepClone(this.dataSource),
    };
  },
  watch: {
    dataSource: {
      handler(val, oldVal) {
        this.$set(this.projectData, "checked", val.checked);
      },
      deep: true,
    },
  },
  methods: {
    check() {
      this.$set(this.projectData, "checked", !this.projectData.checked);
      this.$emit("check", this.projectData.checked, this.dataIndex);
    },
    countChange($event, type) {
      this.$emit("countChange", $event.value, type, this.dataIndex);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/common/mall.scss";
.card {
  @include flex(space-between);
  .right {
    @include flex(space-between);
    width: 100%;
    &.calc {
      width: calc(100% - 54rpx);
    }
    .cover {
      width: 168rpx;
      height: 168rpx;
      border-radius: 22rpx;
    }
    .info {
      width: calc(100% - 190rpx);
      @include flex(space-between, unset, column);
      .title {
        font-size: 32rpx;
        color: #333;
        @include ellipsis(54rpx);
      }
      .sku {
        color: #818181;
        font-size: 26rpx;
        @include ellipsis(36rpx);
      }
      .bottom {
        @include flex(space-between);
        line-height: 50rpx;
        .price {
          color: $mall-red;
          font-size: 34rpx;
          @include flex();
          .unit {
            margin-right: 14rpx;
          }
        }
        .total {
          color: #333;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>