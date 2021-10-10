<template>
  <view class="main-wrap">
    <view class="search-wrap">
      <u-search
        :placeholder="searchOps.placeholder"
        :placeholder-color="searchOps.placeholderColor"
        v-model="keyword"
        :shape="searchOps.shape"
        :clearabled="searchOps.clearabled"
        :bg-color="searchOps.bgColor"
        :show-action="searchOps.showAction"
        :border-color="searchOps.borderColor"
        :search-icon-color="searchOps.searchIconColor"
        :input-style="searchOps.inputStyle"
        @search="search"
      ></u-search>
    </view>
    <view class="swiper">
      <u-swiper
        :list="swiper_list"
        name="imgUrl"
        height="360"
        border-radius="10"
        @click="swiper_callback"
      ></u-swiper>
    </view>
    <view class="top-slot-menu">
      <view
        class="menu-view"
        v-for="(item, index) in menuList"
        :key="index"
        @click="jumpTo('mall/commodityList/index', { id: item.id })"
      >
        <img :src="item.cover" alt="" />
      </view>
    </view>
    <view class="split">
      <u-row gutter="0">
        <u-col span="10" text-align="left">
          <view class="tab-bar">
            <text
              class="tab-area"
              v-for="item in tabs"
              :key="item.key"
              :class="'tab-' + currentTab === item.key ? 'current' : ''"
              @click="changeTab(item)"
              >{{ item.text }}</text
            >
          </view>
        </u-col>
        <u-col span="2" text-align="right">
          <view class="more" @click="more">
            更多
            <u-icon name="arrow-right-double" color="#FFF" size="28" />
          </view>
        </u-col>
      </u-row>
    </view>
    <card-flow-view :dataSource="flowList"></card-flow-view>
    <!-- <component :is="componentId"></component> -->
  </view>
</template>
<script>
// import components from "./advertise";
import cardFlowView from "@/component/business/mall/cardFlowView";
import { getMallBanner, getProductClassify, getProductPage } from "@/api/mall";
import { setStorage } from "@/utils/storage.js";
export default {
  data() {
    return {
      keyword: "",
      searchOps: {
        shape: "square",
        bgColor: "transparent",
        showAction: false,
        placeholder: "请输入搜索内容",
        placeholderColor: "#FFF",
        borderColor: "#FFF",
        searchIconColor: "#FFF",
        clearabled: false,
        inputStyle: {
          color: "#FFF",
        },
      },
      swiper_list: [],
      menuList: [],
      tabs: [
        {
          key: "tab-recommend",
          text: "热门推荐",
          type: 1,
        },
        {
          key: "tab-specialOffer",
          text: "特价商品",
          type: 2,
        },
        {
          key: "tab-spike",
          text: "限时秒杀",
          type: 3,
        },
      ],
      currentTab: "recommend",
      tabActive: 1,
      currPage: 1,
      totalPage: 1,
      flowList: [],
      componentId: "spike",
    };
  },
  components: {
    cardFlowView,
    //  ...components
  },
  onLoad() {
    this.getMallBanner();
    this.getProductClassify();
    this.getProductPage();
    // let d = {
    //   nickname: "zlzl",
    //   avatar:
    //     "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
    //   openId: "oPuSl4ulu5Nuo3fvuQpoes2Vnc5c",
    //   token: "082b60157f034aa694600338e89d1a99",
    //   userId: "3595314797150208",
    // };
    // setStorage("account", d.nickname);
    // setStorage("avatar", d.avatar);
    // setStorage("openId", d.openId);
    // setStorage("token", d.token);
    // setStorage("userId", d.userId);
    // this.$store.commit("accountFun", d.nickname);
    // this.$store.commit("avatarFun", d.avatar);
    // this.$store.commit("openIdFun", d.openId);
    // this.$store.commit("tokenFun", d.token);
    // this.$store.commit("userIdFun", d.userId);
  },
  onReachBottom() {
    if (this.currPage < this.totalPage) {
      this.currPage++;
      this.getProductPage();
    }
  },
  methods: {
    getMallBanner() {
      getMallBanner().then((res) => {
        this.swiper_list = res.data || [];
      });
    },
    getProductClassify() {
      getProductClassify().then((res) => {
        this.menuList = res.data || [];
      });
    },
    getProductPage() {
      getProductPage({
        current: this.currPage,
        type: this.tabActive,
      }).then((res) => {
        this.totalPage = res.data.pages;
        let list = res.data.records || [];
        this.flowList.push(...list);
      });
    },
    search() {
      if (this.keyword.trim() !== "") {
        this.$u.route({
          url: "mall/commodityList/index",
          params: {
            name: this.keyword,
          },
        });
      }
    },
    swiper_callback(v) {},
    jumpTo(url, params) {
      this.$u.route({
        url: url,
        params: params,
      });
    },
    changeTab(v) {
      this.currentTab = v.key.split("-")[1];
      this.tabActive = v.type;
      this.currPage = 1;
      this.flowList = [];
      this.getProductPage();
    },
    more() {
      this.$u.route({
        url: "mall/commodityList/index",
        params: {
          type: this.tabActive,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  background: #db2d2d;
  padding: 18rpx 25rpx;
  .swiper {
    width: 100%;
    height: 360rpx;
    margin: 18rpx 0;
    display: block;
    border-radius: 5rpx;
  }
  .top-slot-menu {
    padding: 9rpx 0 18rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    align-content: flex-start;
    justify-content: space-between;
    .menu-view {
      width: 340rpx;
      height: 173rpx;
      border-radius: 10rpx;
      margin-top: 10rpx;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .split {
    padding: 30rpx 0;
  }
  .tab-bar {
    font-size: 30rpx;
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    align-content: flex-start;
    justify-content: flex-start;
    .tab-area {
      margin-right: 38rpx;
      color: #ddd;
      vertical-align: middle;
      line-height: 40rpx;
      &.current {
        color: #fff;
        font-size: 36rpx;
      }
    }
  }
  .more {
    color: #fff;
    font-size: 26rpx;
  }
}
</style>