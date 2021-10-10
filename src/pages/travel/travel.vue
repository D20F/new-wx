<template>
    <view class="view">
        <view class="header">
            <text class="title">{{ list.title }}</text>
            <view class="line">
                <view class="price">
                    <text
                        >￥ {{ list.minAmount }}

                        <text>起</text>
                    </text>
                </view>
            </view>
            <text class="address">{{ list.address }}</text>
        </view>
        <view class="content">
            <u-parse :html="list.content"></u-parse>
        </view>
        <view class="btn">
            <view class="phone" @click="playPhone(list.tel)">
                <u-icon size="35" color="#ffffff" name="phone"></u-icon>
                <text> 电话咨询</text>
            </view>
            <view
                class="bag"
                @click="
                    jumpRouter('/pages/travel/reserveTravel/index', {
                        type: '',
                        id: list.id,
                        warm: list.warm,
                    })
                "
            >
                <u-icon size="35" color="#ffffff" name="bag"></u-icon>
                <text> 前往预订 </text>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getReserveApp } from "@/api/api_mapi";

export default {
    name: "travel",
    data() {
        return {
            list: {
                title: "",
                address: "",
                content: "",
                quantity: "",
                useQuantity: "",
                minAmount: "",
                tel: "",
                id: "",
            },
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        let i = JSON.parse(option.data);
        this.getReserveApp(i);
    },
    onShow() {},
    methods: {
        getReserveApp(i) {
            getReserveApp(i)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        this.list = res.data;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        playPhone(data) {
            uni.makePhoneCall({
                phoneNumber: data + "",
                success: () => {},
                fail: (err) => {},
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
    padding-bottom: 150upx;
}
.content {
    width: 90%;
    margin: 0 auto;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    image {
        border-radius: 30upx;
    }
    img {
        border-radius: 30upx;
    }
}
.header {
    width: 90%;
    margin: 0 auto 20upx auto;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    text {
        text-align: left;
    }
    .line {
        width: 100%;
        height: 20upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25upx;
        // .progressBox {
        //     width: 400upx;
        //     display: flex;
        //     justify-content: left;
        //     align-items: center;
        //     text {
        //         font-size: 20upx;
        //         color: #666666;
        //         margin-left: 10upx;
        //     }
        //     .progress {
        //         width: 50%;
        //     }
        // }
        .price {
            text {
                color: #2d84ed;
                font-weight: 600;
                font-size: 45upx;
                text {
                    margin-left: 5upx;
                    display: inline;
                    vertical-align: middle;
                    font-size: 26upx;
                    color: #666666;
                }
            }
        }
    }
    .title {
        font-size: 32upx;
        font-weight: 600;
        color: #333333;
        line-height: 100upx;
    }
    .address {
        font-size: 30upx;
        color: #333333;
        margin-bottom: 20upx;
    }
}
.btn {
    width: 100%;
    height: 150upx;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .phone {
        height: 90upx;
        border-radius: 15upx;
        margin: 0 auto;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fabd2c;
        width: 45%;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: 32upx;
            margin-left: 10upx;
        }
    }

    .bag {
        height: 90upx;
        border-radius: 15upx;
        margin: 0 auto;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #2d84ed;
        width: 45%;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: 32upx;
            margin-left: 10upx;
        }
    }
}
</style>
