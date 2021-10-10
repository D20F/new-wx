<template>
    <view class="view">
        <view class="content">
            <u-parse :html="query.content"></u-parse>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getHomeRotationPage } from "@/api/api_mapi";

export default {
    name: "kashgar",
    data() {
        return {
            query: {
   
            },
   
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        let i = JSON.parse(option.data);
        this.getHomeRotationPage(i);
    },
    onShow() {},
    methods: {
        getHomeRotationPage(i) {
            getHomeRotationPage()
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        for (const item of res.data) {
                            if (item.type == i) {
                                this.query = item;
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
 
    },
    computed: {},
};
</script>
<style lang="scss" scoped>
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #ffffff;
}
.content {
    width: 100%;
    margin: 0 auto;
    padding: 20upx 0;
    border-top: 2upx solid #eeeeee;
    border-bottom: 2upx solid #eeeeee;
}
</style>
