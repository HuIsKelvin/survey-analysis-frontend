
<template>
    
<div>
    <charts :options="JSON.parse(report.data.bar)"></charts>
    <charts :options="JSON.parse(report.data.word_cloud)"></charts>
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
