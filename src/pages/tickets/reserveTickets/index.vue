<template>
    <view class="view">
        <view class="title">
            <image :src="query.image" mode="" />
            <text>{{ query.title }}</text>
            <text>开放时间: {{ query.time }}</text>
            <view class="line"></view>
        </view>
        <view class="formBox">
            <u-form :model="form" ref="uForm">
                <u-form-item label="选择日期" label-width="150">
                    <u-input
                        @click="time.timeShow = true"
                        :disabled="true"
                        placeholder="请选择前往日期"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.time"
                    />
                </u-form-item>
                <u-form-item label="选择时段" label-width="150">
                    <u-input
                        @click="time.periodShow = true"
                        :disabled="true"
                        placeholder="请选择前往时间段"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.period"
                    />
                </u-form-item>

                <u-form-item label="游客姓名" label-width="150">
                    <u-input
                        placeholder="请填写游客姓名"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.name"
                    />
                </u-form-item>
                <u-form-item label="身份证号" label-width="150"
                    ><u-input
                        placeholder="请填写游客客身份证号"
                        border
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.idCard"
                    />
                </u-form-item>
                <u-form-item label="联系方式" label-width="150"
                    ><u-input
                        placeholder="请填写游客联系方式"
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
                <text> ￥ {{ query.price * form.count }} </text>
            </view>
            <view>
                <text> 提交订单 </text>
            </view>
        </view>

        <u-picker
            mode="time"
            v-model="time.timeShow"
            @confirm="changeTime"
            :params="time.params"
        ></u-picker>
        <u-select
            v-model="time.periodShow"
            mode="mutil-column"
            :default-value="time.periodDefault"
            :list="time.periodList"
            @confirm="changePeriod"
        ></u-select>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { regular_phone, regular_identityNumber } from "@/utils/regular.js";
import { addTicket, getTicketQuantity } from "@/api/api_mapi";

export default {
    name: "",
    data() {
        return {
            query: {},
            form: {
                time: "",
                period: "",
                idCard: "",
                name: "",
                phone: "",
                count: 0,
            },
            time: {
                timeShow: false,
                periodShow: false,
                params: {
                    year: true,
                    month: true,
                    day: true,
                },
                periodDefault: [0, 0, 0],
                periodList: [
                    [
                        // { value: "00:00", label: "00 时" },
                        // { value: "01:00", label: "01 时" },
                        // { value: "02:00", label: "02 时" },
                        // { value: "03:00", label: "03 时" },
                        // { value: "04:00", label: "04 时" },
                        // { value: "05:00", label: "05 时" },
                        // { value: "06:00", label: "06 时" },
                        // { value: "07:00", label: "07 时" },
                        // { value: "08:00", label: "08 时" },
                        // { value: "09:00", label: "09 时" },
                        // { value: "10:00", label: "10 时" },
                        // { value: "11:00", label: "11 时" },
                        // { value: "12:00", label: "12 时" },
                        // { value: "13:00", label: "13 时" },
                        // { value: "14:00", label: "14 时" },
                        // { value: "15:00", label: "15 时" },
                        // { value: "16:00", label: "16 时" },
                        // { value: "17:00", label: "17 时" },
                        // { value: "18:00", label: "18 时" },
                        // { value: "19:00", label: "19 时" },
                        // { value: "20:00", label: "20 时" },
                        // { value: "21:00", label: "21 时" },
                        // { value: "22:00", label: "22 时" },
                        // { value: "23:00", label: "23 时" },
                    ],
                    [
                        {
                            label: "至",
                        },
                    ],
                    [
                        // { value: "00:00", label: "00 时" },
                        // { value: "01:00", label: "01 时" },
                        // { value: "02:00", label: "02 时" },
                        // { value: "03:00", label: "03 时" },
                        // { value: "04:00", label: "04 时" },
                        // { value: "05:00", label: "05 时" },
                        // { value: "06:00", label: "06 时" },
                        // { value: "07:00", label: "07 时" },
                        // { value: "08:00", label: "08 时" },
                        // { value: "09:00", label: "09 时" },
                        // { value: "10:00", label: "10 时" },
                        // { value: "11:00", label: "11 时" },
                        // { value: "12:00", label: "12 时" },
                        // { value: "13:00", label: "13 时" },
                        // { value: "14:00", label: "14 时" },
                        // { value: "15:00", label: "15 时" },
                        // { value: "16:00", label: "16 时" },
                        // { value: "17:00", label: "17 时" },
                        // { value: "18:00", label: "18 时" },
                        // { value: "19:00", label: "19 时" },
                        // { value: "20:00", label: "20 时" },
                        // { value: "21:00", label: "21 时" },
                        // { value: "22:00", label: "22 时" },
                        // { value: "23:00", label: "23 时" },
                    ],
                ],
            },
        };
    },
    components: {},
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
            }
        }

        this.initPeriod();
    },
    onShow() {},
    methods: {
        initPeriod() {
            for (
                let i = this.query.startTime.split(":")[0];
                i < this.query.endTime.split(":")[0];
                i++
            ) {
                this.time.periodList[0].push({
                    value: i + ":00",
                    label: i + " 时",
                });
            }
            for (
                let i = ~~this.query.startTime.split(":")[0] + 1;
                i <= this.query.endTime.split(":")[0];
                i++
            ) {
                this.time.periodList[2].push({
                    value: i + ":00",
                    label: i + " 时",
                });
            }
        },
        initForm(data) {
            let query = {
                time: data.period,
                title: data.name,
                image: data.coverUrl,
                warm: data.warm,
                price: data.amount,
                startTime: data.startTime,
                endTime: data.endTime,
                id: data.id,
            };
            this.query = query;
            let form = {
                time: data.time,
                period:
                    data.makeDate.split(" ")[1] +
                    "-" +
                    data.leaveDate.split(" ")[1],
                name: data.reserveName,
                idCard: data.idCard,
                phone: data.phone,
                count: data.count,
            };
            this.form = form;
            getTicketQuantity(this.query.id, {
                makeDate: this.form.time,
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data < 1) {
                        this.form.time = "";
                        uni.showToast({
                            icon: "none",
                            title: "此日期门票已售完,请选择其他日期",
                        });
                    }
                } else {
                    this.form.time = "";
                    uni.showToast({
                        icon: "none",
                        title: "此日期门票已售完,请选择其他日期",
                    });
                }
            });
        },
        changeTime(data) {
            this.form.time = data.year + "-" + data.month + "-" + data.day;
            getTicketQuantity(this.query.id, {
                makeDate: this.form.time,
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data < 1) {
                        this.form.time = "";
                        uni.showToast({
                            icon: "none",
                            title: "此日期门票已售完,请选择其他日期",
                        });
                    }
                } else {
                    this.form.time = "";
                    uni.showToast({
                        icon: "none",
                        title: "此日期门票已售完,请选择其他日期",
                    });
                }
            });
        },
        changePeriod(data) {
            this.form.period = data[0].value + "-" + data[2].value;
        },
        submit() {
            // console.log(this.form);

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
            if (!regular_identityNumber(this.form.idCard)) {
                return uni.showToast({
                    icon: "none",
                    title: "请填写正确身份证号码",
                });
            }
            let data = {
                identity: this.form.idCard,
                makeDate: this.form.time + " " + this.form.period.split("-")[0],
                leaveDate:
                    this.form.time + " " + this.form.period.split("-")[1],
                mobile: this.form.phone,
                quantity: this.form.count,
                reserveId: this.query.id,
                reserveName: this.form.name,
            };
            let that = this;
            console.log(data);
            addTicket(data)
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
