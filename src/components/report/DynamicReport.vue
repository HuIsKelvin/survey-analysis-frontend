<template>
    <div class="question_report">
        <div v-if="report.data">
        <h4>{{ report.title }}</h4>
        <div v-if="report.type == 'category'">
            <category-report :report="report"></category-report>
        </div>
        <div v-if="report.type == 'text'">
            <text-report :report="report"></text-report>
        </div>
        <div v-if="report.type == 'number'">
            <number-report :report="report"></number-report>
        </div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: {
        report: null
    },
    components: {
        "category-report": () => import('./CategoryReport'),
        "text-report": () => import('./TextReport'),
        "number-report": () => import('./NumberReport'),
    }
    
}
</script>

<style lang="scss" scoped>

</style>

