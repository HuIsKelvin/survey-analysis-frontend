<template>
    
<div>
    <charts :options="JSON.parse(report.data.histogram)"></charts>
    <charts :options="JSON.parse(report.data.boxplot)"></charts>
    <el-table :data="desc_table" border>
        <el-table-column 
            prop="type"
            label="描述统计">
        </el-table-column>
        <el-table-column 
            prop="data"
            label="值">
        </el-table-column>
    </el-table>

</div>
</template>

<script>
import Charts from "./Charts"

export default {
    props: {
        report: null,
    },
    mounted: function() {
        console.log(this.report.data.description)
    },
    computed: {
        "desc_table": function() {
            let arr = []
            for (let [key, value] of Object.entries(this.report.data.description)) {
                arr.push({
                    type: key,
                    data: value
                })
            }
            return arr;
        }
    }
    ,
    components: {
        'charts': Charts
    }
    
    
}
</script>


<style lang="scss" scoped>

</style>
