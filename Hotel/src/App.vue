<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView/>
</template>
<style scoped>
/* @import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; */
/* @import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'; */
body,html{
  padding: 0;
  margin: 0;
   /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
  -ms-overflow-style:none;
  /*火狐下隐藏滚动条*/
  overflow:-moz-scrollbars-none;
}
/*Chrome下隐藏滚动条，溢出可以透明滚动*/
html::-webkit-scrollbar{width:0px}
</style>
