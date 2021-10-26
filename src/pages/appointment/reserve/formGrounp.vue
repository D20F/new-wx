<template>
    <view class="view">
        <view class="formBox">
            <u-form :model="formGrounp" ref="uForm">
                <u-form-item label="预约类型" label-width="150">
                    <view class="radioBox">
                        <u-radio-group
                            v-model="formGrounp.type"
                            :active-color="'#2D84ED'"
                            @change="radioGroupChange"
                            class="radioWidth"
                        >
                            <u-radio name="散客" :disabled="false">
                                散客
                            </u-radio>
                            <u-radio name="团体" :disabled="false">
                                团体
                            </u-radio>
                        </u-radio-group>
                    </view>
                </u-form-item>
                <u-form-item label="预约时间" label-width="150">
                    <u-input
                        @click="time.timeShow = true"
                        :disabled="true"
                        type="select"
                        input-align="right"
                        placeholder="请选择"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formGrounp.time"
                    />
                </u-form-item>
                <u-form-item label="旅行社" label-width="150">
                    <u-input
                        placeholder="请填写名称"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formGrounp.travelAgency"
                    />
                </u-form-item>
                <u-form-item label="导游姓名" label-width="150"
                    ><u-input
                        placeholder="请填写姓名"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formGrounp.touristGuide"
                    />
                </u-form-item>
                <u-form-item label="身份证号" label-width="150"
                    ><u-input
                        placeholder="请填写身份证号"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formGrounp.idCard"
                    />
                </u-form-item>
                <u-form-item label="手机号码" label-width="150"
                    ><u-input
                        placeholder="请填写手机号码"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formGrounp.phone"
                    />
                </u-form-item>
                <view class="header" @click="tipShow = true">
                    <text>预约信息</text>
                    <u-icon
                        name="question-circle"
                        color="#2979ff"
                        size="30"
                    ></u-icon>
                </view>
                <photograph
                    @changeUrl="changeUrl"
                    :imgUrl="formGrounp.reserveImg"
                />
            </u-form>
        </view>

        <slot />

        <view class="btn" @click="submit">
            <text> 提交预约 </text>
        </view>

        <periodPicker
            mode="time"
            v-model="time.timeShow"
            @confirm="changeTime"
            :params="time.params"
        ></periodPicker>
        <u-popup v-model="tipShow" mode="center" closeable border-radius="20">
            <image
                @click="previewimg"
                src="http://res.yitonginfo.com/xzwj/home/reservationPhoto.png"
                mode="aspectFit"
            />
        </u-popup>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { regular_phone, regular_identityNumber } from "@/utils/regular.js";
import uploadIdCard from "@/component/uploadIdCard/index.vue";
import photograph from "@/component/photograph/index.vue";
import periodPicker from "@/component/periodPicker/index.vue";
import { addVisa } from "@/api/api_mapi";

export default {
    name: "formGrounp",
    data() {
        return {
            formGrounp: {
                type: "团体",
                time: "",
                makeDate: "",
                leaveDate: "",
                travelAgency: "",
                touristGuide: "",
                idCard: "",
                phone: "",
                reserveImg: "",
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
            tipShow: false,
        };
    },
    components: {
        uploadIdCard,
        photograph,
        periodPicker,
    },
    mixins: [public_mixin],
    created() {
        this.formGrounp.type = "团体";
    },
    methods: {
        playPhone(data) {
            uni.makePhoneCall({
                phoneNumber: data + "",
                success: () => {},
                fail: (err) => {},
            });
        },
        previewimg() {
            uni.previewImage({
                urls: [
                    "http://res.yitonginfo.com/xzwj/home/reservationPhoto.png",
                ],
            });
        },
        radioGroupChange(data) {
            this.$emit("radioGroupChange", data);
        },

        changeUrl(data) {
            this.formGrounp.reserveImg = data;
        },
        changeTime(data) {
            this.formGrounp.time =
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
            this.formGrounp.makeDate =
                data.year +
                "-" +
                data.month +
                "-" +
                data.day +
                " " +
                data.hour +
                ":00";
            this.formGrounp.leaveDate =
                data.year +
                "-" +
                data.month +
                "-" +
                data.day +
                " " +
                data.hourEnd +
                ":00";
        },
        submit() {
            if (!regular_phone(this.formGrounp.phone)) {
                return uni.showToast({
                    icon: "none",
                    title: "请填写正确手机号",
                });
            }
            if (!regular_identityNumber(this.formGrounp.idCard)) {
                return uni.showToast({
                    icon: "none",
                    title: "请填写正确身份证号码",
                });
            }
            let data = {
                mode: this.formGrounp.type == "散客" ? 1 : 2, // 1 散客 2 团体
                makeDate: this.formGrounp.makeDate,
                leaveDate: this.formGrounp.leaveDate,
                travelAgency: this.formGrounp.travelAgency,
                reserveName: this.formGrounp.touristGuide,
                identity: this.formGrounp.idCard,
                mobile: this.formGrounp.phone,
                reserveImage: this.formGrounp.reserveImg,
            };
            // console.log(data);
            addVisa(data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        uni.showToast({
                            icon: "none",
                            title: "预约成功",
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
}

.btn {
    width: 90%;
    height: 90upx;
    border-radius: 15upx;
    margin: 0 auto;
    text-align: center;
    background: #2d84ed;
    position: relative;
    text {
        color: #ffffff;
        font-size: 32upx;
        line-height: 90upx;
    }
}
.header {
    height: 100upx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text {
        margin-right: 10upx;
        color: #333333;
        font-size: 28upx;
    }
}
</style>
