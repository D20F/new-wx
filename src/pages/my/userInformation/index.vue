<template>
    <view class="view">
        <view class="list">
            <view>
                <text>头像</text>
                <image class="avatar" :src="user.avatar" mode="" />
            </view>
            <view>
                <text>昵称</text>
                <text> {{ user.account }} </text>
            </view>
            <view>
                <text>我的位置</text>
                <text>未定位</text>
            </view>
            <view
                @click="jumpRouter('/pages/my/userInformation/myAddress/index')"
            >
                <text>我的收货地址</text>
                <image
                    class="next"
                    src="http://res.yitonginfo.com/xzwj/my/arrow.png"
                    mode=""
                />
            </view>
        </view>

        <view class="btn">
            <text>保存</text>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "userInformation",
    data() {
        return {
  
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {},
    onShow() {},
    methods: {
        getLocation() {
            let that = this;
            uni.getLocation({
                type: "wgs84",
                success: function (res) {
                    console.log("当前位置：" + JSON.stringify(res));
                    console.log("当前位置的经度：" + res.longitude);
                    console.log("当前位置的纬度：" + res.latitude);
                },
            });
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #f8fbff;
}
.list {
    width: 100%;
    padding-top: 20upx;
    view {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        height: 110upx;
        padding: 0 30upx;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 15upx;
        margin-bottom: 20upx;
        text {
            font-size: 32upx;
            color: #333333;
        }
    }
    .next {
        width: 12upx;
        height: 22upx;
    }
    .avatar {
        width: 85upx;
        height: 85upx;
        border-radius: 50%;
    }
}
.btn {
    width: 90%;
    height: 90upx;
    border-radius: 15upx;
    margin: 0 auto;
    text-align: center;
    // background: #dedede;
    background: #2d84ed;
    position: fixed;
    bottom: 100upx;
    left: 5%;
    text {
        color: #ffffff;
        line-height: 90upx;
        font-size: 32upx;
    }
}
</style>
