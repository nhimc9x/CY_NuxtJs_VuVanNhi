<script setup lang="ts">

useAsyncData( async () => {
  const res = await $fetch('/api/v1/post')
  console.log(res)
  return res
})

const products = useAsyncData(async () => await $fetch('/api/v1/post'))

</script>

<template>
  <div class="">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <h1 class="text-red-500">Products</h1>
    <p>{{ JSON.stringify(products) }}</p>
  </div>
</template>

<style scoped>

</style>