
export async function load({ locals }){
    const user = locals.user
    const settings = await locals.settings()
    const title = 'ទំព័រ​ស្វែង​រក'
    const posts = locals.posts
    
    return {user, posts, settings, title}
}

export const actions = {
    search: async ({ locals, request, fetch }) => {
        const data = await request.formData()
        const q = data.get('q')
        const response = await fetch(`${locals.apiUrl}/api/search/${q}/14`)
        const { posts } = await response.json()
        locals.posts = posts
    }
}