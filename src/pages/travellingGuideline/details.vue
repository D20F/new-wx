<template>
    <view class="view">
        <!-- <u-icon
            class="back"
            name="arrow-left"
            color="#FFFFFF"
            size="35"
            @click="back(1)"
        ></u-icon> -->

        <u-swiper :list="swiper_list" height="375"></u-swiper>
        <view class="introduce">
            <view class="header">
                <text class="title">{{ list.title }}</text>
                <view class="rate">
                    <view class="time">
                        <text> 发表日期: {{ list.time }} </text>
                        <text>发表人:{{ list.publisher }} </text>
                    </view>
                    <u-rate
                        active-color="#FFCE26"
                        inactive-icon="star-fill"
                        :current="list.score"
                        :disabled="true"
                    ></u-rate>
                </view>
            </view>
            <view class="content">
                <p>
                    {{ list.content }}
                </p>
                <image
                    v-for="(item, index) in contentList"
                    :key="index"
                    :src="item.image"
                    mode="widthFix"
                />
            </view>
        </view>

        <commentArea
            :list="comment"
            :reply="true"
            @changeRefresh="changeRefresh"
        />

        <view class="btn">
            <sendComment @send="send" />
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
import commentArea from "@/component/commentArea/index.vue";
import sendComment from "@/component/sendComment/index.vue";

import { getTravelGuidesDetails } from "@/api/api_mapi";

