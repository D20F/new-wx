<template>
    <view class="like" @click="addLikes">
        <u-icon
            name="thumb-up-fill"
            :color="likes || cacheLikes ? '#DB2D2D' : '#818181'"
            size="30"
        ></u-icon>
        <text
            v-if="countDisabled"
            :class="{
                on: likes || cacheLikes,
                off: !(likes || cacheLikes),
            }"
            >{{ baseCount + likesCount + cacheLikesCount }}</text
        >
    </view>
</template>
<script>
import { addLikes } from "@/api/api_mapi";

export default {
    name: "btnLike",
    props: {
        countDisabled: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        likes: {
            type: Boolean,
            default: false,
        },
        likeId: {
            type: String,
            default: "1",
        },
        type: {
            type: Number,
            default: 0,
        },
        baseCount: {
            type: [String, Number],
            default: 0,
        },
        likesCount: {
            type: [String, Number],
            default: 0,
        },
    },
    created() {},
    data() {
        return {
            cacheLikes: false,
            cacheLikesCount: 0,
        };
    },
    methods: {
        addLikes() {
            if (this.disabled) {
                return;
            }
            addLikes(this.likeId, {
                type: this.type,
            }).then((res) => {
                if (res.status == 200) {
                    this.cacheLikes = true;
                    this.cacheLikesCount = 1;
                    uni.showToast({
                        title: "点赞成功",
                    });
                }
            });
        },
    },
};
</script>
<style lang='scss'>
.like {
    display: flex;
    height: 50upx;
    align-items: center;
    justify-content: flex-end;
    width: 90%;
    margin: 0 auto;
    text {
        margin-left: 10upx;
        font-size: 30upx;
    }
}
.on {
    color: #db2d2d;
}
.off {
    color: #818181;
}
</style>