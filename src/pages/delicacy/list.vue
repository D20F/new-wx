<template>
    <view class="civil">
        <view class="list">
            <scroll-view
                :scroll-y="true"
                @scrolltolower="getFoodClockPage"
                class="exist"
            >
                <view
                    class="item"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="jumpRouter('/pages/delicacy/details', item.id)"
                >
                    <view class="left">
                        <image :src="item.image" mode="" />
                    </view>
                    <view class="right">
                        <view class="title">
                            <text>{{ item.title }}</text>
                        </view>
                        <view class="time">
                            <text>开放时间: {{ item.time }}</text>
                        </view>
                        <view class="rate">
                            <u-rate
                                active-color="#FFCE26"
                                inactive-icon="star-fill"
                                :current="item.score"
                                :disabled="true"
                            ></u-rate>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getFoodClockPage } from "@/api/api_mapi";

export default {
    name: "",
    data() {
        return {
            list: [],
            page: {
                total: 0,
                page: 1,
                pageSize: 10,
            },
        };
    },
    components: {},
    mixins: [public_mixin],
    onLoad(option) {
        option.data !== undefined
            ? this.getFoodClockPage(JSON.parse(option.data))
            : this.getFoodClockPage();
    },
    onShow() {},
    methods: {
        getFoodClockPage(name) {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
                name: name || "",
            };
            getFoodClockPage(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data.records) {
                            arr.push({
                                image: item.coverUrl,
                                title: item.name,
                                time: item.startTime + " ~ " + item.endTime,
                                score: item.lv,
                                id: item.id,
                            });
                        }
                        this.list = [...this.list, ...arr];
                        this.page.page = this.page.page + 1;
                    }
                })
                .catch((err) => {
                    console.log(err);
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
}
.list {
    width: 100%;
    height: 100%;
    padding: 12upx 0 0 0;
    position: absolute;
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
                color: #333333;
                font-size: 32upx;
                font-weight: 600;
            }
        }
        .time {
            width: 100%;
            padding: 0 15upx;
            text {
                text-align: left;
                color: #818181;
                font-size: 26upx;
            }
        }
        .rate {
            width: 100%;
            padding: 0 15upx;
            text-align: left;
        }
    }
}
</style>
