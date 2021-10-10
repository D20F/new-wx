<template>
    <view class="container">
        <text class="title"> 评论区 </text>
        <view class="item" v-for="(item, index) in list" :key="index">
            <view class="header">
                <view>
                    <image :src="item.avatarUrl" mode="" />
                </view>
                <view>
                    <text>{{ item.name }}</text>
                    <text>{{ item.time }}</text>
                </view>
                <view v-if="reply" @click="sendShowFun(item)">
                    <image
                        src="http://res.yitonginfo.com/xzwj/component/commentArea/reply.png"
                        mode=""
                    />
                </view>
            </view>
            <view class="content">
                <text>{{ item.content }}</text>
            </view>
            <view class="reply">
                <text v-for="(i, index) in item.reply" :key="index">
                    {{ i.name }}: <text>{{ i.content }}</text>
                </text>
            </view>
        </view>
        <u-popup
            v-if="sendShow"
            v-model="sendShow"
            mode="bottom"
            :customStyle="{ top: '0px' }"
            :closeable="false"
            border-radius="14"
            width="750"
            height="140"
        >
            <!-- :mask-custom-style="{ background: 'rgba(0, 0, 0, 0)' }" -->
            <sendComment :focus="true" @send="send" />
        </u-popup>
        <view class="point"></view>
    </view>
</template>
<script>
import sendComment from "../sendComment/index.vue";
let observer;
export default {
    name: "commentArea",
    props: {
        reply: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    components: {
        sendComment,
    },
    created() {},
    data() {
        return {
            val: "",
            sendShow: false,
        };
    },
    methods: {
        sendShowFun(data) {
            this.sendShow = true;
            console.log(data);
        },
        send(data) {
            console.log(data);
        },
        changeRefresh(data) {
            this.$emit("changeRefresh", data);
        },
    },
    mounted() {
        observer = uni.createIntersectionObserver(this);
        observer.relativeTo(".container").observe(".point", (res) => {
            if (res.intersectionRatio > 0) {
                // console.log("触底", res);
                this.changeRefresh();
            }
        });


    },
    beforeDestroy() {
        // console.log(observer);
        if (observer) {
            observer.disconnect();
        }
    },
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
    width: 100%;
    height: 2upx;
    position: absolute;
    bottom: 0;
}
</style>