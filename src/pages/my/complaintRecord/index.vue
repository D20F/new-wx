<template>
    <view class="view">
        <switchBtn :title="['待处理', '已完成']" @confirm="confirm" />

        <view v-if="current == 0" class="list">
            <view class="item" v-for="(item, index) in pending" :key="index">
                <text class="time">{{ item.time }}</text>
                <view class="content">
                    <text class="complaint">{{ item.content }}</text>
                    <view>
                        <image
                            v-for="(i, index) in item.imageList"
                            :key="index"
                            :src="i"
                        />
                    </view>
                </view>
            </view>
        </view>
        <view v-else-if="current == 1" class="list">
            <view class="item" v-for="(item, index) in complete" :key="index">
                <text class="time">{{ item.time }}</text>
                <view class="content">
                    <text class="complaint">{{ item.content }}</text>
                    <view>
                        <image
                            v-for="(i, index) in item.imageList"
                            :key="index"
                            :src="i"
                        />
                    </view>
                    <text class="reply"
                        >{{ item.reply }}:<text> {{ item.replyContent }} </text>
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import switchBtn from "@/component/switchBtn/index.vue";
import { getComplaintPage } from "@/api/api_mapi";

export default {
    name: "complaintRecord",
    data() {
        return {
            current: 0,
            pending: [],
            complete: [],
            page: {
                total: 0,
                page: 1,
                pageSize: 10,
            },
        };
    },
    components: {
        switchBtn,
    },
    mixins: [public_mixin],
    onLoad(option) {
        this.getPending();
    },
    onReachBottom() {
        this.current == 0 ? this.getPending() : this.getComplete();
    },
    onShow() {},
    methods: {
        getPending() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
                status: 1,
            };
            getComplaintPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            let img = [];
                            for (const i of item.rotationList) {
                                img.push(i.imageUrl);
                            }
                            arr.push({
                                imageList: img,
                                content: item.content,
                                time: item.createTime.split(" ")[0],
                            });
                        }
                        this.pending = [...this.pending, ...arr];
                        this.page.page = this.page.page + 1;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getComplete() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
                status: 2,
            };
            getComplaintPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            let img = [];
                            for (const i of item.rotationList) {
                                img.push(i.imageUrl);
                            }
                            arr.push({
                                imageList: img,
                                content: item.content,
                                reply: item.reply,
                                replyContent: item.replyContent,
                                time: item.createTime.split(" ")[0],
                            });
                        }
                        this.complete = [...this.complete, ...arr];
                        this.page.page = this.page.page + 1;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        confirm(data) {
            this.current = data;
            this.page = {
                total: 0,
                page: 1,
                pageSize: 10,
            };
            if (data == 0) {
                this.pending = [];
                this.getPending();
            } else {
                this.complete = [];
                this.getComplete();
            }
        },
    },
    computed: {},
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

.time {
    text-align: left;
    font-size: 28upx;
    color: #2d84ed;
    line-height: 80upx;
}
.content {
    background: #ffffff;
    width: 100%;
    min-height: 350upx;
    border-radius: 15upx;
    padding: 20upx;
    .complaint {
        height: 190upx;
        text-align: left;
        font-size: 28upx;
        color: #333333;
    }
    .reply {
        margin-top: 10upx;
        text-align: left;
        font-size: 28upx;
        color: #2d84ed;
        font-weight: 600;
        text {
            margin-left: 20upx;
            font-weight: 200;
            font-size: 28upx;
            color: #2d84ed;
            display: inline;
        }
    }
    view {
        display: flex;
        justify-content: left;
        align-items: center;
        image {
            width: 122upx;
            height: 122upx;
            margin-right: 20upx;
        }
    }
}
.list {
    width: 94%;
    position: relative;
    margin: 120upx auto 0 auto;
    overflow-y: auto;
}
</style>
