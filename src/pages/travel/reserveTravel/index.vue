<template>
    <view class="view">
        <view class="formBox">
            <u-form :model="form" ref="uForm">
                <u-form-item label="预约时间" label-width="150">
                    <u-input
                        @click="time.timeShow = true"
                        :disabled="true"
                        type="select"
                        input-align="right"
                        placeholder="请选择"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.time"
                    />
                </u-form-item>
                <u-form-item label="预约类型" label-width="150">
                    <u-input
                        @click="typeShowFun"
                        :disabled="true"
                        type="select"
                        input-align="right"
                        placeholder="请选择"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="typeLabel"
                    />
                </u-form-item>
                <u-form-item label="预约者" label-width="150"
                    ><u-input
                        placeholder="请填写姓名"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.name"
                    />
                </u-form-item>
                <u-form-item label="手机号码" label-width="150"
                    ><u-input
                        placeholder="请填写手机号码"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.phone"
                    />
                </u-form-item>
                <u-form-item label="身份证号" label-width="150"
                    ><u-input
                        placeholder="请填写身份证号"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="form.idCard"
                    />
                </u-form-item>

                <uploadIdCard
                    @changeIdCard="changeIdCard"
                    :idCardList="{
                        front: form.front,
                        negative: form.negative,
                    }"
                />
                <u-form-item label="核酸检测结果" label-width="180">
                    <view class="radioBox">
                        <u-radio-group
                            v-model="form.nucleicAcid"
                            :active-color="'#2D84ED'"
                            class="radioWidth"
                        >
                            <u-radio name="阴性" :disabled="false">
                                阴性
                            </u-radio>
                            <u-radio name="阳性" :disabled="false">
                                阳性
                            </u-radio>
                        </u-radio-group>
                    </view>
                </u-form-item>
            </u-form>
        </view>

        <view class="tip">
            <text>温馨提示</text>
            <text>{{ warm }} </text>
        </view>

        <view class="btn" @click="submit">
            <view>
                <text>总价 </text>
                <text> ￥ {{ form.price }} </text>
            </view>
            <view>
                <text> 提交订单 </text>
            </view>
        </view>

        <periodPicker
            mode="time"
            v-model="time.timeShow"
            @confirm="changeTime"
            :params="time.params"
        ></periodPicker>
        <u-select
            title="预约类型"
            v-model="typeShow"
            :list="list"
            @confirm="changeType"
        ></u-select>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { regular_phone, regular_identityNumber } from "@/utils/regular.js";
import uploadIdCard from "@/component/uploadIdCard/index.vue";
import periodPicker from "@/component/periodPicker/index.vue";
import { getComboPage, getComboQuantity, addTravel } from "@/api/api_mapi";

export default {
    name: "",
    data() {
        return {
            form: {
                type: "",
                time: "",
                name: "",
                phone: "",
                idCard: "",
                front: "",
                negative: "",
                nucleicAcid: "阴性",
                price: 0,
                makeDate: "",
                leaveDate: "",
            },
            time: {
                timeShow: false,
                params: {
                    year: true,
                    month: true,
                    day: true,
                    hour: true,
                    hourEnd: true,
                },
            },
            typeLabel: "",
            typeShow: false,
            list: [],
            comboList: [],
            warm: "",
        };
    },
    components: { uploadIdCard, periodPicker },
    mixins: [public_mixin],
    onLoad(option) {
        console.log(JSON.parse(option.data));
        let query = JSON.parse(option.data);
        if (query !== undefined) {
            if (query.reOrder == true) {
                // 重复下单跳转表单  初始化
                this.initForm(JSON.parse(option.data));
                this.getComboPage(3);
                this.warm = query.reserve.warm;
            } else {
                this.getComboPage(query.id);
                this.warm = query.warm;
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
                    // console.log(res);
                    if (res.status == 200) {
                        let arr = [];
                        for (const item of res.data) {
                            arr.push({
                                label: item.name,
                                value: item.id,
                            });
                        }
                        this.list = arr;
                        this.comboList = res.data;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        initForm(data) {
            this.form = data;
            this.typeLabel = data.comboName;
            getComboQuantity(this.form.type, {
                makeDate: this.form.makeDate.split(" ")[0],
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data < 1) {
                        this.typeLabel = "";
                        this.form.type = "";
                        this.form.price = 0;
                        uni.showToast({
                            icon: "none",
                            title: "本套餐已售完,请选择其他套餐",
                        });
                    }
                } else {
                    this.typeLabel = "";
                    this.form.type = "";
                    this.form.price = 0;
                    uni.showToast({
                        icon: "none",
                        title: "本套餐已售完,请选择其他套餐",
                    });
                }
            });
        },
        changeIdCard(data) {
            this.form.front = data.front;
            this.form.negative = data.negative;
        },
        changeTime(data) {
            this.form.time =
                data.year +
                "-" +
                data.month +
                "-" +
                data.day +
                " " +
                data.hour +
                ":00 ～ " +
                data.hourEnd +
                ":00";
            this.form.makeDate =
                data.year +
                "-" +
                data.month +
                "-" +
                data.day +
                " " +
                data.hour +
                ":00";
            this.form.leaveDate =
                data.year +
                "-" +
                data.month +
                "-" +
                data.day +
                " " +
                data.hourEnd +
                ":00";
        },
        changeType(e) {
            this.typeLabel = e[0].label;
            this.form.type = e[0].value;
            for (let item of this.comboList) {
                if (item.id == e[0].value) {
                    this.form.price = item.amount;
                }
            }
            getComboQuantity(this.form.type, {
                makeDate: this.form.makeDate.split(" ")[0],
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data < 1) {
                        this.typeLabel = "";
                        this.form.type = "";
                        this.form.price = 0;
                        uni.showToast({
                            icon: "none",
                            title: "本套餐已售完,请选择其他套餐",
                        });
                    }
                } else {
                    this.typeLabel = "";
                    this.form.type = "";
                    this.form.price = 0;
                    uni.showToast({
                        icon: "none",
                        title: "本套餐已售完,请选择其他套餐",
                    });
                }
            });
        },
        typeShowFun() {
            if (this.form.makeDate !== "") {
                this.typeShow = true;
            } else {
                uni.showToast({
                    icon: "none",
                    title: "请选择预约时间",
                });
            }
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
                comboId: this.form.type,
                front: this.form.front,
                reverse: this.form.negative,
                identity: this.form.idCard,
                makeDate: this.form.makeDate,
                leaveDate: this.form.leaveDate,
                mobile: this.form.phone,
                reserveName: this.form.name,
                result: this.form.nucleicAcid == "阴性" ? false : true, // 给 阳性true 阴性false
            };
            let that = this;
            console.log(data);
            addTravel(data)
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
                                    title: "预约成功",
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
    .radioWidth {
        width: 256upx;
    }
    .radioWidths {
        width: 196upx;
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
        }
    }
    view:nth-child(2) {
        width: 100%;
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
