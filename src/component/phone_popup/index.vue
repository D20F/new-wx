<template>
    <view class="popupbox">
        <view class="mask" @click="close"></view>
        <view class="popup">
            <view class="space"></view>
            <u-steps
                :list="numList"
                mode="number"
                :current="step"
                active-color="#2D84ED"
            ></u-steps>
            <view>
                <text>微信登录</text>
                <text>申请账号中,请授权用户信息</text>
            </view>
            <button
                type="default"
                class="btn"
                open-type="getUserInfo"
                @getuserinfo="getuserinfo"
            >
                授权用户信息
            </button>
        </view>
        <view class="close" @click="close">
            <u-icon name="close" color="#ffffff" size="28"></u-icon>
        </view>
    </view>
</template>
<script>
import { authAppCode, authAppLogin } from "@/api/api_mapi";
import { setStorage } from "@/utils/storage.js";

export default {
    name: "popup",
    props: {},
    data() {
        return {
            step: 0,
            numList: [
                {
                    name: "用户登录",
                },
            ],
            wx: {
                unionid: "",
                openId: "",
                phoneNumber: "",
            },
            appid: "wx5b452654550cf9f9", //小程序appid
            secret: "3e9b96f87a3a44352aa1cc770f053c65", //小程序secret 未填写
        };
    },
    created() {
        this.login();
    },
    methods: {
        login() {
            let that = this;
            uni.login({
                provider: "weixin",
                success: function (res) {
                    console.log("res code", res);
                    if (res.code) {
                        //微信登录成功 已拿到code
                        let data = {
                            code: res.code,
                        };
                        authAppCode(data)
                            .then((res) => {
                                console.log(res);
                                if (res.status == 200) {
                                    that.wx.openId = res.data;
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                },
            });
        },
        getuserinfo(e) {
            let that = this;

            console.log(e);
            console.log(this.wx);

            if (e.detail.errMsg == "getUserInfo:fail user deny") {
                console.log("拒绝授权");
                this.close();
            } else {
                //允许授权
                // e.detail.encryptedData      //加密的用户信息
                // e.detail.iv     //加密算法的初始向量  时要用到

                let data = {
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv,
                    openId: this.wx.openId,
                };
                authAppLogin(data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            // setStorage("account", res.data.appUser.nickname);
                            // setStorage("avatar", res.data.appUser.avatar);

                            setStorage("openId", res.data.appUser.openId);
                            setStorage(
                                "token",
                                res.data.tokenEntity.accessToken
                            );
                            setStorage("userId", res.data.tokenEntity.userId);

                            // that.$store.commit(
                            //     "accountFun",
                            //     res.data.appUser.nickname
                            // );
                            // that.$store.commit(
                            //     "avatarFun",
                            //     res.data.appUser.avatar
                            // );
                            that.$store.commit(
                                "openIdFun",
                                res.data.appUser.openId
                            );
                            that.$store.commit(
                                "tokenFun",
                                res.data.tokenEntity.accessToken
                            );
                            that.$store.commit(
                                "userIdFun",
                                res.data.tokenEntity.userId
                            );

                            uni.reLaunch({
                                url: "/pages/home/home",
                            });

                            this.close();
                        }
                    })
                    .catch((err) => {});
            }
        },
        close() {
            this.$store.commit("loginShowFun", false);
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/public.scss";
.popup {
    width: 80%;
    height: 420upx;
    border-radius: 25upx;
    margin: 250upx auto 0 auto;
    background-color: #ffffff;
    text-align: center;
    z-index: 10000;
    image:nth-child(3) {
        position: relative;
        width: 320upx;
        height: 320upx;
        margin: 0 auto;
    }
    view:nth-child(4) {
        width: 80%;
        text-align: center;
        margin: 0 auto;
        text:nth-child(1) {
            color: #242424;
            font-size: 36upx;
            font-weight: 600;
            margin-bottom: 15upx;
        }
        text:nth-child(2) {
            color: #707070;
            font-size: 32upx;
        }
    }
    .btn {
        width: 80%;
        height: 90upx;
        border-radius: 15upx;
        margin: 80upx auto 0 auto;
        text-align: center;
        color: #ffffff;
        font-size: 32upx;
        line-height: 90upx;
        background-color: #2d84ed;
    }
}
.close {
    width: 112upx;
    height: 112upx;
    border: 1upx solid #707070;
    border-radius: 50%;
    z-index: 10000;
    margin: 60upx auto 0 auto;
    background: rgba($color: #ffffff, $alpha: 0.1);
    display: flex;
    justify-content: center;
}
.popupbox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
}
.mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 10000;
}
.space {
    width: 100%;
    height: 50upx;
}
button[type="default"] {
    background-color: #00b075;
}
</style>
