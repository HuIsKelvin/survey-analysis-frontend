<template>
    <multiple-choice></multiple-choice>
</template>

<script>
import MultipleChoice from "../../components/question/MultipleChoice.vue"

export default {
    name: "Preview",
    data: function() {
        return {};
    },
    components: {
        "multiple-choice": MultipleChoice
    }

}
</script>

