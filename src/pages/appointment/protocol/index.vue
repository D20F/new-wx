<template>
    <view class="view">
        <text class="header"> 办证须知 </text>
        <text class="content">
            1、办理《边境通行证》免费；
            2、申领《边境通行证》时需如实说明前往事由、时间、地点，对欲前往的地点要精确到边境县、市、乡、团场一级；
            3、《边境通行证》的有效期一般不超过三个月，在有效期内可多次使用；因工作需要办理不超过一年的，需开具公函及相关证明；
            4、年满１６周岁的中国公民请持本人身份证等有效证件申请；不满16周岁的不单独办理，可与持证人偕行，但不得超过2人；
            5、新疆维吾尔自治区居民应当向常住户口所在地县级以上公安机关或者指定的公安派出所申领《边境通行证》。
            6、其他省区居民可持本人有效身份证件，在新疆维吾尔自治区公安机关各办证点均可办理；
            7、外国人、海外华侨、港澳台同胞前往开放的边境管理区，持有效证件并填写《边境通行证》申请表，由出入境管理部门审核通过后办理。
            8、中国人民解放军和中国人民武装警察部队官兵进出边境管理区，持军（警）官证，军队文职人员证、士兵证进出边境管理区。
            9、如果您的身份证不慎丢失，请到附近派出所（警务站）开具身份证丢失挂失证明或持其他有效证件办理，请同时提供两张一寸照片；
        </text>
        <text class="footer">
            如果您还有不明事宜，请拨打咨询电话详询 09982568501、09982568502。
            喀什边境管理支队办证点
        </text>
    </view>
</template>

<script>
export default {
    name: "protocol",
    data() {
        return {};
    },
    components: {},
    mixins: [],
    onLoad(option) {},
    onShow() {},
    methods: {},
    computed: {},
};
</script>
<style lang="scss" scoped>
.view {
    width: 100%;
    height: inherit;
    position: relative;
    background: #ffffff;
    padding: 0 3%;
}
.header {
    font-size: 32upx;
    font-weight: 600;
    color: #2d84ed;
    line-height: 100upx;
}
.content {
    text-align: left;
    font-size: 28upx;
    line-height: 40upx;
    color: #666666;
}
.footer {
    margin-top: 30upx;
    text-align: right;
    font-size: 28upx;
    line-height: 40upx;
    color: #666666;
}
</style>
