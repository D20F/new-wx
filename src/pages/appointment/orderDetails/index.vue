<template>
    <view class="view">
        <oderAlone v-if="query.type == '散客'" :formAlone="query" />
        <orderGrounp v-else :formGrounp="query" />
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import oderAlone from "./oderAlone.vue";
import orderGrounp from "./orderGrounp.vue";
export default {
    name: "orderDetails",
    data() {
        return {
            query: {},
        };
    },
    components: {
        oderAlone,
        orderGrounp,
    },
    mixins: [public_mixin],
    onLoad(option) {
        let query = JSON.parse(option.data);
        // console.log(JSON.parse(option.data));

        if (query.mode == 1) {
            let obj = {
                type: "mode",
                time: "makeDate leaveDate",
                nucleicAcid: "result",
                gender: "sex",
                nucleicAcidImg: "detection",
                front: "front",
                negative: "reverse",
                destination: "go",
                idCard: "identity",
                area: "location",
                makeDate: "makeDate",
                leaveDate: "leaveDate",
                phone: "mobile",
                name: "reserveName",
                reason: "thing",
                createTime: "createTime",
                status: "status",
                id: "id",
                reserve: "reserve",
                writeOffNo: "writeOffNo",
                greenCode: "greenCode",
                travelCard: "travelCard",
            };
            let data = {};
            for (const key in obj) {
                switch (key) {
                    case "type":
                        data[key] = query[obj[key]] == 1 ? "散客" : "团伙";
                        break;
                    case "nucleicAcid":
                        data[key] = query[obj[key]] == false ? "阴性" : "阳性";
                        break;
                    case "gender":
                        data[key] = query[obj[key]] == 1 ? "男" : "女";
                        break;
                    case "time":
                        data[key] =
                            query[obj[key].split(" ")[0]] +
                            " ～ " +
                            query[obj[key].split(" ")[1]].split(" ")[1];
                        break;
                    default:
                        data[key] = query[obj[key]];
                        break;
                }
            }
            this.query = data;
        } else {
            let obj = {
                type: "mode",
                time: "makeDate leaveDate",
                makeDate: "makeDate",
                travelAgency: "travelAgency",
                touristGuide: "reserveName",
                idCard: "identity",
                phone: "mobile",
                reserveImg: "reserveImage",
                createTime: "createTime",
                status: "status",
                id: "id",
                reserve: "reserve",
                writeOffNo: "writeOffNo",
            };
            let data = {};
            for (const key in obj) {
                switch (key) {
                    case "type":
                        data[key] = query[obj[key]] == 1 ? "散客" : "团伙";
                        break;
                    case "time":
                        data[key] =
                            query[obj[key].split(" ")[0]] +
                            " ～ " +
                            query[obj[key].split(" ")[1]].split(" ")[1];
                        break;
                    default:
                        data[key] = query[obj[key]];
                        break;
                }
            }
            this.query = data;
        }
    },
    onShow() {},
    methods: {},
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/common/public.scss";
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #f8fbff;
}
</style>
