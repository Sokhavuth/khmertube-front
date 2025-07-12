import { json } from '@sveltejs/kit'

export async function GET({ locals, params }){
    const page = params.page
    const q = params.q
    const response = await fetch(`${locals.apiUrl}/api/search/${page}/${q}?amount=14`)
    const { posts } = await response.json()
    return json({ posts })
}