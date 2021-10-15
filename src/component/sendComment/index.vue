<template>
    <view class="send">
        <view>
            <u-input
                :focus="focusVal"
                v-model="val"
                placeholder="是不是想说些什么？"
                type="text"
                border
                :customStyle="{ color: '#2D84ED' }"
                @click="show = true"
                maxlength="200"
            />
        </view>
        <view @click="send">
            <text>发送</text>
        </view>
    </view>
</template>
<script>
export default {
    name: "sendComment",
    props: {
        focus: {
            type: Boolean,
            default: false,
        },
    },
    created() {},
    data() {
        return {
            val: "",
            focusVal: false,
        };
    },
    methods: {
        send() {
            this.$emit("send", this.val);
            this.val = "";
        },
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.focusVal = this.focus;
            }, 250);
        });
    },
    beforeDestroy() {},
};
</script>
<style lang='scss' scoped>
.send {
    position: relative;
    width: 750upx;
    height: 140upx;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #ffffff;
    view:nth-child(1) {
        width: 600upx;
        background: #eeeeee;
    }
    view:nth-child(2) {
        text {
            text-align: left;
            font-size: 30upx;
            color: #2d84ed;
        }
    }
}
</style>