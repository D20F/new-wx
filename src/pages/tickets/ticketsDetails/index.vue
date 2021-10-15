<template>
    <view class="view">
        <u-swiper :list="swiper_list" height="375"></u-swiper>
        <view class="introduce">
            <view class="header">
                <text class="title">{{ list.title }}</text>
                <text class="time">开放时间 : {{ list.time }}</text>
                <view class="rate">
                    <u-rate
                        active-color="#FFCE26"
                        inactive-icon="star-fill"
                        :current="list.score"
                        :disabled="true"
                    ></u-rate>
                    <text>
                        ￥ {{ list.price }}
                        <text>起</text>
                    </text>
                </view>

                <text class="address">地址: </text>
                <text class="address">{{ list.address }}</text>
            </view>
            <view class="content">
                <u-parse :html="list.content"></u-parse>
            </view>
        </view>

        <evaluation :list="comment" />

        <view class="btn">
            <view @click="openMap">
                <image
                    src="http://res.yitonginfo.com/xzwj/hotel/reserveHotel/map.png"
                    mode=""
                />
            </view>
            <view @click="playPhone(list.phone)">
                <u-icon size="35" color="#ffffff" name="phone"></u-icon>
                <text> 电话咨询</text>
            </view>
            <view @click="buy">
                <u-icon size="35" color="#ffffff" name="bag"></u-icon>
                <text> 前往预订 </text>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import evaluation from "@/component/evaluation/index.vue";
import { getTicketApp, getTicketComment } from "@/api/api_mapi";

export default {
    name: "ticketsDetails",
    data() {
        return {
            list: {
                image: "",
                title: "",
                address: "",
                score: "",
                time: "",
                startTime: "",
                endTime: "",
                count: "",
                price: "",
                id: "",
                phone: "",
                content: "",
                longitude: "",
                latitude: "",
                warm: "",
            },
            swiper_list: [],
            comment: [],
            page: {
                total: 0,
                page: 1,
                pageSize: 10,
            },
        };
    },
    components: {
        evaluation,
    },
    mixins: [public_mixin],
    onLoad(option) {
        let data = JSON.parse(option.data);
        this.getTicketApp(data.id);
        this.getTicketComment(data.id);
    },
    onShow() {},
    onReachBottom() {
        this.getTicketComment(this.list.id);
    },
    methods: {
        getTicketApp(id) {
            getTicketApp(id)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.list = {
                            image: res.data.coverUrl,
                            title: res.data.name,
                            address: res.data.address,
                            score: res.data.lv,
                            time: res.data.startTime + " ~ " + res.data.endTime,
                            startTime: res.data.startTime,
                            endTime: res.data.endTime,
                            price: res.data.amount,
                            id: res.data.id,
                            phone: res.data.tel,
                            content: res.data.content,
                            longitude: res.data.longitude,
                            latitude: res.data.latitude,
                            warm: res.data.reminder,
                        };
                        let arr = [];
                        for (const item of res.data.rotationList) {
                            arr.push({
                                image: item.imageUrl,
                            });
                        }
                        this.swiper_list = arr;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTicketComment(id) {
            getTicketComment({
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
        openMap() {
            wx.openLocation({
                longitude: ~~this.list.longitude,
                latitude: ~~this.list.latitude,
                name: this.list.title,
                address: this.list.address,
                scale: 6,
            });
        },
        playPhone(data) {
            uni.makePhoneCall({
                phoneNumber: data + "",
                success: () => {},
                fail: (err) => {},
            });
        },
        buy() {
            let data = {
                title: this.list.title,
                price: this.list.price,
                time: this.list.time,
                startTime: this.list.startTime,
                endTime: this.list.endTime,
                warm: this.list.warm,
                id: this.list.id,
                image: this.list.image,
            };
            this.jumpRouter("/pages/tickets/reserveTickets/index", data);
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
            line-height: 70upx;
            font-size: 32upx;
            font-weight: 600;
        }
        .time {
            text-align: left;
            color: #818181;
            font-size: 26upx;
            margin-bottom: 5upx;
        }
        .address {
            text-align: left;
            color: #818181;
            font-size: 26upx;
            margin-bottom: 10upx;
        }
        .rate {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text {
                color: #2d84ed;
                font-size: 45upx;
                font-weight: 600;
                text {
                    margin-left: 8upx;
                    display: inline;
                    color: #818181;
                    font-size: 24upx;
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
    view:nth-child(1) {
        image {
            width: 90upx;
            height: 90upx;
        }
    }
    view:nth-child(2) {
        width: 40%;
        height: 90upx;
        border-radius: 15upx;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fabd2c;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: 32upx;
        }
    }
    view:nth-child(3) {
        width: 40%;
        height: 90upx;
        border-radius: 15upx;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #2d84ed;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: 32upx;
        }
    }
}
</style>
