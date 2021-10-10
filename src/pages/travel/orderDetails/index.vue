<template>
    <view class="view">
        <view class="formBox">
            <u-form :model="form" ref="uForm">
                <u-form-item label="预约类型" label-width="150">
                    <u-input
                        :disabled="true"
                        input-align="right"
                        placeholder="预约类型"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.type"
                    />
                </u-form-item>
                <u-form-item label="预约时间" label-width="150">
                    <u-input
                        :disabled="true"
                        input-align="right"
                        placeholder="请选择"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.time"
                    />
                </u-form-item>
                <u-form-item label="预约者" label-width="150">
                    <u-input
                        :disabled="true"
                        placeholder="请填写姓名"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.name"
                    />
                </u-form-item>
                <u-form-item label="联系方式" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder="请输入联系方式"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.phone"
                    />
                </u-form-item>
                <u-form-item label="身份证号" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder="请填写身份证号"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.idCard"
                    />
                </u-form-item>

                <uploadIdCard
                    :disabled="true"
                    :idCardList="{
                        front: form.front,
                        negative: form.negative,
                    }"
                />
                <u-form-item label="核酸检测结果" label-width="180"
                    ><u-input
                        :disabled="true"
                        placeholder="请填写核酸检测结果"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.nucleicAcid"
                    />
                </u-form-item>
            </u-form>
        </view>

        <view class="orderFooter">
            <text
                >订单类型:
                <text>旅行社团预约订单</text>
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
            <text>{{ form.reserve.warm }} </text>
        </view>

        <view class="btn">
            <view class="title">
                <text>总价 </text>
                <text> ￥ {{ form.price }} </text>
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
                <text> 已完成 </text>
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
import uploadIdCard from "@/component/uploadIdCard/index.vue";
import public_mixin from "@/mixins/public.js";
import { wxReservePay, cancelOrder } from "@/api/api_mapi";

export default {
    name: "",
    data() {
        return {
            form: {},
        };
    },
    components: {
        uploadIdCard,
    },
    mixins: [public_mixin],
    onLoad(option) {
        // console.log(JSON.parse(option.data));
        let query = JSON.parse(option.data);
        let data = {
            time: query.makeDate + " ～ " + query.leaveDate.split(" ")[1],
            makeDate: query.makeDate,
            leaveDate: query.leaveDate,
            nucleicAcid: query.result == false ? "阴性" : "阳性",
            name: query.reserveName,
            phone: query.mobile,
            idCard: query.identity,
            front: query.front,
            price: query.payAmount,
            type: query.comboId,
            comboName: query.comboName,
            reOrder: true, // 重新下单 判断
            negative: query.reverse,
            createTime: query.createTime,
            status: query.status,
            id: query.id,
            reserve: query.reserve,
            writeOffNo: query.writeOffNo,
        };
        this.form = data;
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
            this.jumpRouter("/pages/travel/reserveTravel/index", this.form);
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
    padding-bottom: 210upx;
    background: #f8fbff;
}

.formBox {
    width: 95%;
    margin: 20upx auto;
    padding: 0 20upx 20upx 20upx;
    border-radius: 15upx;
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
        width: 90%;
        height: 90upx;
        border-radius: 15upx;
        margin: 0 auto;
        text-align: center;
        position: relative;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: 32upx;
        }
        background: #dedede;
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
