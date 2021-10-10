<template>
    <view class="view">
        <view class="formBox">
            <u-form :model="formAlone" ref="uForm">
                <u-form-item label="预约类型" label-width="150">
                    <view class="radioBox">
                        <u-radio-group
                            v-model="formAlone.type"
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
                        v-model="formAlone.time"
                    />
                </u-form-item>
                <u-form-item label="预约者" label-width="150">
                    <u-input
                        placeholder="请填写姓名"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.name"
                    />
                </u-form-item>
                <u-form-item label="联系方式" label-width="150"
                    ><u-input
                        placeholder="请输入联系方式"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.phone"
                    />
                </u-form-item>
                <u-form-item label="身份证号" label-width="150"
                    ><u-input
                        placeholder="请填写身份证号"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.idCard"
                    />
                </u-form-item>
                <u-form-item label="户籍所在地" label-width="150"
                    ><u-input
                        placeholder="请填写户籍所在地"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.area"
                    />
                </u-form-item>
                <u-form-item label="预约者性别" label-width="150">
                    <view class="radioBox">
                        <u-radio-group
                            v-model="formAlone.gender"
                            :active-color="'#2D84ED'"
                            class="radioWidths"
                        >
                            <u-radio name="女" :disabled="false"> 女 </u-radio>
                            <u-radio name="男" :disabled="false"> 男 </u-radio>
                        </u-radio-group>
                    </view>
                </u-form-item>

                <uploadIdCard
                    @changeIdCard="changeIdCard"
                    :idCardList="{
                        front: formAlone.front,
                        negative: formAlone.negative,
                    }"
                />

                <u-form-item label="核酸检测结果" label-width="180">
                    <view class="radioBox">
                        <u-radio-group
                            v-model="formAlone.nucleicAcid"
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

                <photograph
                    @changeUrl="changeUrl"
                    :imgUrl="formAlone.nucleicAcidImg"
                />

                <u-form-item
                    label-position="top"
                    label="事由"
                    label-width="150"
                >
                    <u-input
                        input-align="left"
                        placeholder="请填写事由"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.reason"
                    />
                </u-form-item>
                <u-form-item
                    label-position="top"
                    label="去向"
                    label-width="150"
                >
                    <u-input
                        input-align="left"
                        placeholder="请填写去向"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.destination"
                    />
                </u-form-item>
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
    </view>
</template>

<script>
import { regular_phone, regular_identityNumber } from "@/utils/regular.js";
import uploadIdCard from "@/component/uploadIdCard/index.vue";
import photograph from "@/component/photograph/index.vue";
import periodPicker from "@/component/periodPicker/index.vue";
import { addVisa } from "@/api/api_mapi";
import public_mixin from "@/mixins/public.js";

export default {
    name: "formAlone",
    data() {
        return {
            formAlone: {
                type: "散客",
                time: "",
                name: "",
                phone: "",
                idCard: "",
                area: "",
                gender: "女",
                front: "",
                negative: "",
                nucleicAcid: "阴性",
                nucleicAcidImg: "",
                reason: "",
                destination: "",
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
        };
    },
    components: {
        uploadIdCard,
        photograph,
        periodPicker,
    },
    mixins: [public_mixin],
    created() {
        this.formAlone.type = "散客";
    },
    methods: {
        playPhone(data) {
            uni.makePhoneCall({
                phoneNumber: data + "",
                success: () => {},
                fail: (err) => {},
            });
        },
        radioGroupChange(data) {
            this.$emit("radioGroupChange", data);
        },
        changeIdCard(data) {
            this.formAlone.front = data.front;
            this.formAlone.negative = data.negative;
        },
        changeUrl(data) {
            this.formAlone.nucleicAcidImg = data;
        },
        changeTime(data) {
            this.formAlone.time =
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
            this.formAlone.makeDate =
                data.year +
                "-" +
                data.month +
                "-" +
                data.day +
                " " +
                data.hour +
                ":00";
            this.formAlone.leaveDate =
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
            if (!regular_phone(this.formAlone.phone)) {
                return uni.showToast({
                    icon: "none",
                    title: "请填写正确手机号",
                });
            }
            if (!regular_identityNumber(this.formAlone.idCard)) {
                return uni.showToast({
                    icon: "none",
                    title: "请填写正确身份证号码",
                });
            }
            // 正则 新疆 二字
            if (/^\u65b0\u7586/.test(this.formAlone.area)) {
                return uni.showToast({
                    icon: "none",
                    title: "本地户籍不能预约 需要去指定地方办理",
                });
            }
            let data = {
                detection: this.formAlone.nucleicAcidImg,
                front: this.formAlone.front,
                reverse: this.formAlone.negative,
                go: this.formAlone.destination,
                identity: this.formAlone.idCard,
                location: this.formAlone.area,
                makeDate: this.formAlone.makeDate,
                leaveDate: this.formAlone.leaveDate,
                mobile: this.formAlone.phone,
                mode: this.formAlone.type == "散客" ? 1 : 2, // 1 散客 2 团体
                reserveName: this.formAlone.name,
                result: this.formAlone.nucleicAcid == "阴性" ? false : true, // 给 阳性true 阴性false
                sex: this.formAlone.gender == "男" ? 1 : 2, // 给   1 男 2 女
                thing: this.formAlone.reason,
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
    .radioWidths {
        width: 196upx;
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
</style>
