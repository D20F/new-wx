<template>
  <view class="main-wrap">
    <view class="split">
      <u-row gutter="0">
        <u-col span="12" text-align="left">
          <view class="tab-bar">
            <view
              class="tab-area"
              v-for="item in sortBarList"
              :key="item.key"
              @click="sortBy(item)"
              :class="item.key === currentKey ? 'current' : ''"
            >
              <view class="tab-area-container">{{ item.barName }}</view>
              <view class="sort-label" v-if="item.sort">
                <u-icon
                  class="arrow-up"
                  name="arrow-up"
                  :color="
                    item.current === 0 && item.key === currentKey
                      ? currentColor
                      : '#eee'
                  "
                  size="20"
                />
                <u-icon
                  class="arrow-down"
                  name="arrow-down"
                  :color="
                    item.current === 1 && item.key === currentKey
                      ? currentColor
                      : '#eee'
                  "
                  size="20"
                />
              </view>
            </view>
          </view>
        </u-col>
      </u-row>
    </view>
    <view class="divier"></view>
    <view class="flow-wrap">
      <card-flow-view class="container" :dataSource="flowList"></card-flow-view>
    </view>
  </view>
</template>
<script>
import cardFlowView from "@/component/business/mall/cardFlowView";
import { getProductPage } from "@/api/mall";
export default {
  data() {
    return {
      sortBarList: [
        {
          key: "composite",
          barName: "综合",
        },
        {
          key: "sales",
          barName: "销量",
          sort: true,
          current: 1,
        },
        {
          key: "price",
          barName: "价格",
          sort: true,
          current: 1,
        },
      ],
      currentColor: "#fff",
      currentKey: "composite",
      currPage: 1,
      totalPage: 1,
      flowList: [],
      params: {
        type: "",
        classify: "",
        name: "",
      },
    };
  },
  components: { cardFlowView },
  onLoad(options) {
    if (options.type) {
      this.params.type = options.type;
    } else if (options.id) {
      this.params.classify = options.id;
    }
    if (options.name) {
      this.params.name = options.name;
    }
    this.getProductPage();
  },
  onReachBottom() {
    if (this.currPage < this.totalPage) {
      this.currPage++;
      this.getProductPage();
    }
  },
  methods: {
    getProductPage() {
      let sort = "";
      if (this.currentKey == this.sortBarList[1].key) {
        sort = this.sortBarList[1].current == 1 ? "desc" : "asc";
      } else if (this.currentKey == this.sortBarList[2].key) {
        sort = this.sortBarList[2].current == 1 ? "desc" : "asc";
      }
      getProductPage({
        current: this.currPage,
        type: this.params.type,
        classify: this.params.classify,
        name: this.params.name,
        order: this.currentKey,
        sort: sort,
      }).then((res) => {
        this.totalPage = res.data.pages;
        let list = res.data.records || [];
        this.flowList.push(...list);
      });
    },
    sortBy(item) {
      if (this.currentKey === item.key && item.sort) {
        this.$set(item, "current", item.current === 0 ? 1 : 0);
      } else {
        this.currentKey = item.key;
      }
      this.currPage = 1;
      this.flowList = [];
      this.getProductPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.main-wrap {
  background: $mall-red;
  width: 100%;
  .split {
    margin-left: 0;
    margin-right: 0;
    padding: 30rpx 0;
  }
  .tab-bar {
    font-size: 30rpx;
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    align-content: flex-start;
    justify-content: flex-start;
    padding: 0 55rpx;
    .tab-area {
      margin-right: 130rpx;
      color: #eee;
      vertical-align: middle;
      line-height: 40rpx;

      display: flex;
      align-items: center;
      justify-content: center;
      &.current {
        color: #fff;
      }
      .sort-label {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: 10rpx;
        color: #c3c3c3;
        .arrow-up {
          top: 6rpx;
        }
        .arrow-down {
          bottom: 4rpx;
        }
      }
    }
  }
  // .container {
  //   padding: 0 25rpx;
  // }
  .divier {
    width: 100%;
    height: 2rpx;
    background: #e0e0e0;
  }
  .flow-wrap {
    padding: 0 25rpx;
  }
}
</style>