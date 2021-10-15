<template>
    <view class="container">
        <text class="title"> 评论区 </text>
        <view class="item" v-for="(item, index) in list" :key="index">
            <view class="header">
                <view>
                    <image :src="item.appUser.avatar" mode="" />
                </view>
                <view>
                    <text>{{ item.appUser.nickname }}</text>
                    <text>{{ item.createTime }}</text>
                </view>
            </view>
            <view class="content">
                <text>{{ item.content }}</text>
            </view>
            <view v-if="item.replyContent" class="reply">
                <text>
                    商家: <text>{{ item.replyContent }}</text>
                </text>
            </view>
        </view>
        <view class="point"></view>
    </view>
</template>
<script>
export default {
    name: "evaluation",
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    components: {},
    created() {},
    data() {
        return {
        };
    },
    methods: {},
    mounted() {},
    beforeDestroy() {},
};
</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    min-height: 800upx;
    padding: 0 3%;
}
.title {
    font-size: 34upx;
    font-weight: 600;
    color: #333333;
    line-height: 110upx;
    text-align: left;
}
.item {
    width: 100%;
    margin-bottom: 25upx;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        view:nth-child(1) {
            image {
                width: 90upx;
                height: 90upx;
                border-radius: 50%;
            }
        }
        view:nth-child(2) {
            width: 614upx;
            padding-left: 20upx;
            text {
                text-align: left;
            }
            text:nth-child(1) {
                font-size: 30upx;
                color: #333333;
                line-height: 40upx;
            }
            text:nth-child(2) {
                font-size: 24upx;
                color: #999999;
            }
        }
        view:nth-child(3) {
            position: absolute;
            right: 0;
            top: 25upx;
            image {
                width: 34upx;
                height: 34upx;
            }
        }
    }
    .content {
        width: 614upx;
        margin-left: 110upx;
        text {
            margin: 20upx 0;
            text-align: left;
            font-size: 30upx;
            color: #333333;
        }
    }
    .reply {
        width: 600upx;
        margin-left: 110upx;
        background: #f7f7f7;
        border-radius: 10upx;
        padding: 20upx;
        text {
            margin-bottom: 10upx;
            text-align: left;
            font-size: 30upx;
            color: #2d84ed;
            text {
                margin-left: 10upx;
                display: inline;
                font-size: 30upx;
                color: #333333;
            }
        }
    }
}
.point {
    width: 50%;
    height: 2upx;
    position: absolute;
    bottom: 0;
}
</style>