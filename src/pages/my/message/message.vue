<template>
    <view class="view">
        <view class="list">
            <view
                @click="jumpRouter('/pages/my/message/replyNotification/index',item)"
                class="item"
                v-for="(item, index) in reply"
                :key="index"
            >
                <view class="left">
                    <image
                        src="http://res.yitonginfo.com/xzwj/my/message/reply.png"
                        alt=""
                    />
                </view>
                <view class="right">
                    <view class="title">
                        <text>回复通知</text>
                        <text>{{ item.time }}</text>
                    </view>
                    <text class="content">{{ item.content }}</text>
                </view>
            </view>
            <view
                @click="
                    jumpRouter('/pages/my/message/systemNotification/index',item)
                "
                class="item"
                v-for="(item, index) in system"
                :key="index"
            >
                <view class="left">
                    <image
                        src="http://res.yitonginfo.com/xzwj/my/message/system.png"
                        alt=""
                    />
                </view>
                <view class="right">
                    <view class="title">
                        <text>系统通知</text>
                        <text>{{ item.time }}</text>
                    </view>
                    <text class="content">{{ item.content }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "message",
    data() {
        return {
            reply: [
                // {
                //     time: "2021-06-05 13:00",
                //     content: "昵称...",
                // },
                // {
                //     time: "2021-06-05 13:00",
                //     content:
                //         "昵称：这里是回复内容这里是回复内容这saaaaaaaaaaaa...",
                // },
            ],
            system: [
                // {
                //     time: "2021-06-05 13:00",
                //     content: "昵称：这里是回复内容这里是回复内容这...",
                // },
                {
                    time: "2021-09-30 14:00",
                    content: "注册成功",
                },
            ],
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {},
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
.list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    padding-top: 30upx;
    .item {
        width: 90%;
        height: 100upx;
        margin: 0 auto 40upx auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .left {
        width: 92upx;
        height: 92upx;
        image {
            width: 100%;
            height: 100%;
        }
    }
    .right {
        width: 563upx;
        height: 100upx;
        border-bottom: 1px solid #dfdfdf;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text:nth-child(1) {
                color: #333333;
                font-size: 32upx;
                margin-bottom: 10upx;
            }
            text:nth-child(2) {
                color: #666666;
                font-size: 28upx;
            }
        }
        .content {
            text-align: left;
            color: #666666;
            font-size: 28upx;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
}
</style>