export default {
    name: "",
    data() {
        return {
            list: {
                title: "",
                time: "",
                content: "",
                score: "",
                id: "",
                publisher: "",
            },
            swiper_list: [],
            contentList: [],
            comment: [],
        };
    },
    components: {
        commentArea,
        sendComment,
    },
    mixins: [public_mixin],
    onLoad(option) {
        let id = JSON.parse(option.data);
        this.getTravelGuidesDetails(id);

        // 暂时使用假数据
        if (id == 3611302537592832) {
            let data = [
                {
                    name: "D20F",
                    time: "2021-09-29",
                    content: "淳朴、古典、优雅、美食、人文、市井，它都有",
                    avatarUrl:
                        "https://thirdwx.qlogo.cn/mmopen/vi_32/GO3MiaticreZdkicZge9LCVtG8XH2EgqXNP3h7ia1RQlZe56svkq2Bj4JTMVXajF7N3ACuLL7ic7dOpibQtUoxRF9Y9g/132",
                    id: 1,
                },
                {
                    name: "开到茶蘼",
                    time: "2021-09-29",
                    content: "最喜欢的巴扎，小时候无论买不买东西都会逛一圈",
                    avatarUrl:
                        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJKzIcE9GD5BcIXRAjoK3XiaZ3UT8L41kkAOPOYLpCNVn9Eb7vYelJV1YxqXqvibnI3fPTD3uVBsjgw/132",
                    id: 2,
                },
            ];
            this.comment = data;
        } else if (id == 3611278225965056) {
            let data = [
                {
                    name: "志勇",
                    time: "2021-09-29",
                    content: "此生必去，人间仙境也不过如此",
                    avatarUrl:
                        "https://thirdwx.qlogo.cn/mmopen/vi_32/PZjSdZonUbth4snWRPwxVkiaADuXDxTGt8ItXRnstwZOoCpqKCOicdRf8M9ofs2EFZcNnfgD6gWU3TIrMncHwrJA/132",
                    id: 1,
                },
                {
                    name: "碧蛾",
                    time: "2021-09-29",
                    content: "这个雪山是一年四季都存在的嘛",
                    avatarUrl:
                        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLaaic4OoAlPRibhib4GFWAP8MTvEG5pARZVY7BibNQA4zA8wCl4icrvTkaviam9vofMzHEH5cWQ1SZtYzw/132",
                    id: 2,
                },
                {
                    name: "曹明",
                    time: "2021-09-29",
                    content: "去这里要办边防证吗？",
                    avatarUrl:
                        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKw2BSAUB4gFU07IWMUVPQHAHoEzRibulzKvZZMxBVy9DKJ7slJIkOOIH0k9ibkxmrVhBO4a6SnBOVQ/132",
                    id: 3,
                },
            ];
            this.comment = data;
        } else if (id == 3611154930925568) {
            let data = [
                {
                    name: "笑看风云",
                    time: "2021-09-29",
                    content: "喀什老城一定要来打卡，绝对比丽江有意思的多",
                    avatarUrl:
                        "https://thirdwx.qlogo.cn/mmopen/vi_32/VUQn5YokkVia6khPUSnCiawbWRoqM0ojjxRd137dQ1K8QxFiaKMtFaJaR6SGzw2lYDkM0P3yibWHDbfrhNLNRt8GgA/132",
                    id: 1,
                },
                {
                    name: "阿元",
                    time: "2021-09-29",
                    content:
                        "去过的当地人最多的古城，非常有民族特色，各种手工产品超漂亮",
                    avatarUrl:
                        "https://thirdwx.qlogo.cn/mmopen/vi_32/MBsQ2DtUiaPCkaOGfqDH0GJ7VibYwr8IgWUoUTUW2zelqmFwvxbhaMicI1iaB7cMUnKuhPFLTOWicXibTUAicOtYDGTSw/132",
                    id: 2,
                },
            ];
            this.comment = data;
        }
    },
    onShow() {},
    methods: {
        changeRefresh() {
            // let data = {
            //     name: "昵称",
            //     time: "2021-02-11",
            //     content:
            //         "评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论",
            //     avatarUrl: "http://res.yitonginfo.com/xzwj/my/avatar.png",
            //     id: 1,
            //     reply: [
            //         {
            //             name: "昵称",
            //             time: "2021-02-11",
            //             content:
            //                 "评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论",
            //             avatarUrl:
            //                 "http://res.yitonginfo.com/xzwj/my/avatar.png",
            //         },
            //         {
            //             name: "昵称",
            //             time: "2021-02-11",
            //             content:
            //                 "评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论",
            //             avatarUrl:
            //                 "http://res.yitonginfo.com/xzwj/my/avatar.png",
            //         },
            //     ],
            // };
            // if (this.comment.length < 3) {
            //     this.comment = this.comment.concat(data);
            // }
            // console.log(this.comment);
        },
        getTravelGuidesDetails(id) {
            getTravelGuidesDetails(id)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.list = {
                            title: res.data.title,
                            score: res.data.lv,
                            time: res.data.createTime.split(" ")[0],
                            id: res.data.id,
                            publisher: res.data.publisher,
                            content: res.data.content,
                        };
                        let arr = [];
                        for (const item of res.data.rotationList) {
                            arr.push({
                                image: item.imageUrl,
                            });
                        }
                        this.swiper_list = arr;
                        let arrs = [];
                        for (const item of res.data.contentList) {
                            arrs.push({
                                image: item.imageUrl,
                            });
                        }
                        this.contentList = arrs;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        send(data) {
            console.log(data);
        },
    },
    computed: {},
};
</script>
<style lang="scss" scoped>
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #ffffff;
    padding-bottom: 140upx;
}
.back {
    position: fixed;
    top: 24upx;
    left: 24upx;
    z-index: 100;
}
.introduce {
    width: 100%;
    position: relative;
    top: -8upx;
    background: #ffffff;
    padding: 0 3%;
    border-radius: 20upx 20upx 0 0;
    .header {
        width: 100%;
        .title {
            text-align: left;
            color: #333333;
            line-height: 90upx;
            font-size: 32upx;
            font-weight: 600;
        }
        .rate {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25upx;
            .time {
                text {
                    line-height: 50upx;
                    text-align: left;
                    color: #818181;
                    font-size: 26upx;
                }
            }
        }
    }
    .content {
        width: 100%;
        margin: 0 auto;
        padding: 20upx 0;
        border-top: 2upx solid #eeeeee;
        border-bottom: 2upx solid #eeeeee;
        p {
            font-size: 28upx;
        }
        image {
            width: 100%;
            // height: 300upx;
            border-radius: 20upx;
        }
    }
}
.btn {
    width: 100%;
    height: 140upx;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    z-index: 10;

    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 2upx solid #eeeeee;
}
.add {
    width: 90upx;
    height: 90upx;
    position: fixed;
    bottom: 180upx;
    right: 15upx;
    border-radius: 20upx;
    background: #2d84ed;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
