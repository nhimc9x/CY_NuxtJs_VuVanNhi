<script setup>

const placeholderImage = ref('https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp')

const currentPage = ref(1)
const searchValue = ref('')
const word = ref('')
const articles = ref([])
const newsContainer = useTemplateRef('newsContainer')

const {data: news, status, refresh} = await useAsyncData(
    'getNews',
    () =>
        $fetch('/api/v1/news', {
          query: {
            q: word.value,
            page: currentPage.value
          }
        }),
    {
      watch: [word, currentPage],
    }
)

const handleSearch = () => {
  articles.value = []
  word.value = searchValue.value
  currentPage.value = 1
  refresh()
}

const isPending = computed(() => status.value === 'pending');

watch(() => news.value, (newData) => {
  if (newData) {
    articles.value.push(...newData.articles)
  }
}, {immediate: true})

const handleScroll = () => {
  const newsContainerHigh = newsContainer.value?.offsetHeight || 0
  if (newsContainerHigh < 500 || isPending.value) return
  if (window.innerHeight + window.scrollY >= newsContainerHigh) {
    currentPage.value++
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <div class="w-full min-h-screen">
    <div class="max-w-[1560px] mx-auto p-10">

      <form
          @submit.prevent="handleSearch"
          class="flex items-center gap-4 my-8"
      >
        <input
            v-model.trim="searchValue"
            type="text"
            placeholder="Search"
            class="w-full rounded-lg border border-gray-300 bg-gray-400/20 px-4 py-3"
        >
        <button class="bg-blue-600 text-white px-4 py-3 rounded-lg">Search</button>
      </form>

      <div ref="newsContainer" class="grid-cols-3 grid gap-6">
        <div class="border" v-for="article in articles">
          <div
              :style="{
            backgroundImage: `url(${article?.urlToImage || placeholderImage})`
          }"
              class="h-[320px] bg-cover bg-no-repeat bg-center relative"
          >
            <div
                class="w-full h-full hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out relative group">
              <div
                  class="ct-button translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 py-3 absolute bottom-4 left-[4%] w-[92%]  bg-white text-gray-600 px-2">
                Read the full story
              </div>
            </div>
          </div>
          <div class="text-left mt-3 p-3">
            <a href="#">
              <div class="text-xl text-gray-600 font-medium hover:text-coffee-400">
                {{ article?.title }}
              </div>
            </a>
            <div class="text-gray-400 my-3">
              {{ article?.description }}
            </div>
            <div class="text-gray-400 text-xs font-medium tracking-widest uppercase">
              {{ article?.author }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>