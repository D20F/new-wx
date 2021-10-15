<template>
    <view class="view">
        <u-swiper :list="swiper_list" height="375"></u-swiper>
        <view class="introduce">
            <view class="header">
                <text class="title">{{ list.title }}</text>
                <view class="rate">
                    <text> 开放时间 {{ list.time }} </text>
                    <u-rate
                        active-color="#FFCE26"
                        inactive-icon="star-fill"
                        :current="list.score"
                        :disabled="true"
                    ></u-rate>
                </view>

                <text class="address">地址: </text>
                <text class="address">{{ list.address }}</text>
            </view>
            <view class="content">
                <u-parse :html="list.content"></u-parse>
            </view>
        </view>

        <view @click="openMap" class="btn">
            <image
                src="http://res.yitonginfo.com/xzwj/hotel/reserveHotel/map.png"
                mode=""
            />
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getScenicSpotApp } from "@/api/api_mapi";

export default {
    name: "reserveHotel",
    data() {
        return {
            list: {
                image: "",
                title: "",
                time: "",
                address: "",
                content: "",
                score: "",
                longitude: "",
                latitude: "",
                id: "",
            },
            swiper_list: [],
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        let id = JSON.parse(option.data);
        this.getScenicSpotApp(id);
    },
    onShow() {},
    methods: {
        getScenicSpotApp(id) {
            getScenicSpotApp(id)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.list = {
                            image: res.data.coverUrl,
                            title: res.data.name,
                            address: res.data.address,
                            score: res.data.lv,
                            time: res.data.startTime + " ~ " + res.data.endTime,
                            id: res.data.id,
                            phone: res.data.tel,
                            content: res.data.content,
                            longitude: res.data.longitude,
                            latitude: res.data.latitude,
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
        openMap() {
            uni.openLocation({
                longitude: ~~this.list.longitude,
                latitude: ~~this.list.latitude,
                name:this.list.title,
                address:this.list.address,
                scale: 7,
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
            margin-bottom: 25upx;

            text {
                color: #818181;
                font-size: 26upx;
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
    width: 90upx;
    height: 90upx;
    position: fixed;
    bottom: 40upx;
    right: 20upx;
    z-index: 10;
    background: #ffffff;
    border-radius: 22upx;
    box-shadow: 0px 12upx 54upx 4upx rgba(173, 210, 254, 0.1);
    image {
        width: 90upx;
        height: 90upx;
    }
}
</style>
