<!--发布问卷界面-->
<template>
<div>
  <bread-header :view="{viewType: 'release'}"></bread-header>
</div>
</template>
<script>
export default {
  name: "release-view",
  data() {
    return {

    }
  },
  components: {
    "bread-header": () => import("@/components/common/BreadHeader.vue"),
  }
}
</script>
<style>
</style>