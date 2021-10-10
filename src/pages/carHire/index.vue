<template>
    <view class="view">
        <!-- <u-icon
            class="back"
            name="arrow-left"
            color="#FFFFFF"
            size="35"
            @click="back(1)"
        ></u-icon> -->

        <u-swiper :list="swiper_list" height="375"></u-swiper>
        <view class="introduce">
            <view class="header">
                <text class="title">{{ list.title }}</text>
            </view>
            <view class="content">
                <u-parse :html="list.content"></u-parse>
            </view>
        </view>

        <view class="btn" @click="playPhone(list.tel)">
            <u-icon size="35" color="#ffffff" name="phone"></u-icon>
            <text> 电话咨询</text>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getReserveApp } from "@/api/api_mapi";

export default {
    name: "carHire",
    data() {
        return {
            list: {},
            swiper_list: [],
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
                    // console.log(res);
                    if (res.status == 200) {
                        let swiper = [];
                        for (const key in res.data) {
                            if (key == "rotationList") {
                                for (const item of res.data[key]) {
                                    swiper.push({ image: item.imageUrl });
                                }
                            }
                        }
                        this.swiper_list = swiper;
                        this.list.title = res.data.title;
                        this.list.tel = res.data.tel;
                        this.list.content = res.data.content;
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
    width: 90%;
    height: 90upx;
    position: fixed;
    bottom: 20upx;
    left: 5%;
    z-index: 10;
    border-radius: 15upx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2d84ed;
    text {
        margin-left: 5upx;
        color: #ffffff;
        line-height: 90upx;
        font-size: 32upx;
    }
}
</style>
