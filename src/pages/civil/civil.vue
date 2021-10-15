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
            style="height: 100%"
        >
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getConveniencePage(0)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in hospital"
                        :key="index"
                    >
                        <view>
                            <image :src="item.image" mode="" />
                        </view>
                        <view>
                            <text>{{ item.title }}</text>
                            <text>地址: {{ item.address }}</text>
                            <view @click="playPhone(item.phone)" class="phone">
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
                    <view class="space"> </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getConveniencePage(1)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in checkPoint"
                        :key="index"
                    >
                        <view>
                            <image :src="item.image" mode="" />
                        </view>
                        <view>
                            <text>{{ item.title }}</text>
                            <text>地址: {{ item.address }}</text>
                            <view @click="playPhone(item.phone)" class="phone">
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
                    <view class="space"> </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    :scroll-y="true"
                    @scrolltolower="getConveniencePage(2)"
                    class="exist"
                >
                    <view
                        class="item"
                        v-for="(item, index) in police"
                        :key="index"
                    >
                        <view>
                            <image :src="item.image" mode="" />
                        </view>
                        <view>
                            <text>{{ item.title }}</text>
                            <text>地址: {{ item.address }}</text>
                            <view @click="playPhone(item.phone)" class="phone">
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
                    <view class="space"> </view>
                </scroll-view>
            </swiper-item>
        </swiper>

        <phonePopup v-if="login_show"></phonePopup>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import phone_popup from "@/component/phone_popup/index";
import { getConveniencePage } from "@/api/api_mapi";

export default {
    name: "civil",
    data() {
        return {
            list: [
                {
                    name: "附近医院",
                },
                {
                    name: "核酸检测点",
                },
                {
                    name: "公共厕所",
                },
            ],
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0,
            hospital: [],
            checkPoint: [],
            police: [],
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
            ],
        };
    },
    components: {
        phonePopup: phone_popup,
    },
    mixins: [public_mixin],
    onLoad(option) {
        this.getConveniencePage(0);
    },
    onShow() {},
    methods: {
        getConveniencePage(i) {
            let data = {
                current: this.page[i].page,
                size: this.page[i].pageSize,
                type: i + 1,
            };
            getConveniencePage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            arr.push({
                                image: item.coverUrl,
                                title: item.title,
                                phone: item.mobile,
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
                            case 2:
                                this.police = [...this.police, ...arr];
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
            this.swiperCurrent = index;
            // console.log(index)

            switch (index) {
                case 0:
                    this.hospital.length == 0
                        ? this.getConveniencePage(index)
                        : void 0;
                    break;
                case 1:
                    this.checkPoint.length == 0
                        ? this.getConveniencePage(index)
                        : void 0;
                    break;
                case 2:
                    this.police.length == 0
                        ? this.getConveniencePage(index)
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
            // console.log(e);
            //swiper组件所需函数
            let current = e.detail.current;
            this.$refs.tabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;

            switch (current) {
                case 0:
                    this.hospital.length == 0
                        ? this.getConveniencePage(current)
                        : void 0;
                    break;
                case 1:
                    this.checkPoint.length == 0
                        ? this.getConveniencePage(current)
                        : void 0;
                    break;
                case 2:
                    this.police.length == 0
                        ? this.getConveniencePage(current)
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
    computed: {
        login_show() {
            return this.$store.state.public.login_show;
        },
    },
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
    justify-content: center;
    align-items: top;
    background: #ffffff;
    border-radius: 20upx;
    padding-top: 10upx;
    view:nth-child(1) {
        image {
            width: 173upx;
            height: 173upx;
            border-radius: 10upx;
        }
    }
    view:nth-child(2) {
        width: 70%;
        height: 100%;
        padding: 0 15upx;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        text {
            width: 100%;
            text-align: left;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
        }
        text:nth-child(1) {
            color: #333333;
            font-size: 32upx;
            font-weight: 600;
        }
        text:nth-child(2) {
            color: #818181;
            font-size: 26upx;
        }
        .phone {
            display: flex;
            justify-content: left;
            align-items: center;
            text {
                margin: 0 0 0 5upx;
                color: #2d84ed;
                font-size: 26upx;
            }
        }
    }
}
.space {
    height: 52upx;
}
</style>
