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
    <h2>前端项目</h2>
    <img src="../assets/image/fontend_contribution.png" width="700px">
    <h2>后端项目</h2>
    <img src="../assets/image/backend_contribution.png" width="700px">
    <h2>后端可视化项目</h2>
    <img src="../assets/image/backend_visual_contribution.png" width="700px">
  </div>
</template>

<script>
export default {
  name: "production-team",
  data() {
    return {
      nameList: {
        Frontend: ["胡锐坤(HulsKelvin)", "刘诗(Xnuiui)", "林键宇(tpwy)"],
        Backend: ["陈硕(chenxshuo)", "廖健斌(helloimljb)", "黄子希(LightPangea)", "林键宇(tpwy)"],
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
  margin: 50px auto;

  p {
    font-size: 1rem;
  }
}

.about {
  h2 {
    margin-top: 50px;
  }
}
</style>

