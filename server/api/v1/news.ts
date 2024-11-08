export default defineEventHandler(async (event) => {
    const url = new URL(getRequestURL(event));
    const page = url.searchParams.get('page');
    const search = url.searchParams.get('q');

    console.log('page: ', page)
    console.log('Search: ', search)

    return await $fetch('https://newsapi.org/v2/everything', {
        query: {
            q: search || 'all',
            page: page,
            pageSize: 10,
            apiKey: '8db5234dd31c42b29354460444f3cac7'
        }
    })
})