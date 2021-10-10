<template>
  <u-mask :show="show">
    <view class="warp">
      <view class="rect" @tap.stop>
        <image src="http://res.yitonginfo.com/xzwj/mall/spike-min.png" alt="">
        <u-icon class="close" name="close-circle" color="#FFF" size="50" @click="show = false"></u-icon>
      </view>
    </view>
  </u-mask>
</template>
<script>
export default {
    data() {
        return {
            show: false,
        };
    },
};
</script>
<style lang="scss" scoped>
.u-mask {
    backdrop-filter: blur(10rpx);
}
.warp {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.rect {
    width: 554rpx;
    height: 479rpx;
    position: relative;
    image {
        width: 100%;
        height: 100%;
    }
    .close {
        position: absolute;
        left: 50%;
        bottom: -80rpx;
        transform: translateX(-25rpx);
    }
}
</style>