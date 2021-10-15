<template>
    <view class="view">
        <u-swiper :list="swiper_list" height="375"></u-swiper>
        <view class="introduce">
            <view class="header">
                <text class="title">{{ list.title }}</text>
                <view class="rate">
                    <view class="time">
                        <text> 发表日期: {{ list.time }} </text>
                        <text>发表人:{{ list.publisher }} </text>
                    </view>
                    <u-rate
                        active-color="#FFCE26"
                        inactive-icon="star-fill"
                        :current="list.score"
                        :disabled="true"
                    ></u-rate>
                </view>
            </view>
            <view class="content">
                <p>
                    {{ list.content }}
                </p>
                <image
                    v-for="(item, index) in contentList"
                    :key="index"
                    :src="item.image"
                    mode="widthFix"
                />
            </view>
        </view>

        <commentArea
            :list="comment"
            :reply="true"
            @replyComment="replyComment"
        />

        <view class="btn">
            <sendComment @send="send" />
        </view>

        <view
            class="add"
            @click="jumpRouter('/pages/travellingGuideline/addGuideline')"
        >
            <u-icon size="50" color="#ffffff" name="plus"></u-icon>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import commentArea from "@/component/commentArea/index.vue";
import sendComment from "@/component/sendComment/index.vue";

import {
    getTravelGuidesDetails,
    getTravelComment,
    addTravelComment,
} from "@/api/api_mapi";

export default {
    name: "",
    data() {
        return {
            list: {
                title: "",
                time: "",
                content: "",
                score: "",
                id: "",
                publisher: "",
            },
            swiper_list: [],
            contentList: [],
            comment: [],
            page: {
                total: 0,
                page: 1,
                pageSize: 10,
            },
        };
    },
    components: {
        commentArea,
        sendComment,
    },
    mixins: [public_mixin],
    onLoad(option) {
        let id = JSON.parse(option.data);
        this.getTravelGuidesDetails(id);
        this.getTravelComment(id);
    },
    onShow() {},
    onReachBottom() {
        // 下拉加载评论
        this.getTravelComment(this.list.id);
    },
    methods: {
        getTravelComment(id) {
            getTravelComment({
                current: this.page.page,
                size: this.page.pageSize,
                guidesId: id,
            })
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.comment = [...this.comment, ...res.data.records];
                        this.page.page = this.page.page + 1;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTravelGuidesDetails(id) {
            getTravelGuidesDetails(id)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.list = {
                            title: res.data.title,
                            score: res.data.lv,
                            time: res.data.createTime.split(" ")[0],
                            id: res.data.id,
                            publisher: res.data.publisher,
                            content: res.data.content,
                        };
                        let arr = [];
                        for (const item of res.data.rotationList) {
                            arr.push({
                                image: item.imageUrl,
                            });
                        }
                        this.swiper_list = arr;
                        let arrs = [];
                        for (const item of res.data.contentList) {
                            arrs.push({
                                image: item.imageUrl,
                            });
                        }
                        this.contentList = arrs;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        replyComment(data) {
            addTravelComment({
                content: data.val,
                guidesId: data.guidesId,
                replyId: data.replyId,
            })
                .then((res) => {
                    if (res.status == 200) {
                        uni.showToast({
                            icon: "none",
                            title: "回复成功",
                        });
                        setTimeout(() => {
                            this.page.page = 1;
                            this.comment = [];
                            this.getTravelComment(this.list.id);
                        }, 800);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        send(data) {
            addTravelComment({
                content: data,
                guidesId: this.list.id,
                replyId: "",
            })
                .then((res) => {
                    if (res.status == 200) {
                        uni.showToast({
                            icon: "none",
                            title: "发送成功",
                        });
                        setTimeout(() => {
                            this.page.page = 1;
                            this.comment = [];
                            this.getTravelComment(this.list.id);
                        }, 800);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {},
};
</script>
<style lang="scss" scoped>
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #ffffff;
    padding-bottom: 140upx;
}
.back {
    position: fixed;
    top: 24upx;
    left: 24upx;
    z-index: 100;
}
.introduce {
    width: 100%;
    position: relative;
    top: -8upx;
    background: #ffffff;
    padding: 0 3%;
    border-radius: 20upx 20upx 0 0;
    .header {
        width: 100%;
        .title {
            text-align: left;
            color: #333333;
            line-height: 90upx;
            font-size: 32upx;
            font-weight: 600;
        }
        .rate {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25upx;
            .time {
                text {
                    line-height: 50upx;
                    text-align: left;
                    color: #818181;
                    font-size: 26upx;
                }
            }
        }
    }
    .content {
        width: 100%;
        margin: 0 auto;
        padding: 20upx 0;
        border-top: 2upx solid #eeeeee;
        border-bottom: 2upx solid #eeeeee;
        p {
            font-size: 28upx;
        }
        image {
            width: 100%;
            // height: 300upx;
            border-radius: 20upx;
        }
    }
}
.btn {
    width: 100%;
    height: 140upx;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    z-index: 10;

    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 2upx solid #eeeeee;
}
.add {
    width: 90upx;
    height: 90upx;
    position: fixed;
    bottom: 180upx;
    right: 15upx;
    border-radius: 20upx;
    background: #2d84ed;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
