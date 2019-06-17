<template>
<div ref="chart">

</div>
</template>

<script>
require('echarts-wordcloud');
import echarts from "echarts"

export default {
    props: {
        options: Object
    },
    mounted: function() {
        let charts = echarts.init(this.$refs.chart)

        charts.setOption(this.options)
        window.onresize = function() {
            charts.resize();
        }
        //console.log(this.options)
    },
}
</script>

<style lang="scss" scoped>
div {
    width: 400px;
    height: 300px;
    margin: auto;
}

</style>


