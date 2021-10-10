<template>
    <view class="switch">
        <view @click="confirm(0)" class="on" v-if="current == 0">
            <image
                src="http://res.yitonginfo.com/xzwj/my/complaintRecord/times.png"
                mode=""
            />
            <text>{{title[0]}}</text>
        </view>
        <view @click="confirm(0)" class="off" v-else-if="current !== 0">
            <image
                src="http://res.yitonginfo.com/xzwj/my/complaintRecord/time.png"
                mode=""
            />
            <text>{{title[0]}}</text>
        </view>
        <view @click="confirm(1)" class="on" v-if="current == 1">
            <image
                src="http://res.yitonginfo.com/xzwj/my/complaintRecord/finshs.png"
                mode=""
            />
            <text>{{title[1]}}</text>
        </view>
        <view @click="confirm(1)" class="off" v-else-if="current !== 1">
            <image
                src="http://res.yitonginfo.com/xzwj/my/complaintRecord/finsh.png"
                mode=""
            />
            <text>{{title[1]}}</text>
        </view>
    </view>
</template>
<script>
export default {
    name: "switchBtn",
    props: {
        title: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    created() {},
    data() {
        return {
            current: 0,
        };
    },
    methods: {
        confirm(index) {
            // console.log(index);
            this.current = index;
            this.$emit("confirm", index);
        },
    },
};
</script>

<style lang='scss'>
.switch {
    width: 100%;
    height: 120upx;
    position: fixed;
    display: flex;
    z-index: 10;
    justify-content: space-around;
    align-items: center;
    background: #f8fbff;

    view {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 188upx;
        height: 62upx;
        border-radius: 35upx;
        image {
            width: 32upx;
            height: 32upx;
        }
        text {
            font-size: 32upx;
        }
    }
    .on {
        background: #2d84ed;
        text {
            color: #ffffff;
        }
    }
    .off {
        background: #ffffff;
        text {
            color: #999999;
        }
    }
}
</style>