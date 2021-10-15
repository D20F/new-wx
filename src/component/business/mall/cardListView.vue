<template>
  <view>
    <card-order
      v-for="(item, index) in viewList"
      :key="index"
      :datasource="item"
      :type="type"
    ></card-order>
  </view>
</template>

<script>
import cardOrder from "@/component/business/mall/cardOrder";
export default {
  props: {
    type: {
      type: String,
      default: "order",
    },
    interface: {
      type: Object,
      default() {
        return {
          url: "",
          method: "Get",
        };
      },
    },
    datasource: {
      type: Array,
      default() {
        return [];
      },
    },
    fieldMap: {
      type: Object,
      default() {
        return {
          orderNo: "orderNo",
          orderType: "orderType",
          orderList: "orderList",
          len: "len",
        };
      },
    },
  },
  data() {
    return {
      viewList: [],
    };
  },
  components: {
    cardOrder,
  },
  watch: {
    datasource: {
      handler(val, oldval) {
        this.viewList = JSON.parse(JSON.stringify(val));
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
