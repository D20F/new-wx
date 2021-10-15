<template>
    <view class="home">
        <image
            class="background"
            src="http://res.yitonginfo.com/xzwj/home/shadows.png"
            mode=""
        />
        <image
            class="backgrounds"
            src="http://res.yitonginfo.com/xzwj/home/shadow.png"
            mode=""
        />
        <view class="home_title">
            <text>首页</text>
        </view>
        <view class="search">
            <u-search
                placeholder="请输入搜索内容"
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

        <view class="swiper">
            <u-swiper
                :list="swiper_list"
                border-radius="20"
                @click="swiper_callback"
            ></u-swiper>
        </view>

        <view class="features">
            <view @click="jumpRouter('/pages/throughCar/through', 4)">
                <image src="http://res.yitonginfo.com/xzwj/home/list1.png" />
                <text>喀塔直通车</text>
            </view>
            <view @click="jumpRouter('/pages/tickets/tickets')">
                <image src="http://res.yitonginfo.com/xzwj/home/list4.png" />
                <text>景区门票</text>
            </view>
            <view @click="jumpRouter('/pages/hotel/hotel')">
                <image src="http://res.yitonginfo.com/xzwj/home/list3.png" />
                <text>旅游住宿</text>
            </view>
            <view @click="jumpRouter('/pages/carHire/index', 1)">
                <image src="http://res.yitonginfo.com/xzwj/home/list2.png" />
                <text>汽车租赁</text>
            </view>
        </view>

        <view class="gift">
            <image
                @click="jumpRouter('/pages/appointment/reserve/index')"
                src="http://res.yitonginfo.com/xzwj/home/gifts.png"
            />
            <image
                @click="jumpRouter('/mall/index')"
                src="http://res.yitonginfo.com/xzwj/home/gift.png"
            />
        </view>

        <view class="travel">
            <view class="title">
                <text>旅游攻略</text>
                <text @click="jumpRouter('/pages/travellingGuideline/list')"
                    >更多>></text
                >
            </view>
            <view class="scenery">
                <view
                    class="item"
                    v-for="(item, index) of travel_list"
                    :key="index"
                    @click="
                        jumpRouter(
                            '/pages/travellingGuideline/details',
                            item.id
                        )
                    "
                >
                    <image :src="item.image" />
                    <view>
                        <text>{{ item.title }}</text>
                        <text>{{ item.profile }}</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="attractions">
            <view class="title">
                <text>景点介绍</text>
                <text @click="jumpRouter('/pages/attractions/list')"
                    >更多>></text
                >
            </view>
            <view class="scenery">
                <view
                    class="item"
                    v-for="(item, index) of attractions"
                    :key="index"
                    @click="jumpRouter('/pages/attractions/details', item.id)"
                >
                    <image :src="item.image" />

                    <text>{{ item.title }}</text>
                    <text>{{ item.profile }}</text>
                </view>
            </view>
        </view>

        <phonePopup v-if="login_show"></phonePopup>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import phone_popup from "@/component/phone_popup/index";

import { getStorage } from "@/utils/storage.js";
import {
    getHomeRotationPage,
    getScenicSpotPage,
    getTravelGuidesPage,
} from "@/api/api_mapi";

