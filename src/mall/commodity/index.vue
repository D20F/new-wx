<template>
  <view class="main-wrap">
    <view class="tab-wrap">
      <view class="u-tabs-box">
        <u-tabs
          ref="tabs"
          :list="tabList"
          active-color="#DB2D2D"
          inactive-color="#666666"
          font-size="34"
          @change="tabChange"
          :current="current"
        ></u-tabs>
      </view>
    </view>
    <view class="card-list-wrap">
      <order-list :datasource="orderCardList"></order-list>
    </view>
  </view>
</template>

<script>
import orderList from "@/component/business/mall/cardListView";
import { getOrders } from "@/api/mall";
import { setStorage } from "@/utils/storage.js";
export default {
  data() {
    return {
      tabList: [
        {
          name: "待付款",
        },
        {
          name: "待发货",
        },
        {
          name: "待收货",
        },
        {
          name: "已完成",
        },
        {
          name: "退款",
        },
      ],
      statusEnum: {
        0: {
          name: "待付款",
          id: 1,
        },
        1: {
          name: "待发货",
          id: 2,
        },
        2: {
          name: "待收货",
          id: 3,
        },
        3: {
          name: "已完成",
          id: 5,
        },
        4: {
          name: "退款",
          id: 6,
        },
      },
      current: 0,
      orderCardList: [],
      currPage: 1,
      totalPage: 1,
    };
  },
  components: {
    orderList,
  },
  onLoad(options) {
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
    this.current = options.status || 0;
    this.getOrders();
  },
  onReachBottom() {
    if (this.currPage < this.totalPage) {
      this.currPage++;
      this.getOrders();
    }
  },
  methods: {
    tabChange(v) {
      this.current = v;
      this.currPage = 1;
      this.orderCardList = [];
      this.getOrders();
    },
    getOrders() {
      getOrders({
        current: this.currPage,
        status: this.statusEnum[this.current].id,
      }).then((res) => {
        this.totalPage = res.data.pages;
        let list = res.data.records || [];
        this.orderCardList.push(...list);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  background: #f8fbff;
  .tab-wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .card-list-wrap {
    position: relative;
    top: 94rpx;
  }
}
</style>