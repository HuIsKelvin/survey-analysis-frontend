
<template>
    <div class="test">
        {{ questionnaire }}
    </div>

</template>

<script>
export default {
    data() {
        return {
            questionnaire: null,
        }
    },
    created() {
        axiosVisual.get("base_report/"+this.$route.params.qid)
        .then(response => {
            this.questionnaire = response.data;
        })
        .catch(error => {
            console.log(error);
        })
    }

    
}
</script>

<style lang="scss" scoped>

</style>

