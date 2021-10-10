<template>
    <view class="view">
        <text class="header"> 投诉内容 </text>
        <view class="content">
            <u-input
                class="textarea"
                v-model="content"
                placeholder="请描述你的投诉内容..."
                :customStyle="{ background: '#ffffff', padding: '10px' }"
                type="textarea"
                maxlength="200"
                height="340"
            >
            </u-input>
            <view class="connect">
                <view class="upload">
                    <u-upload
                        ref="uUpload"
                        width="160"
                        height="160"
                        :action="action"
                        :auto-upload="false"
                        :show-progress="false"
                        @on-uploaded="uploadedSuccess"
                        max-count="3"
                        :header="{
                            tokenType: 2,
                            token: $store.state.user.token,
                            userId: $store.state.user.userId,
                        }"
                    ></u-upload>
                </view>
                <view class="count">
                    <text> {{ content.length }}/200 </text>
                </view>
            </view>
        </view>
        <text class="header"> 联系方式 </text>
        <view class="phone">
            <u-input
                placeholder="请输入您的联系方式"
                :customStyle="{ background: '#ffffff', padding: '0 10px' }"
                v-model="phone"
            />
        </view>

        <view class="btn" @click="submit">
            <text>发布</text>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { regular_phone } from "@/utils/regular.js";
import { addComplaint } from "@/api/api_mapi";
export default {
    name: "complaint",
    data() {
        return {
            content: "",
            phone: "",
            action: "http://101.132.174.237:8075/upload/file", //上传地址
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {},
    onShow() {},
    methods: {
        uploadedSuccess(v) {
            let arr = [];
            for (let item of v) {
                arr.push(item.response.data);
            }
            let data = {
                content: this.content,
                mobile: this.phone,
                rotationList: arr,
            };
            addComplaint(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        uni.showToast({
                            icon: "none",
                            title: "上传成功",
                        });
                    }
                    setTimeout(() => {
                        this.back(1);
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        submit() {
            if (!regular_phone(this.phone)) {
                return uni.showToast({
                    icon: "none",
                    title: "请填写正确手机号",
                });
            }

            //上传图片
            this.$refs.uUpload.upload();
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
    max-height: 100%;
    position: relative;
    background: #f8fbff;
}
.header {
    width: 90%;
    height: 90upx;
    line-height: 90upx;
    margin: 0 auto;
    font-size: 34upx;
    color: #2d84ed;
    text-align: left;
}
.textarea {
    width: 90%;
    background: #ffffff;
    margin: 0 auto;
}
.content {
    width: 90%;
    margin: 0 auto;
    .connect {
        width: 100%;
        height: 180upx;
        padding: 0 10upx;
        background: #ffffff;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        .count {
            margin-right: 10upx;
            line-height: 300upx;
            text {
                color: #999999;
                font-size: 26upx;
            }
        }
    }
}
.phone {
    width: 90%;
    margin: 0 auto;
    background: "#ffffff";
}
.btn {
    width: 90%;
    height: 90upx;
    border-radius: 15upx;
    margin: 0 auto;
    text-align: center;
    // background: #dedede;
    background: #2d84ed;
    position: fixed;
    bottom: 40upx;
    left: 5%;
    text {
        color: #ffffff;
        line-height: 90upx;
        font-size: 32upx;
    }
}
</style>
