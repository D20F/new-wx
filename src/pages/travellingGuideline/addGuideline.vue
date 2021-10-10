<template>
    <view class="view">
        <text class="header"> 标题 </text>
        <view class="title">
            <u-input
                class="textarea"
                v-model="form.title"
                placeholder="请输入标题"
                :customStyle="{
                    background: '#ffffff',
                    padding: '10px',
                }"
                type="textarea"
                maxlength="20"
                height="50"
            >
            </u-input>
            <view class="connect">
                <view></view>
                <view class="count">
                    <text> {{ form.title.length }}/20 </text>
                </view>
            </view>
        </view>
        <text class="header"> 简介 </text>
        <view class="title">
            <u-input
                class="textarea"
                v-model="form.profile"
                placeholder="请输入简介"
                :customStyle="{
                    background: '#ffffff',
                    padding: '10px',
                }"
                type="textarea"
                maxlength="20"
                height="50"
            >
            </u-input>
            <view class="connect">
                <view></view>
                <view class="count">
                    <text> {{ form.profile.length }}/20 </text>
                </view>
            </view>
        </view>
        <text class="header"> 发布昵称 </text>
        <view class="title">
            <u-input
                class="textarea"
                v-model="form.publisher"
                placeholder="请输入发布人昵称"
                :customStyle="{
                    background: '#ffffff',
                    padding: '10px',
                }"
                type="textarea"
                maxlength="10"
                height="50"
            >
            </u-input>
            <view class="connect">
                <view></view>
                <view class="count">
                    <text> {{ form.publisher.length }}/10 </text>
                </view>
            </view>
        </view>

        <text class="header"> 封面图 </text>
        <view class="cover">
            <photograph :imgUrl="form.cover" @changeUrl="changeUrl" />
        </view>

        <text class="header"> 内容 </text>
        <view class="content">
            <u-input
                class="textarea"
                v-model="form.content"
                placeholder="请描述你的景点攻略..."
                :customStyle="{ background: '#ffffff', padding: '10px' }"
                type="textarea"
                maxlength="1000"
                height="250"
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
                    <text> {{ form.content.length }}/1000 </text>
                </view>
            </view>
        </view>

        <text class="header"> 推荐指数 </text>
        <view class="rate">
            <view class="connect">
                <u-rate
                    active-color="#FFCE26"
                    inactive-icon="star-fill"
                    v-model="form.score"
                ></u-rate>
            </view>
        </view>
        <view class="btn" @click="submit">
            <text>发布</text>
        </view>
        <view class="space"> </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import photograph from "@/component/photograph/index.vue";
import { addTravelGuides } from "@/api/api_mapi";

export default {
    name: "",
    data() {
        return {
            form: {
                title: "",
                content: "",
                profile: "",
                cover: "",
                score: 1,
                publisher: "",
                imgUrl: [],
            },
            action: "http://101.132.174.237:8075/upload/file", //上传地址
        };
    },
    components: { photograph },
    mixins: [public_mixin],
    onLoad(option) {},
    onShow() {},
    methods: {
        changeUrl(data) {
            this.form.cover = data;
        },
        uploadedSuccess(v) {
            let arr = [];
            for (let item of v) {
                arr.push(item.response.data);
            }
            let data = {
                title: this.form.title,
                content: this.form.content,
                profile: this.form.profile,
                lv: this.form.score,
                coverUrl: this.form.cover,
                publisher: this.form.publisher,
                rotationList: arr,
                contentList: arr,
            };
            addTravelGuides(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        uni.showToast({
                            icon: "none",
                            title: "创建成功",
                        });
                    }
                    uni.hideLoading();
                    setTimeout(() => {
                        this.back(1);
                    }, 1000);
                })
                .catch((err) => {
                    uni.hideLoading();
                    console.log(err);
                });
        },
        submit() {
            //上传图片
            this.$refs.uUpload.upload();
            uni.showLoading({
                title: "加载中",
            });
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
}
.title {
    width: 90%;
    margin: 0 auto;
    .connect {
        width: 100%;
        height: 80upx;
        padding: 0 10upx;
        background: #ffffff;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        .count {
            margin-right: 10upx;
            line-height: 50upx;
            text {
                color: #999999;
                font-size: 26upx;
            }
        }
    }
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
            line-height: 280upx;
            text {
                color: #999999;
                font-size: 26upx;
            }
        }
    }
}
.rate {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 30upx;
    .connect {
        width: 100%;
        height: 90upx;
        padding: 23upx 10upx;
        background: #ffffff;
        margin: 0 auto;
    }
}
.cover {
    width: 90%;
    height: 260upx;
    margin: 0 auto;
    background: #ffffff;
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
    background: #2d84ed;
    position: relative;
    text {
        color: #ffffff;
        line-height: 90upx;
        font-size: 32upx;
    }
}
.space {
    width: 100%;
    height: 30upx;
}
</style>
