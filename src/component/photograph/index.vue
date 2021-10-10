<template>
    <view class="idCard">
        <view class="photo" @click="photograph">
            <view v-if="imgUrl == ''" class="camera">
                <view>
                    <u-icon size="50" color="#C8C8C8" name="camera"></u-icon>
                </view>
            </view>
            <view v-else class="onPhoto">
                <image :src="imgUrl" mode="" />
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: "btnGreen",
    props: {
        imgUrl: {
            type: String,
            default: "",
        },
        // 取消拍照功能 默认不开
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    created() {},
    data() {
        return {};
    },
    methods: {
        photograph() {
            if (this.disabled) {
                return;
            }
            let that = this;
            uni.chooseImage({
                count: 1,
                sizeType: ["original", "compressed"],
                sourceType: ["album", "camera"],
                success(res) {
                    // console.log(res);
                    uni.showLoading({
                        title: "上传中",
                    });
                    uni.uploadFile({
                        header: {
                            tokenType: 2,
                            token: that.$store.state.user.token,
                            userId: that.$store.state.user.userId,
                        },
                        url: "http://101.132.174.237:8075/upload/image",
                        filePath: res.tempFilePaths[0],
                        name: "image",
                        success: function (res) {
                            uni.hideLoading();
                            let val = JSON.parse(res.data);
                            // console.log(val);
                            if (val.status == 200) {
                                // console.log(val.data);
                                that.confirm(val.data);
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
            });
        },
        confirm(data) {
            this.$emit("changeUrl", data);
        },
    },
};
</script>
<style lang='scss'>
.idCard {
    width: 100%;
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