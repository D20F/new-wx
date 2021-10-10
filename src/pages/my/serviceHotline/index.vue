<template>
    <view class="civil">
        <u-tabs-swiper
            ref="tabs"
            class="u_tba"
            :list="list"
            active-color="#2D84ED"
            inactive-color="#CCCCCC"
            gutter="90"
            :current="current"
            @change="tabsChange"
        ></u-tabs-swiper>
        <swiper
            :current="swiperCurrent"
            @transition="transition"
            @animationfinish="animationfinish"
            style="height: 94%"
        >
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getServiceHotLinePage(0)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in phones"
                        :key="index"
                    >
                        <view class="content">
                            <text>{{ item.title }}</text>
                            <text>地址: {{ item.address }}</text>
                            <view class="phone" @click="playPhone(item.phone)">
                                <u-icon
                                    name="phone"
                                    color="#2979ff"
                                    size="28"
                                ></u-icon>
                                <text>
                                    {{ item.phone }}
                                </text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getServiceHotLinePage(1)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in travelPhone"
                        :key="index"
                    >
                        <view class="content">
                            <text>{{ item.title }}</text>
                            <text>地址: {{ item.address }}</text>
                            <view class="phone" @click="playPhone(item.phone)">
                                <u-icon
                                    name="phone"
                                    color="#2979ff"
                                    size="28"
                                ></u-icon>
                                <text>
                                    {{ item.phone }}
                                </text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getServiceHotLinePage(2)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in police"
                        :key="index"
                    >
                        <view class="content">
                            <text>{{ item.title }}</text>
                            <text>地址: {{ item.address }}</text>
                            <view class="phone" @click="playPhone(item.phone)">
                                <u-icon
                                    name="phone"
                                    color="#2979ff"
                                    size="28"
                                ></u-icon>
                                <text>
                                    {{ item.phone }}
                                </text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getServiceHotLinePage(3)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in car"
                        :key="index"
                    >
                        <view class="content">
                            <text>{{ item.title }}</text>
                            <text>地址: {{ item.address }}</text>
                            <view class="phone" @click="playPhone(item.phone)">
                                <u-icon
                                    name="phone"
                                    color="#2979ff"
                                    size="28"
                                ></u-icon>
                                <text>
                                    {{ item.phone }}
                                </text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getServiceHotLinePage } from "@/api/api_mapi";

export default {
    name: "serviceHotline",
    data() {
        return {
            list: [
                {
                    name: "常用电话",
                },
                {
                    name: "旅游电话",
                },
                {
                    name: "组团",
                },
                {
                    name: "租车",
                },
            ],
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0,
            phones: [],
            travelPhone: [],
            police: [],
            car: [],
            page: [
                {
                    total: 0,
                    page: 1,
                    pageSize: 10,
                },
                {
                    total: 0,
                    page: 1,
                    pageSize: 10,
                },
                {
                    total: 0,
                    page: 1,
                    pageSize: 10,
                },
                {
                    total: 0,
                    page: 1,
                    pageSize: 10,
                },
            ],
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        this.getServiceHotLinePage(0);
    },
    onShow() {},
    methods: {
        getServiceHotLinePage(i) {
            let data = {
                current: this.page[i].page,
                size: this.page[i].pageSize,
                type: i + 1,
            };
            getServiceHotLinePage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            arr.push({
                                title: item.title,
                                phone: item.mobile,
                                address: item.address,
                                id: item.id,
                            });
                        }
                        switch (i) {
                            case 0:
                                this.phones = [...this.phones, ...arr];
                                break;
                            case 1:
                                this.travelPhone = [
                                    ...this.travelPhone,
                                    ...arr,
                                ];
                                break;
                            case 2:
                                this.police = [...this.police, ...arr];
                                break;
                            case 3:
                                this.car = [...this.car, ...arr];
                                break;
                        }
                        this.page[i].page = this.page[i].page + 1;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        tabsChange(index) {
            //swiper组件所需函数
            this.swiperCurrent = index;

            switch (index) {
                case 0:
                    this.phones.length == 0
                        ? this.getServiceHotLinePage(index)
                        : void 0;
                    break;
                case 1:
                    this.travelPhone.length == 0
                        ? this.getServiceHotLinePage(index)
                        : void 0;
                    break;
                case 2:
                    this.police.length == 0
                        ? this.getServiceHotLinePage(index)
                        : void 0;
                    break;
                case 3:
                    this.car.length == 0
                        ? this.getServiceHotLinePage(index)
                        : void 0;
                    break;
            }
        },
        transition(e) {
            //swiper组件所需函数
            let dx = e.detail.dx;
            this.$refs.tabs.setDx(dx);
        },
        animationfinish(e) {
            //swiper组件所需函数
            let current = e.detail.current;
            this.$refs.tabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;

            switch (current) {
                case 0:
                    this.phones.length == 0
                        ? this.getServiceHotLinePage(current)
                        : void 0;
                    break;
                case 1:
                    this.travelPhone.length == 0
                        ? this.getServiceHotLinePage(current)
                        : void 0;
                    break;
                case 2:
                    this.police.length == 0
                        ? this.getServiceHotLinePage(current)
                        : void 0;
                    break;
                case 3:
                    this.car.length == 0
                        ? this.getServiceHotLinePage(current)
                        : void 0;
                    break;
            }
        },
        playPhone(data) {
            uni.makePhoneCall({
                phoneNumber: data + "",
                success: () => {},
                fail: (err) => {},
            });
        },
    },
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.civil {
    width: 100%;
    height: inherit;
    position: relative;
    background: #f8fbff;
}
.exist {
    height: 100%;
    padding: 12upx 0 0 0;
}
.item {
    width: 90%;
    height: 220upx;
    margin: 0 auto 20upx auto;
    display: flex;
    justify-content: left;
    align-items: top;
    background: #ffffff;
    border-radius: 20upx;
    padding: 20upx;
    .content {
        width: 100%;
        height: 100%;
        text:nth-child(1) {
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
            margin-bottom: 15upx;
            color: #333333;
            font-size: 32upx;
            font-weight: 600;
        }
        text:nth-child(2) {
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
            margin-bottom: 15upx;
            color: #818181;
            font-size: 26upx;
        }
        .phone {
            width: 100%;
            display: flex;
            justify-content: left;
            align-items: center;
            text {
                color: #2d84ed;
                font-size: 26upx;
                margin-bottom: 0upx;
            }
        }
    }
}
</style>
