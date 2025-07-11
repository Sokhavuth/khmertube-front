
export async function load({ locals, cookies }){
    locals.cookies = cookies
    const settings = await locals.settings(locals)
    const title = 'ទំព័រ​ស្វែង​រក'
    const { posts, lastPage, page, q } = locals.data
    
    return { posts, lastPage, page, q, settings, title }
}

export const actions = {
    search: async ({ locals, request, url, cookies }) => {
        locals.cookies = cookies
        const settings = await locals.settings(locals)
        const data = await request.formData()
        const q = data.get('q')
        const page = url.searchParams.get('page') || 1
        
        const response = await fetch(`${locals.apiUrl}/api/search/${q}/${settings.categories}/${page}`)
        const { posts, lastPage } = await response.json()
        locals.data = { posts, lastPage, page, q }
    }
}