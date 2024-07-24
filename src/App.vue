<template>
  <!-- 在第一次进入网页先进行懒加载 Load组件 -->
  <div id="app">
    <Load v-if="showLoader" :isLoading="showLoader" />
    <div v-else>
      <Layout />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Editor from './components/Editor.vue';
import Layout from './components/Layout.vue';
import Load from './components/Load.vue';
const showLoader = ref(false);

onMounted(() => {
  if (!sessionStorage.getItem('hasVisited')) {
    showLoader.value = true;
    setTimeout(() => {
      showLoader.value = false;
      sessionStorage.setItem('hasVisited', 'true');
    }, 3000); // 设置加载时间，比如3秒
  } else {
    showLoader.value = false;
  }
});
</script>


<style scoped></style>
