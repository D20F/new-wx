<template>
    <view class="view">
        <view class="list">
            <view
                class="item"
                v-for="(item, index) in list"
                :key="index"
                @click="jump(item)"
            >
                <view class="left">
                    <image
                        v-if="item.mode == 1"
                        src="http://res.yitonginfo.com/xzwj/my/message/reply.png"
                        alt=""
                    />
                    <image
                        v-else
                        src="http://res.yitonginfo.com/xzwj/my/message/system.png"
                        alt=""
                    />
                </view>
                <view class="right">
                    <view class="title">
                        <text>{{
                            item.mode == 1 ? "系统通知" : "回复通知"
                        }}</text>
                        <text>{{ item.createTime }}</text>
                    </view>
                    <text class="content">{{ item.content }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getMessage } from "@/api/api_mapi";

export default {
    name: "message",
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
        this.getMessage();
    },
    onShow() {},
    onReachBottom() {
        this.getMessage();
    },
    methods: {
        getMessage() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
            };
            getMessage(data)
                .then((res) => {
                    if (res.status == 200) {
                        this.list = [...this.list, ...res.data.records];
                        this.page.page = this.page.page + 1;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        jump(item) {
            item.mode == 1
                ? this.jumpRouter(
                      "/pages/my/message/systemNotification/index",
                      item
                  )
                : this.jumpRouter(
                      "/pages/my/message/replyNotification/index",
                      item
                  );
        },
    },
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #ffffff;
}
.list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    padding-top: 30upx;
    .item {
        width: 90%;
        height: 100upx;
        margin: 0 auto 40upx auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .left {
        width: 92upx;
        height: 92upx;
        image {
            width: 100%;
            height: 100%;
        }
    }
    .right {
        width: 563upx;
        height: 100upx;
        border-bottom: 1px solid #dfdfdf;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text:nth-child(1) {
                color: #333333;
                font-size: 32upx;
                margin-bottom: 10upx;
            }
            text:nth-child(2) {
                color: #666666;
                font-size: 28upx;
            }
        }
        .content {
            text-align: left;
            color: #666666;
            font-size: 28upx;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
}
</style>
