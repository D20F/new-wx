<template>
  <view class="card-flow-view">
    <u-waterfall v-model="flowList" :ref="refName" :key="currentKey">
      <template v-slot:left="{ leftList }">
        <card-commodity
          v-for="(item, index) in leftList"
          :key="index"
          :dataSource="item"
        ></card-commodity>
      </template>
      <template v-slot:right="{ rightList }">
        <card-commodity
          v-for="(item, index) in rightList"
          :key="index"
          :dataSource="item"
        ></card-commodity>
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
          this.flowList = JSON.parse(JSON.stringify(val));
          this.currentKey++
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.card-flow-view {
  /deep/ .u-column {
    margin-right: 30rpx;
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
</style>