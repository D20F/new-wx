<template>
    <view class="card-flow-view">
        <u-waterfall v-model="flowList" ref="uWaterfall">
            <template v-slot:left="{ leftList }">
                <view class="list-left" style="margin-right: 10rpx">
                    <card-commodity
                        v-for="(item, index) in leftList"
                        :key="index"
                        :dataSource="item"
                    ></card-commodity>
                </view>
            </template>
            <template v-slot:right="{ rightList }">
                <view class="list-right" style="margin-left: 10rpx">
                    <card-commodity
                        v-for="(item, index) in rightList"
                        :key="index"
                        :dataSource="item"
                    ></card-commodity>
                </view>
            </template>
        </u-waterfall>
    </view>
</template>
<script>
import CardCommodity from "@/component/business/mall/cardCommodity";
export default {
    props: {
        refName: {
            type: String,
            defult: "uWaterfall",
        },
        dataSource: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    components: {
        CardCommodity,
    },
    data() {
        return {
            currentKey: 0,
            flowList: [],
        };
    },
    watch: {
        dataSource: {
            handler(val, oldVal) {
                if (Array.isArray(val)) {
                    if (!val.length) this.listClear();
                    this.flowList = JSON.parse(JSON.stringify(val));
                    // this.currentKey++
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        listClear() {
            if (this.$refs.uWaterfall) this.$refs.uWaterfall.clear();
        },
    },
};
</script>
<style lang="scss">
// .card-flow-view {
//   /deep/ .u-column {
//     margin-right: 30rpx;
//     &:nth-last-child(1) {
//       margin-right: 0;
//     }
//   }
// }
.list-left {
    margin-right: 10rpx;
}
.list-right {
    margin-left: 10rpx;
}
</style>