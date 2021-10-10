<template>
    <view class="view">
        <view class="title">
            <image :src="query.image" mode="" />
            <text>{{ query.title }}</text>
            <text>{{ query.address }}</text>
            <view class="line"></view>
        </view>
        <view class="formBox">
            <u-form :model="form" ref="uForm">
                <u-form-item label="入住时间" label-width="150">
                    <u-input
                        @click="time.timeShow = !time.timeShow"
                        :disabled="true"
                        placeholder="请选择入住时间"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.timeStart"
                    />
                </u-form-item>
                <u-form-item label="离店时间" label-width="150">
                    <u-input
                        @click="time.timeShow = !time.timeShow"
                        :disabled="true"
                        placeholder="请选择入住时间"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.timeEnd"
                    />
                </u-form-item>
                <u-form-item
                    label="选择房间"
                    label-width="180"
                    label-position="top"
                >
                    <view class="radioBox">
                        <u-radio-group
                            v-model="form.roomType"
                            :active-color="'#2D84ED'"
                            class="radioWidth"
                            @change="radioGroupChange"
                        >
                            <u-radio
                                v-for="(item, index) in typeList"
                                :key="index"
                                :name="item.id"
                                :disabled="false"
                            >
                                {{ item.title }}
                            </u-radio>
                        </u-radio-group>
                    </view>
                </u-form-item>

                <u-form-item label="游客姓名" label-width="150">
                    <u-input
                        placeholder="请填写住客姓名"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.name"
                    />
                </u-form-item>
                <u-form-item label="联系方式" label-width="150"
                    ><u-input
                        placeholder="请填写住客联系方式"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.phone"
                    />
                </u-form-item>
                <u-form-item label="购买数量" label-width="150">
                    <view class="numberBox">
                        <u-number-box v-model="form.count"></u-number-box>
                    </view>
                </u-form-item>
            </u-form>
        </view>

        <view class="tip">
            <text>温馨提示</text>
            <text>{{ query.warm }}</text>
        </view>

        <view class="btn" @click="submit">
            <view>
                <text>总价 </text>
                <text> ￥ {{ time.day * form.price * form.count }} </text>
            </view>
            <view>
                <text> 提交订单 </text>
            </view>
        </view>

        <calendar
            @change="changeTime"
            @showFun="showFun"
            :modal="true"
            :show="time.timeShow"
        ></calendar>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { regular_phone, regular_identityNumber } from "@/utils/regular.js";
import { addHotel, getComboPage } from "@/api/api_mapi";
import calendar from "@/component/calendar";
export default {
    name: "",
    data() {
        return {
            query: {},
            form: {
                timeStart: "",
                timeEnd: "",
                roomType: "",
                name: "",
                phone: "",
                count: 0,
                price: 0,
            },
            typeList: [],
            time: {
                timeShow: false,
                defaultTime: "",
                day: true,
            },
        };
    },
    components: { calendar },
    mixins: [public_mixin],
    onLoad(option) {
        // console.log(JSON.parse(option.data));
        let query = JSON.parse(option.data);
        if (query !== undefined) {
            if (query.reOrder == true) {
                // 重复下单跳转表单  初始化
                this.initForm(JSON.parse(option.data));
            } else {
                this.query = query;
                this.getComboPage(this.query.id);
            }
        }
    },
    onShow() {},
    methods: {
        getComboPage(id) {
            getComboPage({
                foreignId: id,
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data) {
                            arr.push({
                                title: item.name,
                                content: item.remark,
                                price: item.amount,
                                id: item.id,
                            });
                        }
                        this.typeList = arr;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        initForm(data) {
            let query = {
                title: data.hotel.name,
                address: data.hotel.address,
                image: data.hotel.coverUrl,
                warm: data.hotel.reminder,
                id: data.hotel.id,
            };
            this.query = query;
            let form = {
                timeStart: data.makeDate,
                timeEnd: data.leaveDate,
                roomType: data.comboId,
                name: data.reserveName,
                phone: data.mobile,
                count: data.quantity,
                price: data.payAmount,
            };
            this.form = form;
            getComboPage({
                foreignId: data.hotel.id,
            })
                .then((res) => {
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data) {
                            arr.push({
                                title: item.name,
                                content: item.remark,
                                price: item.amount,
                                id: item.id,
                            });
                        }
                        this.typeList = arr;
                        for (const item of this.typeList) {
                            if (data.comboId == item.id) {
                                this.form.price = item.price;
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        changeTime(data) {
            this.form.timeStart = data.choiceDate[0].re;
            this.form.timeEnd = data.choiceDate[1].re;
            this.time.day = data.dayCount;
        },
        radioGroupChange(data) {
            for (const item of this.typeList) {
                if (data == item.id) {
                    this.form.price = item.price;
                }
            }
        },
        submit() {
            for (const item in this.form) {
                if (this.form[item] == "") {
                    return uni.showToast({
                        icon: "none",
                        title: "请填写全部内容",
                    });
                }
            }
            if (!regular_phone(this.form.phone)) {
                return uni.showToast({
                    icon: "none",
                    title: "请填写正确手机号",
                });
            }
            let data = {
                comboId: this.form.roomType,
                makeDate: this.form.timeStart,
                leaveDate: this.form.timeEnd,
                mobile: this.form.phone,
                quantity: this.form.count,
                reserveName: this.form.name,
                reserveId: this.query.id,
            };
            let that = this;
            // console.log(data);
            addHotel(data)
                .then((res) => {
                    // console.log(res);
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
                                    title: "购买成功",
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
                                setTimeout(() => {
                                    that.back(1);
                                }, 1000);
                            },
                            complete: function (res) {},
                        });
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
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #f8fbff;
    padding-top: 16upx;
}
.title {
    width: 95%;
    margin: 0 auto;
    background: #ffffff;
    image {
        width: 100%;
        height: 360upx;
        border-radius: 20upx;
    }
    text:nth-child(2) {
        text-align: left;
        color: #333333;
        padding: 0 20upx;
        line-height: 70upx;
        font-size: 32upx;
        font-weight: 600;
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
    .radioBox {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .radioWidth {
        width: 672upx;
    }
    .numberBox {
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
.btn {
    width: 100%;
    height: 210upx;
    position: relative;
    background: #ffffff;
    padding: 0 5%;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;

    view:nth-child(1) {
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
            font-weight: 600;
        }
    }
    view:nth-child(2) {
        width: 420upx;
        height: 90upx;
        border-radius: 15upx;
        text-align: center;
        background: #2d84ed;
        position: relative;
        text {
            color: #ffffff;
            font-size: 32upx;
            line-height: 90upx;
        }
    }
}
</style>
