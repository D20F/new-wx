<template>
    <view class="view">
        <text class="header"> 评价内容 </text>
        <view class="title">
            <u-input
                class="textarea"
                v-model="form.title"
                placeholder="请描述你的评价内容"
                :customStyle="{
                    background: '#ffffff',
                    padding: '10px',
                }"
                type="textarea"
                maxlength="300"
                height="50"
            >
            </u-input>
            <view class="connect">
                <view></view>
                <view class="count">
                    <text> {{ form.title.length }}/300 </text>
                </view>
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

export default {
    name: "",
    data() {
        return {
            form: {
                title: "",
            },
        };
    },
    components: {},
    mixins: [public_mixin],
   onLoad(option) {
        console.log(JSON.parse(option.data));
    },
    onShow() {},
    methods: {
        submit() {
            return console.log(this.form);
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

.btn {
    width: 90%;
    height: 90upx;
    border-radius: 15upx;
    text-align: center;
    background: #2d84ed;
    position: fixed;
    left: 5%;
    bottom: 30upx;
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
