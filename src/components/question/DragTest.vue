<template>
  <div>
    <!-- 调用组件  -->
    <draggable element="ul" v-model="listdata">
      <li v-for="item in listdata">{{item.name}}</li>
    </draggable>
    <!-- 展示list数据效果 -->
    {{listdata}}
  </div>
</template>
 
<script>
import draggable from 'vuedraggable'
export default {
  name: 'draggabletest',
  components: { 
    draggable,
  },
  data () {
    return {
      listdata:[
        {
          id: 1,
          name: '叶落森1'
        },
        {
          id: 2,
          name: '叶落森2'
        },
        {
          id: 3,
          name: '叶落森3'
        },
        {
          id: 4,
          name: '叶落森4'
        },
        {
          id: 5,
          name: '叶落森5'
        }
      ]
    }
  },
}
</script>
