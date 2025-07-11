import { json } from '@sveltejs/kit'

export async function GET({ locals, params, cookies }){
    locals.cookies = cookies
    const settings = await locals.settings(locals)
    const amount = settings.categories
    const page = params.page
    const q = params.q
    const response = await fetch(`${locals.apiUrl}/api/search/${page}/${q}?amount=${amount}`)
    const { posts } = await response.json()
    
    return json({ posts })
}