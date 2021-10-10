<template>
    <view class="civil">
        <view class="list">
            <scroll-view
                :scroll-y="true"
                @scrolltolower="getTravelGuidesPage"
                class="exist"
            >
                <view
                    class="item"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="
                        jumpRouter(
                            '/pages/travellingGuideline/details',
                            item.id
                        )
                    "
                >
                    <view class="left">
                        <image :src="item.image" mode="" />
                    </view>
                    <view class="right">
                        <view class="title">
                            <text>{{ item.title }}</text>
                        </view>
                        <view class="time">
                            <text>发表日期: {{ item.time }}</text>
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

        <view
            class="add"
            @click="jumpRouter('/pages/travellingGuideline/addGuideline')"
        >
            <u-icon size="50" color="#ffffff" name="plus"></u-icon>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getTravelGuidesPage } from "@/api/api_mapi";
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
        this.getTravelGuidesPage();
    },
    onShow() {},
    methods: {
        getTravelGuidesPage() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
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
                                time: item.createTime.split(" ")[0],
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
.add {
    width: 90upx;
    height: 90upx;
    position: fixed;
    bottom: 80upx;
    right: 50upx;
    border-radius: 20upx;
    background: #2d84ed;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
