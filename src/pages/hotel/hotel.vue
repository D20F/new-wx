<template>
    <view class="civil">
        <u-tabs-swiper
            ref="tabs"
            class="u_tba"
            :list="list"
            active-color="#2D84ED"
            inactive-color="#CCCCCC"
            gutter="125"
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
                    @scrolltolower="getHotelPage(0)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in hospital"
                        :key="index"
                        @click="
                            jumpRouter('/pages/hotel/hotelDetails/index', item)
                        "
                    >
                        <view class="left">
                            <image :src="item.image" mode="" />
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ item.title }}</text>
                                <text>地址: {{ item.address }}</text>
                            </view>
                            <view class="rate">
                                <u-rate
                                    active-color="#FFCE26"
                                    inactive-icon="star-fill"
                                    :current="item.score"
                                    :disabled="true"
                                ></u-rate>
                                <text>
                                    ￥ {{ item.price }}
                                    <text>起</text>
                                </text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getHotelPage(1)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in checkPoint"
                        :key="index"
                        @click="
                            jumpRouter('/pages/hotel/hotelDetails/index', item)
                        "
                    >
                        <view class="left">
                            <image :src="item.image" mode="" />
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ item.title }}</text>
                                <text>地址: {{ item.address }}</text>
                            </view>
                            <view class="rate">
                                <u-rate
                                    active-color="#FFCE26"
                                    inactive-icon="star-fill"
                                    :current="item.score"
                                    :disabled="true"
                                ></u-rate>
                                <text>
                                    ￥ {{ item.price }}
                                    <text>起</text>
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
import { getHotelPage } from "@/api/api_mapi";

export default {
    name: "hotel",
    data() {
        return {
            list: [
                {
                    name: "民宿",
                },
                {
                    name: "酒店",
                },
            ],
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0,
            hospital: [],
            checkPoint: [],
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
            ],
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        this.getHotelPage(0);
    },
    onShow() {},
    methods: {
        getHotelPage(i) {
            let data = {
                current: this.page[i].page,
                size: this.page[i].pageSize,
                type: i + 1,
            };
            getHotelPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            arr.push({
                                image: item.coverUrl,
                                title: item.name,
                                score: item.lv,
                                price: item.minAmount,
                                address: item.address,
                                id: item.id,
                            });
                        }
                        switch (i) {
                            case 0:
                                this.hospital = [...this.hospital, ...arr];
                                break;
                            case 1:
                                this.checkPoint = [...this.checkPoint, ...arr];
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
                    this.hospital.length == 0
                        ? this.getHotelPage(index)
                        : void 0;
                    break;
                case 1:
                    this.checkPoint.length == 0
                        ? this.getHotelPage(index)
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
                    this.hospital.length == 0
                        ? this.getHotelPage(current)
                        : void 0;
                    break;
                case 1:
                    this.checkPoint.length == 0
                        ? this.getHotelPage(current)
                        : void 0;
                    break;
            }
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
    height: 200upx;
    margin: 0 auto 20upx auto;
    display: flex;
    justify-content: center;
    align-items: top;
    background: #ffffff;
    border-radius: 20upx;
    padding-top: 10upx;
    .left {
        image {
            width: 173upx;
            height: 173upx;
            border-radius: 12upx;
        }
    }
    .right {
        width: 70%;
         display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        .title {
            width: 100%;
            padding: 0 15upx;
            text {
                text-align: left;
            }
            text:nth-child(1) {
                color: #333333;
                font-size: 32upx;
                font-weight: 600;
                margin-bottom: 10upx;
            }
            text:nth-child(2) {
                color: #818181;
                font-size: 26upx;
            }
        }
        .rate {
            width: 100%;
            padding: 0 15upx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text {
                color: #2d84ed;
                font-size: 34upx;
                font-weight: 600;
                text {
                    margin-left: 8upx;
                    display: inline;
                    color: #818181;
                    font-size: 24upx;
                }
            }
        }
    }
}
</style>
