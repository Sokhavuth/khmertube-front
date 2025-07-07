
export async function load({ locals, params, fetch }) {
    const settings = await locals.settings()
    const response = await fetch(`${locals.apiUrl}/api/${params.page}?amount=${settings.categories}`)
    const { posts, count } = await response.json()
    const currentPage = parseInt(params.page)
    const lastPage = Math.ceil(count/settings.categories)
    let pageURL = '/page'
    let title = settings.siteTitle

    return {posts, count, settings, currentPage, lastPage, pageURL, title}
}