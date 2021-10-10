<template>
    <view class="view">
        <view class="header">
            <view class="title">
                <text>{{ formAlone.reserve.title }}</text>
                <text class="red" v-if="formAlone.status == -1">已取消</text>
                <text class="yellow" v-else-if="formAlone.status == 1"
                    >待支付</text
                >
                <text class="gray" v-else-if="formAlone.status == 2"
                    >待使用</text
                >
                <text class="gray" v-else-if="formAlone.status == 3"
                    >已完成</text
                >
                <text class="gray" v-else-if="formAlone.status == 4"
                    >已过期</text
                >
            </view>
            <view class="type">
                <text>{{ formAlone.reserve.address }} </text>
            </view>
        </view>
        <view class="formBox">
            <u-form :model="formAlone" ref="uForm">
                <u-form-item label="预约类型" label-width="150">
                    <u-input
                        :disabled="true"
                        input-align="right"
                        placeholder="预约类型"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.type"
                    />
                </u-form-item>
                <u-form-item label="预约时间" label-width="150">
                    <u-input
                        :disabled="true"
                        input-align="right"
                        placeholder="请选择"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.time"
                    />
                </u-form-item>
                <u-form-item label="预约者" label-width="150">
                    <u-input
                        :disabled="true"
                        placeholder="请填写姓名"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.name"
                    />
                </u-form-item>
                <u-form-item label="联系方式" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder="请输入联系方式"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.phone"
                    />
                </u-form-item>
                <u-form-item label="身份证号" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder="请填写身份证号"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.idCard"
                    />
                </u-form-item>
                <u-form-item label="户籍所在地" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder="请填写户籍所在地"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.area"
                    />
                </u-form-item>
                <u-form-item label="预约者性别" label-width="150"
                    ><u-input
                        :disabled="true"
                        placeholder="请填写性别"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.gender"
                    />
                </u-form-item>

                <uploadIdCard
                    :disabled="true"
                    :idCardList="{
                        front: formAlone.front,
                        negative: formAlone.negative,
                    }"
                />
                <u-form-item label="核酸检测结果" label-width="180"
                    ><u-input
                        :disabled="true"
                        placeholder="请填写性别"
                        input-align="right"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.nucleicAcid"
                    />
                </u-form-item>

                <photograph
                    :disabled="true"
                    :imgUrl="formAlone.nucleicAcidImg"
                />

                <u-form-item
                    label-position="top"
                    label="事由"
                    label-width="150"
                >
                    <u-input
                        :disabled="true"
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
                        :disabled="true"
                        input-align="left"
                        placeholder="请填写去向"
                        :customStyle="{ color: '#2D84ED' }"
                        v-model="formAlone.destination"
                    />
                </u-form-item>
            </u-form>
        </view>

        <view class="orderFooter">
            <text
                >订单类型:
                <text>办证预约订单</text>
            </text>
            <text
                >订单编号:
                <text>{{ formAlone.id }}</text>
            </text>
            <text
                >交易时间:
                <text>{{ formAlone.createTime }}</text>
            </text>
        </view>

        <view class="tip">
            <text>温馨提示</text>
            <text>{{ formAlone.reserve.warm }} </text>
        </view>

        <view class="btn">
            <view
                v-if="formAlone.status == 2 || formAlone.status == 1"
                class="cancel"
                @click="cancel"
            >
                <text> 取消订单 </text>
            </view>
            <view
                v-if="formAlone.status == 2 || formAlone.status == 1"
                class="confirm"
                @click="confirm"
            >
                <text> 去使用 </text>
            </view>
            <view v-if="formAlone.status == 3" class="complete">
                <text> 已完成 </text>
            </view>
            <view v-if="formAlone.status == -1" class="complete">
                <text> 已取消 </text>
            </view>
            <view v-if="formAlone.status == -4" class="complete">
                <text> 已过期 </text>
            </view>
        </view>
    </view>
</template>

<script>
import uploadIdCard from "@/component/uploadIdCard/index.vue";
import photograph from "@/component/photograph/index.vue";
import { cancelOrder } from "@/api/api_mapi";
import public_mixin from "@/mixins/public.js";

export default {
    name: "orderAlone",
    data() {
        return {};
    },
    props: {
        formAlone: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    components: {
        uploadIdCard,
        photograph,
    },
    mixins: [public_mixin],
    created() {},
    methods: {
        cancel() {
            cancelOrder(this.formAlone.id)
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
        confirm() {
            uni.showModal({
                title: "验证码",
                content: this.formAlone.writeOffNo,
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
    padding-bottom: 150upx;
}
.header {
    background: #ffffff;
    width: 95%;
    height: 200upx;
    border-radius: 15upx;
    padding: 20upx;
    margin: 20upx auto;
    .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15upx;
        text:nth-child(1) {
            font-size: 32upx;
            color: #333333;
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
    .type {
        text {
            text-align: left;
            font-size: 26upx;
            color: #818181;
        }
    }
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
    height: 150upx;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    view {
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
    }
    .cancel {
        width: 45%;
        background: #fabd2c;
    }
    .confirm {
        width: 45%;
        background: #2d84ed;
    }
    .complete {
        width: 90%;
        background: #dedede;
    }
}
</style>
