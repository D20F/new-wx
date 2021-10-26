<template>
    <view class="search">
        <u-search
            :placeholder="placeholder[current].title"
            v-model="searchVal"
            :show-action="true"
            @search="search"
            @custom="search"
            :action-style="{
                height: '64rpx',
                borderRadius: '40rpx',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100rpx',
                background: '#ffffff',
            }"
        ></u-search>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "search",
    data() {
        return {
            searchVal: "",
            placeholder: [
                {
                    title: "喀塔直通车",
                    url: "/pages/throughCar/through",
                },
                {
                    title: "景区门票",
                    url: "/pages/tickets/tickets",
                },
                {
                    title: "旅游住宿",
                    url: "/pages/hotel/hotel",
                },
                {
                    title: "汽车租赁",
                    url: "/pages/carHire/index",
                },
                {
                    title: "边防证办理",
                    url: "/pages/appointment/reserve/index",
                },
                {
                    title: "喀什礼物",
                    url: "/mall/index",
                },
                {
                    title: "旅游攻略",
                    url: "/pages/travellingGuideline/list",
                },
                {
                    title: "景区介绍",
                    url: "/pages/attractions/list",
                },
                {
                    title: "美食打卡",
                    url: "/pages/delicacy/list",
                },
            ],
            interval: "",
            current: 0,
        };
    },
    components: {},
    mixins: [public_mixin],
    created() {
        this.interval = setInterval(() => {
            this.current == 8 ? (this.current = 0) : (this.current += 1);
        }, 2500);
    },
    methods: {
        search(e) {
            // this.searchVal == ""
            //     ? this.jumpRouter(this.placeholder[this.current].url)
            //     : this.jumpRouter("/pages/attractions/list", e);
            this.searchVal == ""
                ? this.jumpRouter(this.placeholder[this.current].url)
                : void 0;
        },
    },
    computed: {},
    beforeDestroy() {
        clearInterval(this.interval);
    },
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";

.search {
    width: 90%;
    margin: 0 auto;
}
</style>
