<template>
    <view class="view">
        <view class="title">
            <image :src="form.hotel.coverUrl" mode="" />
            <view>
                <text>{{ form.hotel.name }}</text>
                <text class="red" v-if="form.status == -1">已取消</text>
                <text class="yellow" v-else-if="form.status == 1">待支付</text>
                <text class="gray" v-else-if="form.status == 2">待使用</text>
                <text class="gray" v-else-if="form.status == 3">已完成</text>
                <text class="gray" v-else-if="form.status == 4">已过期</text>
            </view>
            <text>{{ form.hotel.address }}</text>
            <view class="line"></view>
        </view>
        <view class="formBox">
            <u-form :model="form" ref="uForm">
                <u-form-item label="入住时间:" label-width="150">
                    <u-input
                        :disabled="true"
                        input-align="left"
                        placeholder=""
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.makeDate"
                    />
                </u-form-item>
                <u-form-item label="离店时间:" label-width="150">
                    <u-input
                        :disabled="true"
                        input-align="left"
                        placeholder=""
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.leaveDate"
                    />
                </u-form-item>
                <u-form-item label="住客姓名:" label-width="150">
                    <u-input
                        :disabled="true"
                        placeholder=""
                        input-align="left"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.reserveName"
                    />
                </u-form-item>
                <u-form-item label="联系方式:" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder=""
                        input-align="left"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.mobile"
                    />
                </u-form-item>
                <u-form-item label="房间类型:" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder=""
                        input-align="left"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.comboName"
                    />
                </u-form-item>

                <u-form-item label="购买数量:" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder=""
                        input-align="left"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.quantity"
                    />
                </u-form-item>
            </u-form>
        </view>

        <view class="orderFooter">
            <text
                >订单类型:
                <text>旅游住宿</text>
            </text>
            <text
                >订单编号:
                <text>{{ form.id }}</text>
            </text>
            <text
                >交易时间:
                <text>{{ form.createTime }}</text>
            </text>
        </view>

        <view class="tip">
            <text>温馨提示</text>
            <text>{{ form.hotel.reminder }}</text>
        </view>

        <view class="btn">
            <view class="title">
                <text>总价 </text>
                <text> ￥ {{ form.payAmount }} </text>
            </view>

            <view class="cancel" v-if="form.status == 1">
                <view @click="cancel">
                    <text> 取消订单 </text>
                </view>
                <view @click="pay">
                    <text> 去支付 </text>
                </view>
            </view>
            <view class="cancel" v-else-if="form.status == 2">
                <view @click="cancel">
                    <text> 取消订单 </text>
                </view>
                <view @click="confirm">
                    <text> 去使用 </text>
                </view>
            </view>
            <view v-else-if="form.status == 3" class="complete">
                <view class="complete_one">
                    <text> 已完成 </text>
                </view>
                <view
                    class="complete_two"
                    @click="jumpRouter('/pages/hotel/comment/index', form)"
                >
                    <text> 去评价 </text>
                </view>
                <view class="complete_three">
                    <btnLike
                        :countDisabled="false"
                        :likes="form.likes"
                        :likeId="form.id"
                        :type="2"
                    />
                </view>
            </view>
            <view v-else-if="form.status == 5" class="completes">
                <view class="complete_one">
                    <text> 已完成 </text>
                </view>
                <view
                    class="complete_two"
                >
                    <text> 已评价 </text>
                </view>
                <view class="complete_three">
                    <btnLike
                        :countDisabled="false"
                        :likes="form.likes"
                        :likeId="form.id"
                        :type="2"
                    />
                </view>
            </view>
            <view class="repeat" v-else-if="form.status == -1">
                <view>
                    <text> 已取消 </text>
                </view>
                <view @click="againOrder">
                    <text> 重新下单 </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { wxReservePay, cancelOrder } from "@/api/api_mapi";
import btnLike from "@/component/btnLike/index.vue";

