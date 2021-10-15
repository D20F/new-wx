<template>
    <view class="card-commodity-warter" @click="view">
        <slot>
            <u-lazy-load
                class="card-commodity-image"
                threshold="-450"
                border-radius="24"
                :image="dataSource[keyMap.image]"
                :index="dataSource.index"
            ></u-lazy-load>
            <view class="card-commodity">
                <view class="card-commodity-title">
                    {{ dataSource[keyMap.title] }}
                </view>
                <view class="card-commodity-tag">
                    <view class="card-commodity-tag-text">
                        已售: {{ dataSource[keyMap.sales] }}
                    </view>
                </view>
                <view class="card-commodity-price">
                    <view class="card-commodity-new-price">
                        ￥
                        <view class="num">{{ dataSource[keyMap.price] }}</view
                        >元
                    </view>
                    <!-- <view class="card-commodity-original-price">
            ￥ {{ dataSource[keyMap.originalPrice] }}元
          </view> -->
                </view>
            </view>
        </slot>
    </view>
</template>
<script>
export default {
    props: {
        dataSource: {
            type: Object,
            default: () => {
                return {};
            },
        },
        keyMap: {
            type: Object,
            default: () => {
                return {
                    image: "cover",
                    title: "name",
                    sales: "salesCount",
                    price: "minPrice",
                    // originalPrice: "originalPrice",
                };
            },
        },
    },
    data() {
        return {};
    },
    methods: {
        view() {
            this.$u.route({
                url: "/mall/detail/index",
                params: {
                    id: this.dataSource.id,
                },
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.card-commodity-warter {
    border-radius: 24rpx;
    background-color: #ffffff;
    position: relative;
    margin-top: 20rpx;
    border: 1px solid #db2d2d;
    overflow: hidden;
}

.card-commodity-image {
    width: 100%;
    border-radius: 24rpx 24rpx 0 0 !important;
    /deep/ .u-lazy-item {
        border-radius: 24rpx 24rpx 0 0 !important;
    }
}

.card-commodity {
    padding: 16rpx;
}

.card-commodity-title {
    font-size: 30rpx;
    color: $u-main-color;
}

.card-commodity-tag {
    margin-top: 5px;
}

.card-commodity-tag-text {
    color: #999;
    border-radius: 50rpx;
    line-height: 1;
    padding: 4rpx 0;
    display: flex;
    align-items: flex-start;
    font-size: 24rpx;
}

.card-commodity-price {
    font-size: 34rpx;
    color: $u-type-error;
    margin-top: 5px;
    display: flex;
    align-items: flex-end;
    .card-commodity-original-price {
        font-size: 24rpx;
        color: #999;
        line-height: 40rpx;
        text-decoration: line-through;
        vertical-align: middle;
        margin-left: 20rpx;
    }
    .num {
        font-size: 40rpx;
        font-weight: bold;
        display: inline-block;
    }
}
</style>