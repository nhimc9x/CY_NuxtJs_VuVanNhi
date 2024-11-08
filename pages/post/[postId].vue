<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
useHead({
  title: 'Post Page'
})
</script>

<template>
  <div class="">This is {{ $route.params.postId }} page</div>
</template>

<style scoped>

</style>