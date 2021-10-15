<template>
    <view class="main-wrap">
        <view class="content">
            <cartItem
                type="order"
                :dataSource="item"
                :dataIndex="index"
                v-for="(item, index) in cartList"
                :key="index"
            />
            <addrSele :dataSource="addr" />
            <view class="remark mall-card" style="padding: 0">
                <u-field
                    v-model="note"
                    label="订单备注"
                    placeholder="选填"
                    :border-bottom="false"
                >
                    <!-- type="textarea"
          :clearable="false" -->
                </u-field>
            </view>
        </view>
        <view class="bottom-fixed">
            <view class="total">
                <view class="price">
                    总价
                    <view class="unit">¥</view>
                    {{ total }}
                </view>
            </view>
            <view class="btns">
                <view style="width: 418rpx" class="btn btn-red" @click="buy"
                    >提交订单</view
                >
            </view>
        </view>
    </view>
</template>
<script>
import cartItem from "@/component/business/mall/cartItem";
import addrSele from "@/component/business/mall/addrSele";
import { myAddr, addOrder, wxPay } from "@/api/mall";
export default {
    components: { cartItem, addrSele },
    data() {
        return {
            cartList: [],
            total: 0,
            addr: null,
            note: "",
            shoppingCartList: [],
        };
    },
    onLoad() {
        let { goods, price } = this.$store.getters.getBuys;
        this.cartList = [...goods];
        this.total = price;
        this.shoppingCartList = this.cartList.map((item) => {
            return {
                id: item.id || "",
                productId: item.product.id,
                specificationId: item.specification.id,
                number: item.number,
            };
        });
        this.getAddr();
    },
    onShow() {
        if (this.$store.getters.getAddr) {
            this.addr = this.$store.getters.getAddr;
            this.$store.commit("setAddr", null);
        }
    },
    methods: {
        buy() {
            let that = this;
            if (!this.addr) {
                uni.showToast({
                    icon: "error",
                    title: "请选择地址",
                });
            } else {
                addOrder({
                    addressId: this.addr.id,
                    shoppingCartList: this.shoppingCartList,
                    note: this.note,
                }).then((res1) => {
                    if (res1.status == 200) {
                        wxPay({
                            orderId: res1.data.id,
                        }).then((res2) => {
                            uni.requestPayment({
                                provider: "wxpay",
                                timeStamp: res2.data.timeStamp,
                                nonceStr: res2.data.nonceStr,
                                package: res2.data.packageValue,
                                signType: res2.data.signType,
                                paySign: res2.data.paySign,
                                success: function (res3) {
                                    that.$u.route({
                                        url: "mall/commodity/index",
                                        params: {
                                            status: 1,
                                        },
                                        type: "redirectTo",
                                    });
                                },
                                fail: function (err) {
                                    that.$u.route({
                                        url: "mall/commodity/index",
                                        params: {
                                            status: 0,
                                        },
                                        type: "redirectTo",
                                    });
                                },
                            });
                        });
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: res.message,
                        });
                    }
                });
            }
        },
        getAddr() {
            myAddr().then((res) => {
                if (res.data) {
                    this.addr = res.data;
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/common/mall.scss";
.main-wrap {
    @include wrap();
    padding: 24rpx 24rpx 0;
    .content {
        padding-bottom: 200rpx;
        .remark {
            .u-field {
                padding: 0;
            }
        }
    }
    .bottom-fixed {
        @include flex(space-between, center);
        .total {
            width: calc(100% - 340rpx);
            @include flex(space-between);
            .price {
                color: $mall-red;
                font-size: 30rpx;
                @include flex();
                .unit {
                    padding: 0 12rpx;
                }
            }
        }
    }
}
</style>