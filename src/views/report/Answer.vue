
<template>
<div>
    <pre>
        {{ data }}
    </pre>
</div>

</template>

<script>
export default {
    data() {
        return {
            data: Object
        }
    },
    created() {
        axiosVisual.get("survey/"+this.$route.params.qid)
        .then(response => {
            this.data = response.data
            console.log(this.data);
        })
        .catch(error => {
            console.log(error)
        })
    }
    
}
</script>

<style lang="scss" scoped>

</style>