export default {
    name: "home",
    data() {
        return {
            sitezh_state: false,
            searchVal: "",
            address: {},
            swiper_list: [],
            travel_list: [],
            attractions: [],
            phone_show: false,
        };
    },
    components: {
        phonePopup: phone_popup,
    },
    mixins: [public_mixin],
    onLoad(option) {
        this.init(option);
    },
    onShow() {},
    methods: {
        async init(option) {
            await getStorage("token")
                .then((r) => this.$store.commit("tokenFun", r))
                .catch((e) => console.log(e));
            await getStorage("userId")
                .then((r) => this.$store.commit("userIdFun", r))
                .catch((e) => console.log(e));
            await getStorage("openId")
                .then((r) => this.$store.commit("openIdFun", r))
                .catch((e) => console.log(e));
            await getStorage("account")
                .then((r) => this.$store.commit("accountFun", r))
                .catch((e) => console.log(e));
            await getStorage("avatar")
                .then((r) => this.$store.commit("avatarFun", r))
                .catch((e) => console.log(e));

            this.getHomeRotationPage();
            this.getScenicSpotPage();
            this.getTravelGuidesPage();

            this.version();
        },
        getHomeRotationPage() {
            getHomeRotationPage()
                .then((res) => {
                    // console.log(res);
                    let arr = [];
                    if (res.status == 200) {
                        for (const item of res.data) {
                            arr.push({
                                image: item.url,
                                id: item.id,
                                type: item.type,
                            });
                        }
                    }
                    this.swiper_list = arr;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTravelGuidesPage() {
            //  未加入 下拉加载 分页  后期添加
            let data = {
                current: 1,
                size: 6,
            };
            getTravelGuidesPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            arr.push({
                                image: item.coverUrl,
                                title: item.title,
                                profile: item.profile,
                                id: item.id,
                            });
                        }
                        this.travel_list = arr;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getScenicSpotPage(name) {
            //  未加入 下拉加载 分页  后期添加
            let data = {
                current: 1,
                size: 6,
                name: name || "",
            };
            getScenicSpotPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            arr.push({
                                image: item.coverUrl,
                                title: item.name,
                                id: item.id,
                                profile: item.profile,
                            });
                        }
                        this.attractions = arr;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        search(e) {
            this.jumpRouter("/pages/attractions/list", e);
        },
        version() {
            const updateManager = uni.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate);
            });
            updateManager.onUpdateReady(function () {
                uni.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启小程序",
                    success(res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        }
                    },
                });
            });
            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
                uni.showToast({
                    icon: "none",
                    title: "新版本更新失败,请重新启动小程序",
                });
            });
        },
        swiper_callback(i) {
            // 1: 图文介绍
            // 2: 汽车租聘
            // 3: 旅行社团
            // console.log(i);
            // console.log(this.swiper_list[i]);
            switch (this.swiper_list[i].type) {
                case 1:
                    this.jumpRouter("/pages/home/kashgar", 1);
                    break;
                case 2:
                    this.jumpRouter("/pages/carHire/index", 1);
                    break;
                case 3:
                    this.jumpRouter("/pages/travel/travel", 3);
                    break;
            }
        },
    },
    onPullDownRefresh() {
        this.getHomeRotationPage();
        this.getTravelGuidesPage();
        this.getScenicSpotPage();
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1500);
    },
    computed: {
        login_show() {
            return this.$store.state.public.login_show;
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.home {
    width: 100%;
    height: inherit;
    position: relative;
}
.home_title {
    width: 100%;
    height: 80upx;
    text-align: center;
    text {
        line-height: 100upx;
        color: #ffffff;
        font-size: 34upx;
    }
}
.background {
    position: fixed;
    width: 750upx;
    height: 128upx;
}
.backgrounds {
    position: fixed;
    top: 128upx;
    width: 750upx;
    height: 385upx;
}
.search {
    width: 90%;
    margin: 0 auto;
}
.swiper {
    width: 90%;
    height: 270upx;
    margin: 30upx auto 0 auto;
    display: block;
    border-radius: 10upx;
}
.features {
    width: 100%;
    height: 180upx;
    font-size: 15upx;
    margin-top: 30upx;
    display: flex;
    justify-content: space-around;
    view {
        width: 112upx;
        height: 112upx;
        border-radius: 24upx;
        image {
            width: 100%;
            height: 100%;
            margin-bottom: 8upx;
        }
        text {
            text-align: center;
            font-size: 25upx;
            white-space: nowrap;
        }
    }
}
.gift {
    width: 90%;
    margin: 15upx auto 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    image {
        width: 330upx;
        height: 173upx;
    }
}
.travel {
    width: 100%;
    margin-top: 20upx;
    .title {
        width: 90%;
        margin: 0 auto 20upx auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text:nth-child(1) {
            color: #242424;
            font-size: 36upx;
            font-weight: 600;
        }
        text:nth-child(2) {
            color: #999999;
            font-size: 26upx;
        }
    }
    .scenery {
        width: 95%;
        margin-left: 5%;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        .item {
            position: relative;
            display: inline-block;
            width: 254upx;
            height: 254upx;
            margin-right: 10upx;
            image {
                width: 100%;
                height: 100%;
                border-radius: 20upx;
            }
            view {
                width: 95%;
                position: absolute;
                bottom: 5%;
                left: 5%;
                text {
                    text-align: left;
                    white-space: normal;
                    // white-space: nowrap;
                    // text-overflow: ellipsis;
                    // overflow: hidden;
                }
                text:nth-child(1) {
                    color: #ffffff;
                    font-size: 30upx;
                    font-weight: 600;
                }
                text:nth-child(2) {
                    color: #ffffff;
                    font-size: 24upx;
                }
            }
        }
    }
}
.attractions {
    width: 100%;
    margin-top: 20upx;
    .title {
        width: 90%;
        margin: 0 auto 20upx auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text:nth-child(1) {
            color: #242424;
            font-size: 36upx;
            font-weight: 600;
        }
        text:nth-child(2) {
            color: #999999;
            font-size: 26upx;
        }
    }
    .scenery {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        .item {
            position: relative;
            width: 330upx;
            height: 315upx;
            margin-bottom: 15upx;
            image {
                width: 100%;
                height: 100%;
                border-radius: 20upx;
            }
            text {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            text:nth-child(2) {
                position: absolute;
                bottom: 55upx;
                left: 10upx;
                color: #ffffff;
                font-size: 30upx;
                font-weight: 600;
            }
            text:nth-child(3) {
                position: absolute;
                left: 10upx;
                bottom: 20upx;
                color: #ffffff;
                font-size: 24upx;
            }
        }
    }
}
</style>
