<template>
    <view class="switch">
        <text class="title"> 预约类型 </text>
        <view class="list">
            <view class="item">
                <view
                    :class="{ on: current == index, off: current !== index }"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="confirm(index)"
                >
                    <text>{{ item.title }}</text>
                </view>
            </view>
            <view class="content">
                <view></view>
                <text>{{ content }}</text>
            </view>
        </view>
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
    },
    created() {},
    computed: {
        content() {
            if (this.list.length > 0 && this.current !== -1) {
                return this.list[this.current].content;
            } else {
                return "请选择套餐";
            }
        },
    },
    data() {
        return {
            current: -1,
        };
    },
    methods: {
        confirm(index) {
            // console.log(index);
            this.current = index;
            this.$emit("changeCombo", this.list[this.current]);
        },
        changeCurrent(data) {
            this.current = data;
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
.title {
    text-align: left;
    font-size: 28upx;
    font-weight: 500;
    color: #333333;
    line-height: 80upx;
}
.list {
    width: 100%;
    .item {
        width: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;
        view {
            // width: 140upx;
            margin: 0 20upx 16upx 0;
            padding: 0 20upx;
            height: 60upx;
            border-radius: 35upx;
            text {
                line-height: 60upx;
                font-size: 26upx;
            }
        }
    }
    .on {
        background: #2d84ed;
        text {
            color: #ffffff;
        }
    }
    .off {
        background: #f6f6f6;
        text {
            color: #999999;
        }
    }
}
.content {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 16upx;
    view {
        width: 16upx;
        height: 16upx;
        background: #2d84ed;
        border-radius: 50%;
        margin-right: 15upx;
    }
    text {
        text-align: left;
        font-size: 26upx;
        color: #2d84ed;
    }
}
</style>