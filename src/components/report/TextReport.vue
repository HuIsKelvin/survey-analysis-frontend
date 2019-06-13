
<template>
    
<div>
    <charts :options="JSON.parse(report.data.bar)"></charts>
    <charts :options="JSON.parse(report.data.word_cloud)"></charts>
    <!--
    <img :src="'data:image/png;base64,'+report.data.word_cloud_python">
    -->
</div>
</template>

<script>
import Charts from "./Charts"

export default {
    props: {
        report: null,
    },
    components: {
        "charts": Charts
    }
    
}
</script>


<style lang="scss" scoped>

</style>
