<template>
    <view class="view">
        <view class="list">
            <view
                class="item"
                v-for="(item, index) in list"
                :key="index"
                @click="jump(item)"
            >
                <view class="selected">
                    <view class="off">
                        <view class="on" v-if="item.defaults"></view>
                    </view>
                    <image
                        class="arrow"
                        src="http://res.yitonginfo.com/xzwj/my/arrow.png"
                        mode=""
                    />
                </view>
                <text class="phone">
                    {{ item.name }}
                    <text>{{ item.mobile }}</text>
                </text>

                <text class="adress"> {{ item.area }}{{ item.address }}</text>
            </view>
        </view>
        <view class="btn">
            <view
                @click="
                    jumpRouter('/pages/my/userInformation/addAddress/index')
                "
            >
                <text>新增地址</text>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { setStorage } from "@/utils/storage.js";
import { addrList } from "@/api/mall";

export default {
    name: "myAddress",
    data() {
        return {
            list: [],
            pageType: "select",
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        // let d = {
        //   nickname: "zlzl",
        //   avatar:
        //     "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
        //   openId: "oPuSl4ulu5Nuo3fvuQpoes2Vnc5c",
        //   token: "863a27457ca3475ab222e1137fdaf3c1",
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
        this.pageType = option.type || "select";
        this.getAddrList();
    },
    onShow() {},
    methods: {
        getAddrList() {
            addrList().then((res) => {
                this.list = res.data;
            });
        },
        jump(item) {
            if (this.pageType == "select") {
                this.$store.commit("setAddr", item);
                this.$u.route({
                    type: "navigateBack",
                });
            } else {
                this.$u.route({
                    url: "/pages/my/userInformation/addAddress/index",
                    params: { id: item.id },
                });
            }
        },
    },
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.view {
    width: 100%;
    height: 100vh;
    // max-height: 100%;
    position: relative;
    background: #f8fbff;
    // background: #006bf7;
}

.list {
    width: 100%;
    height: calc(100% - 180upx);
    padding: 32upx 0;
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;
    .item {
        width: 90%;
        margin: 0 auto 20upx auto;
        background: #ffffff;
        border-radius: 15upx;
        padding: 25upx;
    }
    .arrow {
        width: 12upx;
        height: 22upx;
    }
    text {
        text-align: left;
    }
    .selected {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20upx;
        .off {
            width: 30upx;
            height: 30upx;
            border: 1upx solid #666666;
            border-radius: 50%;
        }
        .on {
            width: 18upx;
            height: 18upx;
            z-index: 10;
            margin: 4upx auto;
            background: #2d84ed;
            border-radius: 50%;
        }
    }
    .phone {
        font-size: 30upx;
        color: #333333;
        margin-bottom: 20upx;
        text {
            margin-left: 20upx;
            display: inline;
            font-size: 30upx;
            color: #666666;
        }
    }
    .address {
        font-size: 30upx;
        color: #333333;
    }
}
.btn {
    width: 100%;
    height: 180upx;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    z-index: 10;
    padding-top: 45upx;
    view {
        width: 90%;
        height: 90upx;
        border-radius: 15upx;
        margin: 0 auto;
        text-align: center;
        // background: #dedede;
        background: #2d84ed;
        position: relative;
        margin: 0 auto;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: 32upx;
        }
    }
}
</style>
