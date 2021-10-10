<template>
    <view class="view">
        <view class="content">
            <u-parse :html="content"></u-parse>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getConfigure } from "@/api/api_mapi";

export default {
    name: "about",
    data() {
        return {
            content: '',
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        getConfigure()
            .then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    this.content = res.data.content;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    onShow() {},
    methods: {},
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #f8fbff;
}
.content {
    width: 90%;
    height: inherit;
    position: relative;
    margin: 20upx auto 0 auto;
}
.footer {
    width: 90%;
    left: 5%;
    position: fixed;
    bottom: 100upx;
    text {
        text-align: center;
        font-size: 28upx;
        color: #999999;
    }
}
</style>
