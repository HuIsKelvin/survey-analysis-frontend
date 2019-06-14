
<template>
<div>
    <charts :options="JSON.parse(report.data.bar)"></charts>
</div>
    
</template>

<script>
import Charts from "./Charts"


export default {
    props: {
        report: null,
    },
    mounted: function() {
    },
    components: {
        "charts": Charts
    }
}
</script>


<style lang="scss" scoped>

</style>
