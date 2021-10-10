<template>
    <view class="view">
        <view class="item">
            <text class="time">{{ query.time }}</text>
            <view class="content">
                <text class="complaint">{{ query.content }}</text>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "systemNotification",
    data() {
        return {
            query: {},
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        this.query = JSON.parse(option.data);
    },
    onShow() {},
    methods: {},
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #ffffff;
}
.item {
    width: 94%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    overflow-y: auto;
    .time {
        text-align: left;
        font-size: 28upx;
        color: #333333;
        line-height: 80upx;
    }
    .content {
        background: #f8fbff;
        width: 100%;
        min-height: 350upx;
        border-radius: 15upx;
        padding: 20upx;
        .complaint {
            height: 190upx;
            text-align: left;
            font-size: 28upx;
            color: #666666;
        }
    }
}
</style>
