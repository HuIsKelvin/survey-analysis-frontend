<template>
  <div class="about">
    <el-card class="production-team">
      <div slot="header" class="title">
        <h1>制作团队</h1>
      </div>
      <div>
        <el-collapse>
          <el-collapse-item v-for="work in Object.keys(nameList)" :key="work" :name="work" :title="work">
            <p v-for="name in nameList[work]" :key="name">{{ name }}</p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "production-team",
  data() {
    return {
      nameList: {
        Frontend: ["胡锐坤", "刘诗", "林键宇"],
        Backend: ["陈硕", "廖健斌", "黄子希", "林键宇"],
        Design: ["李佳纯", "林凯欣", "何钰怡", "魏依璐"]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
span {
  margin: 10px;
}

.production-team {
  width: 500px;
  margin: auto;
}
</style>

