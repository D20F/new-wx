<template>
    <view class="idCard">
        <text class="header">{{ disabled ? "身份证照片" : "上传身份证" }}</text>
        <view class="photo" @click="photograph('front')">
            <view v-if="idCardList.front == ''" class="camera">
                <view>
                    <u-icon size="50" color="#C8C8C8" name="camera"></u-icon>
                </view>
                <text>正面</text>
            </view>
            <view v-else class="onPhoto">
                <image :src="idCardList.front" mode="" />
            </view>
        </view>
        <view class="photo" @click="photograph('negative')">
            <view v-if="idCardList.negative == ''" class="camera">
                <view>
                    <u-icon size="50" color="#C8C8C8" name="camera"></u-icon>
                </view>
                <text>反面</text>
            </view>
            <view v-else class="onPhoto">
                <image :src="idCardList.negative" mode="" />
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: "btnGreen",
    props: {
        idCardList: {
            type: Object,
            default: () => {
                return {
                    front: "",
                    negative: "",
                };
            },
        },
        // 取消拍照功能 默认不开
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    created() {},
    data() {
        return {
            list: {
                front: "",
                negative: "",
            },
        };
    },
    methods: {
        photograph(data) {
            if (this.disabled) {
                return;
            }
            let that = this;
            let obj = this.idCardList;
            uni.chooseImage({
                count: 1,
                sizeType: ["original", "compressed"],
                sourceType: ["album", "camera"],
                success(res) {
                    // console.log(data, res);
                    if (data == "front") {
                        that.upload(res.tempFilePaths[0], "front");
                        // if (obj.front !== "" && obj.negative !== "") {
                        //     console.log(1);
                        // }
                    } else {
                        that.upload(res.tempFilePaths[0], "negative");
                        // if (obj.front !== "" && obj.negative !== "") {
                        //     console.log(1);
                        // }
                    }
                },
            });
        },
        confirm(data) {
            this.$emit("changeIdCard", data);
        },
        upload(file, type) {
            let that = this;
            let obj = this.idCardList;
            uni.showLoading({
                title: "上传中",
            });
            uni.uploadFile({
                header: {
                    tokenType: 2,
                    token: this.$store.state.user.token,
                    userId: this.$store.state.user.userId,
                },
                url: "http://101.132.174.237:8075/upload/image",
                filePath: file,
                name: "image",
                success: function (res) {
                    uni.hideLoading();
                    let val = JSON.parse(res.data);
                    // console.log(val);
                    if (val.status == 200) {
                        // console.log(val.data);
                        if (type == "front") {
                            obj.front = val.data;
                            that.confirm(obj);
                        } else {
                            obj.negative = val.data;
                            that.confirm(obj);
                        }
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: "上传失败",
                        });
                    }
                },
                fail: function (error) {
                    uni.hideLoading();
                    uni.showToast({
                        icon: "none",
                        title: "上传失败",
                    });
                },
            });
        },
    },
};
</script>
<style lang='scss'>
.idCard {
    width: 100%;
    .header {
        text-align: left;
        color: #333333;
        font-size: 28upx;
        line-height: 100upx;
    }
    .photo {
        width: 100%;
        height: 260upx;
        border-radius: 20upx;
        border: 1upx solid #c8c8c8;
        margin-bottom: 20upx;
        .camera {
            view {
                text-align: center;
                margin-top: 50upx;
            }
            text {
                font-size: 24upx;
                color: #c8c8c8;
            }
        }
        .onPhoto {
            width: 100%;
            height: 100%;
            image {
                width: 100%;
                height: 100%;
            }
        }
    }
    view {
    }
}
</style>