export default {
    name: "",
    data() {
        return {
            form: {},
        };
    },
    components: { btnLike },
    mixins: [public_mixin],
    onLoad(option) {
        let query = JSON.parse(option.data);
        query["reOrder"] = true;
        this.form = query;
        console.log(JSON.parse(option.data));
    },
    created() {},
    methods: {
        cancel() {
            cancelOrder(this.form.id)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        uni.showToast({
                            icon: "none",
                            title: "成功取消",
                        });
                        setTimeout(() => {
                            this.back(1);
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        pay() {
            let data = {
                orderId: this.form.id,
            };
            let that = this;
            wxReservePay(data)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        wx.requestPayment({
                            appId: res.data.appId,
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.packageValue,
                            signType: res.data.signType,
                            paySign: res.data.paySign,
                            success: function (res) {
                                console.log(res);
                                uni.showToast({
                                    icon: "none",
                                    title: "支付成功",
                                });
                                setTimeout(() => {
                                    that.back(1);
                                }, 1000);
                            },
                            fail: function (res) {
                                console.log(res);
                                uni.showToast({
                                    icon: "none",
                                    title: "支付失败",
                                });
                            },
                            complete: function (res) {},
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        againOrder() {
            this.jumpRouter("/pages/hotel/reserveHotel/index", this.form);
        },
        confirm() {
            uni.showModal({
                title: "验证码",
                content: this.form.writeOffNo,
            });
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
    padding-top: 20upx;
    padding-bottom: 210upx;
    background: #f8fbff;
}
.title {
    width: 95%;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 20upx 20upx 0 0;
    image {
        width: 100%;
        height: 360upx;
        border-radius: 20upx;
    }
    view {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80upx;
        padding: 0 20upx;
        text:nth-child(1) {
            color: #333333;
            font-size: 32upx;
            font-weight: 600;
        }
        text:nth-child(2) {
            font-size: 26upx;
        }
        .yellow {
            font-size: 26upx;
            color: #f99d3e;
        }
        .red {
            font-size: 26upx;
            color: #ee3c3c;
        }
        .gray {
            font-size: 26upx;
            color: #818181;
        }
    }
    text:nth-child(3) {
        padding: 0 20upx;
        text-align: left;
        color: #818181;
        font-size: 26upx;
        margin-bottom: 35upx;
    }
    .line {
        width: 95%;
        height: 1upx;
        margin: 0 auto;
        background: #e4e7ed;
    }
}
.formBox {
    width: 95%;
    margin: 0 auto 20upx auto;
    padding: 0 20upx 20upx 20upx;
    border-radius: 0 0 15upx 15upx;
    position: relative;
    background: #ffffff;
    padding-top: 20upx;
    .radioBox {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
}
.tip {
    width: 90%;
    margin: 0 auto;
    text {
        text-align: left;
    }
    text:nth-child(1) {
        color: #ed5b5b;
        font-size: 32upx;
        line-height: 80upx;
    }
    text:nth-child(2) {
        color: #2d84ed;
        font-size: 28upx;
        margin-bottom: 30upx;
    }
}

.orderFooter {
    background: #ffffff;
    width: 95%;
    height: 200upx;
    border-radius: 15upx;
    padding: 20upx;
    margin: 20upx auto;
    text {
        text-align: left;
        color: #333333;
        font-size: 32upx;
        line-height: 50upx;
        text {
            display: inline;
            color: #2d84ed;
            font-size: 30upx;
            margin-left: 20upx;
        }
    }
}
.btn {
    width: 100%;
    height: 210upx;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    z-index: 10;
    .title {
        margin-left: 5%;
        height: 100upx;
        display: flex;
        justify-content: left;
        align-items: center;
        text:nth-child(1) {
            color: #2d84ed;
            font-size: 32upx;
        }
        text:nth-child(2) {
            margin-left: 15upx;
            display: inline;
            vertical-align: middle;
            color: #2d84ed;
            font-size: 40upx;
        }
    }
    .cancel {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        view {
            width: 45%;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
        }
        view:nth-child(1) {
            background: #fabd2c;
        }
        view:nth-child(2) {
            background: #2d84ed;
        }
    }
    .complete {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .complete_one {
            width: 40%;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
            background: #dedede;
        }
        .complete_two {
            width: 40%;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
            background: #ed5b5b;
        }
        .complete_three {
            width: 90upx;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2upx solid #818181;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
            view{
                width: 40%;
            }
        }
    }
    .completes {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .complete_one {
            width: 40%;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
            background: #dedede;
        }
        .complete_two {
            width: 40%;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
            background: #dedede;
        }
        .complete_three {
            width: 90upx;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2upx solid #818181;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
            view{
                width: 40%;
            }
        }
    }
    .repeat {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        view {
            width: 45%;
            height: 90upx;
            border-radius: 15upx;
            text-align: center;
            margin: 0 auto;
            position: relative;
            text {
                color: #ffffff;
                line-height: 90upx;
                font-size: 32upx;
            }
        }
        view:nth-child(1) {
            background: #dedede;
        }
        view:nth-child(2) {
            background: #2d84ed;
        }
    }
}
</style>
