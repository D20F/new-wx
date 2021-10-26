<template>
    <view class="switch">
        <u-form :model="form">
            <u-form-item label="预约类型" label-width="150">
                <u-input
                    @click="selectShow"
                    :disabled="true"
                    type="select"
                    input-align="right"
                    placeholder="请选择类型"
                    :customStyle="{ color: '#2D84ED', overflowX: 'auto' }"
                    v-model="form.type"
                /> </u-form-item
        ></u-form>
        <view class="list">
            <view class="content">
                <view></view>
                <text>{{ content }}</text>
            </view>
            <view class="demonstrate" @click="tipShow = true">
                <u-icon
                    name="question-circle"
                    color="#2979ff"
                    size="29"
                ></u-icon>
                <text>示例查看</text>
            </view>
        </view>
        <u-select
            title="预约类型"
            v-model="show"
            valueName="id"
            labelName="title"
            :list="list"
            @confirm="changeType"
        ></u-select>
        <u-popup
            v-if="tipShow"
            v-model="tipShow"
            mode="center"
            closeable
            border-radius="20"
        >
            <video
                id="myVideo"
                style="border-radius: 10px; margin: 40px 10px 10px 10px"
                :show-fullscreen-btn="false"
                :src="videoUrl"
            ></video>
        </u-popup>
    </view>
</template>
<script>
export default {
    name: "selectType",
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
        videoUrl: {
            type: String,
            default: "",
        },
    },
    created() {},
    computed: {},
    data() {
        return {
            show: false,
            content: "请选择套餐",
            form: {
                type: "",
            },
            tipShow: false,
        };
    },
    methods: {
        selectShow() {
            if (this.list.length == 0) {
                return uni.showToast({
                    icon: "none",
                    title: "请选择上车时间",
                });
            }
            this.show = true;
        },
        changeType(e) {
            for (const item of this.list) {
                if (item.id == e[0].value) {
                    this.content = item.content;
                    this.form.type = item.title;
                    this.$emit("changeCombo", item);
                }
            }
        },
        setType(id) {
            for (const item of this.list) {
                if (item.id == id) {
                    this.content = item.content;
                    this.form.type = item.title;
                    this.$emit("changeCombo", item);
                }
            }
        },
        clear() {
            this.form.type = "";
            this.content = "请选择套餐";
        },
    },
};
</script>

<style lang='scss'>
.switch {
    width: 100%;
    position: relative;
    z-index: 10;
    background: #ffffff;
}
.list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16upx;
    .content {
        width: 520upx;
        display: flex;
        justify-content: left;
        align-items: center;
        view {
            width: 16upx;
            height: 16upx;
            background: #2d84ed;
            border-radius: 50%;
            margin-right: 15upx;
        }
        text {
            width: 509upx;
            text-align: left;
            font-size: 26upx;
            color: #2d84ed;
        }
    }
    .demonstrate {
        width: 150upx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text {
            color: #2d84ed;
            font-size: 29upx;
        }
    }
}
#myVideo {
    border-radius: 10px;
    margin: 40px 10px 10px 10px;
}
</style>