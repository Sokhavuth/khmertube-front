
export async function load({ locals }){
    const user = locals.user
    const settings = await locals.settings(locals)
    const title = 'ទំព័រ​ស្វែង​រក'
    const { posts, lastPage, q } = locals.data
    const page = 1
    
    return {user, posts, settings, lastPage, page, q, title}
}

export const actions = {
    search: async ({ locals, request, fetch }) => {
        const data = await request.formData()
        const q = data.get('q')
        const response = await fetch(`${locals.apiUrl}/api/search/${q}/14/1`)
        const { posts, lastPage } = await response.json()
        locals.data = { posts, lastPage, q }
    }
}