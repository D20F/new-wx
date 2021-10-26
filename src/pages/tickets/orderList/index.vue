<template>
    <view class="view">
        <switchBtn :title="['进行中', '已完成']" @confirm="confirm" />

        <view v-if="current == 0" class="list">
            <view
                @click.stop="jumpDetails(item)"
                class="itemOff"
                v-for="(item, index) in pending"
                :key="index"
            >
                <view class="left">
                    <view v-if="item.ticket.type == '1'" class="tip yellow">
                        <text>门</text>
                    </view>
                    <view v-else-if="item.ticket.type == '2'" class="tip green">
                        <text>车</text>
                    </view>
                    <view v-else-if="item.ticket.type == '3'" class="tip red">
                        <text>演</text>
                    </view>
                    <image :src="item.ticket.coverUrl" mode="" />
                </view>
                <view class="right">
                    <view class="title">
                        <text>{{ item.ticket.name }}</text>
                        <text v-if="item.status == -1">已取消</text>
                        <text v-else-if="item.status == 1" class="red"
                            >待付款</text
                        >
                        <text v-else-if="item.status == 2" class="yellow"
                            >待使用</text
                        >
                    </view>
                    <view class="time">
                        <text>所属景区: {{ item.ticket.belong }}</text>
                    </view>
                    <view class="btn">
                        <text class="price">￥ {{ item.payAmount }}</text>
                        <view v-if="item.status == 1" @click.stop="pay(item)">
                            <text>去支付</text>
                        </view>
                        <view
                            v-else-if="item.status == 2"
                            @click.stop="openCode(item.writeOffNo)"
                        >
                            <text>去使用</text>
                        </view>
                    </view>
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
                <view class="left">
                    <view v-if="item.ticket.type == '1'" class="tip yellow">
                        <text>门</text>
                    </view>
                    <view v-else-if="item.ticket.type == '2'" class="tip green">
                        <text>车</text>
                    </view>
                    <view v-else-if="item.ticket.type == '3'" class="tip red">
                        <text>演</text>
                    </view>
                    <image :src="item.ticket.coverUrl" mode="" />
                </view>
                <view class="right">
                    <view class="title">
                        <text>{{ item.ticket.name }}</text>
                        <text>已完成</text>
                    </view>
                    <view class="time">
                        <text>所属景区: {{ item.ticket.belong }}</text>
                    </view>
                    <view class="btn">
                        <text class="price">￥ {{ item.payAmount }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import switchBtn from "@/component/switchBtn/index.vue";
import { getTicketReservePage, wxReservePay } from "@/api/api_mapi";

export default {
    name: "",
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
        pay(item) {
            let data = {
                orderId: item.id,
            };
            let that = this;
            wxReservePay(data)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        wx.requestPayment({
                            appId: res.data.appId,
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.packageValue,
                            signType: res.data.signType,
                            paySign: res.data.paySign,
                            success: function (res) {
                                console.log(res);
                                uni.showToast({
                                    icon: "none",
                                    title: "支付成功",
                                });
                                that.confirm(0);
                            },
                            fail: function (res) {
                                console.log(res);
                                uni.showToast({
                                    icon: "none",
                                    title: "支付失败",
                                });
                            },
                            complete: function (res) {},
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getPending() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
                status: 2,
            };
            getTicketReservePage(data)
                .then((res) => {
                    console.log(res);
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
            getTicketReservePage(data)
                .then((res) => {
                    console.log(res);
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
        jumpDetails(item) {
            let data = {
                createTime: item.createTime,
                id: item.id,
                likes: item.likes,
                period: item.ticket.startTime + " ~ " + item.ticket.endTime,
                identity: item.identity,
                writeOffNo: item.writeOffNo,
                makeDate: item.makeDate,
                leaveDate: item.leaveDate,
                mobile: item.mobile,
                payAmount: item.payAmount,
                quantity: item.quantity,
                reserveId: item.reserveId,
                reserveName: item.reserveName,
                status: item.status,
                belong: item.ticket.belong,
                coverUrl: item.ticket.coverUrl,
                name: item.ticket.name,
                warm: item.ticket.reminder,
                startTime: item.ticket.startTime,
                endTime: item.ticket.endTime,
                amount: item.ticket.amount,
            };
            this.jumpRouter("/pages/tickets/orderDetails/index", data);
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
    height: 250upx;
    border-radius: 15upx;
    padding: 20upx;
    margin-bottom: 20upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
        image {
            width: 210upx;
            height: 210upx;
            border-radius: 20upx;
        }
        .tip {
            position: absolute;
            top: 10upx;
            left: 10upx;
            width: 54upx;
            height: 35upx;
            z-index: 1;
            border-radius: 8upx;
            text {
                font-size: 24upx;
                color: #ffffff;
                line-height: 35upx;
            }
        }
        .green {
            background: #6bcba8;
        }
        .yellow {
            background: #f99d3e;
        }
        .red {
            background: #ee3c3c;
        }
    }
    .right {
        width: 430upx;
        height: 180upx;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        .title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text:nth-child(1) {
                font-size: 32upx;
                color: #333333;
                font-weight: 600;
            }
            .yellow {
                font-size: 26upx;
                color: #f99d3e;
            }
            .red {
                font-size: 26upx;
                color: #ee3c3c;
            }
        }
        .time {
            text {
                text-align: left;
                font-size: 26upx;
                color: #818181;
            }
        }
        .btn {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
                font-size: 34upx;
                font-weight: 600;
                color: #2d84ed;
            }
            view {
                width: 144upx;
                height: 50upx;
                border: 2upx solid #2d84ed;
                border-radius: 24upx;

                text {
                    line-height: 47upx;
                    font-size: 26upx;
                    color: #2d84ed;
                }
            }
        }
    }
}
.itemOn {
    background: #ffffff;
    width: 100%;
    height: 250upx;
    border-radius: 15upx;
    padding: 20upx;
    margin-bottom: 20upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
        image {
            width: 210upx;
            height: 210upx;
            border-radius: 20upx;
        }
        .tip {
            position: absolute;
            top: 10upx;
            left: 10upx;
            width: 54upx;
            height: 35upx;
            z-index: 100;
            border-radius: 8upx;
            text {
                font-size: 24upx;
                color: #ffffff;
                line-height: 35upx;
            }
        }
        .green {
            background: #6bcba8;
        }
        .yellow {
            background: #f99d3e;
        }
        .red {
            background: #ee3c3c;
        }
    }
    .right {
        width: 430upx;
        height: 180upx;
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
                color: #818181;
            }
        }
        .time {
            margin-bottom: 40upx;
            text {
                text-align: left;
                font-size: 26upx;
                color: #818181;
            }
        }
        .btn {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
                font-size: 34upx;
                font-weight: 600;
                color: #2d84ed;
            }
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
