import { json } from '@sveltejs/kit'

export async function POST({ request, locals, params, fetch }){
    const category = params.category
    const { thumbs } = await request.json()
	const settings = await locals.settings()

    const response = await fetch(`${locals.apiUrl}/api/playlist/${category}?amount=${settings.frontend}`, {
			method: 'POST',
			body: JSON.stringify({ thumbs }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

    const { playlist } = await response.json()
    return json(playlist)
}