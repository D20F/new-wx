<template>
    <view class="container">
        <slot />
        <view class="point"></view>
    </view>
</template>
<script>
let observer;
export default {
    name: "bottomLoading",
    props: {
    
    },
    components: {},
    created() {},
    data() {
        return {
        };
    },
    methods: {
        changeRefresh(data) {
            this.$emit("changeRefresh", data);
        },
    },
    mounted() {
        observer = uni.createIntersectionObserver(this);
        observer.relativeTo(".container").observe(".point", (res) => {
            // console.log(res);
            if (res.intersectionRatio > 0) {
                // console.log("observer触底", res);
                this.changeRefresh();
            }
        });
    },
    beforeDestroy() {
        // console.log(observer);
        if (observer) {
            observer.disconnect();
        }
    },
};
</script>
<style lang='scss' scoped>
.container {
    width: 94%;
    position: relative;
    margin: 120upx auto 0 auto;
    overflow-y: auto;
}
.point {
    width: 100%;
    height: 2upx;
    position: absolute;
    bottom: 0;
}
</style>