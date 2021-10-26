<template>
    <view class="view">
        <view class="header">
            <view class="title" @click="tipShow = true">
                <text>{{ list.title }}</text>
                <view>
                    <text>《示例查看》</text>
                    <u-icon
                        v-show="formType == '散客'"
                        name="question-circle"
                        color="#2979ff"
                        size="30"
                    ></u-icon>
                </view>
            </view>
            <view class="phone" @click="playPhone(list.phone)">
                <u-icon name="phone" color="#2979ff" size="28"></u-icon>
                <text>
                    {{ list.phone }}
                </text>
            </view>
            <text class="address">{{ list.address }}</text>
        </view>

        <!-- 散客表单 -->
        <formAlone
            v-if="formType == '散客'"
            @radioGroupChange="radioGroupChange"
        >
            <view class="tip">
                <text>温馨提示</text>
                <text @click="jumpRouter('/pages/appointment/protocol/index')"
                    >《办证须知》</text
                >
                <!-- <text>温馨提示</text>
                <text>{{ list.warm }}</text> -->
            </view></formAlone
        >
        <!-- 团体表单 -->
        <formGrounp
            v-if="formType == '团体'"
            @radioGroupChange="radioGroupChange"
        >
            <view class="tip">
                <text>温馨提示</text>
                <text @click="jumpRouter('/pages/appointment/protocol/index')"
                    >《办证须知》</text
                >
                <!-- <text>温馨提示</text>
                <text>{{ list.warm }}</text> -->
            </view></formGrounp
        >
        <u-popup
            v-if="tipShow"
            v-model="tipShow"
            mode="center"
            closeable
            border-radius="20"
        >
            <video
                id="myVideo"
                :show-fullscreen-btn="false"
                :src="list.videoUrl"
            ></video>
        </u-popup>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import formAlone from "./formAlone.vue";
import formGrounp from "./formGrounp.vue";
import { getReserveApp } from "@/api/api_mapi";

export default {
    name: "reserve",
    data() {
        return {
            list: {
                title: "",
                address: " ",
                phone: "",
                warm: " ",
                videoUrl: " ",
            },
            formType: "散客",
            tipShow: false,
        };
    },
    components: {
        formAlone,
        formGrounp,
    },
    mixins: [public_mixin],
    onLoad(option) {
        this.getReserveApp();
    },
    onShow() {},
    methods: {
        getReserveApp() {
            let type = 2;
            getReserveApp(type)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.list = {
                            title: res.data.title,
                            address: res.data.address,
                            phone: res.data.tel,
                            warm: res.data.warm,
                            videoUrl: res.data.videoUrl,
                        };
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
        radioGroupChange(data) {
            this.formType = data;
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
    padding: 20upx 0 20upx 0;
}
.header {
    width: 95%;
    margin: 0 auto;
    border-radius: 15upx;
    padding: 25upx;
    position: relative;
    background: #ffffff;
    text {
        text-align: left;
    }
    // .line {
    //     width: 100%;
    //     height: 20upx;
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     margin-bottom: 20upx;
    //     .progress {
    //         width: 40%;
    //     }
    //     text {
    //         font-size: 24upx;
    //         color: #666666;
    //     }
    // }
    .title {
        height: 70upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20upx;
        text {
            font-size: 36upx;
            font-weight: 600;
            color: #333333;
        }
        view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text {
                font-size: 24upx;
                color: #2d84ed;
            }
        }
    }
    .phone {
        margin-bottom: 20upx;
        display: flex;
        justify-content: left;
        align-items: center;
        text {
            color: #2d84ed;
            font-size: 26upx;
        }
    }
    .address {
        font-size: 30upx;
        color: #999999;
    }
}
.tip {
    width: 90%;
    margin: 0 auto;
    text {
        text-align: left;
    }
    text:nth-child(1) {
        color: #ed5b5b;
        font-size: 32upx;
        line-height: 80upx;
    }
    text:nth-child(2) {
        color: #2d84ed;
        font-size: 28upx;
        margin-bottom: 30upx;
    }
}
#myVideo {
    border-radius: 20upx;
    margin: 40px 10px 10px 10px;
}
</style>
