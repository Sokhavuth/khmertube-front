
export async function load({ locals }){
    const settings = await locals.settings()
    const title = 'ទំព័រ​ស្វែង​រក'
    const posts = locals.posts
    
    return {posts, settings, title}
}

export const actions = {
    search: async ({ locals, request }) => {
        const settings = await locals.settings()
        const data = await request.formData()
        const q = data.get('q')
        
        const response = await fetch(`${locals.apiUrl}/api/search/${q}/${settings.categories}`)
        const { posts } = await response.json()
        locals.posts = posts
    }
}