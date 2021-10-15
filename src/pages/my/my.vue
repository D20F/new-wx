<template>
    <view class="my">
        <image
            class="background"
            src="http://res.yitonginfo.com/xzwj/my/background.png"
            mode=""
        />
        <image
            @click="jumpRouter('/pages/my/userInformation/index')"
            class="exit"
            src="http://res.yitonginfo.com/xzwj/my/exit.png"
            mode=""
        />

        <view class="user">
            <image :src="user.avatar" mode="" />
            <text>
                {{ user.account }}
            </text>
        </view>

        <view class="orderList">
            <view
                @click="jumpRouter('/pages/tickets/orderList/index')"
                class="item"
            >
                <text>我的门票</text>
                <text>{{ list.ticketCount }}</text>
            </view>
            <view class="line"></view>
            <view
                @click="jumpRouter('/pages/hotel/orderList/index')"
                class="item"
            >
                <text>我的住宿</text>
                <text>{{ list.hotelCount }}</text>
            </view>
            <view class="line"></view>
            <view @click="jumpRouter('/mall/commodity/index')" class="item">
                <text>我的商品</text>
                <text>{{ list.ordersCount }}</text>
            </view>
            <view
                @click="jumpRouter('/pages/travel/orderList/index')"
                class="item"
            >
                <text>旅行社团</text>
                <text>{{ list.communityCount }}</text>
            </view>
            <view class="line"></view>
            <view
                @click="jumpRouter('/pages/appointment/orderList/index')"
                class="item"
            >
                <text>办证预约</text>
                <text>{{ list.certificateCount }}</text>
            </view>
            <view class="line"></view>
            <view
                @click="jumpRouter('/pages/throughCar/orderList/index')"
                class="item"
            >
                <text>直通车</text>
                <text>{{ list.throughTrainCount }}</text>
            </view>
        </view>

        <view class="seeting">
            <view
                class="item"
                v-for="(item, index) in seetingList"
                :key="index"
                @click="jumpRouter(item.url)"
            >
                <view class="content">
                    <image :src="item.image" />
                    <text> {{ item.title }} </text>
                </view>
                <image
                    class="arrow"
                    src="http://res.yitonginfo.com/xzwj/my/arrow.png"
                    mode=""
                />
            </view>
        </view>

        <phonePopup v-if="login_show"></phonePopup>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import phone_popup from "@/component/phone_popup/index";
import { getAppUser } from "@/api/api_mapi";

export default {
    name: "civil",
    data() {
        return {
            seetingList: [
                {
                    image: "http://res.yitonginfo.com/xzwj/my/list1.png",
                    title: "我的消息",
                    url: "/pages/my/message/message",
                },
                {
                    image: "http://res.yitonginfo.com/xzwj/my/list6.png",
                    title: "购物车",
                    url: "/mall/cart/index",
                },
                {
                    image: "http://res.yitonginfo.com/xzwj/my/list2.png",
                    title: "服务热线",
                    url: "/pages/my/serviceHotline/index",
                },
                {
                    image: "http://res.yitonginfo.com/xzwj/my/list3.png",
                    title: "投诉反馈",
                    url: "/pages/my/complaint/index",
                },
                {
                    image: "http://res.yitonginfo.com/xzwj/my/list4.png",
                    title: "我的投诉记录",
                    url: "/pages/my/complaintRecord/index",
                },
                {
                    image: "http://res.yitonginfo.com/xzwj/my/list5.png",
                    title: "关于我们",
                    url: "/pages/my/about/index",
                },
            ],
            list: {
                certificateCount: 0,
                communityCount: 0,
                hotelCount: 0,
                ordersCount: 0,
                throughTrainCount: 0,
                ticketCount: 0,
            },
        };
    },
    components: {
        phonePopup: phone_popup,
    },
    mixins: [public_mixin],
    onLoad(option) {},
    onShow() {
        this.init();
    },
    methods: {
        init() {
            this.getAppUser();
 
        },
        getAppUser() {
            getAppUser()
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.list = {
                            certificateCount: res.data.certificateCount,
                            communityCount: res.data.communityCount,
                            hotelCount: res.data.hotelCount,
                            ordersCount: res.data.ordersCount,
                            throughTrainCount: res.data.throughTrainCount,
                            ticketCount: res.data.ticketCount,
                        };
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

    },
    computed: {
        login_show() {
            return this.$store.state.public.login_show;
        },
        user() {
            return this.$store.state.user;
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.my {
    width: 100%;
    height: inherit;
    position: relative;
}
.background {
    position: fixed;
    width: 750upx;
    height: 516upx;
}
.exit {
    position: fixed;
    width: 34upx;
    height: 34upx;
    top: 200upx;
    right: 30upx;
    z-index: 100;
}
.user {
    width: 100%;
    height: 400upx;
    padding-top: 120upx;
    image {
        width: 170upx;
        height: 170upx;
        margin: 0 auto 10upx auto;
        border-radius: 50%;
    }
    text {
        color: #2d84ed;
        font-size: 44upx;
        font-weight: 600;
    }
}
.orderList {
    width: 100%;
    .item {
        display: inline-block;
        width: 248upx;
        height: 100upx;
        margin-bottom: 20upx;
        text:nth-child(1) {
            color: #333333;
            font-size: 30upx;
            margin-bottom: 10upx;
        }
        text:nth-child(2) {
            color: #2d84ed;
            font-size: 40upx;
        }
    }
    .line {
        display: inline-block;
        width: 2upx;
        height: 50upx;
        background: #eeeeee;
    }
}
.seeting {
    width: 90%;
    margin: 0 auto;
    .item {
        width: 100%;
        height: 100upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2upx solid #eeeeee;
        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            image {
                width: 30upx;
                height: 30upx;
                margin-right: 20upx;
            }
            text {
                color: #333333;
                font-size: 30upx;
            }
        }
        .arrow {
            width: 12upx;
            height: 22upx;
        }
    }
}
.userTitle {
    color: #2d84ed;
    font-size: 32upx;
    line-height: 90upx;
    margin: 40upx auto 0 auto;
}
.btn {
    width: 80%;
    height: 90upx;
    border-radius: 15upx;
    margin: 30upx auto 0 auto;
    text-align: center;
    color: #ffffff;
    font-size: 32upx;
    line-height: 90upx;
    background-color: #2d84ed;
}
</style>
