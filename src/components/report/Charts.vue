<template>
<div ref="chart"  style="width: 600px;height:400px;">

</div>
</template>

<script>
import echarts from "echarts"

export default {
    props: {
        options: Object
    },
    mounted: function() {
        let charts = echarts.init(this.$refs.chart)
        charts.setOption(this.options)
        console.log(this.options)
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

</style>


