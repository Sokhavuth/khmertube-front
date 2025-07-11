import { json } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export async function GET({ locals, params, cookies }){
    locals.cookies = cookies
    const user = locals.user
    if(!user){
        throw redirect(307, '/login')
    }
    const page = params.page
    const settings = await locals.settings(locals)
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/setting/paginate/${page}?amount=${settings.dashboard}`,{
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    const { items } = await response.json()
    return json(items)
}