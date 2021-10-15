<template>
    <view class="view">
        <switchBtn :title="['待处理', '已完成']" @confirm="confirm" />

        <view v-if="current == 0" class="list">
            <view
                @click.stop="jumpDetails(item)"
                class="itemOff"
                v-for="(item, index) in pending"
                :key="index"
            >
                <view class="title">
                    <text>边防证办理</text>
                    <text v-if="item.status == -1">已取消</text>
                    <text v-if="item.status == 2">待使用</text>
                </view>
                <view class="type">
                    <text>{{ item.mode == 1 ? "散客" : "团体" }}</text>
                </view>
                <view
                    @click.stop="openCode(item.writeOffNo)"
                    class="btn"
                    v-if="item.status == 2"
                >
                    <text>去使用</text>
                </view>
            </view>
        </view>
        <view v-else-if="current == 1" class="list">
            <view
                @click.stop="jumpDetails(item)"
                class="itemOn"
                v-for="(item, index) in complete"
                :key="index"
            >
                <view class="title">
                    <text>边防证办理</text>
                    <text v-if="item.status == 3">已完成</text>
                    <text v-if="item.status == 4">已过期</text>
                </view>
                <view class="type">
                    <text>{{ item.type }}</text>
                </view>
            </view></view
        >
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import switchBtn from "@/component/switchBtn/index.vue";
import { getVisaPage } from "@/api/api_mapi";

export default {
    name: "orderList",
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
    onLoad(option) {},
    onShow() {
        this.getPending();
    },
    onReachBottom() {
        this.current == 0 ? this.getPending() : this.getComplete();
    },
    methods: {
        getPending() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
                status: 2,
            };
            getVisaPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.pending = [...this.pending, ...res.data.records];
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
                status: 3,
            };
            getVisaPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.complete = [...this.complete, ...res.data.records];
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
        jumpDetails(v) {
            let data = v;
            delete data.reserve.content;
            this.jumpRouter("/pages/appointment/orderDetails/index", data);
        },
        openCode(v) {
            uni.showModal({
                title: "验证码",
                content: v,
            });
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
.itemOff {
    background: #ffffff;
    width: 100%;
    height: 200upx;
    border-radius: 15upx;
    padding: 20upx;
    margin-bottom: 20upx;
    .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15upx;
        text:nth-child(1) {
            font-size: 32upx;
            color: #333333;
            font-weight: 600;
        }
        text:nth-child(2) {
            font-size: 26upx;
            color: #f99d3e;
        }
    }
    .type {
        text {
            text-align: left;
            font-size: 26upx;
            color: #818181;
        }
    }
    .btn {
        width: 144upx;
        height: 50upx;
        border: 2upx solid #2d84ed;
        border-radius: 24upx;
        position: absolute;
        bottom: 20upx;
        right: 25upx;
        text {
            line-height: 47upx;
            font-size: 26upx;
            color: #2d84ed;
        }
    }
}
.itemOn {
    background: #ffffff;
    width: 100%;
    height: 200upx;
    border-radius: 15upx;
    padding: 20upx;
    margin-bottom: 20upx;
    .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15upx;
        text:nth-child(1) {
            font-size: 32upx;
            color: #333333;
            font-weight: 600;
        }
        text:nth-child(2) {
            font-size: 26upx;
            color: #999999;
        }
    }
    .type {
        text {
            text-align: left;
            font-size: 26upx;
            color: #818181;
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
