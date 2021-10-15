<template>
  <view class="addr mall-card" @click="jump">
    <view class="title">
      <view>{{ addrTitle }}</view>
      <u-icon
        name="arrow-right"
        color="#8B8B8B"
        size="22"
        v-if="type == 'edit'"
      />
    </view>
    <view>
      <view class="no-addr" v-if="!dataSource">暂无默认收货地址，去选择</view>
      <view class="has-addr" v-else>
        <view class="top">
          <view class="name">{{ dataSource.name }}</view>
          <view class="phone">{{ dataSource.mobile }}</view>
        </view>
        <view class="bottom">{{ dataSource.area || '' }}{{ dataSource.address }}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    addrTitle: {
      type: String,
      default: "收货地址",
    },
    dataSource: {
      type: Object,
      default: () => {
        return {};
      },
    },
    type: {
      type: String, // read
      default: "edit",
    },
  },
  data() {
    return {};
  },
  methods: {
    jump() {
      if (this.type == "edit") {
        this.$u.route({
          url: "pages/my/userInformation/myAddress/index",
          params: { type: "select" },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/common/mall.scss";
.addr {
  .title {
    @include flex(space-between, center);
    font-size: 28rpx;
    color: #666666;
  }
  .no-addr {
    color: $mall-red;
    font-size: 30rpx;
    padding-top: 28rpx;
  }
  .has-addr {
    font-size: 30rpx;
    color: #333;
    line-height: 1.6;
    padding-top: 16rpx;
    .top {
      @include flex();
      padding-bottom: 6rpx;
      .phone {
        padding-left: 20rpx;
        color: #666;
      }
    }
  }
}
</style>