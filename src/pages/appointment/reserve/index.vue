<template>
    <view class="view">
        <view class="header">
            <text class="title">{{ list.title }}</text>
            <text class="content">{{ list.content }}</text>
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
            },
            formType: "散客",
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
                    console.log(res);
                    if (res.status == 200) {
                        this.list = {
                            title: res.data.title,
                            address: res.data.address,
                            phone: res.data.tel,
                            warm: res.data.warm,
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
        font-size: 36upx;
        font-weight: 600;
        color: #333333;
        line-height: 70upx;
    }
    .content {
        font-size: 30upx;
        color: #333333;
        margin-bottom: 20upx;
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
</style>
